import { Button, Input, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FC } from "react";

export const Search: FC = () => (
  <Paper elevation={2} sx={{ padding: 1, pl: 2, pr: 2 }}>
    <InputBase
      fullWidth
      type="text"
      placeholder="Search"
      endAdornment={
        <Button>
          <SearchIcon />
        </Button>
      }
    />
  </Paper>
);
