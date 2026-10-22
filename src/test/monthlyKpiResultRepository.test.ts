import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MonthlyKpiResult } from '../domain/models';

const services = vi.hoisted(() => ({
  results: { create: vi.fn(), update: vi.fn(), getAll: vi.fn() },
  plants: { get: vi.fn() },
  kpis: { get: vi.fn() },
}));
vi.mock('@microsoft/power-apps/data', () => ({ getClient: vi.fn(() => ({})) }));
vi.mock('../generated/services/Apma_pmtmonthlykpiresultsesService', () => ({ Apma_pmtmonthlykpiresultsesService: services.results }));
vi.mock('../generated/services/Apma_pmtplantsesService', () => ({ Apma_pmtplantsesService: services.plants }));
vi.mock('../generated/services/Apma_pmtkpidefinitionsesService', () => ({ Apma_pmtkpidefinitionsesService: services.kpis }));
import { DataverseMonthlyKpiResultRepository } from '../data/adapters/dataverseRepositories';

const result: Omit<MonthlyKpiResult, 'id'> = {
  year: 2026, month: 9, plantId: 'plant-guid', kpiId: 'kpi-guid', monthlyActual: 12.5, ytdActual: 90, status: 'Green' as MonthlyKpiResult['status'],
};

describe('Monthly KPI Results Main name generation', () => {
  const repository = new DataverseMonthlyKpiResultRepository();

  beforeEach(() => {
    vi.resetAllMocks();
    services.plants.get.mockResolvedValue({ success: true, data: { apma_pmtplantsid: 'plant-guid', apma_name: 'Pudong-TPU' } });
    services.kpis.get.mockResolvedValue({ success: true, data: { apma_pmtkpidefinitionsid: 'kpi-guid', apma_kpiname: 'Production Volume' } });
    const savedRecord = { apma_pmtmonthlykpiresultsid: 'result-id', apma_mainname: 'name', apma_year: 2026, apma_month: 457470008, _apma_plantname_value: 'plant-guid', _apma_kpiname_value: 'kpi-guid', apma_monthlyactual: 12.5, apma_ytdactual: 90 };
    services.results.create.mockResolvedValue({ success: true, data: savedRecord });
    services.results.update.mockResolvedValue({ success: true, data: savedRecord });
  });

  it('creates with Year_Month_Plant Name_KPI Name and binds lookups by ID', async () => {
    await repository.saveBatch([result]);
    expect(services.results.create).toHaveBeenCalledWith(expect.objectContaining({
      apma_mainname: '2026_9_Pudong-TPU_Production Volume',
      'apma_PlantName@odata.bind': '/apma_pmtplantses(plant-guid)',
      'apma_KPIName@odata.bind': '/apma_pmtkpidefinitionses(kpi-guid)',
    }));
  });

  it('updates the Main name using the current displayed Plant and KPI names', async () => {
    services.plants.get.mockResolvedValue({ success: true, data: { apma_pmtplantsid: 'plant-guid', apma_name: 'Changhua-TPU' } });
    services.kpis.get.mockResolvedValue({ success: true, data: { apma_pmtkpidefinitionsid: 'kpi-guid', apma_kpiname: 'Waste Ratio' } });
    await repository.saveBatch([{ ...result, id: 'result-id' }]);
    expect(services.results.update).toHaveBeenCalledWith('result-id', expect.objectContaining({
      apma_mainname: '2026_9_Changhua-TPU_Waste Ratio',
    }));
  });

  it('resolves each unique Plant and KPI display name only once per batch', async () => {
    await repository.saveBatch([result, { ...result, month: 10 }]);
    expect(services.plants.get).toHaveBeenCalledTimes(1);
    expect(services.kpis.get).toHaveBeenCalledTimes(1);
    expect(services.results.create).toHaveBeenNthCalledWith(2, expect.objectContaining({
      apma_mainname: '2026_10_Pudong-TPU_Production Volume',
    }));
  });

  it('does not save when the Plant display name cannot be resolved', async () => {
    services.plants.get.mockResolvedValue({ success: false, error: new Error('Plant lookup failed') });
    await expect(repository.saveBatch([result])).rejects.toThrow('Plant lookup failed');
    expect(services.results.create).not.toHaveBeenCalled();
    expect(services.results.update).not.toHaveBeenCalled();
  });
});
