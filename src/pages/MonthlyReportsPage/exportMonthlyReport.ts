import { dataverseRepositories } from '../../data/adapters/dataverseRepositories';
import { volumePacRepository } from '../../data/adapters/volumePacRepository';
import { productionKpiRepository } from '../../data/adapters/productionKpiRepository';
import { buildMonthlyReportPowerPoint } from './reportPowerPoint';
import { renderPlantReportCharts } from './renderReportCharts';
import type { MonthlyReportExportData } from './reportExportData';
import { REPORT_MIME_TYPE } from './reportSave';
import reportTemplateDataUrl from '../../assets/monthly-report-template.pptx?inline'

function dataUrlToArrayBuffer(dataUrl: string): ArrayBuffer {
  const commaIndex = dataUrl.indexOf(',')

  if (commaIndex < 0) {
    throw new Error('The embedded PowerPoint template has an invalid data URL.')
  }

  const metadata = dataUrl.slice(0, commaIndex)
  const encodedData = dataUrl.slice(commaIndex + 1)

  if (!metadata.includes(';base64')) {
    throw new Error(
      'The embedded PowerPoint template is not Base64 encoded.'
    )
  }

  const binaryString = atob(encodedData)
  const bytes = new Uint8Array(binaryString.length)

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index)
  }

  return bytes.buffer
}

export async function exportMonthlyReport(year: number, month: number, onProgress: (message: string) => void): Promise<Blob> {
  // v1 copy - current only modify export report logic
  // onProgress('Loading report data');
  // const templateResponse = await fetch(`${import.meta.env.BASE_URL}monthly-report-template.pptx`);
  // if (!templateResponse.ok) throw new Error('The monthly report PowerPoint template could not be loaded.');
  // const template = await templateResponse.arrayBuffer();

  onProgress('Loading PowerPoint template')

  const template = dataUrlToArrayBuffer(reportTemplateDataUrl)

  onProgress('Loading report data')


  const { plantRepository, kpiDefinitionRepository, targetRepository, monthlyKpiResultRepository, monthlyReportRepository, reportCategoryRepository } = dataverseRepositories;
  const [plants, kpis, targets, monthlyResults, reports, categories, lines, lineMatrices, aeCategories, aeRecords, volumeRecords, productionMatrices, productionRecords] = await Promise.all([
    plantRepository.getAll(), kpiDefinitionRepository.getAll(), targetRepository.getByYear(year), monthlyKpiResultRepository.getByYear(year),
    monthlyReportRepository.getByPeriod(year, month), reportCategoryRepository.getAll(), volumePacRepository.getProductionLines(),
    volumePacRepository.getProductionLineMatrices(), volumePacRepository.getAeCategories(), volumePacRepository.getAe(year, month),
    volumePacRepository.getVolumePac(year), volumePacRepository.getProductionKpiMatrices(), productionKpiRepository.getAll(),
  ]);
  const data: MonthlyReportExportData = { year, month, plants, kpis, targets, monthlyResults, reports, categories, lines, lineMatrices, aeCategories, aeRecords, volumeRecords, productionMatrices, productionRecords };
  const bytes = await buildMonthlyReportPowerPoint(template, data, (plant) => renderPlantReportCharts(data, plant), onProgress);
  return new Blob([new Uint8Array(bytes).buffer], { type: REPORT_MIME_TYPE });
}