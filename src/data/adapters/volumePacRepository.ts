import type { IOperationResult } from '@microsoft/power-apps/data';
import { Apma_pmtaecategoriesesService } from '../../generated/services/Apma_pmtaecategoriesesService';
import { Apma_pmtaesService } from '../../generated/services/Apma_pmtaesService';
import { Apma_pmtproductionlinecategoriesesService } from '../../generated/services/Apma_pmtproductionlinecategoriesesService';
import { Apma_pmtproductionlinematrixesService } from '../../generated/services/Apma_pmtproductionlinematrixesService';
import { Apma_pmtproductionkpimatrixesService } from '../../generated/services/Apma_pmtproductionkpimatrixesService';
import { Apma_pmtproductionkpimatrixesapma_type, Apma_pmtproductionkpimatrixesapma_productionclass } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';
import type { Apma_pmtproductionkpimatrixes } from '../../generated/models/Apma_pmtproductionkpimatrixesModel';
import { Apma_pmtvolume_pacsService } from '../../generated/services/Apma_pmtvolume_pacsService';
import { Apma_pmtplantsesService } from '../../generated/services/Apma_pmtplantsesService';
import type { Apma_pmtaecategorieses } from '../../generated/models/Apma_pmtaecategoriesesModel';
import type { Apma_pmtaes } from '../../generated/models/Apma_pmtaesModel';
import type { Apma_pmtaesapma_month } from '../../generated/models/Apma_pmtaesModel';
import type { Apma_pmtproductionlinecategorieses } from '../../generated/models/Apma_pmtproductionlinecategoriesesModel';
import type { Apma_pmtproductionlinematrixes } from '../../generated/models/Apma_pmtproductionlinematrixesModel';
import type { Apma_pmtvolume_pacs } from '../../generated/models/Apma_pmtvolume_pacsModel';
import type { Apma_pmtvolume_pacsapma_month } from '../../generated/models/Apma_pmtvolume_pacsModel';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, VolumePacRecord } from '../../domain/models/charts';
import { buildAeMainName, buildProductionLineMatrixMainName, buildProductionKpiMatrixMainName, buildVolumePacMainName } from '../../domain/services/mainName';

const MONTH_OPTION_BASE = 457470000;

function data<T>(result: IOperationResult<T>, operation: string): T {
  if (!result.success) throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  return result.data;
}

function monthFromChoice(value: number | undefined): number {
  if (value === undefined) return 0;
  return value - MONTH_OPTION_BASE + 1;
}

function monthToChoice(month: number): number {
  return MONTH_OPTION_BASE + month - 1;
}

function bindLookup(entitySet: string, id: string): string {
  return `/${entitySet}(${id})`;
}

function productionClassToChoice(value: string | null | undefined): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const choice = Object.entries(Apma_pmtproductionkpimatrixesapma_productionclass).find(([, label]) => label === value)?.[0];
  if (choice === undefined) throw new Error(`Invalid Production Class: ${value}`);
  return Number(choice);
}


export const volumePacRepository = {
  async getProductionLines(): Promise<ProductionLine[]> {
    const result = await Apma_pmtproductionlinecategoriesesService.getAll({
      select: ['apma_pmtproductionlinecategoriesid', 'apma_productionline', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_productionline asc'],
    });
    return data(result, 'load production lines').map((record: Apma_pmtproductionlinecategorieses) => ({
      id: record.apma_pmtproductionlinecategoriesid,
      name: record.apma_productionline,
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionLine(value: Omit<ProductionLine, 'id'>): Promise<ProductionLine> {
    const record = data(await Apma_pmtproductionlinecategoriesesService.create({
      apma_productionline: value.name,
      apma_displayorder: value.displayOrder,
    } as never), 'create production line');
    return { id: record.apma_pmtproductionlinecategoriesid, name: record.apma_productionline, displayOrder: record.apma_displayorder ?? value.displayOrder };
  },

  async updateProductionLine(id: string, value: Partial<ProductionLine>): Promise<ProductionLine> {
    const record = data(await Apma_pmtproductionlinecategoriesesService.update(id, {
      apma_productionline: value.name,
      apma_displayorder: value.displayOrder,
    }), 'update production line');
    return { id: record.apma_pmtproductionlinecategoriesid, name: record.apma_productionline, displayOrder: record.apma_displayorder ?? 1 };
  },

  async deleteProductionLine(id: string): Promise<void> {
    await Apma_pmtproductionlinecategoriesesService.delete(id);
  },

  async getProductionLineMatrices(): Promise<ProductionLineMatrix[]> {
    const result = await Apma_pmtproductionlinematrixesService.getAll({
      select: ['apma_pmtproductionlinematrixid', 'apma_mainname', '_apma_plantname_value', '_apma_productionline_value', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_mainname asc'],
    });
    return data(result, 'load production line matrix').map((record: Apma_pmtproductionlinematrixes) => ({
      id: record.apma_pmtproductionlinematrixid,
      mainName: record.apma_mainname,
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionLineMatrix(value: Omit<ProductionLineMatrix, 'id' | 'mainName'>): Promise<ProductionLineMatrix> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load matrix plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load matrix production line')),
    ]);
    const mainName = buildProductionLineMatrixMainName({ name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    const record = data(await Apma_pmtproductionlinematrixesService.create({
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_displayorder: value.displayOrder,
    } as never), 'create production line matrix');
    return { ...value, id: record.apma_pmtproductionlinematrixid, mainName };
  },

  async updateProductionLineMatrix(id: string, value: Omit<ProductionLineMatrix, 'id' | 'mainName'>): Promise<ProductionLineMatrix> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load matrix plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load matrix production line')),
    ]);
    const mainName = buildProductionLineMatrixMainName({ name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    await Apma_pmtproductionlinematrixesService.update(id, {
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_displayorder: value.displayOrder,
    });
    return { ...value, id, mainName };
  },

  async deleteProductionLineMatrix(id: string): Promise<void> {
    await Apma_pmtproductionlinematrixesService.delete(id);
  },

  async getProductionKpiMatrices(): Promise<ProductionKpiMatrix[]> {
    const result = await Apma_pmtproductionkpimatrixesService.getAll({
      select: ['apma_pmtproductionkpimatrixid', 'apma_mainname', '_apma_plantname_value', 'apma_type', 'apma_categories', 'apma_productionclass', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_mainname asc'],
    });
    return data(result, 'load production KPI matrix').map((record: Apma_pmtproductionkpimatrixes) => ({
      id: record.apma_pmtproductionkpimatrixid,
      mainName: record.apma_mainname,
      plantId: record._apma_plantname_value ?? '',
      type: record.apma_type === undefined ? undefined : Apma_pmtproductionkpimatrixesapma_type[record.apma_type],
      categories: record.apma_categories ?? '',
      productionClass: record.apma_productionclass == null ? null : Apma_pmtproductionkpimatrixesapma_productionclass[record.apma_productionclass],
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createProductionKpiMatrix(value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>): Promise<ProductionKpiMatrix> {
    const typeChoice = Object.entries(Apma_pmtproductionkpimatrixesapma_type).find(([, label]) => label === value.type)?.[0];
    if (!value.type || !typeChoice) throw new Error('Select a Production KPI Matrix Type.');
    const productionClass = productionClassToChoice(value.productionClass);
    const plant = data(await Apma_pmtplantsesService.get(value.plantId), 'load production KPI matrix plant');
    const mainName = buildProductionKpiMatrixMainName({ name: plant.apma_name }, value.type, value.categories);
    const record = data(await Apma_pmtproductionkpimatrixesService.create({
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      apma_type: Number(typeChoice),
      apma_categories: value.categories,
      ...(productionClass === undefined ? {} : { apma_productionclass: productionClass }),
      apma_displayorder: value.displayOrder,
    } as never), 'create production KPI matrix');
    return { ...value, id: record.apma_pmtproductionkpimatrixid, mainName };
  },

  async updateProductionKpiMatrix(id: string, value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>): Promise<ProductionKpiMatrix> {
    const typeChoice = Object.entries(Apma_pmtproductionkpimatrixesapma_type).find(([, label]) => label === value.type)?.[0];
    if (!value.type || !typeChoice) throw new Error('Select a Production KPI Matrix Type.');
    const productionClass = productionClassToChoice(value.productionClass);
    const plant = data(await Apma_pmtplantsesService.get(value.plantId), 'load production KPI matrix plant');
    const mainName = buildProductionKpiMatrixMainName({ name: plant.apma_name }, value.type, value.categories);
    data(await Apma_pmtproductionkpimatrixesService.update(id, {
      apma_mainname: mainName,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      apma_type: Number(typeChoice) as Apma_pmtproductionkpimatrixesapma_type,
      apma_categories: value.categories,
      ...(productionClass === undefined ? {} : { apma_productionclass: productionClass }),
      apma_displayorder: value.displayOrder,
    } as never), 'update production KPI matrix');
    return { ...value, id, mainName };
  },

  async deleteProductionKpiMatrix(id: string): Promise<void> {
    await Apma_pmtproductionkpimatrixesService.delete(id);
  },

  async getAeCategories(): Promise<AeCategory[]> {
    const result = await Apma_pmtaecategoriesesService.getAll({
      select: ['apma_pmtaecategoriesid', 'apma_aecategories', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_aecategories asc'],
    });
    return data(result, 'load AE categories').map((record: Apma_pmtaecategorieses) => ({
      id: record.apma_pmtaecategoriesid,
      name: record.apma_aecategories,
      displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
    }));
  },

  async createAeCategory(value: Omit<AeCategory, 'id'>): Promise<AeCategory> {
    const record = data(await Apma_pmtaecategoriesesService.create({ apma_aecategories: value.name, apma_displayorder: value.displayOrder } as never), 'create AE category');
    return { id: record.apma_pmtaecategoriesid, name: record.apma_aecategories, displayOrder: record.apma_displayorder ?? value.displayOrder };
  },

  async updateAeCategory(id: string, value: Partial<AeCategory>): Promise<AeCategory> {
    const record = data(await Apma_pmtaecategoriesesService.update(id, { apma_aecategories: value.name, apma_displayorder: value.displayOrder }), 'update AE category');
    return { id: record.apma_pmtaecategoriesid, name: record.apma_aecategories, displayOrder: record.apma_displayorder ?? 1 };
  },

  async deleteAeCategory(id: string): Promise<void> {
    await Apma_pmtaecategoriesesService.delete(id);
  },

  async getVolumePac(year: number): Promise<VolumePacRecord[]> {
    const result = await Apma_pmtvolume_pacsService.getAll({
      filter: `apma_year eq ${year}`,
      select: ['apma_pmtvolume_pacid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', 'apma_volumekt', 'apma_forecastkt', 'apma_packt'],
    });
    return data(result, 'load Volume and PAC').map((record: Apma_pmtvolume_pacs) => ({
      id: record.apma_pmtvolume_pacid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? year,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      volume: record.apma_volumekt ?? null,
      forecast: record.apma_forecastkt ?? null,
      pac: record.apma_packt ?? null,
    }));
  },

  async getAllVolumePac(): Promise<VolumePacRecord[]> {
    const result = await Apma_pmtvolume_pacsService.getAll({
      select: ['apma_pmtvolume_pacid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', 'apma_volumekt', 'apma_forecastkt', 'apma_packt'],
    });
    return data(result, 'load all Volume and PAC').map((record: Apma_pmtvolume_pacs) => ({
      id: record.apma_pmtvolume_pacid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? 0,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      volume: record.apma_volumekt ?? null,
      forecast: record.apma_forecastkt ?? null,
      pac: record.apma_packt ?? null,
    }));
  },

  async createVolumePac(value: Omit<VolumePacRecord, 'id' | 'mainName'>): Promise<VolumePacRecord> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load Volume/PAC plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load Volume/PAC production line')),
    ]);
    const mainName = buildVolumePacMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    const payload: Record<string, unknown> = {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtvolume_pacsapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
    };
    if (value.volume !== null) payload.apma_volumekt = value.volume;
    if (value.forecast !== null) payload.apma_forecastkt = value.forecast;
    if (value.pac !== null) payload.apma_packt = value.pac;
    const record = data(await Apma_pmtvolume_pacsService.create(payload as never), 'create Volume/PAC');
    return { ...value, id: record.apma_pmtvolume_pacid, mainName: record.apma_mainname };
  },

  async updateVolumePac(id: string, value: Omit<VolumePacRecord, 'id' | 'mainName'>): Promise<VolumePacRecord> {
    const [plantRecord, lineRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load Volume/PAC plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load Volume/PAC production line')),
    ]);
    const mainName = buildVolumePacMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline });
    await Apma_pmtvolume_pacsService.update(id, {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtvolume_pacsapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      apma_volumekt: value.volume,
      apma_forecastkt: value.forecast,
      apma_packt: value.pac,
    } as never);
    return { ...value, id, mainName };
  },

  async deleteVolumePac(id: string): Promise<void> {
    await Apma_pmtvolume_pacsService.delete(id);
  },

  async getAe(year: number, month: number): Promise<AeRecord[]> {
    const option = MONTH_OPTION_BASE + month - 1;
    const result = await Apma_pmtaesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${option}`,
      select: ['apma_pmtaeid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', '_apma_aecategories_value', 'apma_value'],
    });
    return data(result, 'load AE').map((record: Apma_pmtaes) => ({
      id: record.apma_pmtaeid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? year,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      categoryId: record._apma_aecategories_value ?? '',
      value: record.apma_value ?? null,
    }));
  },

  async getAllAe(): Promise<AeRecord[]> {
    const result = await Apma_pmtaesService.getAll({
      select: ['apma_pmtaeid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_productionline_value', '_apma_aecategories_value', 'apma_value'],
    });
    return data(result, 'load all AE').map((record: Apma_pmtaes) => ({
      id: record.apma_pmtaeid,
      mainName: record.apma_mainname,
      year: record.apma_year ?? 0,
      month: monthFromChoice(record.apma_month),
      plantId: record._apma_plantname_value ?? '',
      productionLineId: record._apma_productionline_value ?? '',
      categoryId: record._apma_aecategories_value ?? '',
      value: record.apma_value ?? null,
    }));
  },

  async createAe(value: Omit<AeRecord, 'id' | 'mainName'>): Promise<AeRecord> {
    const [plantRecord, lineRecord, categoryRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load AE plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load AE production line')),
      Apma_pmtaecategoriesesService.get(value.categoryId).then((result) => data(result, 'load AE category')),
    ]);
    const mainName = buildAeMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline }, { name: categoryRecord.apma_aecategories });
    const payload: Record<string, unknown> = {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtaesapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      'apma_AECategories@odata.bind': bindLookup('apma_pmtaecategorieses', value.categoryId),
    };
    if (value.value !== null) payload.apma_value = value.value;
    const record = data(await Apma_pmtaesService.create(payload as never), 'create AE');
    return { ...value, id: record.apma_pmtaeid, mainName: record.apma_mainname };
  },

  async updateAe(id: string, value: Omit<AeRecord, 'id' | 'mainName'>): Promise<AeRecord> {
    const [plantRecord, lineRecord, categoryRecord] = await Promise.all([
      Apma_pmtplantsesService.get(value.plantId).then((result) => data(result, 'load AE plant')),
      Apma_pmtproductionlinecategoriesesService.get(value.productionLineId).then((result) => data(result, 'load AE production line')),
      Apma_pmtaecategoriesesService.get(value.categoryId).then((result) => data(result, 'load AE category')),
    ]);
    const mainName = buildAeMainName(value.year, value.month, { name: plantRecord.apma_name }, { name: lineRecord.apma_productionline }, { name: categoryRecord.apma_aecategories });
    await Apma_pmtaesService.update(id, {
      apma_mainname: mainName,
      apma_year: value.year,
      apma_month: monthToChoice(value.month) as Apma_pmtaesapma_month,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', value.plantId),
      'apma_ProductionLine@odata.bind': bindLookup('apma_pmtproductionlinecategorieses', value.productionLineId),
      'apma_AECategories@odata.bind': bindLookup('apma_pmtaecategorieses', value.categoryId),
      apma_value: value.value,
    } as never);
    return { ...value, id, mainName };
  },

  async deleteAe(id: string): Promise<void> {
    await Apma_pmtaesService.delete(id);
  },
};
