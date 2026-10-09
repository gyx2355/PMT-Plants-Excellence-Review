import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  ReportAttachment,
} from '../../domain/models';

export interface PlantRepository {
  getAll(): Promise<Plant[]>;
  getById(id: string): Promise<Plant | null>;
  create(plant: Omit<Plant, 'id'>): Promise<Plant>;
  update(id: string, plant: Partial<Plant>): Promise<Plant>;
  delete(id: string): Promise<void>;
}

export interface KpiDefinitionRepository {
  getAll(): Promise<KpiDefinition[]>;
  getById(id: string): Promise<KpiDefinition | null>;
  create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition>;
  update(id: string, kpi: Partial<KpiDefinition>): Promise<KpiDefinition>;
  delete(id: string): Promise<void>;
}

export interface TargetRepository {
  getAll(): Promise<Target[]>;
  getByYear(year: number): Promise<Target[]>;
  getByPlantAndYear(plantId: string, year: number): Promise<Target[]>;
  create(target: Omit<Target, 'id'>): Promise<Target>;
  update(id: string, target: Partial<Target>): Promise<Target>;
  delete(id: string): Promise<void>;
}

export interface MonthlyKpiResultRepository {
  getAll(): Promise<MonthlyKpiResult[]>;
  getByYear(year: number): Promise<MonthlyKpiResult[]>;
  getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]>;
  getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyKpiResult[]>;
  saveBatch(results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>): Promise<MonthlyKpiResult[]>;
  delete(id: string): Promise<void>;
}

export interface ReportCategoryRepository {
  getAll(): Promise<ReportCategory[]>;
  getById(id: string): Promise<ReportCategory | null>;
  create(category: Omit<ReportCategory, 'id'>): Promise<ReportCategory>;
  update(id: string, category: Partial<ReportCategory>): Promise<ReportCategory>;
  delete(id: string): Promise<void>;
}

export interface MonthlyReportRepository {
  getAll(): Promise<MonthlyReport[]>;
  getByPeriod(year: number, month: number): Promise<MonthlyReport[]>;
  getByPlantAndPeriod(
    plantId: string,
    year: number,
    month: number
  ): Promise<MonthlyReport[]>;
  getById(id: string): Promise<MonthlyReport | null>;
  create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport>;
  update(id: string, report: Partial<MonthlyReport>): Promise<MonthlyReport>;
  delete(id: string): Promise<void>;
}

export interface AttachmentRepository {
  getByReportId(monthlyReportId: string): Promise<ReportAttachment[]>;
  upload(
    monthlyReportId: string,
    title: string,
    file: File
  ): Promise<ReportAttachment>;
  download(attachmentId: string, fileName?: string): Promise<void>;
  delete(id: string): Promise<void>;
}
