import { Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchMedicalRecords } from "../api/fetchMedicalRecord";
import { fetchPatient } from "../api/fetchPatient";
import { stardogQuery } from "../api/types";
import { DocumentCard } from "../components/DocumentCard";
import { Layout } from "../components/Layout";
import MedicalRecordCard from "../components/MedicalRecordCard";
import { PatientCard } from "../components/PatientCard";
import { Loading } from "../components/QueryContent/Loading";
import { SnapshotCard } from "../components/SnapshotCard";

export const Paziente: FC = () => {
  const { fiscalCode } = useParams();
  const { data, status } = useQuery(["fetchPatient", fiscalCode], () =>
    fetchPatient({ fiscalCode })
  );

  const { data: examinationRecordData, status: examinationRecordStatus } =
    useQuery(["fetchExaminationRecord", fiscalCode], () =>
      fetchMedicalRecords({ fiscalCode })
    );

  if (status === "success" && examinationRecordStatus === "success") {
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <PatientCard {...data} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Medical record</Typography>
              </Grid>
              <Grid item xs={4}>
                <MedicalRecordCard
                  title="Examination"
                  count={examinationRecordData}
                />
              </Grid>
              <Grid item xs={4}>
                <MedicalRecordCard title="Disease" count={4} />
              </Grid>
              <Grid item xs={4}>
                <MedicalRecordCard title="Symptom" count={4} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Snapshots</Typography>
              </Grid>
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
