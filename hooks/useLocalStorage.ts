import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        setValue(JSON.parse(saved) as T);
      }
    } catch {
      setValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // noop: localStorage can fail in private browsing or restricted environments
    }
  }, [key, value]);

  return [value, setValue] as const;
}
