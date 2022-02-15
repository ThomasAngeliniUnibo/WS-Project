import { Route, Routes } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import { Pazienti } from "./pages/Pazienti";
import { Query } from "./pages/Query";
import { Registra } from "./pages/Registra";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Paziente } from "./pages/Paziente";
import { PazienteExaminationRecord } from "./pages/PazienteExaminationRecord";
import PazienteAnalysis from "./pages/PazienteAnalysis";

const queryClient = new QueryClient();

export const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Pazienti />} />
        <Route path="/patients/:fiscalCode" element={<Paziente />} />
        <Route
          path="/patients/:fiscalCode/examination"
          element={<PazienteExaminationRecord />}
        />
        <Route
          path="/patients/:fiscalCode/analysis"
          element={<PazienteAnalysis />}
        />
        <Route path="/query" element={<Query />} />
      </Routes>
    </QueryClientProvider>
  </div>
);
