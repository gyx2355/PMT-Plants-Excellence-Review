import { describe, expect, it } from 'vitest';
import { ReportType } from '../domain/enums';
import type { MonthlyReport, ReportCategory } from '../domain/models';
import { groupMonthlyReports } from '../pages/MonthlyReportsPage/reportGroups';

const categories: ReportCategory[] = [
  { id: 'cat-2', name: 'Projects', displayOrder: 2 },
  { id: 'cat-1', name: 'QEHS', displayOrder: 1 },
];
const reports: MonthlyReport[] = [
  { id: 'low', year: 2026, month: 9, plantId: 'plant', categoryId: 'cat-1', type: ReportType.Lowlights, content: 'Low', displayOrder: 1 },
  { id: 'high', year: 2026, month: 9, plantId: 'plant', categoryId: 'cat-1', type: ReportType.Highlights, content: 'High', displayOrder: 1 },
];

describe('monthly report grouping', () => {
  it('sorts categories and separates highlights from lowlights', () => {
    const groups = groupMonthlyReports(categories, reports);

    expect(groups.map((group) => group.category.id)).toEqual(['cat-1', 'cat-2']);
    expect(groups[0].highlights?.content).toBe('High');
    expect(groups[0].lowlights?.content).toBe('Low');
    expect(groups[1].highlights).toBeUndefined();
  });
});
