import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { AeCategory, AeRecord, ProductionLineMatrix } from '../domain/models/charts';
import { buildMissingAeRecords } from '../domain/services/aeBatch';

const plants: Plant[] = [
  { id: 'plant-a', name: 'Plant A', displayOrder: 1 },
  { id: 'plant-b', name: 'Plant B', displayOrder: 2 },
];
const matrices: ProductionLineMatrix[] = [
  { id: 'matrix-a', mainName: 'A_Line 1', plantId: '{PLANT-A}', productionLineId: '{LINE-1}', displayOrder: 1 },
  { id: 'matrix-b', mainName: 'B_Line 2', plantId: 'plant-b', productionLineId: 'line-2', displayOrder: 1 },
];
const categories: AeCategory[] = [{ id: 'category-a', name: 'Category A', displayOrder: 1 }];

describe('AE batch generation from Production Line Matrix', () => {
  it('uses only production lines mapped to each plant', () => {
    const records = buildMissingAeRecords(2026, 10, plants, matrices, categories, []);

    expect(records).toEqual([
      { year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', categoryId: 'category-a', value: null },
      { year: 2026, month: 10, plantId: 'plant-b', productionLineId: 'line-2', categoryId: 'category-a', value: null },
    ]);
  });

  it('does not create records already present for that year and month', () => {
    const existing: AeRecord[] = [{
      id: 'existing', mainName: '', year: 2026, month: 10, plantId: 'plant-a', productionLineId: 'line-1', categoryId: 'category-a', value: null,
    }];
    const records = buildMissingAeRecords(2026, 10, plants, matrices, categories, existing);

    expect(records.map((record) => `${record.plantId}:${record.productionLineId}`)).toEqual(['plant-b:line-2']);
  });
});
