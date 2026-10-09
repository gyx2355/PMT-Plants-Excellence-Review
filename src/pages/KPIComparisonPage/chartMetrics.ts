import type { AeCategory, AeRecord, VolumePacRecord } from '../../domain/models/charts';

export interface MonthlyVolumePacPoint {
  month: number;
  label: string;
  volume: number;
  forecast: number;
  pac: number;
}

export interface AeStackPoint {
  plantId: string;
  productionLineId: string;
  values: Record<string, number>;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function aggregateVolumePac(
  records: VolumePacRecord[],
  plantIds: string[],
  productionLineIds: string[],
  annualOperatingPlan: number | null = null,
): MonthlyVolumePacPoint[] {
  const selected = records.filter((record) =>
    (plantIds.length === 0 || plantIds.includes(record.plantId))
    && (productionLineIds.length === 0 || productionLineIds.includes(record.productionLineId)),
  );

  const monthlyPoints = MONTHS.map((label, index) => {
    const month = index + 1;
    return selected.filter((record) => record.month === month).reduce<MonthlyVolumePacPoint>(
      (point, record) => ({
        ...point,
        volume: point.volume + (record.volume ?? 0),
        forecast: point.forecast + (record.forecast ?? 0),
        pac: point.pac + (record.pac ?? 0),
      }),
      { month, label, volume: 0, forecast: 0, pac: 0 },
    );
  });

  return [
    { month: 0, label: 'OP', volume: annualOperatingPlan == null ? 0 : annualOperatingPlan / 12, forecast: 0, pac: 0 },
    ...monthlyPoints,
  ];
}

export function buildAeStacks(
  records: AeRecord[],
  categories: AeCategory[],
  plantIds: string[],
  productionLineIds: string[],
): AeStackPoint[] {
  const selected = records.filter((record) =>
    (plantIds.length === 0 || plantIds.includes(record.plantId))
    && (productionLineIds.length === 0 || productionLineIds.includes(record.productionLineId)),
  );
  const keys = new Set(selected.map((record) => `${record.plantId}:${record.productionLineId}`));

  return [...keys].map((key) => {
    const [plantId, productionLineId] = key.split(':');
    const lineRecords = selected.filter((record) => record.plantId === plantId && record.productionLineId === productionLineId);
    return {
      plantId,
      productionLineId,
      values: Object.fromEntries(categories.map((category) => [
        category.id,
        lineRecords.filter((record) => record.categoryId === category.id).reduce((sum, record) => sum + (record.value ?? 0), 0),
      ])),
    };
  });
}
