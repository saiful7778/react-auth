import type { DispatchAction } from "@/types";
import { getItem, removeItem, setItem } from "@/utils/localStorage";
import { useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const data = getItem(key);
    return (data || initialValue) as T;
  });

  function handleDispatch(action: DispatchAction<T>) {
    if (typeof action === "function") {
      setValue((prevState) => {
        const newValue = (action as (prevState: T) => T)(prevState);
        setItem(key, newValue);
        return newValue;
      });
    } else {
      setValue(action);
      setItem(key, action);
    }
  }

  function clearState() {
    setValue(undefined as T);
    removeItem(key);
  }

  return [value, handleDispatch, clearState] as const;
}
