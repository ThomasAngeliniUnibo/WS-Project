import {
  Box,
  Button,
  capitalize,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { Aggregator, fetchAnalysis } from "../api/fetchAnalysis";
import { fetchPatient } from "../api/fetchPatient";
import { Layout } from "../components/Layout";
import { PatientCard } from "../components/PatientCard";
import { QueryContent } from "../components/QueryContent";
import { Loading } from "../components/QueryContent/Loading";
import { SnapshotCard } from "../components/SnapshotCard";
import { useSelect } from "../hooks/useSelect";

const aggregatorText = (aggregator: Aggregator) =>
  aggregator === "max"
    ? "maximum"
    : aggregator === "min"
    ? "minimum"
    : aggregator === "avg"
    ? "average"
    : "";

const physicalEntities = {
  heart: {
    ref: "fma:FMA_7088",
    title: "Heart rate",
    uom: "bpm",
    valueType: "frequency",
  },
  body: {
    ref: "fma:FMA_67811",
    title: "Height",
    uom: "m",
    valueType: "length",
  },
};
type PhysicalEntity = keyof typeof physicalEntities;

const PazienteAnalysis: FC = () => {
  const { fiscalCode } = useParams();
  const [aggregator, handleChangeAggregator] = useSelect<Aggregator>("max");
  const [physicalEntity, handleChangePhysicalEntity] =
    useSelect<PhysicalEntity>("heart");
  const { ref, title, uom, valueType } = physicalEntities[physicalEntity];
  const { data, status } = useQuery(
    ["fetchPatientAnalysis", fiscalCode, aggregator, physicalEntities],
    async () =>
      Promise.all([
        fetchPatient({ fiscalCode }),
        fetchAnalysis(aggregator, ref)({ fiscalCode }),
      ])
  );

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {status === "success" ? <PatientCard {...data[0]} /> : <></>}
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography variant="h6">Analysis</Typography>
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
                {Object.keys(physicalEntities).map((value) => (
                  <MenuItem key={value} value={value}>
                    {capitalize(value)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-aggregator">Aggregator</InputLabel>
              <Select
                labelId="select-aggregator-label"
                id="select-aggregator"
                value={aggregator}
                label="Aggregator"
                onChange={handleChangeAggregator}
              >
                <MenuItem value="none">(none)</MenuItem>
                <MenuItem value="max">Max</MenuItem>
                <MenuItem value="min">Min</MenuItem>
                <MenuItem value="avg">Avg</MenuItem>
              </Select>
            </FormControl>
            <QueryContent status={status} data={data}>
              {([_, data]) =>
                data.length > 0 ? (
                  <SnapshotCard
                    records={data}
                    title={`${aggregatorText(aggregator)} ${title}`}
                    uom={uom}
                    valueType={valueType}
                  />
                ) : (
                  <Box>
                    <Typography>There is no data.</Typography>
                  </Box>
                )
              }
            </QueryContent>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PazienteAnalysis;
