import { KpiStatus } from '../../domain/enums';
import { calculateKpiStatus } from '../../domain/strategies/kpiStatusStrategy';
import type { KpiDefinition, MonthlyKpiResult, Plant, Target } from '../../domain/models';

export interface ComparisonRow {
  plant: Plant;
  kpi: KpiDefinition;
  target?: Target;
  result?: MonthlyKpiResult;
  variance: number | null;
  achievement: number | null;
  status: KpiStatus;
}

export interface ComparisonMatrixRow {
  kpi: KpiDefinition;
  statuses: Record<string, KpiStatus>;
}

export function buildComparisonRows(
  plants: Plant[],
  kpis: KpiDefinition[],
  targets: Target[],
  results: MonthlyKpiResult[],
  plantId: string,
): ComparisonRow[] {
  const targetByPlantAndKpi = new Map(
    targets.map((target) => [`${target.plantId}:${target.kpiId}`, target]),
  );
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result]),
  );
  const selectedPlants = plantId === 'all' ? plants : plants.filter((plant) => plant.id === plantId);

  return selectedPlants.flatMap((plant) => kpis.map((kpi) => {
    const target = targetByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    const result = resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`);
    const monthlyActual = result?.monthlyActual;
    const cyTarget = target?.cyTarget;

    return {
      plant,
      kpi,
      target,
      result,
      variance: monthlyActual === null || monthlyActual === undefined || cyTarget === null || cyTarget === undefined
        ? null
        : monthlyActual - cyTarget,
      achievement: result?.ytdActual === null || result?.ytdActual === undefined || !cyTarget
        ? null
        : Math.round((result.ytdActual / cyTarget) * 10000) / 100,
      status: calculateKpiStatus(kpi.kpiLogic, result?.ytdActual, target?.cyTarget),
    };
  }));
}

export function buildComparisonMatrix(
  plants: Plant[],
  kpis: KpiDefinition[],
  results: MonthlyKpiResult[],
): ComparisonMatrixRow[] {
  const resultByPlantAndKpi = new Map(
    results.map((result) => [`${result.plantId}:${result.kpiId}`, result.status]),
  );

  return [...kpis]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((kpi) => ({
      kpi,
      statuses: Object.fromEntries(
        plants.map((plant) => [
          plant.id,
          resultByPlantAndKpi.get(`${plant.id}:${kpi.id}`) ?? KpiStatus.Missing,
        ]),
      ),
    }));
}
