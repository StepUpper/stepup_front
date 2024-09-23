import { useState, useCallback } from "react";

export const useInput = (initialValue: { [k: string]: string } = {}) => {
  const [value, setValue] = useState(initialValue);

  const onReset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, setValue, onReset };
};
