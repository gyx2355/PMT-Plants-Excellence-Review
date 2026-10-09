import type { Plant } from '../models';
import type { ProductionLineMatrix, VolumePacRecord } from '../models/charts';

const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();

export function buildMissingVolumePacRecords(
  year: number,
  month: number,
  plants: Plant[],
  matrices: ProductionLineMatrix[],
  existing: VolumePacRecord[],
): Array<Omit<VolumePacRecord, 'id' | 'mainName'>> {
  const existingKeys = new Set(existing
    .filter((record) => record.year === year && record.month === month)
    .map((record) => `${normalizeId(record.plantId)}:${normalizeId(record.productionLineId)}`));

  return plants.flatMap((plant) => {
    const plantId = normalizeId(plant.id);
    const lineIds = new Set(matrices
      .filter((matrix) => normalizeId(matrix.plantId) === plantId)
      .map((matrix) => normalizeId(matrix.productionLineId)));

    return [...lineIds]
      .filter((productionLineId) => !existingKeys.has(`${plantId}:${productionLineId}`))
      .map((productionLineId) => ({ year, month, plantId: plant.id, productionLineId, volume: null, forecast: null, pac: null }));
  });
}
