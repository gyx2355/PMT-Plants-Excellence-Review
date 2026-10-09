import { describe, it, expect } from 'vitest';
import { KpiStatus, KpiCategory, ReportType } from '../domain/enums';

describe('Domain Enums', () => {
  it('should have correct KpiStatus values', () => {
    expect(KpiStatus.Green).toBe('Green');
    expect(KpiStatus.Amber).toBe('Amber');
    expect(KpiStatus.Red).toBe('Red');
    expect(KpiStatus.Grey).toBe('Grey');
    expect(KpiStatus.Missing).toBe('Missing');
  });

  it('should have correct KpiCategory values', () => {
    expect(KpiCategory.EHS).toBe('EHS');
    expect(KpiCategory.Production).toBe('Production');
    expect(KpiCategory.Quality).toBe('Quality');
  });

  it('should have correct ReportType values', () => {
    expect(ReportType.Highlights).toBe('Highlights');
    expect(ReportType.Lowlights).toBe('Lowlights');
  });
});
