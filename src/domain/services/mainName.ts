interface NamePart {
  name: string;
}

const joinName = (...parts: Array<string | number>) => parts.map(String).join('_');

export const buildTargetMainName = (year: number, plant: NamePart, kpi: NamePart) =>
  joinName(year, plant.name, kpi.name);

export const buildAeMainName = (year: number, month: number, plant: NamePart, productionLine: NamePart, category: NamePart) =>
  joinName(year, month, plant.name, productionLine.name, category.name);

export const buildVolumePacMainName = (year: number, month: number, plant: NamePart, productionLine: NamePart) =>
  joinName(year, month, plant.name, productionLine.name);

export const buildProductionLineMatrixMainName = (plant: NamePart, productionLine: NamePart) =>
  joinName(plant.name, productionLine.name);

export const buildProductionKpiMatrixMainName = (plant: NamePart, type: string, categories: string) =>
  joinName(plant.name, type, categories);

export const buildMonthlyReportMainName = (year: number, month: number, plant: NamePart, type: string, category: NamePart) =>
  joinName(year, month, plant.name, type, category.name);
