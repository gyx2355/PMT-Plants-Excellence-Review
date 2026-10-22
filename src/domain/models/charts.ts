export interface ProductionLine {
  id: string;
  name: string;
  displayOrder: number;
}

export interface ProductionLineMatrix {
  id: string;
  mainName: string;
  plantId: string;
  productionLineId: string;
  displayOrder: number;
}

export interface ProductionKpiMatrix {
  id: string;
  mainName: string;
  plantId: string;
  type?: string;
  categories: string;
  productionClass?: 'Waste' | 'FG' | 'RM' | 'Defect' | 'FPYFG' | 'NT' | null;
  displayOrder: number;
}

export interface ProductionKpiRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  type: string;
  categories: string;
  quantity: number | null;
  ratio?: number | null;
}

export interface AeCategory {
  id: string;
  name: string;
  displayOrder: number;
}

export interface VolumePacRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  productionLineId: string;
  volume: number | null;
  forecast: number | null;
  pac: number | null;
}

export interface AeRecord {
  id: string;
  mainName: string;
  year: number;
  month: number;
  plantId: string;
  productionLineId: string;
  categoryId: string;
  value: number | null;
}
