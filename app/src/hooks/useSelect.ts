import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export function useSelect<T>(
  initialState: T | undefined = undefined
): [T, (e: SelectChangeEvent<T>) => void] {
  const [state, setState] = useState(initialState);
  const handleChange = (e: SelectChangeEvent<T>) => {
    setState(e.target.value as T);
  };
  return [state, handleChange];
}
