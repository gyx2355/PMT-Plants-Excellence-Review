import { describe, expect, it } from 'vitest';
import {
  buildAeMainName,
  buildMonthlyReportMainName,
  buildProductionLineMatrixMainName,
  buildProductionKpiMatrixMainName,
  buildTargetMainName,
  buildVolumePacMainName,
} from '../domain/services/mainName';

const named = (name: string) => ({ name });

describe('Main Name generation', () => {
  it('uses display names and underscores for Targets', () => {
    expect(buildTargetMainName(2026, named('Pudong-TPU'), named('Production Volume')))
      .toBe('2026_Pudong-TPU_Production Volume');
  });

  it('uses the defined AE and Volume/PAC formats', () => {
    expect(buildAeMainName(2026, 9, named('Pudong-TPU'), named('TPU Line 1'), named('QHES')))
      .toBe('2026_9_Pudong-TPU_TPU Line 1_QHES');
    expect(buildVolumePacMainName(2026, 9, named('Pudong-TPU'), named('TPU Line 1')))
      .toBe('2026_9_Pudong-TPU_TPU Line 1');
  });

  it('uses the defined Monthly Report format', () => {
    expect(buildMonthlyReportMainName(2026, 9, named('Pudong-TPU'), 'Highlights', named('QHES')))
      .toBe('2026_9_Pudong-TPU_Highlights_QHES');
  });

  it('uses display names for Production Line Matrix', () => {
    expect(buildProductionLineMatrixMainName(named('Pudong-TPU'), named('TPU Line 1')))
      .toBe('Pudong-TPU_TPU Line 1');
  });

  it('uses Plant, Type and Categories for Production KPI Matrix', () => {
    expect(buildProductionKpiMatrixMainName(named('Pudong-TPU'), 'Production', 'Volume'))
      .toBe('Pudong-TPU_Production_Volume');
    expect(buildProductionKpiMatrixMainName(named('Pudong-TPU'), 'Quality', 'First Pass Ratio'))
      .toBe('Pudong-TPU_Quality_First Pass Ratio');
  });
});
