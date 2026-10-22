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
import type {
  PlantRepository,
  KpiDefinitionRepository,
  TargetRepository,
  MonthlyKpiResultRepository,
  ReportCategoryRepository,
  MonthlyReportRepository,
  AttachmentRepository,
} from '../repositories/interfaces';
import { Apma_pmtplantsesService } from '../../generated/services/Apma_pmtplantsesService';
import { Apma_pmtkpidefinitionsesService } from '../../generated/services/Apma_pmtkpidefinitionsesService';
import { Apma_pmttargetsService } from '../../generated/services/Apma_pmttargetsService';
import { Apma_pmtmonthlykpiresultsesService } from '../../generated/services/Apma_pmtmonthlykpiresultsesService';
import { Apma_pmtreportcategoriesesService } from '../../generated/services/Apma_pmtreportcategoriesesService';
import { Apma_pmtmonthlyreportsesService } from '../../generated/services/Apma_pmtmonthlyreportsesService';
import { Apma_pmtreportattachmentrecordsService } from '../../generated/services/Apma_pmtreportattachmentrecordsService';
import type { Apma_pmtplantses } from '../../generated/models/Apma_pmtplantsesModel';
import type { Apma_pmtkpidefinitionses } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import type { Apma_pmttargets } from '../../generated/models/Apma_pmttargetsModel';
import type { Apma_pmtmonthlykpiresultses } from '../../generated/models/Apma_pmtmonthlykpiresultsesModel';
import type { Apma_pmtmonthlyreportses } from '../../generated/models/Apma_pmtmonthlyreportsesModel';
import type { Apma_pmtreportcategorieses } from '../../generated/models/Apma_pmtreportcategoriesesModel';
import type { Apma_pmtreportattachmentrecords } from '../../generated/models/Apma_pmtreportattachmentrecordsModel';
import {
  Apma_pmtmonthlykpiresultsesapma_status,
} from '../../generated/models/Apma_pmtmonthlykpiresultsesModel';
import {
  Apma_pmtmonthlyreportsesapma_type,
} from '../../generated/models/Apma_pmtmonthlyreportsesModel';
import { Apma_pmtreportattachmentrecordsapma_month } from '../../generated/models/Apma_pmtreportattachmentrecordsModel';
import { saveDataverseAttachmentToBrowser } from './dataverseAttachmentDownload';
import { Apma_pmtkpidefinitionsesapma_kpicategory, Apma_pmtkpidefinitionsesapma_kpilogic } from '../../generated/models/Apma_pmtkpidefinitionsesModel';
import type { IOperationResult } from '@microsoft/power-apps/data';
import { buildMonthlyReportMainName, buildTargetMainName } from '../../domain/services/mainName';

const MONTH_OPTION_BASE = 457470000;
const STATUS_GREEN = 457470000;
const STATUS_YELLOW = 457470001;
const STATUS_RED = 457470002;
const REPORT_HIGHLIGHTS = 457470000;
const REPORT_LOWLIGHTS = 457470001;

function resultData<T>(result: IOperationResult<T>, operation: string): T {
  if (!result.success) {
    throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  }
  return result.data;
}

function monthFromChoice(
  value: number | string | undefined,
  operation: string
): number {
  if (value === undefined) {
    throw new Error(`Dataverse record is missing Month: ${operation}`);
  }
  const numericValue = Number(value);
  const month = numericValue >= MONTH_OPTION_BASE
    ? numericValue - MONTH_OPTION_BASE + 1
    : numericValue;
  if (month < 1 || month > 12) {
    throw new Error(`Unsupported Dataverse Month value: ${String(value)}`);
  }
  return month;
}

function monthToChoice(month: number): number {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Month must be an integer between 1 and 12: ${month}`);
  }
  return MONTH_OPTION_BASE + month - 1;
}

function categoryFromChoice(value: number | string | undefined): string {
  const numericValue = Number(value);
  return Apma_pmtkpidefinitionsesapma_kpicategory[numericValue as keyof typeof Apma_pmtkpidefinitionsesapma_kpicategory] ?? String(value ?? '');
}

function kpiLogicFromChoice(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const numericValue = Number(value);
  return Apma_pmtkpidefinitionsesapma_kpilogic[numericValue as keyof typeof Apma_pmtkpidefinitionsesapma_kpilogic] ?? String(value);
}

function statusFromChoice(value: number | string | undefined): KpiStatus {
  const numericValue = Number(value);
  const label = Apma_pmtmonthlykpiresultsesapma_status[numericValue as keyof typeof Apma_pmtmonthlykpiresultsesapma_status];
  if (label === 'Green') return KpiStatus.Green;
  if (label === 'Yellow') return KpiStatus.Amber;
  if (label === 'Red') return KpiStatus.Red;
  return KpiStatus.Missing;
}

function statusToChoice(status: KpiStatus): number | undefined {
  if (status === KpiStatus.Green) return STATUS_GREEN;
  if (status === KpiStatus.Amber) return STATUS_YELLOW;
  if (status === KpiStatus.Red) return STATUS_RED;
  return undefined;
}

function reportTypeFromChoice(value: number | string | undefined): ReportType {
  const numericValue = Number(value);
  const label = Apma_pmtmonthlyreportsesapma_type[numericValue as keyof typeof Apma_pmtmonthlyreportsesapma_type];
  return label === 'Lowlights' ? ReportType.Lowlights : ReportType.Highlights;
}

function reportTypeToChoice(type: ReportType): number {
  return type === ReportType.Lowlights ? REPORT_LOWLIGHTS : REPORT_HIGHLIGHTS;
}

function bindLookup(entitySet: string, id: string): string {
  return `/${entitySet}(${id})`;
}

function isDataverseGuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.replace(/[{}]/g, '').trim());
}

function mapPlant(record: Apma_pmtplantses): Plant {
  return {
    id: record.apma_pmtplantsid,
    name: record.apma_name,
    plantManagerId: record._apma_plantmanager_value,
    plantManager: record.apma_plantmanagername,
    productionManagerId: record._apma_productionmanager_value,
    productionManager: record.apma_productionmanagername,
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapKpiDefinition(record: Apma_pmtkpidefinitionses): KpiDefinition {
  return {
    id: record.apma_pmtkpidefinitionsid,
    name: record.apma_kpiname,
    category: categoryFromChoice(record.apma_kpicategory) as KpiCategory | string,
    unit: record.apma_unit ?? '',
    kpiLogic: kpiLogicFromChoice(record.apma_kpilogic),
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapTarget(record: Apma_pmttargets): Target {
  return {
    id: record.apma_pmttargetid,
    targetYear: record.apma_targetyear ?? 0,
    plantId: record._apma_plantname_value ?? '',
    kpiId: record._apma_kpiname_value ?? '',
    pyActual: record.apma_pyactual,
    cyTarget: record.apma_cytarget ?? null,
    kpiUnit: undefined,
  };
}

function mapMonthlyResult(record: Apma_pmtmonthlykpiresultses): MonthlyKpiResult {
  return {
    id: record.apma_pmtmonthlykpiresultsid,
    year: record.apma_year ?? 0,
    month: monthFromChoice(record.apma_month, record.apma_pmtmonthlykpiresultsid),
    plantId: record._apma_plantname_value ?? '',
    kpiId: record._apma_kpiname_value ?? '',
    targetId: record._apma_pmttarget_value,
    monthlyActual: record.apma_monthlyactual,
    ytdActual: record.apma_ytdactual,
    status: statusFromChoice(record.apma_status),
    updatedAt: record.modifiedon,
  };
}

function mapReportCategory(record: Apma_pmtreportcategorieses): ReportCategory {
  return {
    id: record.apma_pmtreportcategoriesid,
    name: record.apma_reportcategory,
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapMonthlyReport(record: Apma_pmtmonthlyreportses): MonthlyReport {
  return {
    id: record.apma_pmtmonthlyreportsid,
    mainName: record.apma_mainname,
    year: record.apma_year ?? 0,
    month: monthFromChoice(record.apma_month, record.apma_pmtmonthlyreportsid),
    plantId: record._apma_plantname_value ?? '',
    categoryId: record._apma_reportcategory_value ?? '',
    type: reportTypeFromChoice(record.apma_type),
    content: record.apma_content ?? '',
    displayOrder: record.apma_displayorder ?? Number.MAX_SAFE_INTEGER,
  };
}

function mapAttachment(record: Apma_pmtreportattachmentrecords): ReportAttachment {
  return {
    id: record.apma_pmtreportattachmentrecordid,
    monthlyReportId: record._apma_pmtmonthlyreports_value ?? '',
    title: record.apma_title ?? record.apma_mainname,
    fileName: record.apma_attachment_name,
    year: record.apma_year,
    month: record.apma_month === undefined ? undefined : monthFromChoice(record.apma_month, record.apma_pmtreportattachmentrecordid),
    plantId: record._apma_plantname_value,
  };
}

function createRecord<T>(record: Record<string, unknown>): T {
  return record as T;
}


export class DataversePlantRepository implements PlantRepository {
  async getAll(): Promise<Plant[]> {
    const result = await Apma_pmtplantsesService.getAll({
      select: ['apma_pmtplantsid', 'apma_name', 'apma_displayorder', '_apma_plantmanager_value', '_apma_productionmanager_value'],
      orderBy: ['apma_displayorder asc', 'apma_name asc'],
    });
    return resultData(result, 'load plants').map(mapPlant);
  }

  async getById(id: string): Promise<Plant | null> {
    const result = await Apma_pmtplantsesService.get(id);
    return result.success ? mapPlant(result.data) : null;
  }

  async create(plant: Omit<Plant, 'id'>): Promise<Plant> {
    const payload: Record<string, unknown> = {
      apma_name: plant.name,
      apma_displayorder: plant.displayOrder,
    };
    if (plant.plantManagerId) payload['apma_PlantManager@odata.bind'] = bindLookup('systemusers', plant.plantManagerId);
    if (plant.productionManagerId) payload['apma_ProductionManager@odata.bind'] = bindLookup('systemusers', plant.productionManagerId);
    const result = await Apma_pmtplantsesService.create(createRecord(payload));
    return mapPlant(resultData(result, 'create plant'));
  }

  async update(id: string, plant: Partial<Plant>): Promise<Plant> {
    const changes: Record<string, unknown> = {};
    if (plant.name !== undefined) changes.apma_name = plant.name;
    if (plant.displayOrder !== undefined) changes.apma_displayorder = plant.displayOrder;
    if (plant.plantManagerId) changes['apma_PlantManager@odata.bind'] = bindLookup('systemusers', plant.plantManagerId);
    if (plant.productionManagerId) changes['apma_ProductionManager@odata.bind'] = bindLookup('systemusers', plant.productionManagerId);
    const result = await Apma_pmtplantsesService.update(id, createRecord(changes));
    return mapPlant(resultData(result, 'update plant'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtplantsesService.delete(id);
  }
}

export class DataverseKpiDefinitionRepository implements KpiDefinitionRepository {
  async getAll(): Promise<KpiDefinition[]> {
    const result = await Apma_pmtkpidefinitionsesService.getAll({
      select: ['apma_pmtkpidefinitionsid', 'apma_kpiname', 'apma_kpicategory', 'apma_unit', 'apma_kpilogic', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_kpiname asc'],
    });
    return resultData(result, 'load KPI definitions').map(mapKpiDefinition);
  }

  async getById(id: string): Promise<KpiDefinition | null> {
    const result = await Apma_pmtkpidefinitionsesService.get(id);
    return result.success ? mapKpiDefinition(result.data) : null;
  }

  async create(kpi: Omit<KpiDefinition, 'id'>): Promise<KpiDefinition> {
    const category = Object.entries(Apma_pmtkpidefinitionsesapma_kpicategory).find(([, label]) => label === kpi.category)?.[0];
    const logic = Object.entries(Apma_pmtkpidefinitionsesapma_kpilogic).find(([, label]) => label === kpi.kpiLogic)?.[0];
    const result = await Apma_pmtkpidefinitionsesService.create(createRecord({
      apma_kpiname: kpi.name,
      apma_kpicategory: category === undefined ? undefined : Number(category),
      apma_unit: kpi.unit,
      apma_kpilogic: logic === undefined ? undefined : Number(logic),
      apma_displayorder: kpi.displayOrder,
    }));
    return mapKpiDefinition(resultData(result, 'create KPI definition'));
  }

  async update(id: string, kpi: Partial<KpiDefinition>): Promise<KpiDefinition> {
    const changes: Record<string, unknown> = {};
    if (kpi.name !== undefined) changes.apma_kpiname = kpi.name;
    if (kpi.unit !== undefined) changes.apma_unit = kpi.unit;
    if (kpi.displayOrder !== undefined) changes.apma_displayorder = kpi.displayOrder;
    if (kpi.kpiLogic !== undefined) {
      const logic = Object.entries(Apma_pmtkpidefinitionsesapma_kpilogic).find(([, label]) => label === kpi.kpiLogic)?.[0];
      if (logic !== undefined) changes.apma_kpilogic = Number(logic);
    }
    if (kpi.category !== undefined) {
      const category = Object.entries(Apma_pmtkpidefinitionsesapma_kpicategory).find(([, label]) => label === kpi.category)?.[0];
      if (category !== undefined) changes.apma_kpicategory = Number(category);
    }
    const result = await Apma_pmtkpidefinitionsesService.update(id, createRecord(changes));
    return mapKpiDefinition(resultData(result, 'update KPI definition'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtkpidefinitionsesService.delete(id);
  }
}

export class DataverseTargetRepository implements TargetRepository {
  async getAll(): Promise<Target[]> {
    const result = await Apma_pmttargetsService.getAll({
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets').map(mapTarget);
  }

  async getByYear(year: number): Promise<Target[]> {
    const result = await Apma_pmttargetsService.getAll({
      filter: `apma_targetyear eq ${year}`,
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets by year').map(mapTarget);
  }

  async getByPlantAndYear(plantId: string, year: number): Promise<Target[]> {
    const filters = [`apma_targetyear eq ${year}`];
    const normalizedPlantId = plantId.replace(/[{}]/g, '').trim();
    if (isDataverseGuid(normalizedPlantId)) filters.push(`_apma_plantname_value eq ${normalizedPlantId}`);
    const result = await Apma_pmttargetsService.getAll({
      filter: filters.join(' and '),
      select: ['apma_pmttargetid', 'apma_mainname', 'apma_targetyear', '_apma_plantname_value', '_apma_kpiname_value', 'apma_pyactual', 'apma_cytarget'],
    });
    return resultData(result, 'load targets by plant and year').map(mapTarget);
  }

  async create(target: Omit<Target, 'id'>): Promise<Target> {
    const [plant, kpi] = await Promise.all([
      Apma_pmtplantsesService.get(target.plantId).then((result) => mapPlant(resultData(result, 'load target plant'))),
      Apma_pmtkpidefinitionsesService.get(target.kpiId).then((result) => mapKpiDefinition(resultData(result, 'load target KPI'))),
    ]);
    const result = await Apma_pmttargetsService.create(createRecord({
      apma_mainname: buildTargetMainName(target.targetYear, plant, kpi),
      apma_targetyear: target.targetYear,
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', target.plantId),
      'apma_KPIName@odata.bind': bindLookup('apma_pmtkpidefinitionses', target.kpiId),
      apma_pyactual: target.pyActual,
      apma_cytarget: target.cyTarget,
    }));
    return mapTarget(resultData(result, 'create target'));
  }

  async update(id: string, target: Partial<Target>): Promise<Target> {
    const changes: Record<string, unknown> = {};
    if (target.targetYear !== undefined && target.plantId !== undefined && target.kpiId !== undefined) {
      const [plant, kpi] = await Promise.all([
        Apma_pmtplantsesService.get(target.plantId).then((result) => mapPlant(resultData(result, 'load target plant'))),
        Apma_pmtkpidefinitionsesService.get(target.kpiId).then((result) => mapKpiDefinition(resultData(result, 'load target KPI'))),
      ]);
      changes.apma_mainname = buildTargetMainName(target.targetYear, plant, kpi);
    }
    if (target.targetYear !== undefined) changes.apma_targetyear = target.targetYear;
    if (target.plantId !== undefined) changes['apma_PlantName@odata.bind'] = bindLookup('apma_pmtplantses', target.plantId);
    if (target.kpiId !== undefined) changes['apma_KPIName@odata.bind'] = bindLookup('apma_pmtkpidefinitionses', target.kpiId);
    if (target.pyActual !== undefined) changes.apma_pyactual = target.pyActual;
    if (target.cyTarget !== undefined) changes.apma_cytarget = target.cyTarget;
    const result = await Apma_pmttargetsService.update(id, createRecord(changes));
    return mapTarget(resultData(result, 'update target'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmttargetsService.delete(id);
  }
}

export class DataverseMonthlyKpiResultRepository implements MonthlyKpiResultRepository {
  async getAll(): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results').map(mapMonthlyResult);
  }

  async getByYear(year: number): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: `apma_year eq ${year}`,
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by year').map(mapMonthlyResult);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyKpiResult[]> {
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${monthToChoice(month)}`,
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by period').map(mapMonthlyResult);
  }

  async getByPlantAndPeriod(plantId: string, year: number, month: number): Promise<MonthlyKpiResult[]> {
    const filters = [`apma_year eq ${year}`, `apma_month eq ${monthToChoice(month)}`];
    if (isDataverseGuid(plantId)) filters.push(`_apma_plantname_value eq ${plantId}`);
    const result = await Apma_pmtmonthlykpiresultsesService.getAll({
      filter: filters.join(' and '),
      select: ['apma_pmtmonthlykpiresultsid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', '_apma_kpiname_value', '_apma_pmttarget_value', 'apma_monthlyactual', 'apma_ytdactual', 'apma_status', 'modifiedon'],
    });
    return resultData(result, 'load monthly KPI results by plant and period').map(mapMonthlyResult);
  }

  async saveBatch(results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>): Promise<MonthlyKpiResult[]> {
    const saved: MonthlyKpiResult[] = [];
    const plantNames = new Map<string, Promise<Plant>>();
    const kpiNames = new Map<string, Promise<KpiDefinition>>();
    const getPlant = (id: string) => {
      let plant = plantNames.get(id);
      if (!plant) {
        plant = Apma_pmtplantsesService.get(id).then((response) => mapPlant(resultData(response, 'load monthly KPI result plant')));
        plantNames.set(id, plant);
      }
      return plant;
    };
    const getKpi = (id: string) => {
      let kpi = kpiNames.get(id);
      if (!kpi) {
        kpi = Apma_pmtkpidefinitionsesService.get(id).then((response) => mapKpiDefinition(resultData(response, 'load monthly KPI result KPI')));
        kpiNames.set(id, kpi);
      }
      return kpi;
    };
    for (const result of results) {
      const [plant, kpi] = await Promise.all([
        getPlant(result.plantId),
        getKpi(result.kpiId),
      ]);
      const payload: Record<string, unknown> = {
        apma_mainname: [result.year, result.month, plant.name, kpi.name].join('_'),
        apma_year: result.year,
        apma_month: monthToChoice(result.month),
        'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', result.plantId),
        'apma_KPIName@odata.bind': bindLookup('apma_pmtkpidefinitionses', result.kpiId),
        apma_monthlyactual: result.monthlyActual,
        apma_ytdactual: result.ytdActual,
      };
      if (result.targetId) payload['apma_PMTTarget@odata.bind'] = bindLookup('apma_pmttargets', result.targetId);
      const status = statusToChoice(result.status);
      if (status !== undefined) payload.apma_status = status;
      const operation = result.id
        ? Apma_pmtmonthlykpiresultsesService.update(result.id, createRecord(payload))
        : Apma_pmtmonthlykpiresultsesService.create(createRecord(payload));
      saved.push(mapMonthlyResult(resultData(await operation, 'save monthly KPI result')));
    }
    return saved;
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtmonthlykpiresultsesService.delete(id);
  }
}

export class DataverseReportCategoryRepository implements ReportCategoryRepository {
  async getAll(): Promise<ReportCategory[]> {
    const result = await Apma_pmtreportcategoriesesService.getAll({
      select: ['apma_pmtreportcategoriesid', 'apma_reportcategory', 'apma_displayorder'],
      orderBy: ['apma_displayorder asc', 'apma_reportcategory asc'],
    });
    return resultData(result, 'load report categories').map(mapReportCategory);
  }

  async getById(id: string): Promise<ReportCategory | null> {
    const result = await Apma_pmtreportcategoriesesService.get(id);
    return result.success ? mapReportCategory(result.data) : null;
  }

  async create(category: Omit<ReportCategory, 'id'>): Promise<ReportCategory> {
    const result = await Apma_pmtreportcategoriesesService.create(createRecord({
      apma_reportcategory: category.name,
      apma_displayorder: category.displayOrder,
    }));
    return mapReportCategory(resultData(result, 'create report category'));
  }

  async update(id: string, category: Partial<ReportCategory>): Promise<ReportCategory> {
    const changes: Record<string, unknown> = {};
    if (category.name !== undefined) changes.apma_reportcategory = category.name;
    if (category.displayOrder !== undefined) changes.apma_displayorder = category.displayOrder;
    const result = await Apma_pmtreportcategoriesesService.update(id, createRecord(changes));
    return mapReportCategory(resultData(result, 'update report category'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtreportcategoriesesService.delete(id);
  }
}

export class DataverseMonthlyReportRepository implements MonthlyReportRepository {
  async getAll(): Promise<MonthlyReport[]> {
    const result = await Apma_pmtmonthlyreportsesService.getAll({
    });
    return resultData(result, 'load monthly reports').map(mapMonthlyReport);
  }

  async getByPeriod(year: number, month: number): Promise<MonthlyReport[]> {
    const result = await Apma_pmtmonthlyreportsesService.getAll({
      filter: `apma_year eq ${year} and apma_month eq ${monthToChoice(month)}`,
    });
    return resultData(result, 'load monthly reports by period').map(mapMonthlyReport);
  }

  async getByPlantAndPeriod(plantId: string, year: number, month: number): Promise<MonthlyReport[]> {
    const filters = [`apma_year eq ${year}`, `apma_month eq ${monthToChoice(month)}`];
    if (isDataverseGuid(plantId)) filters.push(`_apma_plantname_value eq ${plantId}`);
    const result = await Apma_pmtmonthlyreportsesService.getAll({
      filter: filters.join(' and '),
    });
    return resultData(result, 'load monthly reports by plant and period').map(mapMonthlyReport);
  }

  async getById(id: string): Promise<MonthlyReport | null> {
    const result = await Apma_pmtmonthlyreportsesService.get(id);
    return result.success ? mapMonthlyReport(result.data) : null;
  }

  async create(report: Omit<MonthlyReport, 'id'>): Promise<MonthlyReport> {
    const [plant, category] = await Promise.all([
      Apma_pmtplantsesService.get(report.plantId).then((result) => mapPlant(resultData(result, 'load monthly report plant'))),
      Apma_pmtreportcategoriesesService.get(report.categoryId).then((result) => mapReportCategory(resultData(result, 'load monthly report category'))),
    ]);
    const result = await Apma_pmtmonthlyreportsesService.create(createRecord({
      apma_mainname: buildMonthlyReportMainName(report.year, report.month, plant, report.type, category),
      apma_year: report.year,
      apma_month: monthToChoice(report.month),
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', report.plantId),
      'apma_ReportCategory@odata.bind': bindLookup('apma_pmtreportcategorieses', report.categoryId),
      apma_type: reportTypeToChoice(report.type),
      apma_content: report.content,
      apma_displayorder: report.displayOrder,
    }));
    return mapMonthlyReport(resultData(result, 'create monthly report'));
  }

  async update(id: string, report: Partial<MonthlyReport>): Promise<MonthlyReport> {
    const changes: Record<string, unknown> = {};
    if (report.plantId !== undefined && report.categoryId !== undefined && report.type !== undefined && report.year !== undefined && report.month !== undefined) {
      const [plant, category] = await Promise.all([
        Apma_pmtplantsesService.get(report.plantId).then((result) => mapPlant(resultData(result, 'load monthly report plant'))),
        Apma_pmtreportcategoriesesService.get(report.categoryId).then((result) => mapReportCategory(resultData(result, 'load monthly report category'))),
      ]);
      changes.apma_mainname = buildMonthlyReportMainName(report.year, report.month, plant, report.type, category);
    }
    if (report.content !== undefined) changes.apma_content = report.content;
    if (report.displayOrder !== undefined) changes.apma_displayorder = report.displayOrder;
    if (report.type !== undefined) changes.apma_type = reportTypeToChoice(report.type);
    if (report.month !== undefined) changes.apma_month = monthToChoice(report.month);
    if (report.year !== undefined) changes.apma_year = report.year;
    if (report.plantId !== undefined) changes['apma_PlantName@odata.bind'] = bindLookup('apma_pmtplantses', report.plantId);
    if (report.categoryId !== undefined) changes['apma_ReportCategory@odata.bind'] = bindLookup('apma_pmtreportcategorieses', report.categoryId);
    const result = await Apma_pmtmonthlyreportsesService.update(id, createRecord(changes));
    return mapMonthlyReport(resultData(result, 'update monthly report'));
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtmonthlyreportsesService.delete(id);
  }

}

export class DataverseAttachmentRepository implements AttachmentRepository {
  async getByReportId(monthlyReportId: string): Promise<ReportAttachment[]> {
    const result = await Apma_pmtreportattachmentrecordsService.getAll({
      filter: `_apma_pmtmonthlyreports_value eq ${monthlyReportId}`,
      select: ['apma_pmtreportattachmentrecordid', 'apma_mainname', 'apma_title', 'apma_attachment_name', '_apma_pmtmonthlyreports_value', '_apma_plantname_value', 'apma_month', 'apma_year'],
    });
    return resultData(result, 'load report attachments').map(mapAttachment);
  }

  async upload(monthlyReportId: string, title: string, file: File): Promise<ReportAttachment> {
    const reportResult = await Apma_pmtmonthlyreportsesService.get(monthlyReportId, {
      select: ['apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value'],
    });
    const report = resultData(reportResult, 'load monthly report for attachment');
    const plantId = report._apma_plantname_value ?? '';
    const year = report.apma_year ?? 0;
    const month = monthFromChoice(report.apma_month, monthlyReportId);
    const metadata = await Apma_pmtreportattachmentrecordsService.create(createRecord({
      apma_mainname: title,
      apma_title: title,
      apma_year: year,
      apma_month: monthToChoice(month),
      'apma_PlantName@odata.bind': bindLookup('apma_pmtplantses', plantId),
      'apma_PMTMonthlyReports@odata.bind': bindLookup('apma_pmtmonthlyreportses', monthlyReportId),
    }));
    const record = resultData(metadata, 'create attachment metadata');
    resultData(await Apma_pmtreportattachmentrecordsService.upload(record.apma_pmtreportattachmentrecordid, 'apma_attachment', file, file.name), 'upload attachment file');
    return mapAttachment(record);
  }

  async download(attachmentId: string, fileName = 'attachment'): Promise<void> {
    await saveDataverseAttachmentToBrowser(attachmentId, fileName);
  }

  async delete(id: string): Promise<void> {
    await Apma_pmtreportattachmentrecordsService.delete(id);
  }
}

export const dataverseRepositories = {
  plantRepository: new DataversePlantRepository(),
  kpiDefinitionRepository: new DataverseKpiDefinitionRepository(),
  targetRepository: new DataverseTargetRepository(),
  monthlyKpiResultRepository: new DataverseMonthlyKpiResultRepository(),
  reportCategoryRepository: new DataverseReportCategoryRepository(),
  monthlyReportRepository: new DataverseMonthlyReportRepository(),
  attachmentRepository: new DataverseAttachmentRepository(),
};

export function getAttachmentMonthChoiceLabel(value: number): string {
  return Apma_pmtreportattachmentrecordsapma_month[value as keyof typeof Apma_pmtreportattachmentrecordsapma_month] ?? String(value);
}
