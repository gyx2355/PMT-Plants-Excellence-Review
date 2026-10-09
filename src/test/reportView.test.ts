import { describe, expect, it } from 'vitest';
import { ReportType } from '../domain/enums';
import type { MonthlyReport, Plant, ReportCategory } from '../domain/models';
import { filterMonthlyReports, groupReportsByPlantAndCategory } from '../pages/MonthlyReportsPage/reportView';

const plants: Plant[] = [
  { id: 'p1', name: 'Plant 1', displayOrder: 1 },
  { id: 'p2', name: 'Plant 2', displayOrder: 2 },
];
const categories: ReportCategory[] = [{ id: 'c1', name: 'QEHS', displayOrder: 1 }];
const reports: MonthlyReport[] = [
  { id: 'h1', year: 2026, month: 9, plantId: 'p1', categoryId: 'c1', type: ReportType.Highlights, content: 'H', displayOrder: 1 },
  { id: 'l1', year: 2026, month: 9, plantId: 'p1', categoryId: 'c1', type: ReportType.Lowlights, content: 'L', displayOrder: 1 },
  { id: 'h2', year: 2026, month: 9, plantId: 'p2', categoryId: 'c1', type: ReportType.Highlights, content: 'H2', displayOrder: 1 },
];

describe('monthly report view filtering', () => {
  it('filters by plant, category, and type independently', () => {
    expect(filterMonthlyReports(reports, { plantIds: ['p2'], categoryIds: [], types: [] })).toHaveLength(1);
    expect(filterMonthlyReports(reports, { plantIds: [], categoryIds: ['c1'], types: [ReportType.Lowlights] })).toHaveLength(1);
  });

  it('keeps plants and categories as distinct hierarchy levels', () => {
    const groups = groupReportsByPlantAndCategory(plants, categories, reports);
    expect(groups).toHaveLength(2);
    expect(groups[0].plant.name).toBe('Plant 1');
    expect(groups[0].categories[0].highlights?.content).toBe('H');
    expect(groups[1].plant.name).toBe('Plant 2');
  });
});
