import { Box, Button, Typography } from "@mui/material";
import { QueryStatus } from "react-query";
import { Loading } from "./Loading";

interface QueryContentProps<T> {
  readonly status: QueryStatus;
  readonly data: T | undefined;
  readonly children: (t: T) => React.ReactNode;
  readonly retry?: () => void | Promise<any>;
}

export function QueryContent<T>({
  status,
  data,
  children,
  retry,
}: QueryContentProps<T>) {
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <Box
        mt={10}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1">
          Couldn't find the content you're looking for.
        </Typography>

        {retry && (
          <Button variant="outlined" onClick={retry}>
            Retry
          </Button>
        )}
      </Box>
    );
  }

  return <>{children(data!)}</>;
}
