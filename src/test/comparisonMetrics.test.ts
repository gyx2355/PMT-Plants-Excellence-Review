import { describe, expect, it } from 'vitest';
import { KpiStatus } from '../domain/enums';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../domain/models';
import { buildComparisonMatrix, buildComparisonRows } from '../pages/KPIComparisonPage/comparisonMetrics';

const plants: Plant[] = [{ id: 'plant-1', name: 'Plant 1', displayOrder: 1 }];
const kpis: KpiDefinition[] = [{ id: 'kpi-1', name: 'Production Volume', category: 'Production', unit: 'kt', kpiLogic: 'Over', displayOrder: 1 }];
const targets: Target[] = [{ id: 'target-1', targetYear: 2026, plantId: 'plant-1', kpiId: 'kpi-1', pyActual: 8, cyTarget: 10 }];
const results: MonthlyKpiResult[] = [{
  id: 'result-1', year: 2026, month: 9, plantId: 'plant-1', kpiId: 'kpi-1',
  monthlyActual: 9, ytdActual: 11, status: KpiStatus.Missing,
}];

describe('KPI comparison metrics', () => {
  it('joins target and result by plant and KPI IDs', () => {
    const [row] = buildComparisonRows(plants, kpis, targets, results, 'all');

    expect(row.target?.cyTarget).toBe(10);
    expect(row.result?.ytdActual).toBe(11);
    expect(row.variance).toBe(-1);
    expect(row.achievement).toBe(110);
    expect(row.status).toBe(KpiStatus.Green);
  });

  it('uses Missing when a plant has no result', () => {
    const [row] = buildComparisonRows(plants, kpis, targets, [], 'all');
    const [matrixRow] = buildComparisonMatrix(plants, kpis, []);

    expect(row.status).toBe(KpiStatus.Missing);
    expect(matrixRow.statuses['plant-1']).toBe(KpiStatus.Missing);
  });
});
