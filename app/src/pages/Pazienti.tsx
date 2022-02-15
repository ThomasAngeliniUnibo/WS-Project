import { Grid, Pagination, Stack } from "@mui/material";
import { useState } from "react";
import { PatientListCard } from "../components/PatientListCard";
import { Layout } from "../components/Layout";
import { Search } from "../components/Search";
import { fetchAllPatients } from "../api/fetchAllPatients";
import { fromPage } from "../api/paginated";
import { useQuery } from "react-query";
import { QueryContent } from "../components/QueryContent";
import { useDebounce } from "use-debounce";
import { countAllPatients } from "../api/countAllPatients";

const PER_PAGE = 10;

export const Pazienti = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, control] = useDebounce(query, 200);
  const queryPage = page - 1;

  const { data, status: fetchStatus } = useQuery(
    ["fetchAllPatients", queryPage, debouncedQuery],
    () => fetchAllPatients({ ...fromPage(queryPage, PER_PAGE), query }),
    { keepPreviousData: true, retry: false }
  );
  const { data: countData, status: countStatus } = useQuery(
    ["countAllPatients", query],
    () => countAllPatients({ query })
  );
  const status =
    fetchStatus === "success" && countStatus === "success"
      ? "success"
      : fetchStatus === "loading" || countStatus === "loading"
      ? "loading"
      : fetchStatus === "error" || countStatus === "error"
      ? "error"
      : "idle";

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search query={query} onQueryChange={setQuery} />
        </Grid>
        <QueryContent data={data} status={status}>
          {(d) =>
            d.map((patient) => (
              <Grid key={patient.fiscalCode} item xs={12} sm={4}>
                <PatientListCard {...patient} />
              </Grid>
            ))
          }
        </QueryContent>
        {countData && (
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(countData / PER_PAGE)}
                color="primary"
                page={page}
                onChange={(_, value) => setPage(value)}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};
