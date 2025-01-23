import type { DispatchAction } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";
import { useState } from "react";

export default function useCookie<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const data = getCookie(key);
    return (data || initialValue) as T;
  });

  function handleDispatch(action: DispatchAction<T>) {
    if (typeof action === "function") {
      setValue((prevState) => {
        const newValue = (action as (prevState: T) => T)(prevState);
        setCookie(key, newValue);
        return newValue;
      });
    } else {
      setValue(action);
      setCookie(key, action);
    }
  }

  function clearState() {
    removeCookie(key);
    setValue(undefined as T);
  }

  return [value, handleDispatch, clearState] as const;
}
