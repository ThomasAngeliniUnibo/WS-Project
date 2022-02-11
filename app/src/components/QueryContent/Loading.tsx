import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loading: FC = () => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
