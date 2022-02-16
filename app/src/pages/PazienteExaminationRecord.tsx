import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import {
  ExaminationRecord,
  fetchExaminationRecordData,
} from "../api/fetchExaminationRecord";
import { fetchPatient } from "../api/fetchPatient";
import { Layout } from "../components/Layout";
import { PatientCard } from "../components/PatientCard";
import { Loading } from "../components/QueryContent/Loading";

export const PazienteExaminationRecord: FC = () => {
  const { fiscalCode } = useParams();
  const { data, status } = useQuery(
    ["fetchExaminationRecordData", fiscalCode],
    () =>
      Promise.all([
        fetchPatient({ fiscalCode }),
        fetchExaminationRecordData({ fiscalCode }),
      ])
  );

  const renderRow = ({ date, disease, report, symptom }: ExaminationRecord) => {
    const diseaseName = disease?.split("#")[1];
    const symptomName = symptom?.split("#")[1];
    return (
      <TableRow>
        <TableCell>{date.toLocaleString("en-US")}</TableCell>
        <TableCell>{report}</TableCell>
        <TableCell>
          <a target="_blank" href={disease}>
            {diseaseName}
          </a>
        </TableCell>
        <TableCell>
          <a href={symptom}>{symptomName}</a>
        </TableCell>
      </TableRow>
    );
  };

  if (status === "success") {
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <PatientCard {...data[0]} />
          </Grid>

          <Grid item xs={12} md={9}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Medical report</TableCell>
                    <TableCell>Symptom</TableCell>
                    <TableCell>Disease</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{data[1].map(renderRow)}</TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Layout>
    );
  } else {
    return <Loading />;
  }
};
