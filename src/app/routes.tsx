import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell/AppShell';
import { KpiOverviewPage } from '../pages/KPIOverviewPage/KpiOverviewPage';
import { KpiComparisonPage } from '../pages/KPIComparisonPage/KpiComparisonPage';
import { ProductionQualityPage } from '../pages/ProductionQualityPage/ProductionQualityPage';
import { KpiDataEntryPage } from '../pages/KPIEntryPage/KpiDataEntryPage';
import { ProductionDataEntryPage } from '../pages/ProductionDataEntryPage/ProductionDataEntryPage';
import { MonthlyReportsPage } from '../pages/MonthlyReportsPage/MonthlyReportsPage';
import { AdministrationPage } from '../pages/AdministrationPage/AdministrationPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/kpi-overview" replace />} />
        <Route path="kpi-overview" element={<KpiOverviewPage />} />
        <Route path="chart">
          <Route index element={<Navigate to="/chart/volume-pac" replace />} />
          <Route path="volume-pac" element={<KpiComparisonPage />} />
          <Route path="production-quality" element={<ProductionQualityPage />} />
        </Route>
        <Route path="volume-pac" element={<Navigate to="/chart/volume-pac" replace />} />
        <Route path="kpi-comparison" element={<Navigate to="/chart/volume-pac" replace />} />
        <Route path="kpi-entry" element={<KpiDataEntryPage />} />
        <Route path="production-entry" element={<ProductionDataEntryPage />} />
        <Route path="monthly-reports" element={<MonthlyReportsPage />} />
        <Route path="administration" element={null} />
        <Route path="administration/configuration" element={<AdministrationPage key="configuration" mode="configuration" />} />
        <Route path="administration/basic-data" element={<AdministrationPage key="basic" mode="basic" />} />
        <Route path="*" element={<Navigate to="/kpi-overview" replace />} />
      </Route>
    </Routes>
  );
};
