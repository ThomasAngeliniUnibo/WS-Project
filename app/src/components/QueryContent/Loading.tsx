import {Backdrop, CircularProgress} from '@mui/material';
import {FC} from 'react';

export const Loading: FC = () => (
  <Backdrop
    open
    sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
  >
    <CircularProgress color="inherit"/>
  </Backdrop>
);
