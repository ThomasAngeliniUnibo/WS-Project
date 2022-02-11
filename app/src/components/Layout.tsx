import {
  AppBar,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const linkSx = {color: 'white', textDecoration: 'none', mr: 2};

export const Layout: FC<{children: React.ReactNode}> = ({children}) => (
  <Box minHeight="100vh">
    <AppBar position="static" sx={{mb: 2}}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" flexGrow="1">
            Health Tracker Ontology
          </Typography>
          <Box sx={{ml: 3, color: 'white'}}>
            <MuiLink component={Link} to="/" sx={linkSx}>
              Home
            </MuiLink>
            <MuiLink component={Link} to="/registra" sx={linkSx}>
              Registra
            </MuiLink>
            <MuiLink component={Link} to="/query" sx={linkSx}>
              Query
            </MuiLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Container>{children}</Container>
  </Box>
);
