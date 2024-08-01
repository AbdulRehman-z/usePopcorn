import { useEffect, useState } from "react";

export function useLocalStorageState(initialState: [], key: string) {
  const [value, setValue] = useState(function () {
    const watched = localStorage.getItem(key);
    if (watched) {
      return JSON.parse(watched);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
