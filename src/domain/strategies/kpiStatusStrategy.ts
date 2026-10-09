import { KpiStatus } from '../enums';

export interface IKpiStatusStrategy {
  calculateStatus(
    ytdActual: number | null | undefined,
    cyTarget: number | null | undefined,
    kpiLogic?: string | null
  ): KpiStatus;
  
  calculateCompletionRate(enteredCount: number, expectedCount: number): number;
}

export class DefaultKpiStatusStrategy implements IKpiStatusStrategy {
  calculateStatus(
    ytdActual: number | null | undefined,
    cyTarget: number | null | undefined,
    kpiLogic?: string | null
  ): KpiStatus {
    if (kpiLogic == null || kpiLogic === '' || kpiLogic === 'None') {
      return KpiStatus.Missing;
    }

    if (ytdActual === null || ytdActual === undefined) {
      return KpiStatus.Missing;
    }

    if (cyTarget === null || cyTarget === undefined) {
      return KpiStatus.Grey;
    }

    if (kpiLogic === 'Over') {
      if (ytdActual >= cyTarget) return KpiStatus.Green;
      if (ytdActual >= cyTarget * 0.5) return KpiStatus.Amber;
      return KpiStatus.Red;
    }

    if (kpiLogic === 'Less') {
      if (ytdActual <= cyTarget) return KpiStatus.Green;
      if (ytdActual <= cyTarget * 1.5) return KpiStatus.Amber;
      return KpiStatus.Red;
    }

    return KpiStatus.Missing;
  }

  calculateCompletionRate(enteredCount: number, expectedCount: number): number {
    if (expectedCount <= 0) return 0;
    const rate = Math.round((enteredCount / expectedCount) * 100);
    return Math.min(100, Math.max(0, rate));
  }
}

export const kpiStatusStrategy = new DefaultKpiStatusStrategy();

export function calculateKpiStatus(
  kpiLogic: string | null | undefined,
  ytdActual: number | null | undefined,
  cyTarget: number | null | undefined,
): KpiStatus {
  return kpiStatusStrategy.calculateStatus(ytdActual, cyTarget, kpiLogic);
}
