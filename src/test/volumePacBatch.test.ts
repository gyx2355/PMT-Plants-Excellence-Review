import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { ProductionLineMatrix, VolumePacRecord } from '../domain/models/charts';
import { buildMissingVolumePacRecords } from '../domain/services/volumePacBatch';

const plants: Plant[] = [
  { id: 'plant-a', name: 'Plant A', displayOrder: 1 },
  { id: 'plant-b', name: 'Plant B', displayOrder: 2 },
];
const matrices: ProductionLineMatrix[] = [
  { id: 'matrix-a', mainName: 'A_Line 1', plantId: '{PLANT-A}', productionLineId: '{LINE-1}', displayOrder: 1 },
  { id: 'matrix-b', mainName: 'B_Line 2', plantId: 'plant-b', productionLineId: 'line-2', displayOrder: 1 },
];

describe('Volume/PAC batch generation from Production Line Matrix', () => {
  it('generates only the lines mapped to each plant', () => {
    const records = buildMissingVolumePacRecords(2026, 10, plants, matrices, []);

    expect(records).toEqual([
      { year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', volume: null, forecast: null, pac: null },
      { year: 2026, month: 10, plantId: 'plant-b', productionLineId: 'line-2', volume: null, forecast: null, pac: null },
    ]);
  });

  it('skips combinations already present for the selected period', () => {
    const existing: VolumePacRecord[] = [{
      id: 'existing', mainName: '', year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', volume: null, forecast: null, pac: null,
    }];
    const records = buildMissingVolumePacRecords(2026, 10, plants, matrices, existing);

    expect(records.map((record) => `${record.plantId}:${record.productionLineId}`)).toEqual(['plant-b:line-2']);
  });
});
