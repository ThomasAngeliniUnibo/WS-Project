import { Avatar, Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Patient } from "../model/patient";

export const PatientCard: FC<Patient> = ({
  firstName,
  lastName,
  fiscalCode,
  birthDate,
}) => {
  const avatar = firstName.charAt(0) + lastName.charAt(0);
  return (
    <Paper sx={{ p: 4 }}>
      <Avatar>{avatar}</Avatar>
      <Typography variant="caption">Fiscal code</Typography>
      <Typography>{fiscalCode}</Typography>
      <Typography variant="caption">First name</Typography>
      <Typography>{firstName}</Typography>
      <Typography variant="caption">Last name</Typography>
      <Typography>{lastName}</Typography>
      <Typography variant="caption">Birth date</Typography>
      <Typography>{birthDate.toLocaleDateString("en-US")}</Typography>
    </Paper>
  );
};
