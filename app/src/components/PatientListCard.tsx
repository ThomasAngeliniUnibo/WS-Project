import {
  Avatar,
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as colors from "@mui/material/colors";
import { useHover } from "../hooks/useHover";
import { Patient } from "../model/patient";

type PatientListCardProps = Pick<
  Patient,
  "firstName" | "lastName" | "fiscalCode"
>;
export const PatientListCard: FC<PatientListCardProps> = ({
  firstName,
  lastName,
  fiscalCode,
}) => {
  const avatar = firstName.charAt(0) + lastName.charAt(0);
  const name = firstName + " " + lastName;
  const colorsArray = Object.values(colors);
  const n = avatar[0].charCodeAt(0) % colorsArray.length;
  const navigate = useNavigate();

  const [hover, props] = useHover();

  console.log(fiscalCode, hover);

  return (
    <Box sx={{ minWidth: 275 }}>
      <MuiCard
        variant="elevation"
        elevation={hover ? 3 : 1}
        onClick={() => {
          console.log(name);
        }}
        {...props}
      >
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
          <Button
            size="small"
            onClick={() => navigate(`/patients/${fiscalCode}`)}
          >
            Learn more
          </Button>
        </CardActions>
      </MuiCard>
    </Box>
  );
};
