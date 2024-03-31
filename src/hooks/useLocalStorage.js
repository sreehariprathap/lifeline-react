import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error("Error fetching from localStorage:", error);
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
