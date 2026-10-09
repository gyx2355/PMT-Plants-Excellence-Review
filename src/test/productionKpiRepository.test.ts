import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductionKpiRecord } from '../domain/models/charts';

const service = vi.hoisted(() => ({ getAll: vi.fn(), create: vi.fn(), update: vi.fn() }));
vi.mock('../generated/services/Apma_pmtproductionkpisService', () => ({ Apma_pmtproductionkpisService: service }));
import { productionKpiRepository } from '../data/adapters/productionKpiRepository';

const values: Omit<ProductionKpiRecord, 'id'> = {
  mainName: 'unused', year: 2026, month: 9, plantId: 'plant-1', type: 'Production', categories: 'Volume', quantity: null,
};

describe('Production KPI persistence', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    service.create.mockResolvedValue({ success: true, data: {} });
    service.update.mockResolvedValue({ success: true, data: {} });
  });

  it('creates every displayed record, including blank quantity, with all business fields', async () => {
    await productionKpiRepository.saveBatch([values]);
    expect(service.create).toHaveBeenCalledWith({
      apma_mainname: '2026_9_Production_Volume', apma_year: 2026, apma_month: 457470008,
      'apma_PlantName@odata.bind': '/apma_pmtplantses(plant-1)', apma_type: 457470000,
      apma_categories: 'Volume', apma_quantityt: null, apma_ratio: null,
    });
    expect(service.update).not.toHaveBeenCalled();
  });

  it('updates an existing row using its ID and preserves zero quantity', async () => {
    await productionKpiRepository.saveBatch([{ ...values, id: 'record-1', quantity: 0, ratio: 0, type: 'Quality' }]);
    expect(service.update).toHaveBeenCalledWith('record-1', expect.objectContaining({
      apma_mainname: '2026_9_Quality_Volume', apma_type: 457470001, apma_quantityt: 0, apma_ratio: 0,
    }));
    expect(service.create).not.toHaveBeenCalled();
  });

  it('persists a calculated Ratio when creating a record', async () => {
    await productionKpiRepository.saveBatch([{ ...values, quantity: 25, ratio: 12.5 }]);
    expect(service.create).toHaveBeenCalledWith(expect.objectContaining({ apma_quantityt: 25, apma_ratio: 12.5 }));
  });

  it('loads Ratio values from the generated Dataverse field', async () => {
    service.getAll.mockResolvedValue({ success: true, data: [{
      apma_pmtproductionkpiid: 'r1', apma_mainname: 'name', apma_year: 2026, apma_month: 457470008,
      _apma_plantname_value: 'plant-1', apma_type: 457470000, apma_categories: 'Volume', apma_quantityt: 25, apma_ratio: 12.5,
    }] });
    expect(await productionKpiRepository.getAll()).toEqual([expect.objectContaining({ quantity: 25, ratio: 12.5 })]);
  });

  it('propagates Dataverse failures rather than reporting a successful save', async () => {
    service.create.mockResolvedValue({ success: false, error: new Error('Not permitted') });
    await expect(productionKpiRepository.saveBatch([values])).rejects.toThrow('Not permitted');
  });
});