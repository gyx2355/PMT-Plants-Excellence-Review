import { describe, expect, it } from 'vitest';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../domain/models/charts';
import { buildProductionQualityAxisDomains, buildProductionQualityMetrics } from '../pages/ProductionQualityPage/chartMetrics';

const matrices: ProductionKpiMatrix[] = [
  { id: 'rm', mainName: '', plantId: 'p1', type: 'Production', categories: 'Raw material', productionClass: 'RM', displayOrder: 0 },
  { id: 'fg', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG', productionClass: 'FG', displayOrder: 1 },
  { id: 'nt', mainName: '', plantId: 'p1', type: 'Production', categories: 'NT', productionClass: 'NT', displayOrder: 2 },
  { id: 'w1', mainName: '', plantId: 'p1', type: 'Production', categories: 'Liquid', productionClass: 'Waste', displayOrder: 3 },
  { id: 'w2', mainName: '', plantId: 'p1', type: 'Production', categories: 'Recycle', productionClass: 'Waste', displayOrder: 4 },
  { id: 'q1', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 1 },
  { id: 'q2', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 2 },
];
const record = (categories: string, quantity: number | null, month = 1, year = 2026, type: 'Production' | 'Quality' = 'Production', plantId = 'p1'): ProductionKpiRecord => ({
  id: `${plantId}-${year}-${month}-${categories}`, mainName: '', plantId, year, month, type, categories, quantity,
});
const records = [
  record('Raw material', 100), record('FG', 80), record('NT', 8), record('Liquid', 5), record('Recycle', 5), record('Defects', 3, 1, 2026, 'Quality'),
  record('Raw material', 200, 2), record('FG', 160, 2), record('NT', 20, 2), record('Liquid', 10, 2), record('Recycle', null, 2), record('Defects', 8, 2, 2026, 'Quality'),
  record('Raw material', 400, 12, 2025), record('FG', 300, 12, 2025), record('NT', 12, 12, 2025), record('Liquid', 20, 12, 2025), record('Defects', 4, 12, 2025, 'Quality'),
];

describe('Production & Quality chart metrics', () => {
  it('keeps ratio points above all stacked bars for varying, constant, zero and negative ratios', () => {
    for (const ratios of [[0, 100], [75, 75], [0, 0], [-20, -5]]) {
      const points = ratios.map((ratio) => ({ label: '', ratio, quantities: { fg: 100, waste: 50 }, percentages: {} }));
      const domains = buildProductionQualityAxisDomains(points);
      const barHeight = 150 / domains.quantity[1];
      for (const ratio of ratios) {
        const pointHeight = (ratio - domains.ratio[0]) / (domains.ratio[1] - domains.ratio[0]);
        expect(pointHeight).toBeGreaterThan(barHeight + 0.06);
        expect(pointHeight).toBeLessThanOrEqual(0.775001);
        const minimum = Math.min(...ratios);
        const previousRange = Math.max(Math.max(...ratios) - minimum, Math.abs(minimum) * 0.1, 1) / 0.12;
        const previousHeight = (ratio - minimum) / previousRange + 0.78;
        expect(pointHeight - barHeight).toBeCloseTo((previousHeight - barHeight) / 2);
      }
    }
    const empty = buildProductionQualityAxisDomains([]);
    expect(empty.quantity[1]).toBeGreaterThan(0);
    expect(empty.ratio[1]).toBeGreaterThan(empty.ratio[0]);
  });

  it('excludes RM and NT from bars and calculates Waste ratio as RM-FG-NT over RM', () => {
    const metrics = buildProductionQualityMetrics(records, [...matrices].reverse(), '{P1}', 'Production', 2026, [1, 2]);
    expect(metrics.series.map((series) => series.name)).toEqual(['FG', 'Liquid', 'Recycle']);
    expect(metrics.months[0].ratio).toBe(12);
    expect(metrics.months[0].percentages.category_0).toBe(80);
    expect(metrics.months[1].ratio).toBe(10);
  });

  it('aggregates all prior-year months for PY but only selected CY months', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, [1]);
    expect(metrics.comparison[0].quantities.category_0).toBe(300);
    expect(metrics.comparison[0].ratio).toBe(22);
    expect(metrics.comparison[1].quantities.category_0).toBe(80);
    expect(metrics.comparison[1].ratio).toBe(12);
    expect(metrics.months[1].ratio).toBeNull();
    expect(metrics.months[1].quantities.category_0).toBeNull();
    expect(metrics.months).toHaveLength(12);
  });

  it('calculates YTD as ratio of totals rather than average of monthly percentages', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, [1, 2]);
    expect(metrics.comparison[1].ratio).toBeCloseTo(32 / 300 * 100);
  });

  it('uses the plant shared RM and derives Quality FPY from FG minus Defect', () => {
    const metrics = buildProductionQualityMetrics(records, matrices, 'p1', 'Quality', 2026, [1, 2]);
    expect(metrics.lineName).toBe('FPY');
    expect(metrics.months[0].ratio).toBe(77);
    expect(metrics.comparison[1].ratio).toBeCloseTo(229 / 300 * 100);
    expect(metrics.comparison[0].ratio).toBe(296 / 400 * 100);
  });

  it('never mixes other plants, years or types in the numerator', () => {
    const input = [...records, record('Liquid', 1000, 1, 2026, 'Production', 'p2'), record('Liquid', 1000, 1, 2024), record('Liquid', 1000, 1, 2026, 'Quality')];
    expect(buildProductionQualityMetrics(input, matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBe(12);
  });

  it('preserves zero numerator, ignores empty quantities and sums multiple records', () => {
    const input = [record('Raw material', 50), record('Raw material', 50), record('FG', 90), record('NT', 10), record('Liquid', 0), record('Recycle', null)];
    const metrics = buildProductionQualityMetrics(input, matrices, 'p1', 'Production', 2026, [1]);
    expect(metrics.months[0].ratio).toBe(0);
    expect(metrics.months[0].quantities.category_2).toBeNull();
  });

  it('leaves percentages blank with missing or zero RM and for empty month selection', () => {
    expect(buildProductionQualityMetrics([record('Liquid', 5)], matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBeNull();
    expect(buildProductionQualityMetrics([record('Liquid', 5), record('Raw material', 0)], matrices, 'p1', 'Production', 2026, [1]).months[0].ratio).toBeNull();
    expect(buildProductionQualityMetrics(records, matrices, 'p1', 'Production', 2026, []).comparison[1].ratio).toBeNull();
  });
});