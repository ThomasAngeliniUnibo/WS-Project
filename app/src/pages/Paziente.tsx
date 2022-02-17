import {Box, Grid, Typography} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {useParams} from 'react-router';
import {fetchBloodTestCount} from '../api/fetchBloodTestCount';
import {fetchFrequencySnapshots} from '../api/fetchFrequencySnapshots';
import {fetchMassSnapshots} from '../api/fetchMassSnapshots';
import {
  fetchDiseaseRecord,
  fetchExaminationRecord,
  fetchSymptomRecord,
} from '../api/fetchMedicalRecord';
import {fetchPatient} from '../api/fetchPatient';
import AnalysisCard from '../components/AnalysisCard';
import BloodTestCardCard from '../components/BloodTestCard';
import FrequencyCard from '../components/FrequencyCard';
import {Layout} from '../components/Layout';
import MassCard from '../components/MassCard';
import MedicalRecordCard from '../components/MedicalRecordCard';
import {PatientCard} from '../components/PatientCard';
import {Loading} from '../components/QueryContent/Loading';
import {SnapshotCard} from '../components/SnapshotCard';

export const Paziente: FC = () => {
  const {fiscalCode} = useParams();
  const {data, status} = useQuery(['fetchPatient', fiscalCode], async () =>
    Promise.all([
      fetchExaminationRecord({fiscalCode}),
      fetchBloodTestCount({fiscalCode}),
      fetchPatient({fiscalCode}),
      fetchMassSnapshots({fiscalCode}),
      fetchFrequencySnapshots({fiscalCode}),
    ]),
  );

  if (status === 'success') {
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <PatientCard {...data[2]}/>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Medical record</Typography>
              </Grid>
              <Grid item xs={4}>
                <MedicalRecordCard
                  title="Examination"
                  link={`/patients/${fiscalCode}/examination`}
                  count={data[0]}
                />
              </Grid>
              <Grid item xs={4}>
                <AnalysisCard link={`/patients/${fiscalCode}/analysis`}/>
              </Grid>
              <Grid item xs={4}>
                <BloodTestCardCard
                  count={data[1]}
                  link={`/patients/${fiscalCode}/bloodTests`}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Snapshots</Typography>
              </Grid>
              {data[3].length > 0 && (
                <Grid item xs={12}>
                  <MassCard records={data[3]}/>
                </Grid>
              )}
              {data[4].length > 0 && (
                <Grid item xs={12}>
                  <FrequencyCard records={data[4]}/>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return <Loading/>;
};
