import { useEffect } from "react";

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(event: KeyboardEvent) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    window.addEventListener("keydown", callback);
    return function () {
      window.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
