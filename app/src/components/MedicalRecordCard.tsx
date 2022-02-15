import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { green, red, blue } from "@mui/material/colors";
import FolderIcon from "@mui/icons-material/Folder";
import { To, useNavigate } from "react-router";

interface MedicalRecordCardProps {
  readonly count: number;
  readonly link: To;
  readonly title: "Examination" | "Symptom" | "Disease";
}

function MedicalRecordCard({ count, link, title }: MedicalRecordCardProps) {
  const navigate = useNavigate();
  const color =
    title === "Examination"
      ? red[300]
      : title === "Disease"
      ? green[300]
      : blue[300];
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="overline">{title}</Typography>
            <Typography variant="h6">{count} record(s)</Typography>
          </Box>
          <FolderIcon
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
        {title === "Examination" && (
          <Button size="small" onClick={() => navigate(link)}>
            View
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MedicalRecordCard;
