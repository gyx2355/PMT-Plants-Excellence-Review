import type { Plant } from '../models';
import type { AeCategory, AeRecord, ProductionLineMatrix } from '../models/charts';

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();

export function buildMissingAeRecords(
  year: number,
  month: number,
  plants: Plant[],
  matrices: ProductionLineMatrix[],
  categories: AeCategory[],
  existing: AeRecord[],
): Array<Omit<AeRecord, 'id' | 'mainName'>> {
  const existingKeys = new Set(existing
    .filter((record) => record.year === year && record.month === month)
    .map((record) => `${normalizeId(record.plantId)}:${normalizeId(record.productionLineId)}:${normalizeId(record.categoryId)}`));

  return plants.flatMap((plant) => {
    const plantId = normalizeId(plant.id);
    const lineIds = new Set(matrices
      .filter((matrix) => normalizeId(matrix.plantId) === plantId)
      .map((matrix) => normalizeId(matrix.productionLineId)));

    return [...lineIds].flatMap((productionLineId) => categories
      .filter((category) => !existingKeys.has(`${plantId}:${normalizeId(productionLineId)}:${normalizeId(category.id)}`))
      .map((category) => ({ year, month, plantId: plant.id, productionLineId, categoryId: category.id, value: null })));
  });
}
