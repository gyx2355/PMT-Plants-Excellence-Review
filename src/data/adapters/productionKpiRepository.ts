import type { IOperationResult } from '@microsoft/power-apps/data';
import { Apma_pmtproductionkpisService } from '../../generated/services/Apma_pmtproductionkpisService';
import { Apma_pmtproductionkpisapma_type } from '../../generated/models/Apma_pmtproductionkpisModel';
import type { Apma_pmtproductionkpis } from '../../generated/models/Apma_pmtproductionkpisModel';
import type { ProductionKpiRecord } from '../../domain/models/charts';

function data<Result>(result: IOperationResult<Result>, operation: string): Result {
  if (!result.success) throw result.error ?? new Error(`Dataverse operation failed: ${operation}`);
  return result.data;
}

export const productionKpiRepository = {
  async getAll(): Promise<ProductionKpiRecord[]> {
    const records = data(await Apma_pmtproductionkpisService.getAll({
      select: ['apma_pmtproductionkpiid', 'apma_mainname', 'apma_year', 'apma_month', '_apma_plantname_value', 'apma_type', 'apma_categories', 'apma_quantityt', 'apma_ratio'],
    }), 'load production KPI records');
    return records.flatMap((record: Apma_pmtproductionkpis) => {
      const type = record.apma_type === undefined ? undefined : Apma_pmtproductionkpisapma_type[record.apma_type];
      if (!type) return [];
      return [{
        id: record.apma_pmtproductionkpiid,
        mainName: record.apma_mainname,
        year: record.apma_year ?? 0,
        month: record.apma_month === undefined ? 0 : record.apma_month - 457470000 + 1,
        plantId: record._apma_plantname_value ?? '',
        type,
        categories: record.apma_categories ?? '',
        quantity: record.apma_quantityt ?? null,
        ratio: record.apma_ratio ?? null,
      }];
    });
  },

  async saveBatch(records: Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }>): Promise<void> {
    for (const record of records) {
      const type = Object.entries(Apma_pmtproductionkpisapma_type).find(([, label]) => label === record.type)?.[0];
      if (!type) throw new Error(`Invalid production KPI Type: ${record.type}`);
      if (!Number.isInteger(record.month) || record.month < 1 || record.month > 12) throw new Error('Invalid production KPI month.');
      const payload = {
        apma_mainname: [record.year, record.month, record.type, record.categories].join('_'),
        apma_year: record.year,
        apma_month: 457470000 + record.month - 1,
        'apma_PlantName@odata.bind': `/apma_pmtplantses(${record.plantId.replace(/[{}]/g, '').trim()})`,
        apma_type: Number(type),
        apma_categories: record.categories,
        apma_quantityt: record.quantity,
        apma_ratio: record.ratio ?? null,
      };
      const operation = record.id
        ? Apma_pmtproductionkpisService.update(record.id, payload as never)
        : Apma_pmtproductionkpisService.create(payload as never);
      data(await operation, 'save production KPI record');
    }
  },
};