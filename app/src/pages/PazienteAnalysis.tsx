import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Layout } from "../components/Layout";
import { Loading } from "../components/QueryContent/Loading";

interface PazienteAnalysisProps {}

const PazienteAnalysis: FC = () => {
  const { fiscalCode } = useParams();
  const { data, status } = useQuery(
    ["fetchPatientAnalysis", fiscalCode],
    () => {
      return Promise.resolve("ok");
      //   fetchPatientAnalysis({ fiscalCode })
    }
  );

  if (status === "loading") {
    return <Loading />;
  }
  if (status !== "success") {
    return <div>error</div>;
  }
  return <Layout>paziente</Layout>;
};

export default PazienteAnalysis;
