import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import {lightGreen} from '@mui/material/colors';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {To, useNavigate} from 'react-router';

interface AnalysisCardProps {
  readonly link: To;
}

const AnalysisCard = ({link}: AnalysisCardProps) => {
  const navigate = useNavigate();
  const color = lightGreen[300];
  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="overline">Analysis</Typography>
          </Box>
          <MedicalServicesIcon
            sx={{
              background: color,
              width: 60,
              height: 60,
              borderRadius: '50%',
              padding: '10px',
            }}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small" onClick={() => {
            navigate(link);
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnalysisCard;
