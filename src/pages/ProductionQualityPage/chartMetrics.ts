import type { ProductionKpiMatrix, ProductionKpiRecord } from '../../domain/models/charts';
import { calculateFpyQuantity, calculateRatioPercent, calculateWasteQuantity, sumFinite } from '../../domain/services/productionFormulas';

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface ProductionQualitySeries {
  key: string;
  name: string;
}

export interface ProductionQualityPoint {
  label: string;
  quantities: Record<string, number | null>;
  percentages: Record<string, number | null>;
  ratio: number | null;
}

export interface ProductionQualityMetrics {
  series: ProductionQualitySeries[];
  months: ProductionQualityPoint[];
  comparison: ProductionQualityPoint[];
  lineName: 'Waste' | 'FPY' | null;
  rmCategory: string | null;
}

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
const categoryKey = (name: string) => name.trim();

export function buildProductionQualityAxisDomains(points: ProductionQualityPoint[]): {
  quantity: [number, number];
  ratio: [number, number];
} {
  const stackTotals = points.map((point) => Object.values(point.quantities)
    .filter((value): value is number => value !== null && Number.isFinite(value))
    .reduce((total, value) => total + Math.max(0, value), 0));
  const ratios = points.map((point) => point.ratio)
    .filter((value): value is number => value !== null && Number.isFinite(value));
  const minimum = ratios.length > 0 ? Math.min(...ratios) : 0;
  const maximum = ratios.length > 0 ? Math.max(...ratios) : 0;
  const range = Math.max(maximum - minimum, Math.abs(minimum) * 0.1, 1) / 0.06;
  return {
    quantity: [0, Math.max(...stackTotals, 1) / 0.65],
    ratio: [minimum - range * 0.715, minimum + range * 0.285],
  };
}

export function sumProductionQuantities(records: ProductionKpiRecord[]): number | null {
  return sumFinite(records.map((record) => record.quantity));
}

export function calculatePercentage(numerator: number | null, denominator: number | null): number | null {
  return calculateRatioPercent(numerator, denominator);
}

export function buildProductionQualityMetrics(
  records: ProductionKpiRecord[],
  matrices: ProductionKpiMatrix[],
  plantId: string,
  type: string,
  year: number,
  selectedMonths: number[],
): ProductionQualityMetrics {
  const plantMatrices = [...matrices]
    .filter((matrix) => normalizeId(matrix.plantId) === normalizeId(plantId))
    .sort((left, right) => left.displayOrder - right.displayOrder || left.categories.localeCompare(right.categories));
  const rmCategories = [...new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => categoryKey(matrix.categories)).filter(Boolean))];
  const ntCategories = [...new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'NT').map((matrix) => categoryKey(matrix.categories)).filter(Boolean))];
  const rmCategory = rmCategories.length === 1 ? rmCategories[0] : null;
  const typeMatrices = plantMatrices.filter((matrix) => matrix.type === type);
  const plantRecords = records.filter((record) => normalizeId(record.plantId) === normalizeId(plantId));
  const typeRecords = plantRecords.filter((record) => record.type === type);
  const categoryNames = [...new Set([
    ...typeMatrices.map((matrix) => categoryKey(matrix.categories)),
    ...typeRecords.filter((record) => record.year === year || record.year === year - 1).map((record) => categoryKey(record.categories)),
  ])].filter((category) => category && !rmCategories.includes(category) && !ntCategories.includes(category));
  const series = categoryNames.map((name, index) => ({ name, key: `category_${index}` }));
  const lineName = type === 'Production' ? 'Waste' : type === 'Quality' ? 'FPY' : null;
  const ratioClass = type === 'Production' ? 'Waste' : null;
  const ratioCategories = new Set(typeMatrices.filter((matrix) => matrix.productionClass === ratioClass).map((matrix) => categoryKey(matrix.categories)));
  const rmCategoriesByType = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const ntCategoriesByType = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'NT').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const fgCategories = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'FG').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const defectCategories = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'Defect').map((matrix) => `${matrix.type}:${categoryKey(matrix.categories)}`));
  const fpyMatrixCount = typeMatrices.filter((matrix) => matrix.productionClass === 'FPYFG').length;
  const rmTypes = new Set(plantMatrices.filter((matrix) => matrix.productionClass === 'RM').map((matrix) => matrix.type));
  const monthSet = new Set(selectedMonths);

  const aggregate = (label: string, periodYear: number, months: Set<number>): ProductionQualityPoint => {
    const periodRecords = plantRecords.filter((record) => record.year === periodYear && months.has(record.month));
    const rmRecords = periodRecords.filter((record) => categoryKey(record.categories) === rmCategory && rmTypes.has(record.type));
    const denominator = rmCategory === null ? null : sumProductionQuantities(rmRecords);
    const currentTypeRecords = periodRecords.filter((record) => record.type === type);
    const quantities = Object.fromEntries(series.map((category) => [category.key, sumProductionQuantities(currentTypeRecords.filter((record) => categoryKey(record.categories) === category.name))]));
    const percentages = Object.fromEntries(series.map((category) => [category.key, calculatePercentage(quantities[category.key], denominator)]));
    const numerator = type === 'Quality'
      ? fpyMatrixCount === 0 ? null : (() => {
        const fgQuantity = sumProductionQuantities(periodRecords.filter((record) => fgCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const defectQuantity = sumProductionQuantities(periodRecords.filter((record) => defectCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const fpyQuantity = calculateFpyQuantity(fgQuantity, defectQuantity);
        return fpyQuantity === null ? null : fpyQuantity * fpyMatrixCount;
      })()
      : (() => {
        const rmQuantity = sumProductionQuantities(periodRecords.filter((record) => rmCategoriesByType.has(`${record.type}:${categoryKey(record.categories)}`)));
        const fgQuantity = sumProductionQuantities(periodRecords.filter((record) => fgCategories.has(`${record.type}:${categoryKey(record.categories)}`)));
        const ntQuantity = sumProductionQuantities(periodRecords.filter((record) => ntCategoriesByType.has(`${record.type}:${categoryKey(record.categories)}`)));
        if (rmQuantity === null && fgQuantity === null && ntQuantity === null) {
          return sumProductionQuantities(currentTypeRecords.filter((record) => ratioCategories.has(categoryKey(record.categories))));
        }
        return calculateWasteQuantity(rmQuantity, fgQuantity, ntQuantity);
      })();
    return { label, quantities, percentages, ratio: lineName === null ? null : calculatePercentage(numerator, denominator) };
  };

  return {
    series,
    rmCategory,
    lineName,
    months: MONTH_LABELS.map((label, index) => aggregate(label, year, new Set(monthSet.has(index + 1) ? [index + 1] : []))),
    comparison: [aggregate('PY', year - 1, new Set(MONTH_LABELS.map((_label, index) => index + 1))), aggregate('CY YTD', year, monthSet)],
  };
}