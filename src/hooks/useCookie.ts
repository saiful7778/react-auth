import type { DispatchAction } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";
import { useState } from "react";

export default function useCookie(key: string) {
  const [value, setValue] = useState(() => {
    const data = getCookie(key);
    return data;
  });

  function handleDispatch(action: DispatchAction<string | undefined>) {
    if (typeof action === "function") {
      setValue((prevState) => {
        const newValue = (action as (prevState: string | undefined) => string)(
          prevState,
        );
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
    setValue(undefined);
  }

  return [value, handleDispatch, clearState] as const;
}
