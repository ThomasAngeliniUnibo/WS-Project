import {
  Avatar,
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import * as colors from "@mui/material/colors";

type Person = {
  avatar: string;
  name: string;
};

export const PatientCard: FC<Person> = ({ avatar, name }) => {
  const colorsArray = Object.values(colors);
  const n = avatar[0].charCodeAt(0) % colorsArray.length;

  return (
    <Box sx={{ minWidth: 275 }}>
      <MuiCard variant="outlined">
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Avatar sx={{ mr: 2, bgcolor: colorsArray[n][600] }}>
              {avatar}
            </Avatar>
            <Box>
              <Typography>{name}</Typography>
              <Typography variant="subtitle2">Paziente</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">Learn more</Button>
        </CardActions>
      </MuiCard>
    </Box>
  );
};
