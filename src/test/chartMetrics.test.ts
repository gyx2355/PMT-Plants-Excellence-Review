import { describe, expect, it } from 'vitest';
import type { AeCategory, AeRecord, VolumePacRecord } from '../domain/models/charts';
import { aggregateVolumePac, buildAeStacks } from '../pages/KPIComparisonPage/chartMetrics';

const volume: VolumePacRecord[] = [
  { id: '1', mainName: 'one', year: 2026, month: 1, plantId: 'p1', productionLineId: 'l1', volume: 2, forecast: 3, pac: 1 },
  { id: '2', mainName: 'two', year: 2026, month: 1, plantId: 'p1', productionLineId: 'l2', volume: 4, forecast: 5, pac: 2 },
];
const categories: AeCategory[] = [{ id: 'c1', name: 'Runtime', displayOrder: 1 }];
const ae: AeRecord[] = [
  { id: 'a1', mainName: 'ae-one', year: 2026, month: 9, plantId: 'p1', productionLineId: 'l1', categoryId: 'c1', value: 88 },
  { id: 'a2', mainName: 'ae-two', year: 2026, month: 9, plantId: 'p1', productionLineId: 'l2', categoryId: 'c1', value: 75 },
];

describe('Volume and PAC chart metrics', () => {
  it('sums selected production lines by month', () => {
    const points = aggregateVolumePac(volume, ['p1'], ['l1', 'l2'], 12);
    const january = points[1];
    expect(points[0]).toMatchObject({ label: 'OP', volume: 1, forecast: 0, pac: 0 });
    expect(january).toMatchObject({ volume: 6, forecast: 8, pac: 3 });
  });

  it('keeps AE stacks separate by production line', () => {
    const stacks = buildAeStacks(ae, categories, ['p1'], ['l1', 'l2']);
    expect(stacks).toHaveLength(2);
    expect(stacks.map((stack) => stack.values.c1)).toEqual([88, 75]);
  });
});
