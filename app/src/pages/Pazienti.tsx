import { Grid } from "@mui/material";
import { useState } from "react";
import { PatientListCard } from "../components/PatientListCard";
import { Layout } from "../components/Layout";
import { Search } from "../components/Search";
import { fetchAllPatients } from "../api/fetchAllPatients";
import { fromPage } from "../api/paginated";
import { useQuery } from "react-query";
import { QueryContent } from "../components/QueryContent";
import { useDebounce } from "use-debounce";

export const Pazienti = () => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, control] = useDebounce(query, 200);

  const { data, status } = useQuery(
    ["fetchAllPatients", page, debouncedQuery],
    () => fetchAllPatients({ ...fromPage(page), query }),
    { keepPreviousData: true, retry: false }
  );

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search query={query} onQueryChange={setQuery} />
        </Grid>
        <QueryContent data={data} status={status}>
          {(d) =>
            d.map((patient) => (
              <Grid key={patient.fiscalCode} item xs={12} md={3}>
                <PatientListCard {...patient} />
              </Grid>
            ))
          }
        </QueryContent>
      </Grid>
    </Layout>
  );
};
