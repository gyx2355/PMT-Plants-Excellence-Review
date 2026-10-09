import { describe, it, expect } from 'vitest';
import { DefaultKpiStatusStrategy } from '../domain/strategies/kpiStatusStrategy';
import { KpiStatus } from '../domain/enums';

describe('DefaultKpiStatusStrategy', () => {
  const strategy = new DefaultKpiStatusStrategy();

  it('uses Missing when KPI Logic is None or unset', () => {
    expect(strategy.calculateStatus(null, 100, 'None')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(undefined, null, undefined)).toBe(KpiStatus.Missing);
  });

  it('uses Over logic with Green at 100%, Amber from 50% to below 100%, and Red below 50%', () => {
    expect(strategy.calculateStatus(100, 100, 'Over')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(120, 100, 'Over')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(99, 100, 'Over')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(50, 100, 'Over')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(49, 100, 'Over')).toBe(KpiStatus.Red);
  });

  it('uses Less logic with Green through 100%, Amber through 150%, and Red above 150%', () => {
    expect(strategy.calculateStatus(100, 100, 'Less')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(80, 100, 'Less')).toBe(KpiStatus.Green);
    expect(strategy.calculateStatus(101, 100, 'Less')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(150, 100, 'Less')).toBe(KpiStatus.Amber);
    expect(strategy.calculateStatus(151, 100, 'Less')).toBe(KpiStatus.Red);
  });

  it('returns Missing for empty calculated inputs and Grey when a target is absent', () => {
    expect(strategy.calculateStatus(null, 100, 'Over')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(undefined, 100, 'Less')).toBe(KpiStatus.Missing);
    expect(strategy.calculateStatus(12, null, 'Over')).toBe(KpiStatus.Grey);
  });

  it('should calculate completion percentage accurately', () => {
    expect(strategy.calculateCompletionRate(14, 14)).toBe(100);
    expect(strategy.calculateCompletionRate(7, 14)).toBe(50);
    expect(strategy.calculateCompletionRate(0, 14)).toBe(0);
    expect(strategy.calculateCompletionRate(0, 0)).toBe(0);
  });
});
