import {
  Avatar,
  Box,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useHover} from '../hooks/useHover';
import {Patient} from '../model/patient';
import {avatarColors, avatarLetters} from '../utils/avatar';

type PatientListCardProps = Pick<
Patient,
'firstName' | 'lastName' | 'fiscalCode'
>;
export const PatientListCard: FC<PatientListCardProps> = ({
  firstName,
  lastName,
  fiscalCode,
}) => {
  const avatar = avatarLetters(firstName, lastName);
  const bgcolor = avatarColors(firstName, lastName);
  const name = firstName + ' ' + lastName;
  const navigate = useNavigate();

  const [hover, props] = useHover();

  return (
    <Box sx={{minWidth: 275}}>
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
            <Avatar sx={{mr: 2, bgcolor}}>{avatar}</Avatar>
            <Box>
              <Typography>{name}</Typography>
              <Typography variant="subtitle2">Paziente</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate(`/patients/${fiscalCode}`);
            }}
          >
            View
          </Button>
        </CardActions>
      </MuiCard>
    </Box>
  );
};
