import { describe, expect, it } from 'vitest';
import type { Plant } from '../domain/models';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../domain/models/charts';
import { buildProductionRows, buildProductionSavePayload, calculateProductionRatios, calculateProductionSummary } from '../pages/ProductionDataEntryPage/productionRows';

const plants: Plant[] = [{ id: 'p1', name: 'Plant 1', displayOrder: 1 }, { id: 'p2', name: 'Plant 2', displayOrder: 2 }];
const matrices: ProductionKpiMatrix[] = [
  { id: 'm1', mainName: '', plantId: '{P1}', type: 'Production', categories: 'Volume', displayOrder: 1 },
  { id: 'm2', mainName: '', plantId: 'p1', type: 'Quality', categories: 'First Pass', displayOrder: 2 },
  { id: 'm3', mainName: '', plantId: 'p2', type: 'Production', categories: 'Volume', displayOrder: 1 },
];
const filters = { years: [2026], months: [9], plantIds: ['p1'], categories: [] };

describe('Production Data Entry rows', () => {
  it('shows nothing before selecting a plant', () => {
    expect(buildProductionRows(plants, matrices, [], { ...filters, plantIds: [] })).toEqual([]);
  });

  it('uses selected plant Matrix entries and generates names and empty quantities', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    expect(rows.map((row) => [row.mainName, row.plantId, row.quantity])).toEqual([
      ['2026_9_Production_Volume', 'p1', null], ['2026_9_Quality_First Pass', 'p1', null],
    ]);
    expect(buildProductionSavePayload(rows, {})).toHaveLength(2);
    expect(buildProductionSavePayload(rows, {})[0].quantity).toBeNull();
  });

  it('matches existing records and saves all displayed rows, including zero and cleared values', () => {
    const record: ProductionKpiRecord = { id: 'r1', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume', quantity: 12 };
    const rows = buildProductionRows(plants, matrices, [record], filters);
    const payload = buildProductionSavePayload(rows, { [rows[0].key]: '', [rows[1].key]: '0' });
    expect(payload[0]).toMatchObject({ id: 'r1', quantity: null, year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume' });
    expect(payload[1]).toMatchObject({ id: undefined, quantity: 0 });
  });

  it('supports multi-year, month, plant and category selections without duplicate Matrix rows', () => {
    const rows = buildProductionRows(plants, [...matrices, matrices[0]], [], { years: [2025, 2026], months: [8, 9], plantIds: ['p1', 'p2'], categories: ['Volume'] });
    expect(rows).toHaveLength(8);
    expect(rows.every((row) => row.categories === 'Volume')).toBe(true);
  });

  it('rejects invalid numeric input before saving', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    expect(() => buildProductionSavePayload(rows, { [rows[0].key]: 'invalid' })).toThrow('Invalid Quantity');
  });

  it('uses RM from the same Plant, Year and Month across Types and recalculates edited quantities', () => {
    const rows = buildProductionRows(plants, matrices, [], filters);
    const volume = { ...rows[0], quantity: 25 };
    const quality = { ...rows[1], quantity: 10 };
    const rm = { ...volume, key: 'rm', categories: 'RM', quantity: 100 };
    const otherPlantRm = { ...rm, key: 'rm-other-plant', plantId: 'p2', quantity: 200 };
    const otherMonthRm = { ...rm, key: 'rm-other-month', month: 8, quantity: 300 };
    const otherYearRm = { ...rm, key: 'rm-other-year', year: 2025, quantity: 400 };
    const input = [volume, quality, rm, otherPlantRm, otherMonthRm, otherYearRm];
    const calculated = calculateProductionRatios(input);
    expect(calculated[0].ratio).toBe(25);
    expect(calculated[1].ratio).toBe(10);
    expect(calculated[2].ratio).toBeNull();
    expect(calculateProductionRatios(input, { rm: '200' })[0].ratio).toBe(12.5);
    expect(calculateProductionRatios(input, { [volume.key]: '0' })[0].ratio).toBe(0);
  });

  it('leaves ratios blank when numerator or RM is blank, missing or zero', () => {
    const [volume] = buildProductionRows(plants, matrices, [], filters);
    const rm = { ...volume, key: 'rm', categories: 'RM', quantity: 0 };
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }])[0].ratio).toBeNull();
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }, rm])[0].ratio).toBeNull();
    expect(calculateProductionRatios([{ ...volume, quantity: 25 }, { ...rm, quantity: null }])[0].ratio).toBeNull();
    expect(calculateProductionRatios([volume, { ...rm, quantity: 100 }])[0].ratio).toBeNull();
  });

  it('uses hidden RM as denominator but saves only visible categories', () => {
    const rmMatrix = { ...matrices[0], id: 'rm-matrix', categories: 'RM' };
    const records: ProductionKpiRecord[] = [
      { id: 'volume-record', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'Volume', quantity: 25 },
      { id: 'rm-record', mainName: '', year: 2026, month: 9, plantId: 'p1', type: 'Production', categories: 'RM', quantity: 100 },
    ];
    const allRows = buildProductionRows(plants, [...matrices, rmMatrix], records, filters);
    const visible = buildProductionRows(plants, [...matrices, rmMatrix], records, { ...filters, categories: ['Volume'] });
    expect(visible).toHaveLength(1);
    expect(visible[0].ratio).toBe(25);
    const payload = buildProductionSavePayload(visible, { [visible[0].key]: '50' }, allRows);
    expect(payload).toHaveLength(1);
    expect(payload[0]).toMatchObject({ id: 'volume-record', quantity: 50, ratio: 50 });
  });

  it('calculates Production Waste summary as total Waste over total RM', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'waste-a', mainName: '', plantId: 'p1', type: 'Production', categories: 'Waste A', productionClass: 'Waste', displayOrder: 1 },
      { id: 'waste-b', mainName: '', plantId: 'p1', type: 'Production', categories: 'Waste B', productionClass: 'Waste', displayOrder: 2 },
    ];
    const rows = [
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'rm-1', categories: 'RM', quantity: 100 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'rm-2', month: 10, categories: 'RM', quantity: 200 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'waste-a', categories: 'Waste A', quantity: 10 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'waste-b', categories: 'Waste B', quantity: 20 },
      { ...buildProductionRows(plants, classifiedMatrices, [], filters)[0], key: 'waste-next-month', month: 10, categories: 'Waste A', quantity: 30 },
    ];
    const summary = calculateProductionSummary('p1', 'Production', rows, classifiedMatrices);
    expect(summary).toEqual({ label: 'Waste', quantity: 60, ratio: 20 });
  });

  it('calculates Quality FPY from Defect quantity and shared Production RM quantity', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'fg-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG', productionClass: 'FG', displayOrder: 1 },
      { id: 'defect-matrix', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 1 },
      { id: 'fpy-matrix', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 2 },
    ];
    const rows = buildProductionRows(plants, classifiedMatrices, [], { ...filters, months: [9, 10] }).map((row) => ({
      ...row,
      quantity: ({
        '9:RM': 100, '9:FG': 80, '9:Defects': 10, '9:FPY FG': 999,
        '10:RM': 200, '10:FG': 140, '10:Defects': 20, '10:FPY FG': 999,
      } as Record<string, number>)[`${row.month}:${row.categories}`] ?? null,
    }));
    const summary = calculateProductionSummary('p1', 'Quality', rows, classifiedMatrices);
    expect(summary.label).toBe('FPY');
    expect(summary.quantity).toBe(190);
    expect(summary.ratio).toBeCloseTo(190 / 300 * 100);
  });

  it('calculates FPY FG as FG minus Defect, recalculates its Ratio, and saves the derived quantity', () => {
    const classifiedMatrices: ProductionKpiMatrix[] = [
      { id: 'rm-matrix', mainName: '', plantId: 'p1', type: 'Production', categories: 'RM', productionClass: 'RM', displayOrder: 0 },
      { id: 'fg-a', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG A', productionClass: 'FG', displayOrder: 1 },
      { id: 'fg-b', mainName: '', plantId: 'p1', type: 'Production', categories: 'FG B', productionClass: 'FG', displayOrder: 2 },
      { id: 'defect', mainName: '', plantId: 'p1', type: 'Quality', categories: 'Defects', productionClass: 'Defect', displayOrder: 3 },
      { id: 'fpy', mainName: '', plantId: 'p1', type: 'Quality', categories: 'FPY FG', productionClass: 'FPYFG', displayOrder: 4 },
    ];
    const rows = buildProductionRows(plants, classifiedMatrices, [], filters).map((row) => ({
      ...row,
      quantity: ({ RM: 200, 'FG A': 60, 'FG B': 40, Defects: 8, 'FPY FG': 999 } as Record<string, number>)[row.categories] ?? null,
    }));
    const fpyRow = rows.find((row) => row.categories === 'FPY FG')!;
    const fgRow = rows.find((row) => row.categories === 'FG A')!;
    const drafts = { [fgRow.key]: '65', [fpyRow.key]: '0' };
    const calculated = calculateProductionRatios(rows, drafts, classifiedMatrices);
    expect(calculated.find((row) => row.key === fpyRow.key)).toMatchObject({ quantity: 97, ratio: 48.5 });
    const payload = buildProductionSavePayload(rows, drafts, rows, classifiedMatrices);
    expect(payload.find((row) => row.categories === 'FPY FG')).toMatchObject({ quantity: 97, ratio: 48.5 });
  });
});