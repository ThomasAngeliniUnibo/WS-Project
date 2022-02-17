import {Box, Button, capitalize, Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, {FC, useState} from 'react';
import {useQuery} from 'react-query';
import {useLocation, useNavigate, useParams} from 'react-router';
import {Aggregator, fetchAnalysis} from '../api/fetchAnalysis';
import {fetchBloodTests} from '../api/fetchBloodTests';
import {fetchPatient} from '../api/fetchPatient';
import {Layout} from '../components/Layout';
import {PatientCard} from '../components/PatientCard';
import {QueryContent} from '../components/QueryContent';
import {Loading} from '../components/QueryContent/Loading';
import {SnapshotCard} from '../components/SnapshotCard';
import {useSelect} from '../hooks/useSelect';

const bloodMeasurements = {
  redCells: {
    ref: 'CMO_0000025',
    title: 'Red cells count',
    uom: 'no./µL',
    valueType: 'count',
  },
  whiteCells: {
    ref: 'CMO_0000027',
    title: 'White cells count',
    uom: 'no./µL',
    valueType: 'count',
  },
  hematocrit: {
    ref: 'CMO_0000037',
    title: 'Hematocrit',
    uom: '%',
    valueType: 'hematocrit percentage',
  },
  tsh: {
    ref: 'CMO_0001248',
    title: 'Thyroid stimulating hormone',
    uom: 'µU/mL',
    valueType: 'tsh',
  },
};
type BloodMeasurement = keyof typeof bloodMeasurements;

export const PazienteBloodTests: FC = () => {
  const {fiscalCode} = useParams();
  const [physicalEntity, handleChangePhysicalEntity]
    = useSelect<BloodMeasurement>('redCells');
  const {ref, title, uom, valueType} = bloodMeasurements[physicalEntity];
  const {data, status} = useQuery(['fetchBloodTests', fiscalCode, ref], async () =>
    Promise.all([
      fetchPatient({fiscalCode}),
      fetchBloodTests(ref)({fiscalCode}),
    ]),
  );

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {status === 'success' ? <PatientCard {...data[0]}/> : <></>}
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography variant="h6">Blood test</Typography>
            <FormControl fullWidth>
              <InputLabel id="select-physical-entity">
                Physical entity
              </InputLabel>
              <Select
                labelId="select-age-physical-entity-label"
                id="select-physical-entity"
                value={physicalEntity}
                label="Aggregator"
                onChange={handleChangePhysicalEntity}
              >
                {Object.keys(bloodMeasurements).map(value => (
                  <MenuItem key={value} value={value}>
                    {capitalize(bloodMeasurements[value].title)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <QueryContent status={status} data={data}>
              {([_, data]) =>
                data.length > 0 ? (
                  <SnapshotCard
                    differential
                    records={data}
                    title={title}
                    uom={uom}
                    valueType={valueType}
                  />
                ) : (
                  <Box>
                    <Typography>There is no data.</Typography>
                  </Box>
                )}
            </QueryContent>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};
