import type {
  PlantRepository,
  KpiDefinitionRepository,
  TargetRepository,
  MonthlyKpiResultRepository,
  ReportCategoryRepository,
  MonthlyReportRepository,
  AttachmentRepository,
} from '../repositories/interfaces';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';
import {
  INITIAL_PLANTS,
  INITIAL_KPI_DEFINITIONS,
  INITIAL_REPORT_CATEGORIES,
  INITIAL_TARGETS,
  INITIAL_MONTHLY_RESULTS,
  INITIAL_MONTHLY_REPORTS,
  INITIAL_REPORT_ATTACHMENTS,
} from './seedData';
import { kpiStatusStrategy } from '../../domain/strategies/kpiStatusStrategy';

// In-Memory Storage
let plants = [...INITIAL_PLANTS];
let kpiDefinitions = [...INITIAL_KPI_DEFINITIONS];
let reportCategories = [...INITIAL_REPORT_CATEGORIES];
let targets = [...INITIAL_TARGETS];
let monthlyResults = [...INITIAL_MONTHLY_RESULTS];
let monthlyReports = [...INITIAL_MONTHLY_REPORTS];
let reportAttachments = [...INITIAL_REPORT_ATTACHMENTS];

export class MockPlantRepository implements PlantRepository {
  async getAll(): Promise<Plant[]> {
    return [...plants].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<Plant | null> {
    return plants.find((p) => p.id === id) || null;
  }

  async create(plant: Omit<Plant, 'id'>): Promise<Plant> {
    const newPlant: Plant = { ...plant, id: `plant-${Date.now()}` };
    plants.push(newPlant);
    return newPlant;
  }

  async update(id: string, updated: Partial<Plant>): Promise<Plant> {
    const index = plants.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Plant with ID ${id} not found.`);
    plants[index] = { ...plants[index], ...updated };
    return plants[index];
  }

  async delete(id: string): Promise<void> {
    plants = plants.filter((p) => p.id !== id);
  }
}

export class MockKpiDefinitionRepository implements KpiDefinitionRepository {
  async getAll(): Promise<KpiDefinition[]> {
    return [...kpiDefinitions].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<KpiDefinition | null> {
    return kpiDefinitions.find((k) => k.id === id) || null;
  }

  async create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition> {
    const newKpi: KpiDefinition = { ...kpi, id: `kpi-${Date.now()}` };
    kpiDefinitions.push(newKpi);
    return newKpi;
  }

  async update(id: string, updated: Partial<KpiDefinition>): Promise<KpiDefinition> {
    const index = kpiDefinitions.findIndex((k) => k.id === id);
    if (index === -1) throw new Error(`KPI Definition with ID ${id} not found.`);
    kpiDefinitions[index] = { ...kpiDefinitions[index], ...updated };
    return kpiDefinitions[index];
  }

  async delete(id: string): Promise<void> {
    kpiDefinitions = kpiDefinitions.filter((k) => k.id !== id);
  }
}

export class MockTargetRepository implements TargetRepository {
  async getAll(): Promise<Target[]> {
    return [...targets];
  }

  async getByYear(year: number): Promise<Target[]> {
    return targets.filter((t) => t.targetYear === year);
  }

  async getByPlantAndYear(plantId: string, year: number): Promise<Target[]> {
    return targets.filter(
      (t) => (plantId === 'all' || t.plantId === plantId) && t.targetYear === year
    );
  }

  async create(target: Omit<Target, 'id'>): Promise<Target> {
    const exists = targets.some(
      (t) =>
        t.plantId === target.plantId &&
        t.kpiId === target.kpiId &&
        t.targetYear === target.targetYear
    );
    if (exists) {
      throw new Error('A target already exists for this Plant, KPI, and Target Year.');
    }
    const newTarget: Target = { ...target, id: `target-${Date.now()}` };
    targets.push(newTarget);
    return newTarget;
  }

  async update(id: string, updated: Partial<Target>): Promise<Target> {
    const index = targets.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Target with ID ${id} not found.`);
    targets[index] = { ...targets[index], ...updated };
    return targets[index];
  }

  async delete(id: string): Promise<void> {
    targets = targets.filter((t) => t.id !== id);
  }
}

export class MockMonthlyKpiResultRepository implements MonthlyKpiResultRepository {
  async getAll(): Promise<MonthlyKpiResult[]> {
    return [...monthlyResults];
  }

  async getByYear(year: number): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter((result) => result.year === year);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter((r) => r.year === year && r.month === month);
  }

  async getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyKpiResult[]> {
    return monthlyResults.filter(
      (r) =>
        (plantId === 'all' || r.plantId === plantId) &&
        r.year === year &&
        r.month === month
    );
  }

  async saveBatch(
    items: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>
  ): Promise<MonthlyKpiResult[]> {
    const savedResults: MonthlyKpiResult[] = [];

    for (const item of items) {
      const target = targets.find(
        (t) => t.plantId === item.plantId && t.kpiId === item.kpiId && t.targetYear === item.year
      );
      const kpiDef = kpiDefinitions.find((k) => k.id === item.kpiId);
      const calculatedStatus = kpiStatusStrategy.calculateStatus(
        item.ytdActual,
        target?.cyTarget,
        kpiDef?.kpiLogic,
      );

      const existingIndex = monthlyResults.findIndex(
        (r) =>
          r.plantId === item.plantId &&
          r.kpiId === item.kpiId &&
          r.year === item.year &&
          r.month === item.month
      );

      if (existingIndex >= 0) {
        monthlyResults[existingIndex] = {
          ...monthlyResults[existingIndex],
          ...item,
          status: calculatedStatus,
          updatedAt: new Date().toISOString(),
        };
        savedResults.push(monthlyResults[existingIndex]);
      } else {
        const newResult: MonthlyKpiResult = {
          ...item,
          id: item.id || `res-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          status: calculatedStatus,
          updatedAt: new Date().toISOString(),
        };
        monthlyResults.push(newResult);
        savedResults.push(newResult);
      }
    }

    return savedResults;
  }

  async delete(id: string): Promise<void> {
    monthlyResults = monthlyResults.filter((r) => r.id !== id);
  }
}

export class MockReportCategoryRepository implements ReportCategoryRepository {
  async getAll(): Promise<ReportCategory[]> {
    return [...reportCategories].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getById(id: string): Promise<ReportCategory | null> {
    return reportCategories.find((c) => c.id === id) || null;
  }

  async create(cat: Omit<ReportCategory, 'id'>): Promise<ReportCategory> {
    const newCat: ReportCategory = { ...cat, id: `cat-${Date.now()}` };
    reportCategories.push(newCat);
    return newCat;
  }

  async update(id: string, updated: Partial<ReportCategory>): Promise<ReportCategory> {
    const index = reportCategories.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Report Category ${id} not found.`);
    reportCategories[index] = { ...reportCategories[index], ...updated };
    return reportCategories[index];
  }

  async delete(id: string): Promise<void> {
    reportCategories = reportCategories.filter((c) => c.id !== id);
  }
}

export class MockMonthlyReportRepository implements MonthlyReportRepository {
  async getAll(): Promise<MonthlyReport[]> {
    return [...monthlyReports];
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyReport[]> {
    return monthlyReports.filter((r) => r.year === year && r.month === month);
  }

  async getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyReport[]> {
    return monthlyReports.filter(
      (r) =>
        (plantId === 'all' || r.plantId === plantId) &&
        r.year === year &&
        r.month === month
    );
  }

  async getById(id: string): Promise<MonthlyReport | null> {
    return monthlyReports.find((r) => r.id === id) || null;
  }

  async create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport> {
    const newReport: MonthlyReport = {
      ...report,
      id: `rep-${Date.now()}`,
      attachmentsCount: 0,
    };
    monthlyReports.push(newReport);
    return newReport;
  }

  async update(id: string, updated: Partial<MonthlyReport>): Promise<MonthlyReport> {
    const index = monthlyReports.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Monthly Report ${id} not found.`);
    monthlyReports[index] = { ...monthlyReports[index], ...updated };
    return monthlyReports[index];
  }

  async delete(id: string): Promise<void> {
    monthlyReports = monthlyReports.filter((r) => r.id !== id);
  }

}

export class MockAttachmentRepository implements AttachmentRepository {
  async getByReportId(monthlyReportId: string): Promise<ReportAttachment[]> {
    return reportAttachments.filter((a) => a.monthlyReportId === monthlyReportId);
  }

  async upload(
    monthlyReportId: string,
    title: string,
    file: File
  ): Promise<ReportAttachment> {
    const newAtt: ReportAttachment = {
      id: `att-${Date.now()}`,
      monthlyReportId,
      title,
      fileName: file.name,
      fileSize: file.size,
    };
    reportAttachments.push(newAtt);

    // Update parent report attachmentsCount
    const rep = monthlyReports.find((r) => r.id === monthlyReportId);
    if (rep) {
      rep.attachmentsCount = (rep.attachmentsCount || 0) + 1;
    }

    return newAtt;
  }

  async download(attachmentId: string): Promise<void> {
    const att = reportAttachments.find((a) => a.id === attachmentId);
    if (!att) throw new Error(`Attachment ${attachmentId} not found.`);
    throw new Error(`Mock attachment download is not available for ${att.title}.`);
  }

  async delete(id: string): Promise<void> {
    const att = reportAttachments.find((a) => a.id === id);
    if (att) {
      const rep = monthlyReports.find((r) => r.id === att.monthlyReportId);
      if (rep && rep.attachmentsCount) {
        rep.attachmentsCount = Math.max(0, rep.attachmentsCount - 1);
      }
    }
    reportAttachments = reportAttachments.filter((a) => a.id !== id);
  }
}

// Singletons for application injection
export const plantRepository = new MockPlantRepository();
export const kpiDefinitionRepository = new MockKpiDefinitionRepository();
export const targetRepository = new MockTargetRepository();
export const monthlyKpiResultRepository = new MockMonthlyKpiResultRepository();
export const reportCategoryRepository = new MockReportCategoryRepository();
export const monthlyReportRepository = new MockMonthlyReportRepository();
export const attachmentRepository = new MockAttachmentRepository();
