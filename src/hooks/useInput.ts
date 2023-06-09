import React, { useState } from "react";

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as T);
  }

  return {
    value,
    onChange: handleChange,
    put: (v: T) => setValue(v),
    reset: () => setValue(initialValue)
  };
};

export default useInput;
