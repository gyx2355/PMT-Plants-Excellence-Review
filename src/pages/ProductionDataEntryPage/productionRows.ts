import type { Plant } from '../../domain/models';
import type { ProductionKpiMatrix, ProductionKpiRecord } from '../../domain/models/charts';
import { calculateFpyQuantity, calculateRatioPercent, calculateWasteQuantity, sumFinite } from '../../domain/services/productionFormulas';

export interface ProductionFilters {
  years: number[];
  months: number[];
  plantIds: string[];
  categories: string[];
}

export type ProductionEntryRow = Omit<ProductionKpiRecord, 'id'> & { id?: string; key: string; plantName: string };

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
const recordKey = (record: Pick<ProductionKpiRecord, 'year' | 'month' | 'plantId' | 'type' | 'categories'>) =>
  JSON.stringify([record.year, record.month, normalizeId(record.plantId), record.type, record.categories]);
const matrixKey = (plantId: string, type: string | undefined, categories: string) =>
  JSON.stringify([normalizeId(plantId), type, categories.trim()]);
const ratioGroupKey = (row: ProductionEntryRow) => JSON.stringify([row.year, row.month, normalizeId(row.plantId)]);
const isRm = (category: string) => category.trim().toUpperCase() === 'RM';
const isFg = (category: string) => category.trim().toUpperCase() === 'FG';
const isNt = (category: string) => category.trim().toUpperCase() === 'NT';

const classifyRow = (
  row: Pick<ProductionEntryRow, 'plantId' | 'type' | 'categories'>,
  productionClasses: Map<string, ProductionKpiMatrix['productionClass']>,
): ProductionKpiMatrix['productionClass'] => {
  const productionClass = productionClasses.get(matrixKey(row.plantId, row.type, row.categories));
  if (productionClass) return productionClass;
  if (isRm(row.categories)) return 'RM';
  if (isFg(row.categories)) return 'FG';
  if (isNt(row.categories)) return 'NT';
  return null;
};

export function isCalculatedProductionQuantity(row: ProductionEntryRow, matrices: ProductionKpiMatrix[]): boolean {
  return matrices.some((matrix) => matrix.productionClass === 'FPYFG'
    && matrixKey(matrix.plantId, matrix.type, matrix.categories) === matrixKey(row.plantId, row.type, row.categories));
}

export function calculateProductionRatios(
  rows: ProductionEntryRow[],
  drafts: Record<string, string> = {},
  matrices: ProductionKpiMatrix[] = [],
): ProductionEntryRow[] {
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const currentRows = rows.map((row) => {
    const draft = productionClasses.get(matrixKey(row.plantId, row.type, row.categories)) === 'FPYFG' ? undefined : drafts[row.key];
    const quantity = draft === undefined ? row.quantity : draft.trim() === '' ? null : Number(draft);
    return { ...row, quantity: quantity !== null && !Number.isFinite(quantity) ? null : quantity };
  });
  const classQuantities = new Map<string, { fg: number | null; defect: number | null }>();
  currentRows.forEach((row) => {
    const productionClass = classifyRow(row, productionClasses);
    if ((productionClass !== 'FG' && productionClass !== 'Defect') || row.quantity === null) return;
    const key = ratioGroupKey(row);
    const totals = classQuantities.get(key) ?? { fg: null, defect: null };
    if (productionClass === 'FG') totals.fg = (totals.fg ?? 0) + row.quantity;
    else totals.defect = (totals.defect ?? 0) + row.quantity;
    classQuantities.set(key, totals);
  });
  currentRows.forEach((row) => {
    if (classifyRow(row, productionClasses) !== 'FPYFG') return;
    const totals = classQuantities.get(ratioGroupKey(row));
    row.quantity = calculateFpyQuantity(totals?.fg ?? null, totals?.defect ?? null);
  });
  const rmQuantities = new Map<string, number>();
  currentRows.filter((row) => classifyRow(row, productionClasses) === 'RM' && row.quantity !== null).forEach((row) => {
    const key = ratioGroupKey(row);
    rmQuantities.set(key, (rmQuantities.get(key) ?? 0) + row.quantity!);
  });
  return currentRows.map((row) => {
    const denominator = rmQuantities.get(ratioGroupKey(row)) ?? null;
    const ratio = !isRm(row.categories)
      ? calculateRatioPercent(row.quantity, denominator)
      : null;
    return { ...row, ratio };
  });
}

export function buildProductionRows(
  plants: Plant[],
  matrices: ProductionKpiMatrix[],
  records: ProductionKpiRecord[],
  filters: ProductionFilters,
): ProductionEntryRow[] {
  const existing = new Map(records.map((record) => [recordKey(record), record]));
  const rows = new Map<string, ProductionEntryRow>();
  const years = [...new Set(filters.years)].sort((left, right) => left - right);
  const months = [...new Set(filters.months)].sort((left, right) => left - right);
  const selectedPlants = [...plants]
    .filter((plant) => filters.plantIds.some((id) => normalizeId(id) === normalizeId(plant.id)))
    .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));

  for (const plant of selectedPlants) {
    const configurations = [...matrices]
      .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plant.id))
      .filter((matrix) => matrix.type && matrix.categories.trim())
      .sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
    for (const type of ['Production', 'Quality'] as const) {
      for (const year of years) {
        for (const month of months) {
          for (const matrix of configurations.filter((configuration) => configuration.type === type)) {
            const values = { year, month, plantId: plant.id, type, categories: matrix.categories };
            const key = recordKey(values);
            const record = existing.get(key);
            rows.set(key, {
              ...values,
              key,
              id: record?.id,
              mainName: [year, month, type, matrix.categories].join('_'),
              plantName: plant.name,
              quantity: record?.quantity ?? null,
            });
          }
        }
      }
    }
  }
  return calculateProductionRatios([...rows.values()], {}, matrices)
    .filter((row) => filters.categories.length === 0 || filters.categories.includes(row.categories));
}

export function buildProductionSavePayload(
  rows: ProductionEntryRow[],
  drafts: Record<string, string>,
  referenceRows = rows,
  matrices: ProductionKpiMatrix[] = [],
): Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }> {
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const currentRows = referenceRows.map((row) => {
    const isCalculated = productionClasses.get(matrixKey(row.plantId, row.type, row.categories)) === 'FPYFG';
    const draft = isCalculated ? undefined : drafts[row.key];
    const quantity = draft === undefined ? row.quantity : draft.trim() === '' ? null : Number(draft);
    if (quantity !== null && !Number.isFinite(quantity)) throw new Error(`Invalid Quantity for ${row.mainName}.`);
    return { ...row, quantity };
  });
  const visibleKeys = new Set(rows.map((row) => row.key));
  return calculateProductionRatios(currentRows, {}, matrices).filter((row) => visibleKeys.has(row.key)).map((row) => ({
    id: row.id, mainName: row.mainName, year: row.year, month: row.month, plantId: row.plantId, type: row.type, categories: row.categories, quantity: row.quantity, ratio: row.ratio,
  }));
}

export interface ProductionSummary {
  label: 'Waste' | 'FPY';
  quantity: number | null;
  ratio: number | null;
}

export function calculateProductionSummary(
  plantId: string,
  type: 'Production' | 'Quality',
  rows: ProductionEntryRow[],
  matrices: ProductionKpiMatrix[],
  drafts: Record<string, string> = {},
): ProductionSummary {
  const productionClass = type === 'Production' ? 'Waste' : 'FPYFG';
  const label = type === 'Production' ? 'Waste' : 'FPY';
  const productionClasses = new Map(matrices.map((matrix) => [matrixKey(matrix.plantId, matrix.type, matrix.categories), matrix.productionClass]));
  const classifications = new Set(matrices
    .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plantId) && matrix.type === type && matrix.productionClass === productionClass)
    .map((matrix) => matrixKey(matrix.plantId, matrix.type, matrix.categories)));
  const currentRows = calculateProductionRatios(rows, drafts, matrices);
  const plantRows = currentRows.filter((row) => normalizeId(row.plantId) === normalizeId(plantId));
  const typeRows = plantRows.filter((row) => row.type === type);
  const rmRows = plantRows.filter((row) => classifyRow(row, productionClasses) === 'RM');
  const fgRows = typeRows.filter((row) => classifyRow(row, productionClasses) === 'FG');
  const ntRows = typeRows.filter((row) => classifyRow(row, productionClasses) === 'NT');
  const relevant = typeRows.filter((row) => classifications.has(matrixKey(row.plantId, row.type, row.categories)));
  const denominator = sumFinite(rmRows.map((row) => row.quantity));
  const quantity = type === 'Production'
    ? calculateWasteQuantity(
      sumFinite(rmRows.map((row) => row.quantity)),
      sumFinite(fgRows.map((row) => row.quantity)),
      sumFinite(ntRows.map((row) => row.quantity)),
    )
    : sumFinite(relevant.map((row) => row.quantity));
  const ratio = calculateRatioPercent(quantity, denominator);
  return { label, quantity, ratio };
}
