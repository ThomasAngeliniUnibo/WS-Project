import {
  AppBar,
  Box,
  Button,
  Container,
  Link as MuiLink,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

const linkSx = { color: "white", textDecoration: "none", mr: 2 };

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box minHeight="100vh" pb={2}>
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container>
        <Toolbar disableGutters>
          <Box flexGrow="1">
            <Typography variant="h6">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Health Tracker Ontology
              </Link>
            </Typography>
          </Box>
          <Box sx={{ ml: 3, color: "white" }}>
            <MuiLink component={Link} to="/" sx={linkSx}>
              Home
            </MuiLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Container>{children}</Container>
  </Box>
);
