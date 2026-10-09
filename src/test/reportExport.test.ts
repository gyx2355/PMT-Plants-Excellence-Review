import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { readFile } from 'node:fs/promises';
import JSZip from 'jszip';
import { ReportType, KpiStatus } from '../domain/enums';
import { buildExportKpiRows, buildExportParagraphs, buildExportVolumeGroups, orderedExportPlants } from '../pages/MonthlyReportsPage/reportExportData';
import type { MonthlyReportExportData } from '../pages/MonthlyReportsPage/reportExportData';
import { buildMonthlyReportPowerPoint, fitReportImage } from '../pages/MonthlyReportsPage/reportPowerPoint';
import { pickReportSaveLocation, REPORT_MIME_TYPE, reportFileName, writeReportFile } from '../pages/MonthlyReportsPage/reportSave';
import { MonthlyReportsPage } from '../pages/MonthlyReportsPage/MonthlyReportsPage';
import { emphasizeReportChartText, waitForReportCharts } from '../pages/MonthlyReportsPage/renderReportCharts';

const pageMocks = vi.hoisted(() => ({ exporter: vi.fn(), success: vi.fn(), error: vi.fn() }));
vi.mock('../pages/MonthlyReportsPage/exportMonthlyReport', () => ({ exportMonthlyReport: pageMocks.exporter }));
vi.mock('../hooks/useAppToast', () => ({ useAppToast: () => ({ notifySuccess: pageMocks.success, notifyError: pageMocks.error }) }));
vi.mock('../hooks/queries', () => ({
  usePlants: () => ({ data: [{ id: 'p1', name: 'Plant 1', displayOrder: 1 }], isLoading: false }),
  useReportCategories: () => ({ data: [], isLoading: false }),
  useMonthlyReports: () => ({ data: [], isLoading: false }),
  useAllTargets: () => ({ data: [], isLoading: false }),
  useReportAttachments: () => ({ data: [] }),
  useDownloadAttachment: () => ({}),
  useSaveMonthlyReport: () => ({}),
  useUploadAttachment: () => ({}),
}));

export const exportFixture: MonthlyReportExportData = {
  year: 2026, month: 9,
  plants: [{ id: 'p2', name: 'Plant 2', displayOrder: 2 }, { id: 'p1', name: 'Plant 1', displayOrder: 1 }],
  categories: [{ id: 'ehs', name: 'QEHS', displayOrder: 1 }, { id: 'production', name: 'Production Update', displayOrder: 2 }, { id: 'quality', name: 'Quality Update', displayOrder: 3 }],
  reports: [
    { id: 'r1', plantId: 'p1', year: 2026, month: 9, categoryId: 'ehs', type: ReportType.Highlights, content: 'Safety update', displayOrder: 1 },
    { id: 'r2', plantId: 'p1', year: 2026, month: 9, categoryId: 'ehs', type: ReportType.Lowlights, content: '   ', displayOrder: 1 },
    { id: 'r3', plantId: 'p1', year: 2026, month: 9, categoryId: 'quality', type: ReportType.Lowlights, content: 'Quality issue', displayOrder: 1 },
  ],
  kpis: [{ id: 'k1', name: 'Volume', category: 'Production', unit: 't', displayOrder: 1 }, { id: 'k2', name: 'Unused', category: 'Quality', unit: '%', displayOrder: 2 }],
  targets: [{ id: 't1', targetYear: 2026, plantId: 'p1', kpiId: 'k1', cyTarget: 0 }, { id: 't2', targetYear: 2026, plantId: 'p1', kpiId: 'k2', cyTarget: null }],
  monthlyResults: [{ id: 'm1', year: 2026, month: 9, plantId: 'p1', kpiId: 'k1', monthlyActual: 0, ytdActual: 10, status: KpiStatus.Green }],
  lines: [], lineMatrices: [], aeCategories: [], aeRecords: [], volumeRecords: [], productionMatrices: [], productionRecords: [],
};

describe('Monthly PowerPoint export data', () => {
  it('exports the requested Pudong and Changhua line groups without OP on line charts', () => {
    const names = ['Belt-DE', 'REX', 'FHF', 'Belt-Cast'];
    const data = { ...exportFixture, lines: names.map((name, index) => ({ id: `line-${index}`, name, displayOrder: index })),
      volumeRecords: names.map((_name, index) => ({ id: `volume-${index}`, mainName: '', plantId: 'p1', year: 2026, month: 9, productionLineId: `line-${index}`, volume: index + 1, forecast: index + 2, pac: index + 3 })) };
    const pudong = buildExportVolumeGroups(data, { id: 'p1', name: 'Pudong-TPU', displayOrder: 1 });
    expect(pudong.map((group) => group.label)).toEqual([null, 'Belt-DE + REX', 'FHF']);
    expect(pudong[0].points[0].label).toBe('OP');
    expect(pudong[0].points.find((point) => point.month === 9)?.volume).toBe(10);
    expect(pudong[1].points.find((point) => point.month === 9)?.volume).toBe(3);
    expect(pudong[2].points.find((point) => point.month === 9)?.volume).toBe(3);
    expect(pudong[1].points).toHaveLength(12);
    expect(pudong[2].points.some((point) => point.label === 'OP')).toBe(false);
    const changhua = buildExportVolumeGroups(data, { id: 'p1', name: 'Changhua-TPU', displayOrder: 1 });
    expect(changhua.map((group) => group.label)).toEqual([null, 'Belt-Cast', 'REX']);
    expect(changhua[1].points.find((point) => point.month === 9)?.volume).toBe(4);
    expect(changhua[2].points.find((point) => point.month === 9)?.volume).toBe(2);
    expect(buildExportVolumeGroups(data, { id: 'p1', name: 'Yokkaichi-TPU', displayOrder: 1 })).toHaveLength(1);
  });

  it('exports every plant in display order', () => {
    expect(orderedExportPlants(exportFixture).map((plant) => plant.id)).toEqual(['p1', 'p2']);
  });
  it('omits empty Highlights/Lowlights labels and separates Quality Update', () => {
    expect(buildExportParagraphs(exportFixture, 'p1', 'operations').map((paragraph) => paragraph.text)).toEqual(['QEHS', '+ Highlights:', 'Safety update']);
    expect(buildExportParagraphs(exportFixture, 'p1', 'quality').map((paragraph) => paragraph.text)).toEqual(['Quality Update', '- Lowlights:', 'Quality issue']);
  });
  it('uses selected-month YTD and omits blank-target KPIs', () => {
    const rows = buildExportKpiRows(exportFixture, exportFixture.plants[1]);
    expect(rows).toHaveLength(1);
    expect(rows[0].monthlyActuals).toHaveLength(12);
    expect(rows[0].monthlyActuals[8]).toBe(0);
    expect(rows[0].ytdActual).toBe(10);
  });
});

describe('Monthly PowerPoint template export', () => {
  it('fits charts inside their fixed region without stretching', () => {
    const fitted = fitReportImage({ dataUrl: '', width: 1000, height: 400 }, { x: 10, y: 20, width: 500, height: 500 });
    expect(fitted).toEqual({ x: 10, y: 170, width: 500, height: 200 });
    expect(fitReportImage({ dataUrl: '', width: 1000, height: 400 }, { x: 10, y: 20, width: 500, height: 500 }, 'top')).toEqual({ x: 10, y: 20, width: 500, height: 200 });
    const previousAe = fitReportImage({ dataUrl: '', width: 280, height: 320 }, { x: 0, y: 0, width: 280, height: 1000 }, 'top');
    const narrowedAe = fitReportImage({ dataUrl: '', width: 210, height: 320 }, { x: 70, y: 0, width: 210, height: 1000 }, 'top-right');
    expect(narrowedAe.width).toBe(previousAe.width * 0.75);
    expect(narrowedAe.height).toBe(previousAe.height);
    expect(narrowedAe.x + narrowedAe.width).toBe(280);
    expect(fitReportImage({ dataUrl: '', width: 210, height: 2000 }, { x: 70, y: 0, width: 210, height: 1000 }, 'top-right')).toEqual({ x: 175, y: 0, width: 105, height: 1000 });
  });

  it('top-aligns short charts, extends titles and keeps a dense KPI table inside the slide with one font size', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 660, height: 400 };
    const kpis = Array.from({ length: 24 }, (_value, index) => ({ id: `kpi-${index}`, name: `Long KPI description for item ${index}`, category: 'Production', unit: '%', displayOrder: index }));
    const data = { ...exportFixture, plants: [exportFixture.plants[1]], kpis,
      targets: kpis.map((kpi, index) => ({ id: `target-${index}`, targetYear: 2026, plantId: 'p1', kpiId: kpi.id, pyActual: 12345.67, cyTarget: 99999.99 })) };
    const zip = await JSZip.loadAsync(await buildMonthlyReportPowerPoint(template, data, async () => ({ ae: image, volume: image, production: image, quality: image })));
    const parse = async (path: string) => new DOMParser().parseFromString(await zip.file(path)!.async('string'), 'application/xml');
    const shape = (document: Document, id: string) => Array.from(document.getElementsByTagName('p:spTree')[0].children)
      .find((child) => child.getElementsByTagName('p:cNvPr')[0]?.getAttribute('id') === id)!;
    const operations = await parse('ppt/slides/slide7.xml');
    const pictures = Array.from(operations.getElementsByTagName('p:pic'));
    const ae = pictures.find((picture) => picture.getElementsByTagName('p:cNvPr')[0].getAttribute('name') === 'report7ae')!;
    const volume = pictures.find((picture) => picture.getElementsByTagName('p:cNvPr')[0].getAttribute('name') === 'report7volume')!;
    expect(Number(ae.getElementsByTagName('a:off')[0].getAttribute('y'))).toBe(1314067);
    expect(Number(ae.getElementsByTagName('a:off')[0].getAttribute('x')) + Number(ae.getElementsByTagName('a:ext')[0].getAttribute('cx'))).toBe(211276 + 1581749);
    expect(Number(volume.getElementsByTagName('a:off')[0].getAttribute('y'))).toBe(1314067);
    expect(Number(volume.getElementsByTagName('a:ext')[0].getAttribute('cy'))).toBe(Math.round(2980906 * 400 / 660));
    const presentation = await parse('ppt/presentation.xml');
    const size = presentation.getElementsByTagName('p:sldSz')[0];
    for (const slide of [8, 9]) {
      const title = shape(await parse(`ppt/slides/slide${slide}.xml`), '2');
      const transform = title.getElementsByTagName('a:xfrm')[0];
      expect(Number(transform.getElementsByTagName('a:off')[0].getAttribute('x')) + Number(transform.getElementsByTagName('a:ext')[0].getAttribute('cx'))).toBe(Number(size.getAttribute('cx')));
      expect(title.getElementsByTagName('a:bodyPr')[0].getAttribute('wrap')).toBe('none');
    }
    const tableShape = shape(await parse('ppt/slides/slide10.xml'), '8');
    const table = tableShape.getElementsByTagName('a:tbl')[0];
    const fonts = Array.from(table.getElementsByTagName('*')).filter((value) => ['rPr', 'endParaRPr', 'defRPr'].includes(value.localName)).map((value) => value.getAttribute('sz'));
    expect(new Set(fonts).size).toBe(1);
    expect(Number(fonts[0])).toBeGreaterThan(0);
    const tableTransform = tableShape.getElementsByTagName('p:xfrm')[0];
    const top = Number(tableTransform.getElementsByTagName('a:off')[0].getAttribute('y'));
    const height = Number(tableTransform.getElementsByTagName('a:ext')[0].getAttribute('cy'));
    expect(top + height).toBeLessThan(Number(size.getAttribute('cy')));
    const rows = Array.from(table.getElementsByTagName('a:tr'));
    expect(rows).toHaveLength(25);
    expect(rows.reduce((total, row) => total + Number(row.getAttribute('h')), 0)).toBe(height);
    expect(Array.from(table.getElementsByTagName('a:tc')).every((cell) => cell.getElementsByTagName('a:p').length === 1)).toBe(true);
    expect(Array.from(table.getElementsByTagName('a:tc')).every((cell) => cell.getElementsByTagName('a:defRPr')[0]?.getAttribute('sz') === fonts[0]
      && cell.getElementsByTagName('a:endParaRPr')[0]?.getAttribute('sz') === fonts[0])).toBe(true);
  }, 20000);

  it('creates four slides per plant and retains the original cover and last page', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 1000, height: 400 };
    const result = await buildMonthlyReportPowerPoint(template, exportFixture, async () => ({ ae: image, volume: image, production: image, quality: image }));
    const zip = await JSZip.loadAsync(result);
    const original = await JSZip.loadAsync(template);
    const presentation = new DOMParser().parseFromString(await zip.file('ppt/presentation.xml')!.async('string'), 'application/xml');
    expect(presentation.getElementsByTagName('p:sldId')).toHaveLength(10);
    expect(await zip.file('ppt/slides/slide1.xml')!.async('string')).toBe(await original.file('ppt/slides/slide1.xml')!.async('string'));
    expect(await zip.file('ppt/slides/slide6.xml')!.async('string')).toBe(await original.file('ppt/slides/slide6.xml')!.async('string'));
    const operations = await zip.file('ppt/slides/slide7.xml')!.async('string');
    expect(operations).toContain('Plant 1');
    expect(operations).toContain('Sep 2026');
    expect(operations).toContain('Safety update');
    expect(operations).not.toContain('FF0000');
    expect(operations).not.toContain('Shanghai');
    expect(operations).not.toContain('custDataLst');
    expect(await zip.file('ppt/slides/_rels/slide7.xml.rels')!.async('string')).not.toContain('/tags');
    const quality = await zip.file('ppt/slides/slide9.xml')!.async('string');
    expect(quality).toContain('Quality issue');
    const table = await zip.file('ppt/slides/slide10.xml')!.async('string');
    expect(table).toContain('Volume');
    expect(table).toContain('10.00');
    expect(table).not.toContain('Unused');
    expect(table).not.toContain('LTI');
    const tableXml = new DOMParser().parseFromString(table, 'application/xml');
    expect(tableXml.getElementsByTagName('a:tr')).toHaveLength(2);
    expect(tableXml.getElementsByTagName('a:tc')).toHaveLength(34);
    expect(await zip.file('ppt/slides/slide11.xml')!.async('string')).toContain('Plant 2');
  });

  it('updates period headings and reduces font size to fit long report content', async () => {
    const template = await readFile('public/monthly-report-template.pptx');
    const image = { dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN9sAAAAASUVORK5CYII=', width: 1000, height: 400 };
    const data = { ...exportFixture, year: 2027, month: 8, plants: [exportFixture.plants[1]], reports: [{ ...exportFixture.reports[0], year: 2027, month: 8, content: Array.from({ length: 150 }, (_value, index) => `Report item ${index}: completed review and follow-up actions.`).join('\n') }] };
    const zip = await JSZip.loadAsync(await buildMonthlyReportPowerPoint(template, data, async () => ({ ae: image, volume: image, production: image, quality: image })));
    const slide = await zip.file('ppt/slides/slide7.xml')!.async('string');
    expect(slide).toContain('Aug 2027');
    expect(slide).toContain('Report item 149');
    const document = new DOMParser().parseFromString(slide, 'application/xml');
    const runs = Array.from(document.getElementsByTagName('a:rPr'));
    expect(runs.some((run) => Number(run.getAttribute('sz')) > 0 && Number(run.getAttribute('sz')) < 1000)).toBe(true);
  });
});

describe('Monthly PowerPoint save destination', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('opens the save picker synchronously before any asynchronous export work', async () => {
    const handle = { createWritable: vi.fn() };
    const picker = vi.fn().mockResolvedValue(handle);
    vi.stubGlobal('showSaveFilePicker', picker);
    const destination = pickReportSaveLocation(reportFileName(2026, 9));
    expect(picker).toHaveBeenCalledWith({ suggestedName: 'TPU monthly report_2026_09.pptx', types: [{ description: 'PowerPoint Presentation', accept: { [REPORT_MIME_TYPE]: ['.pptx'] } }] });
    expect(await destination).toBe(handle);
  });

  it('falls back for browsers without a picker and restricted embedded hosts', async () => {
    vi.stubGlobal('showSaveFilePicker', undefined);
    expect(await pickReportSaveLocation('report.pptx')).toBeNull();
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Blocked in iframe', 'SecurityError')));
    expect(await pickReportSaveLocation('report.pptx')).toBeNull();
  });

  it('preserves cancellation instead of reporting export success', async () => {
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')));
    await expect(pickReportSaveLocation('report.pptx')).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('writes and closes the selected file and aborts on write failure', async () => {
    const writable = { write: vi.fn().mockResolvedValue(undefined), close: vi.fn().mockResolvedValue(undefined), abort: vi.fn().mockResolvedValue(undefined) };
    const handle = { createWritable: vi.fn().mockResolvedValue(writable) };
    const blob = new Blob(['ppt'], { type: REPORT_MIME_TYPE });
    await writeReportFile(handle, blob);
    expect(writable.write).toHaveBeenCalledWith(blob);
    expect(writable.close).toHaveBeenCalledOnce();
    writable.write.mockRejectedValueOnce(new Error('Disk full'));
    await expect(writeReportFile(handle, blob)).rejects.toThrow('Disk full');
    expect(writable.abort).toHaveBeenCalledOnce();
  });
});

describe('Monthly Reports export button', () => {
  const createUrl = vi.fn();
  const revokeUrl = vi.fn();

  beforeEach(() => {
    pageMocks.exporter.mockReset().mockResolvedValue(new Blob(['test PPT'], { type: REPORT_MIME_TYPE }));
    pageMocks.success.mockReset();
    pageMocks.error.mockReset();
    createUrl.mockReset().mockReturnValue('blob:test-report');
    revokeUrl.mockReset();
    vi.stubGlobal('showSaveFilePicker', undefined);
    vi.stubGlobal('URL', Object.assign(class extends URL {}, { createObjectURL: createUrl, revokeObjectURL: revokeUrl }));
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it('shows a real download link that stays valid until the dialog closes', async () => {
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    const link = await screen.findByRole('link', { name: 'Download PPT' });
    expect(link.getAttribute('href')).toBe('blob:test-report');
    expect(link.getAttribute('download')).toMatch(/TPU monthly report_\d{4}_\d{2}\.pptx/);
    expect(pageMocks.exporter).toHaveBeenCalledOnce();
    expect(revokeUrl).not.toHaveBeenCalled();
    link.addEventListener('click', (event) => event.preventDefault());
    fireEvent.click(link);
    expect(revokeUrl).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(revokeUrl).toHaveBeenCalledWith('blob:test-report'));
    expect(pageMocks.success).toHaveBeenCalledWith('Report ready', expect.any(String));
  });

  it('opens the save picker on click and reports success only after writing the file', async () => {
    const writable = { write: vi.fn().mockResolvedValue(undefined), close: vi.fn().mockResolvedValue(undefined), abort: vi.fn().mockResolvedValue(undefined) };
    const picker = vi.fn().mockResolvedValue({ createWritable: vi.fn().mockResolvedValue(writable) });
    vi.stubGlobal('showSaveFilePicker', picker);
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    expect(picker).toHaveBeenCalledOnce();
    await waitFor(() => expect(writable.close).toHaveBeenCalledOnce());
    expect(pageMocks.success).toHaveBeenCalledWith('Report saved', expect.any(String));
    expect(screen.queryByRole('link', { name: 'Download PPT' })).toBeNull();
  });

  it('does not generate or report success if the save picker is cancelled', async () => {
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(new DOMException('Cancelled', 'AbortError')));
    render(createElement(MonthlyReportsPage));
    fireEvent.click(screen.getByRole('button', { name: 'Export Report' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Export Report' }).hasAttribute('disabled')).toBe(false));
    expect(pageMocks.exporter).not.toHaveBeenCalled();
    expect(pageMocks.success).not.toHaveBeenCalled();
    expect(pageMocks.error).not.toHaveBeenCalled();
  });
});

describe('Report chart rendering readiness', () => {
  let host: HTMLDivElement;
  const bounds = { x: 0, y: 0, left: 0, top: 0, right: 260, bottom: 275, width: 260, height: 275, toJSON: () => ({}) };
  const surface = (ready = true) => {
    const chart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chart.setAttribute('class', 'recharts-surface');
    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    axis.setAttribute('class', 'recharts-cartesian-axis');
    chart.appendChild(axis);
    vi.spyOn(chart, 'getBoundingClientRect').mockReturnValue(ready ? bounds : { ...bounds, width: 0, height: 0 });
    return chart;
  };

  beforeEach(() => {
    vi.useFakeTimers();
    host = document.createElement('div');
    host.className = 'recharts-wrapper';
    document.body.appendChild(host);
  });
  afterEach(() => { host.remove(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it('bolds only exported tick, legend and label text without altering other text', () => {
    host.innerHTML = '<svg><text class="recharts-cartesian-axis-tick-value">Jan</text><g class="recharts-label-list"><text>75%</text></g><text class="unrelated">Title</text><text class="recharts-label">Quantity (t)</text></svg><span class="recharts-legend-item-text">Volume</span><div data-report-legend>Waste</div>';
    emphasizeReportChartText(host);
    for (const selector of ['.recharts-cartesian-axis-tick-value', '.recharts-label-list text', '.recharts-legend-item-text', '[data-report-legend]']) {
      expect((host.querySelector(selector) as HTMLElement).style.fontWeight).toBe('700');
    }
    expect((host.querySelector('.unrelated') as SVGElement).style.fontWeight).toBe('');
    expect((host.querySelector('.recharts-label') as SVGElement).style.fontWeight).toBe('');
  });

  it('waits for a chart that appears later than two animation frames', async () => {
    const ready = waitForReportCharts(host, 1, 'Plant 1 / AE');
    setTimeout(() => host.appendChild(surface()), 250);
    await vi.advanceTimersByTimeAsync(250);
    await expect(ready).resolves.toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not treat legend icon surfaces as zero-sized unfinished charts', async () => {
    host.appendChild(surface());
    const legend = document.createElement('div');
    legend.className = 'recharts-default-legend';
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'recharts-surface');
    legend.appendChild(icon);
    host.appendChild(legend);
    await expect(waitForReportCharts(host, 1, 'Plant 1 / AE')).resolves.toBeUndefined();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('waits for every production line and a non-zero layout', async () => {
    host.appendChild(surface());
    let finished = false;
    const ready = waitForReportCharts(host, 2, 'Plant 1 / AE').then(() => { finished = true; });
    await vi.advanceTimersByTimeAsync(100);
    expect(finished).toBe(false);
    const second = surface(false);
    host.appendChild(second);
    await vi.advanceTimersByTimeAsync(100);
    expect(finished).toBe(false);
    vi.mocked(second.getBoundingClientRect).mockReturnValue(bounds);
    second.setAttribute('width', '260');
    await ready;
    expect(finished).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('reports the plant and chart on timeout and disconnects its observer', async () => {
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const ready = waitForReportCharts(host, 1, 'Plant 2 / Quality', 1000);
    const failed = expect(ready).rejects.toThrow('Plant 2 / Quality: chart layout did not become ready within 1 seconds.');
    await vi.advanceTimersByTimeAsync(1000);
    await failed;
    expect(disconnect).toHaveBeenCalledOnce();
  });
});