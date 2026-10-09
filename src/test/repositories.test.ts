import { describe, it, expect } from 'vitest';
import {
  plantRepository,
  kpiDefinitionRepository,
  targetRepository,
  monthlyKpiResultRepository,
  monthlyReportRepository,
} from '../data/mock/mockRepositories';
import { KpiStatus, ReportType } from '../domain/enums';

describe('Mock Repositories', () => {
  it('should fetch all plants sorted by display order', async () => {
    const plants = await plantRepository.getAll();
    expect(plants.length).toBeGreaterThan(0);
    expect(plants[0].name).toBe('Pudong-TPU');
  });

  it('should fetch all 14 KPI definitions', async () => {
    const kpis = await kpiDefinitionRepository.getAll();
    expect(kpis.length).toBe(14);
  });

  it('should fetch targets for 2026', async () => {
    const targets = await targetRepository.getByYear(2026);
    expect(targets.length).toBeGreaterThan(0);
  });

  it('should fetch monthly KPI results for a selected year across all months', async () => {
    const results = await monthlyKpiResultRepository.getByYear(2026);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.year === 2026)).toBe(true);
  });

  it('should mark monthly KPI results Missing when KPI Logic is unset', async () => {
    const saved = await monthlyKpiResultRepository.saveBatch([
      {
        year: 2026,
        month: 8,
        plantId: 'pudong',
        kpiId: 'kpi-7',
        monthlyActual: 13.0,
        ytdActual: 13.0,
        status: KpiStatus.Missing,
      },
    ]);

    expect(saved.length).toBe(1);
    expect(saved[0].status).toBe(KpiStatus.Missing);
  });

  it('should create and retrieve monthly reports', async () => {
    const report = await monthlyReportRepository.create({
      year: 2026,
      month: 8,
      plantId: 'zhanjiang',
      categoryId: 'cat-qehs',
      type: ReportType.Highlights,
      content: 'New safety campaign launched.',
      displayOrder: 1,
    });

    expect(report.id).toBeDefined();
    const fetched = await monthlyReportRepository.getById(report.id);
    expect(fetched?.content).toBe('New safety campaign launched.');
  });
});
