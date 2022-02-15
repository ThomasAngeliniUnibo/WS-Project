import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import BiotechIcon from "@mui/icons-material/Biotech";
import { To, useNavigate } from "react-router";

interface AnalysisCardProps {
  readonly count: number;
  readonly link: To;
}

function MedicalRecordCard({ count, link }: AnalysisCardProps) {
  const navigate = useNavigate();
  const color = blue[300];
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="overline">Analysis</Typography>
            <Typography variant="h6">{count} record(s)</Typography>
          </Box>
          <BiotechIcon
            sx={{
              background: color,
              width: 60,
              height: 60,
              borderRadius: "50%",
              padding: "10px",
            }}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(link)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default MedicalRecordCard;
