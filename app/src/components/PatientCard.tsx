import {Avatar, Box, Paper, Typography} from '@mui/material';
import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Patient} from '../model/patient';
import {avatarColors, avatarLetters} from '../utils/avatar';

export const PatientCard: FC<Patient> = ({
  firstName,
  lastName,
  fiscalCode,
  birthDate,
  relatives,
  city,
}) => {
  const avatar = avatarLetters(firstName, lastName);
  const bgcolor = avatarColors(firstName, lastName);

  const Relatives = () => {
    if (relatives.length > 0) {
      return (
        <>
          <Typography variant="caption">Relatives</Typography>
          {relatives.map(({firstName, lastName, fiscalCode}) => (
            <Box
              key={fiscalCode}
              display="flex"
              flexDirection="row"
              alignItems="center"
              mb={1}
            >
              <Avatar
                sx={{
                  mr: 1,
                  width: 24,
                  height: 24,
                  fontSize: 12,
                  bgcolor: avatarColors(firstName, lastName),
                }}
              >
                {avatarLetters(firstName, lastName)}
              </Avatar>
              <Typography>
                <Link
                  to={`/patients/${fiscalCode}`}
                  style={{textDecoration: 'none'}}
                >
                  {firstName} {lastName}
                </Link>
              </Typography>
            </Box>
          ))}
        </>
      );
    }

    return <></>;
  };

  return (
    <Paper sx={{p: 4}}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar sx={{mr: 1, bgcolor}}>
          {avatarLetters(firstName, lastName)}
        </Avatar>
        <Typography>
          {firstName} {lastName}
        </Typography>
      </Box>
      <Typography variant="caption">Fiscal code</Typography>
      <Typography>{fiscalCode}</Typography>
      <Typography variant="caption">First name</Typography>
      <Typography>{firstName}</Typography>
      <Typography variant="caption">Last name</Typography>
      <Typography>{lastName}</Typography>
      <Typography variant="caption">Birth date</Typography>
      <Typography>{birthDate.toLocaleDateString('en-US')}</Typography>
      {city && (
        <>
          <Typography variant="caption">City</Typography>
          <Typography>{city}</Typography>
        </>
      )}
      <Relatives/>
    </Paper>
  );
};
