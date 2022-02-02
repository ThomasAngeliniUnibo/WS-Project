import {Route, Routes} from 'react-router';
import CssBaseline from '@mui/material/CssBaseline';
import {Pazienti} from './pages/Pazienti';
import {Query} from './pages/Query';
import {Registra} from './pages/Registra';
import './App.css';

export const App = () => (
  <div>
    <CssBaseline/>
    <Routes>
      <Route path="/" element={<Pazienti/>}/>
      <Route path="/registra" element={<Registra/>}/>
      <Route path="/query" element={<Query/>}/>
    </Routes>
  </div>
);
