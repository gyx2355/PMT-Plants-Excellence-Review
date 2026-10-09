import { KpiStatus } from '../../domain/enums';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../../domain/models';

export interface PlantOverviewMetrics {
  plant: Plant;
  expectedCount: number;
  enteredCount: number;
  completionRate: number;
  statusCounts: Record<KpiStatus, number>;
}

export interface OverviewMatrixRow {
  kpi: KpiDefinition;
  statuses: Record<string, KpiStatus | null>;
}

export interface KpiMonthlyMatrixRow {
  plant: Plant;
  kpi: KpiDefinition;
  target?: Target;
  monthlyActuals: Array<number | null | undefined>;
  ytdActual: number | null | undefined;
}

const emptyStatusCounts = (): Record<KpiStatus, number> => ({
  [KpiStatus.Green]: 0,
  [KpiStatus.Amber]: 0,
  [KpiStatus.Red]: 0,
  [KpiStatus.Grey]: 0,
  [KpiStatus.Missing]: 0,
});

export function getApplicableKpiIds(
  plantId: string,
  year: number,
  targets: Target[],
  kpis: KpiDefinition[],
): Set<string> {
  const plantTargets = targets.filter((target) => target.plantId === plantId && target.targetYear === year);
  const targetKpiIds = new Set(plantTargets
    .filter((target) => target.cyTarget !== null && target.cyTarget !== undefined)
    .map((target) => target.kpiId));

  return plantTargets.length > 0 ? targetKpiIds : new Set(kpis.map((kpi) => kpi.id));
}

export function buildPlantOverviewMetrics(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  year: number,
): PlantOverviewMetrics[] {
  return plants.map((plant) => {
    const applicableKpiIds = getApplicableKpiIds(plant.id, year, targets, kpis);
    const plantResults = results.filter((result) => result.plantId === plant.id);
    const enteredKpiIds = new Set(
      plantResults
        .filter((result) => result.monthlyActual !== null && result.monthlyActual !== undefined)
        .map((result) => result.kpiId),
    );
    const statusCounts = emptyStatusCounts();
    const targetsByKpi = new Map(targets
      .filter((target) => target.plantId === plant.id && target.targetYear === year)
      .map((target) => [target.kpiId, target]));
    const resultsByKpi = new Map(plantResults.map((result) => [result.kpiId, result]));
    const kpisById = new Map(kpis.map((kpi) => [kpi.id, kpi]));

    applicableKpiIds.forEach((kpiId) => {
      const kpi = kpisById.get(kpiId);
      const result = resultsByKpi.get(kpiId);
      const target = targetsByKpi.get(kpiId);
      const status = calculateKpiStatus(kpi?.kpiLogic, result?.ytdActual, target?.cyTarget);
      statusCounts[status] += 1;
    });

    const expectedCount = applicableKpiIds.size;
    const enteredCount = [...enteredKpiIds].filter((id) => applicableKpiIds.has(id)).length;

    return {
      plant,
      expectedCount,
      enteredCount,
      completionRate: expectedCount === 0 ? 0 : Math.round((enteredCount / expectedCount) * 100),
      statusCounts,
    };
  });
}

export function buildOverviewMatrix(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
): OverviewMatrixRow[] {
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result]),
  );
  const targetByPlantAndKpi = new Map(
    targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]),
  );

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((kpi) => ({
      kpi,
      statuses: Object.fromEntries(
        plants.map((plant) => [
          plant.id,
          targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget === null
            || targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget === undefined
            ? null
            : calculateKpiStatus(
              kpi.kpiLogic,
              resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.ytdActual,
              targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`)?.cyTarget,
            ),
        ]),
      ),
    }));
}

export function buildKpiMonthlyMatrixRows(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  selectedMonth: number,
): KpiMonthlyMatrixRow[] {
  const targetByPlantAndKpi = new Map(targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]));
  const resultByPlantKpiAndMonth = new Map(results.map((result) => [`${result.plantId}:${result.kpiId}:${result.month}`, result]));
  const sortedPlants = [...plants].sort((left, right) => left.displayOrder - right.displayOrder);
  const sortedKpis = [...kpis].sort((left, right) => left.displayOrder - right.displayOrder);

  return sortedPlants.flatMap((plant) => sortedKpis.flatMap((kpi) => {
    const target = targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    if (target?.cyTarget === null || target?.cyTarget === undefined) return [];
    const selectedResult = resultByPlantKpiAndMonth.get(`${plant.id}:${kpi.id}:${selectedMonth}`);
    return [{
      plant,
      kpi,
      target,
      monthlyActuals: Array.from({ length: 12 }, (_value, index) =>
        resultByPlantKpiAndMonth.get(`${plant.id}:${kpi.id}:${index + 1}`)?.monthlyActual),
      ytdActual: selectedResult?.ytdActual,
    }];
  }));
}
