import type { KpiDefinition, MonthlyKpiResult, MonthlyReport, Plant, ReportCategory, Target } from '../../domain/models';
import type { AeCategory, AeRecord, ProductionKpiMatrix, ProductionKpiRecord, ProductionLine, ProductionLineMatrix, VolumePacRecord } from '../../domain/models/charts';
import { ReportType } from '../../domain/enums';
import { buildKpiMonthlyMatrixRows } from '../KPIOverviewPage/overviewMetrics';
import { aggregateVolumePac } from '../KPIComparisonPage/chartMetrics';
import type { MonthlyVolumePacPoint } from '../KPIComparisonPage/chartMetrics';

export interface MonthlyReportExportData {
  year: number;
  month: number;
  plants: Plant[];
  categories: ReportCategory[];
  reports: MonthlyReport[];
  kpis: KpiDefinition[];
  targets: Target[];
  monthlyResults: MonthlyKpiResult[];
  lines: ProductionLine[];
  lineMatrices: ProductionLineMatrix[];
  aeCategories: AeCategory[];
  aeRecords: AeRecord[];
  volumeRecords: VolumePacRecord[];
  productionMatrices: ProductionKpiMatrix[];
  productionRecords: ProductionKpiRecord[];
}

export interface ReportParagraph {
  text: string;
  kind: 'category' | 'highlights' | 'lowlights' | 'content';
}

export const sameExportId = (left: string, right: string) => left.replace(/[{}]/g, '').trim().toLowerCase() === right.replace(/[{}]/g, '').trim().toLowerCase();
export const reportCategoryKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ');

export function buildExportParagraphs(data: MonthlyReportExportData, plantId: string, section: 'operations' | 'production' | 'quality'): ReportParagraph[] {
  const categories = [...data.categories].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
    .filter((category) => {
      const name = reportCategoryKey(category.name);
      return section === 'operations' ? name !== 'production update' && name !== 'quality update'
        : name === `${section} update`;
    });
  return categories.flatMap((category) => {
    const paragraphs: ReportParagraph[] = [{ text: category.name, kind: 'category' }];
    for (const type of [ReportType.Highlights, ReportType.Lowlights]) {
      const reports = data.reports.filter((report) => report.year === data.year && report.month === data.month
        && sameExportId(report.plantId, plantId) && sameExportId(report.categoryId, category.id)
        && report.type === type && report.content.trim())
        .sort((left, right) => left.displayOrder - right.displayOrder);
      if (reports.length === 0) continue;
      paragraphs.push({ text: type === ReportType.Highlights ? '+ Highlights:' : '- Lowlights:', kind: type === ReportType.Highlights ? 'highlights' : 'lowlights' });
      reports.forEach((report) => report.content.split(/\r?\n/).filter((line) => line.trim())
        .forEach((line) => paragraphs.push({ text: line, kind: 'content' })));
    }
    return paragraphs;
  });
}

export function buildExportKpiRows(data: MonthlyReportExportData, plant: Plant) {
  const targets = data.targets.filter((target) => target.targetYear === data.year);
  const results = data.monthlyResults.filter((result) => result.year === data.year);
  return buildKpiMonthlyMatrixRows([plant], data.kpis, targets, results, data.month);
}

export function orderedExportPlants(data: MonthlyReportExportData): Plant[] {
  return [...data.plants].sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name));
}

export function buildExportVolumeGroups(data: MonthlyReportExportData, plant: Plant): Array<{ label: string | null; points: MonthlyVolumePacPoint[] }> {
  const records = data.volumeRecords.filter((record) => sameExportId(record.plantId, plant.id) && record.year === data.year);
  const volumeKpi = data.kpis.find((kpi) => kpi.name.trim().toLowerCase() === 'production volume');
  const operatingPlan = data.targets.find((target) => sameExportId(target.plantId, plant.id) && target.targetYear === data.year
    && volumeKpi && sameExportId(target.kpiId, volumeKpi.id))?.cyTarget ?? null;
  const groups: Array<{ label: string | null; points: MonthlyVolumePacPoint[] }> = [
    { label: null, points: aggregateVolumePac(records, [], [], operatingPlan) },
  ];
  const lineGroups = plant.name.trim().toLowerCase() === 'pudong-tpu' ? [['Belt-DE', 'REX'], ['FHF']]
    : plant.name.trim().toLowerCase() === 'changhua-tpu' ? [['Belt-Cast'], ['REX']] : [];
  for (const names of lineGroups) {
    const lineIds = data.lines.filter((line) => names.some((name) => name.toLowerCase() === line.name.trim().toLowerCase())).map((line) => line.id);
    const selected = records.filter((record) => lineIds.some((id) => sameExportId(id, record.productionLineId)));
    groups.push({ label: names.join(' + '), points: aggregateVolumePac(selected, [], []).filter((point) => point.month !== 0) });
  }
  return groups;
}