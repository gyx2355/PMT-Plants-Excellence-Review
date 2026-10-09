import { describe, expect, it } from 'vitest';
import { getPreviousPeriod } from '../domain/services/period';

describe('getPreviousPeriod', () => {
  it('returns the previous month in the same year', () => {
    expect(getPreviousPeriod(new Date(2026, 8, 26))).toEqual({ year: 2026, month: 8 });
  });

  it('rolls January back to December of the previous year', () => {
    expect(getPreviousPeriod(new Date(2026, 0, 3))).toEqual({ year: 2025, month: 12 });
  });
});
