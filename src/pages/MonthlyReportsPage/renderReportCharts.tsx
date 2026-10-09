import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { toPng } from 'html-to-image';
import type { Plant } from '../../domain/models';
import { AeLineChart, VolumePacChart } from '../KPIComparisonPage/KpiComparisonPage';
import { buildAeStacks } from '../KPIComparisonPage/chartMetrics';
import { MetricChart } from '../ProductionQualityPage/ProductionQualityPage';
import { buildProductionQualityMetrics } from '../ProductionQualityPage/chartMetrics';
import type { MonthlyReportExportData } from './reportExportData';
import { buildExportVolumeGroups, sameExportId } from './reportExportData';
import type { ExportImage, PlantReportImages } from './reportPowerPoint';

export function emphasizeReportChartText(host: HTMLElement): void {
  host.querySelectorAll<HTMLElement | SVGElement>('.recharts-cartesian-axis-tick-value, .recharts-legend-item-text, .recharts-label-list text, [data-report-legend]')
    .forEach((text) => { text.style.fontWeight = '700'; });
}

export function waitForReportCharts(host: HTMLElement, expectedCount: number, chartName: string, timeoutMs = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(check);
    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`${chartName}: chart layout did not become ready within ${timeoutMs / 1000} seconds.`));
    }, timeoutMs);
    function check() {
      const surfaces = Array.from(host.querySelectorAll('.recharts-wrapper > svg.recharts-surface'));
      const ready = surfaces.length === expectedCount && surfaces.every((surface) => {
        const bounds = surface.getBoundingClientRect();
        return bounds.width > 0 && bounds.height > 0 && surface.querySelector('.recharts-cartesian-axis') !== null;
      });
      if (!ready) return;
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    }
    observer.observe(host, { childList: true, subtree: true, attributes: true });
    check();
  });
}

async function snapshot(content: ReactNode, width: number, expectedCount: number, chartName: string, height?: number): Promise<ExportImage> {
  const host = document.createElement('div');
  Object.assign(host.style, { position: 'fixed', left: '-20000px', top: '0', width: `${width}px`, backgroundColor: '#FFFFFF', pointerEvents: 'none' });
  host.setAttribute('aria-hidden', 'true');
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    flushSync(() => root.render(<FluentProvider theme={webLightTheme} style={{ width, height, backgroundColor: '#FFFFFF', padding: 0 }}>{content}</FluentProvider>));
    await document.fonts.ready;
    await waitForReportCharts(host, expectedCount, chartName);
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    emphasizeReportChartText(host);
    const imageWidth = host.offsetWidth;
    const imageHeight = host.offsetHeight;
    const dataUrl = await toPng(host, { pixelRatio: 3, backgroundColor: '#FFFFFF', skipFonts: true, width: imageWidth, height: imageHeight, style: { position: 'static', inset: 'auto', insetInline: 'auto', insetBlock: 'auto' } });
    return { dataUrl, width: imageWidth, height: imageHeight };
  } finally {
    root.unmount();
    host.remove();
  }
}

export async function renderPlantReportCharts(data: MonthlyReportExportData, plant: Plant): Promise<PlantReportImages> {
  const categories = [...data.aeCategories].sort((left, right) => left.displayOrder - right.displayOrder);
  const aeRecords = data.aeRecords.filter((record) => sameExportId(record.plantId, plant.id) && record.year === data.year && record.month === data.month);
  const stacks = buildAeStacks(aeRecords.map((record) => ({ ...record, plantId: plant.id })), categories, [plant.id], []);
  const lineIds = new Set([
    ...data.lineMatrices.filter((matrix) => sameExportId(matrix.plantId, plant.id)).map((matrix) => matrix.productionLineId),
    ...aeRecords.map((record) => record.productionLineId),
  ]);
  const lines = [...data.lines].filter((line) => [...lineIds].some((id) => sameExportId(id, line.id))).sort((left, right) => left.displayOrder - right.displayOrder);
  const ae = await snapshot(<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {lines.length > 0 ? lines.map((line) => <AeLineChart key={line.id} plantId={plant.id} productionLineId={line.id} productionLineName={line.name}
        exportSize={{ width: 190, height: 275 }} categories={categories} showLabels values={stacks.find((stack) => sameExportId(stack.productionLineId, line.id))?.values ?? {}} />)
        : <AeLineChart exportSize={{ width: 190, height: 275 }} plantId={plant.id} productionLineId="" productionLineName="No AE data" categories={categories} showLabels values={{}} />}
      </div>, 210, Math.max(lines.length, 1), `${plant.name} / AE`);
  const volumeGroups = buildExportVolumeGroups(data, plant);
  const volume = await snapshot(<div style={{ width: '100%' }}>
    {volumeGroups.map((group, index) => <div key={group.label ?? 'total'} style={{ height: 400 }}>
      {group.label ? <div style={{ height: 20, fontSize: 14, fontWeight: 600, textAlign: 'center' }}>{group.label}</div> : null}
      <VolumePacChart exportSize={{ width: 660, height: index === 0 ? 400 : 380 }} data={group.points} />
    </div>)}
  </div>, 660, volumeGroups.length, `${plant.name} / Volume & PAC`, volumeGroups.length * 400);
  const categoryNames = [...new Set([...data.productionMatrices.map((matrix) => matrix.categories), ...data.productionRecords.map((record) => record.categories)])];
  const fixedColors: Record<string, string> = { liquid: '#111111', melt: '#C80046', recycle: '#F39200', fg: '#0066B3' };
  const palette = ['#0066B3', '#D13438', '#F39200', '#107C10', '#00A6A6', '#8764B8', '#69797E'];
  const colors = Object.fromEntries(categoryNames.map((name, index) => [name.trim(), fixedColors[name.trim().toLowerCase()] ?? palette[index % palette.length]]));
  const monthly = async (type: 'Production' | 'Quality') => {
    const metrics = buildProductionQualityMetrics(data.productionRecords, data.productionMatrices, plant.id, type, data.year, Array.from({ length: 12 }, (_value, index) => index + 1));
    return snapshot(<div>
      <MetricChart exportSize={{ width: 1180, height: 330 }} metrics={metrics} points={metrics.months} colors={colors} />
      <div data-report-legend style={{ display: 'flex', gap: 16, padding: '8px 12px', flexWrap: 'wrap', fontSize: 12 }}>
        {metrics.series.map((series) => <span key={series.key}><span style={{ display: 'inline-block', width: 10, height: 10, marginRight: 5, backgroundColor: colors[series.name] }} />{series.name}</span>)}
        <span><span style={{ display: 'inline-block', width: 24, height: 3, marginRight: 5, verticalAlign: 'middle', backgroundColor: '#0066B3' }} />{metrics.lineName}</span>
      </div>
    </div>, 1200, 1, `${plant.name} / ${type}`);
  };
  const production = await monthly('Production');
  const quality = await monthly('Quality');
  return { ae, volume, production, quality };
}