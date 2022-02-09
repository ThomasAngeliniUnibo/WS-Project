import { PatientCard } from "../components/PatientCard";
import { Layout } from "../components/Layout";
import { Grid } from "@mui/material";
import { Search } from "../components/Search";

const pazienti = [
  {
    avatar: "MR",
    name: "Mario Rossi",
  },
  {
    avatar: "LB",
    name: "Luca Bianchi",
  },
  {
    avatar: "AV",
    name: "Andrea Verdi",
  },
  {
    avatar: "MV",
    name: "Marco MV",
  },
  {
    avatar: "UN",
    name: "Ugo Neri",
  },
];

export const Pazienti = () => (
  <Layout>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Search />
      </Grid>
      {pazienti.map(({ avatar, name }) => (
        <Grid item xs={12} md={3}>
          <PatientCard avatar={avatar} name={name} />
        </Grid>
      ))}
    </Grid>
  </Layout>
);
