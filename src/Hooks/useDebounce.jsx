import { useState, useEffect } from "react";

// Debounce fonksiyonu
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // önceki timeout'u temizle
    };
  }, [value, delay]);

  return debouncedValue;
}