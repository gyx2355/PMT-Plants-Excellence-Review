import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProductionKpiMatrix } from '../domain/models/charts';

const services = vi.hoisted(() => ({
  matrix: { getAll: vi.fn(), create: vi.fn(), update: vi.fn() },
  plant: { get: vi.fn() },
}));
vi.mock('@microsoft/power-apps/data', () => ({ getClient: vi.fn(() => ({})) }));
vi.mock('../generated/services/Apma_pmtproductionkpimatrixesService', () => ({ Apma_pmtproductionkpimatrixesService: services.matrix }));
vi.mock('../generated/services/Apma_pmtplantsesService', () => ({ Apma_pmtplantsesService: services.plant }));
import { volumePacRepository } from '../data/adapters/volumePacRepository';

const values: Omit<ProductionKpiMatrix, 'id' | 'mainName'> = {
  plantId: 'plant-1', type: 'Production', categories: 'Product', productionClass: 'FG', displayOrder: 2,
};

describe('Production KPI Matrix Production Class', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    services.plant.get.mockResolvedValue({ success: true, data: { apma_name: 'Pudong-TPU' } });
    services.matrix.create.mockResolvedValue({ success: true, data: { apma_pmtproductionkpimatrixid: 'matrix-1' } });
    services.matrix.update.mockResolvedValue({ success: true, data: {} });
  });

  it('reads Production Class labels and preserves unset values', async () => {
    services.matrix.getAll.mockResolvedValue({ success: true, data: [
      { apma_pmtproductionkpimatrixid: 'matrix-1', apma_mainname: 'name', apma_type: 457470000, apma_productionclass: 457470001 },
      { apma_pmtproductionkpimatrixid: 'matrix-2', apma_mainname: 'name', apma_type: 457470001 },
      { apma_pmtproductionkpimatrixid: 'matrix-3', apma_mainname: 'name', apma_type: 457470000, apma_productionclass: 457470004 },
    ] });
    const records = await volumePacRepository.getProductionKpiMatrices();
    expect(records.map((record) => record.productionClass)).toEqual(['FG', null, 'FPYFG']);
    expect(services.matrix.getAll).toHaveBeenCalledWith(expect.objectContaining({ select: expect.arrayContaining(['apma_productionclass']) }));
  });

  it('creates the selected choice without changing the Main Name format', async () => {
    await volumePacRepository.createProductionKpiMatrix(values);
    expect(services.matrix.create).toHaveBeenCalledWith(expect.objectContaining({
      apma_mainname: 'Pudong-TPU_Production_Product', apma_productionclass: 457470001,
    }));
  });

  it('updates the selected Production Class', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: 'RM' });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: 457470002 }));
  });

  it('updates the FPY FG Production Class choice', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: 'FPYFG' });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: 457470004 }));
  });

  it('clears the Production Class selection with null', async () => {
    await volumePacRepository.updateProductionKpiMatrix('matrix-1', { ...values, productionClass: null });
    expect(services.matrix.update).toHaveBeenCalledWith('matrix-1', expect.objectContaining({ apma_productionclass: null }));
  });
});