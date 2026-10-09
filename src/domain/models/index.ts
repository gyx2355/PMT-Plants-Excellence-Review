import type { KpiCategory, KpiStatus, ReportType } from '../enums';

export interface Plant {
  id: string;
  name: string;
  plantManagerId?: string;
  plantManager?: string;
  productionManagerId?: string;
  productionManager?: string;
  displayOrder: number;
}

export interface UserProfile {
  id?: string;
  displayName: string;
  userPrincipalName?: string;
}

export interface KpiDefinition {
  id: string;
  name: string;
  category: KpiCategory | string;
  unit: string;
  kpiLogic?: string;
  displayOrder: number;
}

export interface Target {
  id: string;
  targetYear: number;
  plantId: string;
  kpiId: string;
  pyActual?: number | null;
  cyTarget?: number | null;
  kpiUnit?: string;
}

export interface MonthlyKpiResult {
  id: string;
  year: number;
  month: number;
  plantId: string;
  kpiId: string;
  targetId?: string;
  monthlyActual?: number | null;
  ytdActual?: number | null;
  status: KpiStatus;
  updatedAt?: string;
}

export interface ReportCategory {
  id: string;
  name: string;
  displayOrder: number;
}

export interface MonthlyReport {
  id: string;
  mainName?: string;
  year: number;
  month: number;
  plantId: string;
  categoryId: string;
  type: ReportType;
  content: string;
  displayOrder: number;
  attachmentsCount?: number;
}

export interface ReportAttachment {
  id: string;
  monthlyReportId: string;
  title: string;
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  year?: number;
  month?: number;
  plantId?: string;
}
