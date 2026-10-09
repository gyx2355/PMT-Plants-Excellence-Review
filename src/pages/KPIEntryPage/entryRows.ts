import type { KpiDefinition, MonthlyKpiResult, Target } from '../../domain/models';

export interface EditableKpiRow {
  kpi: KpiDefinition;
  target?: Target;
  result?: MonthlyKpiResult;
  monthlyActual: number | null;
  ytdActual: number | null;
}

export function buildEditableKpiRows(
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  plantId: string,
): EditableKpiRow[] {
  const normalizeId = (id: string) => id.replace(/[{}]/g, '').trim().toLowerCase();
  const selectedPlantId = normalizeId(plantId);
  const targetByKpi = new Map(targets
    .filter((target) => normalizeId(target.plantId) === selectedPlantId)
    .map((target) => [normalizeId(target.kpiId), target]));
  const resultByKpi = new Map(results
    .filter((result) => normalizeId(result.plantId) === selectedPlantId)
    .map((result) => [normalizeId(result.kpiId), result]));

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .flatMap((kpi) => {
      const target = targetByKpi.get(normalizeId(kpi.id));
      if (target?.cyTarget === null || target?.cyTarget === undefined) return [];
      const result = resultByKpi.get(normalizeId(kpi.id));
      return [{
        kpi,
        target,
        result,
        monthlyActual: result?.monthlyActual ?? null,
        ytdActual: result?.ytdActual ?? null,
      }];
    });
}

export function parseNumericInput(value: string): number | null {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getChangedKpiRows(baseRows: EditableKpiRow[], currentRows: EditableKpiRow[]): EditableKpiRow[] {
  const baseByKpiId = new Map(baseRows.map((row) => [row.kpi.id, row]));
  return currentRows.filter((row) => {
    const base = baseByKpiId.get(row.kpi.id);
    return base && (row.monthlyActual !== base.monthlyActual || row.ytdActual !== base.ytdActual);
  });
}
