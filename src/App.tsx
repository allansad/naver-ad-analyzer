import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FunnelPage } from './pages/FunnelPage';
import { ImpressionsPage } from './pages/metrics/ImpressionsPage';
import { CTRPage } from './pages/metrics/CTRPage';
import { CPCPage } from './pages/metrics/CPCPage';
import { CVRPage } from './pages/metrics/CVRPage';
import { CPAPage } from './pages/metrics/CPAPage';
import { ROASPage } from './pages/metrics/ROASPage';
import { QualityScorePage } from './pages/metrics/QualityScorePage';
import { AnalysisPage } from './pages/AnalysisPage';
import { BeyondMetricsPage } from './pages/BeyondMetricsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/funnel" element={<FunnelPage />} />
              <Route path="/metrics/impressions" element={<ImpressionsPage />} />
              <Route path="/metrics/ctr" element={<CTRPage />} />
              <Route path="/metrics/cpc" element={<CPCPage />} />
              <Route path="/metrics/cvr" element={<CVRPage />} />
              <Route path="/metrics/cpa" element={<CPAPage />} />
              <Route path="/metrics/roas" element={<ROASPage />} />
              <Route path="/metrics/quality-score" element={<QualityScorePage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/beyond-metrics" element={<BeyondMetricsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
