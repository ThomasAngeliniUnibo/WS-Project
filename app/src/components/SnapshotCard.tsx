import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export const SnapshotCard: FC = () => {
  return (
    <Card>
      <CardContent sx={{ maxHeight: 275 }}>
        <Typography variant="h6">
          <PhotoCameraIcon fontSize="small" sx={{ mb: "-2px" }} /> Episode
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};
