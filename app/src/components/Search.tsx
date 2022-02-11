import {Button, Input, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {FC, useRef} from 'react';

type SearchProps = {
  query: string;
  onQueryChange(query: string): void;
  onSearch?(): void;
};

export const Search: FC<SearchProps> = ({query, onQueryChange, onSearch}) => (
  <Paper elevation={2} sx={{padding: 1, pl: 2, pr: 2}}>
    <InputBase
      fullWidth
      type="text"
      placeholder="Search"
      value={query}
      endAdornment={
        <Button onClick={onSearch}>
          <SearchIcon/>
        </Button>
      }
      onChange={e => {
        onQueryChange(e.target.value);
      }}
    />
  </Paper>
);
