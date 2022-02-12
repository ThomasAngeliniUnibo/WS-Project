import { Grid } from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchPatient } from "../api/fetchPatient";
import { stardogQuery } from "../api/types";
import { DocumentCard } from "../components/DocumentCard";
import { Layout } from "../components/Layout";
import { PatientCard } from "../components/PatientCard";
import { Loading } from "../components/QueryContent/Loading";
import { SnapshotCard } from "../components/SnapshotCard";

export const Paziente: FC = () => {
  const { fiscalCode } = useParams();
  const { data, status } = useQuery(["fetchPatient", fiscalCode], () =>
    fetchPatient({ fiscalCode })
  );

  if (status === "success") {
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <PatientCard {...data} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {[0, 1, 2].map((x) => (
                <Grid item xs={4}>
                  <DocumentCard id={x.toString()} name="Document" />
                </Grid>
              ))}
              {[0, 1, 2].map((x) => (
                <Grid item xs={4}>
                  <SnapshotCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  } else {
    return <Loading />;
  }
};
