import { KpiCategory, KpiStatus, ReportType } from '../../domain/enums';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';

export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'pudong',
    name: 'Pudong-TPU',
    plantManager: 'Zhang Wei',
    productionManager: 'Li Ming',
    displayOrder: 1,
  },
  {
    id: 'zhanjiang',
    name: 'Zhanjiang-TPU',
    plantManager: 'Chen Jun',
    productionManager: 'Wang Fang',
    displayOrder: 2,
  },
  {
    id: 'changhua',
    name: 'Changhua-TPU',
    plantManager: 'Lin Chien',
    productionManager: 'Huang Po',
    displayOrder: 3,
  },
  {
    id: 'yokkaichi',
    name: 'Yokkaichi-TPU',
    plantManager: 'Sato Kenji',
    productionManager: 'Tanaka Hiroshi',
    displayOrder: 4,
  },
];

export const INITIAL_KPI_DEFINITIONS: KpiDefinition[] = [
  { id: 'kpi-1', name: 'LTI', category: KpiCategory.EHS, unit: '#', displayOrder: 1 },
  { id: 'kpi-2', name: 'PSI', category: KpiCategory.EHS, unit: '#', displayOrder: 2 },
  { id: 'kpi-3', name: 'Yellow Card', category: KpiCategory.EHS, unit: '#/HC/m', displayOrder: 3 },
  { id: 'kpi-4', name: 'Closed Rate of Yellow Card', category: KpiCategory.EHS, unit: '%', displayOrder: 4 },
  { id: 'kpi-5', name: 'BBS Observation', category: KpiCategory.EHS, unit: '#/HC/a', displayOrder: 5 },
  { id: 'kpi-6', name: 'Permit Inspection in the Field', category: KpiCategory.EHS, unit: '%', displayOrder: 6 },
  { id: 'kpi-7', name: 'Production Volume', category: KpiCategory.Production, unit: 'kt', displayOrder: 7 },
  { id: 'kpi-8', name: 'Schedule Loss (iac)', category: KpiCategory.Production, unit: '%', displayOrder: 8 },
  { id: 'kpi-9', name: 'Unexpected Loss (iac)', category: KpiCategory.Production, unit: '%', displayOrder: 9 },
  { id: 'kpi-10', name: 'Waste Ratio', category: KpiCategory.Production, unit: '%', displayOrder: 10 },
  { id: 'kpi-11', name: 'Recycle Granule Ratio', category: KpiCategory.Production, unit: '%', displayOrder: 11 },
  { id: 'kpi-12', name: 'First Pass Ratio', category: KpiCategory.Quality, unit: '%', displayOrder: 12 },
  { id: 'kpi-13', name: 'FG In-spec Ratio', category: KpiCategory.Quality, unit: '%', displayOrder: 13 },
  { id: 'kpi-14', name: 'Justified NCM', category: KpiCategory.Quality, unit: '#/kt', displayOrder: 14 },
];

export const INITIAL_REPORT_CATEGORIES: ReportCategory[] = [
  { id: 'cat-qehs', name: 'QEHS', displayOrder: 1 },
  { id: 'cat-supply', name: 'Supply and Capacity', displayOrder: 2 },
  { id: 'cat-projects', name: 'Projects', displayOrder: 3 },
  { id: 'cat-personnel', name: 'Personnel', displayOrder: 4 },
  { id: 'cat-prod', name: 'Production Update', displayOrder: 5 },
  { id: 'cat-quality', name: 'Quality Update', displayOrder: 6 },
];

// Seed Targets for 2026
export const INITIAL_TARGETS: Target[] = INITIAL_PLANTS.flatMap((plant) =>
  INITIAL_KPI_DEFINITIONS.map((kpi) => {
    let cyTarget = 100;
    if (kpi.unit === 'kt') cyTarget = 12.5;
    else if (kpi.name === 'LTI' || kpi.name === 'PSI') cyTarget = 0;
    else if (kpi.unit === '%') cyTarget = 98;
    else if (kpi.name === 'Justified NCM') cyTarget = 0.2;

    return {
      id: `target-${plant.id}-${kpi.id}-2026`,
      targetYear: 2026,
      plantId: plant.id,
      kpiId: kpi.id,
      pyActual: cyTarget * 0.95,
      cyTarget,
      kpiUnit: kpi.unit,
    };
  })
);

// Seed Monthly Results for 2026, Month 7
export const INITIAL_MONTHLY_RESULTS: MonthlyKpiResult[] = [
  // Pudong (All entered - Green / Amber)
  { id: 'res-pudong-kpi-1', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-1', targetId: 'target-pudong-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-2', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-2', targetId: 'target-pudong-kpi-2-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-3', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-3', targetId: 'target-pudong-kpi-3-2026', monthlyActual: 2.1, ytdActual: 2.3, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-4', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-4', targetId: 'target-pudong-kpi-4-2026', monthlyActual: 99.2, ytdActual: 98.8, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-5', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-5', targetId: 'target-pudong-kpi-5-2026', monthlyActual: 1.8, ytdActual: 1.9, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-6', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-6', targetId: 'target-pudong-kpi-6-2026', monthlyActual: 97.5, ytdActual: 98.1, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-7', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-7', targetId: 'target-pudong-kpi-7-2026', monthlyActual: 13.1, ytdActual: 12.8, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-8', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-8', targetId: 'target-pudong-kpi-8-2026', monthlyActual: 1.2, ytdActual: 1.5, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-9', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-9', targetId: 'target-pudong-kpi-9-2026', monthlyActual: 0.8, ytdActual: 0.9, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-10', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-10', targetId: 'target-pudong-kpi-10-2026', monthlyActual: 0.5, ytdActual: 0.6, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-11', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-11', targetId: 'target-pudong-kpi-11-2026', monthlyActual: 4.2, ytdActual: 4.0, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-12', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-12', targetId: 'target-pudong-kpi-12-2026', monthlyActual: 98.6, ytdActual: 98.4, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-13', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-13', targetId: 'target-pudong-kpi-13-2026', monthlyActual: 99.8, ytdActual: 99.6, status: KpiStatus.Green },
  { id: 'res-pudong-kpi-14', year: 2026, month: 7, plantId: 'pudong', kpiId: 'kpi-14', targetId: 'target-pudong-kpi-14-2026', monthlyActual: 0.1, ytdActual: 0.15, status: KpiStatus.Green },

  // Zhanjiang (Partial - Amber / Red)
  { id: 'res-zhanjiang-kpi-1', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-1', targetId: 'target-zhanjiang-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-zhanjiang-kpi-7', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-7', targetId: 'target-zhanjiang-kpi-7-2026', monthlyActual: 10.2, ytdActual: 9.8, status: KpiStatus.Amber },
  { id: 'res-zhanjiang-kpi-12', year: 2026, month: 7, plantId: 'zhanjiang', kpiId: 'kpi-12', targetId: 'target-zhanjiang-kpi-12-2026', monthlyActual: 92.1, ytdActual: 91.5, status: KpiStatus.Red },

  // Changhua (Complete)
  { id: 'res-changhua-kpi-1', year: 2026, month: 7, plantId: 'changhua', kpiId: 'kpi-1', targetId: 'target-changhua-kpi-1-2026', monthlyActual: 0, ytdActual: 0, status: KpiStatus.Green },
  { id: 'res-changhua-kpi-7', year: 2026, month: 7, plantId: 'changhua', kpiId: 'kpi-7', targetId: 'target-changhua-kpi-7-2026', monthlyActual: 12.0, ytdActual: 12.1, status: KpiStatus.Green },
];

export const INITIAL_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    id: 'rep-pudong-qehs-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-qehs',
    type: ReportType.Highlights,
    content: 'Achieved 1,000 consecutive LTI-free safe work days. Field BBS observations exceeded monthly target by 15%.',
    displayOrder: 1,
    attachmentsCount: 1,
  },
  {
    id: 'rep-pudong-prod-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-prod',
    type: ReportType.Highlights,
    content: 'Line 2 debottlenecking completed ahead of schedule, increasing TPU compounding capacity by 8%.',
    displayOrder: 2,
    attachmentsCount: 0,
  },
  {
    id: 'rep-pudong-qehs-low-7',
    year: 2026,
    month: 7,
    plantId: 'pudong',
    categoryId: 'cat-qehs',
    type: ReportType.Lowlights,
    content: 'Minor hydraulic oil leak identified in Extruder #3 during routine maintenance; contained immediately with zero environmental impact.',
    displayOrder: 1,
    attachmentsCount: 0,
  },
];

export const INITIAL_REPORT_ATTACHMENTS: ReportAttachment[] = [
  {
    id: 'att-1',
    monthlyReportId: 'rep-pudong-qehs-7',
    title: 'Pudong July 2026 Safety Audit Summary.pdf',
    fileName: 'Pudong_July_2026_Safety_Audit.pdf',
    fileSize: 1024 * 350,
    plantId: 'pudong',
    year: 2026,
    month: 7,
  },
];
