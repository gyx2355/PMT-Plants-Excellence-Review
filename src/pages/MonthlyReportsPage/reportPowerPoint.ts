import JSZip from 'jszip';
import type { Plant } from '../../domain/models';
import { buildExportKpiRows, buildExportParagraphs, orderedExportPlants } from './reportExportData';
import type { MonthlyReportExportData, ReportParagraph } from './reportExportData';

const NS = {
  a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
  p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  rel: 'http://schemas.openxmlformats.org/package/2006/relationships',
  content: 'http://schemas.openxmlformats.org/package/2006/content-types',
};
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export interface ExportImage { dataUrl: string; width: number; height: number }
export interface PlantReportImages { ae: ExportImage; volume: ExportImage; production: ExportImage; quality: ExportImage }
interface ImageBox { x: number; y: number; width: number; height: number }

const nodes = (parent: Document | Element, namespace: string, name: string) => Array.from(parent.getElementsByTagNameNS(namespace, name));
const first = (parent: Document | Element, namespace: string, name: string) => nodes(parent, namespace, name)[0];
const xml = (value: string) => {
  const document = new DOMParser().parseFromString(value, 'application/xml');
  if (document.getElementsByTagName('parsererror').length) throw new Error('The PowerPoint template contains invalid XML.');
  return document;
};
const serialize = (document: Document) => new XMLSerializer().serializeToString(document);
const element = (document: Document, namespace: string, name: string, attributes: Record<string, string | number> = {}) => {
  const value = document.createElementNS(namespace, name);
  Object.entries(attributes).forEach(([key, attribute]) => value.setAttribute(key, String(attribute)));
  return value;
};
async function readXml(zip: JSZip, path: string) {
  const file = zip.file(path);
  if (!file) throw new Error(`The report template is missing ${path}.`);
  return xml(await file.async('string'));
}
function shapeById(document: Document, id: number): Element {
  const tree = first(document, NS.p, 'spTree');
  const shape = Array.from(tree.children).find((child) => first(child, NS.p, 'cNvPr')?.getAttribute('id') === String(id));
  if (!shape) throw new Error(`The report template has changed: shape ${id} was not found.`);
  return shape;
}
function boxOf(shape: Element): ImageBox {
  const transform = first(shape, NS.a, 'xfrm') ?? first(shape, NS.p, 'xfrm');
  const offset = first(transform, NS.a, 'off');
  const extent = first(transform, NS.a, 'ext');
  return { x: Number(offset.getAttribute('x')), y: Number(offset.getAttribute('y')), width: Number(extent.getAttribute('cx')), height: Number(extent.getAttribute('cy')) };
}
export function fitReportImage(image: ExportImage, box: ImageBox, alignment: 'center' | 'top' | 'top-right' = 'center'): ImageBox {
  const scale = Math.min(box.width / image.width, box.height / image.height);
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  return { x: Math.round(box.x + (alignment === 'top-right' ? box.width - width : (box.width - width) / 2)), y: alignment === 'center' ? Math.round(box.y + (box.height - height) / 2) : box.y, width, height };
}
function removeMarkers(document: Document) {
  const tree = first(document, NS.p, 'spTree');
  Array.from(tree.children).forEach((shape) => {
    const properties = Array.from(shape.children).find((child) => child.localName === 'spPr');
    const line = properties && Array.from(properties.children).find((child) => child.localName === 'ln');
    if (line && nodes(line, NS.a, 'srgbClr').some((color) => ['FF0000', 'C00000'].includes(color.getAttribute('val')?.toUpperCase() ?? ''))) shape.remove();
  });
}
function replaceText(shape: Element, text: string) {
  const texts = nodes(shape, NS.a, 't');
  if (!texts.length) {
    const paragraph = first(shape, NS.a, 'p');
    if (!paragraph) throw new Error('A report text placeholder is missing.');
    const document = shape.ownerDocument;
    const run = element(document, NS.a, 'a:r');
    const properties = element(document, NS.a, 'a:rPr');
    const original = first(paragraph, NS.a, 'endParaRPr');
    if (original) {
      Array.from(original.attributes).forEach((attribute) => properties.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value));
      Array.from(original.childNodes).forEach((child) => properties.appendChild(child.cloneNode(true)));
    }
    run.appendChild(properties);
    const value = element(document, NS.a, 'a:t');
    run.appendChild(value);
    paragraph.insertBefore(run, original ?? null);
    texts.push(value);
  }
  texts[0].textContent = text;
  texts.slice(1).forEach((value) => { value.textContent = ''; });
  const body = first(shape, NS.a, 'bodyPr');
  if (body) {
    Array.from(body.children).filter((child) => ['noAutofit', 'spAutoFit', 'normAutofit'].includes(child.localName)).forEach((child) => child.remove());
    body.appendChild(element(shape.ownerDocument, NS.a, 'a:normAutofit'));
  }
}
function updatePlantTitle(document: Document, id: number, plant: Plant) {
  const shape = shapeById(document, id);
  const title = nodes(shape, NS.a, 't').map((text) => text.textContent ?? '').join('');
  replaceText(shape, title.replace('Shanghai', plant.name));
}

function widenReportTitle(document: Document, slideWidth: number) {
  const shape = shapeById(document, 2);
  const transform = first(shape, NS.a, 'xfrm');
  const left = Number(first(transform, NS.a, 'off').getAttribute('x'));
  first(transform, NS.a, 'ext').setAttribute('cx', String(slideWidth - left));
  first(shape, NS.a, 'bodyPr').setAttribute('wrap', 'none');
}

function fitParagraphFont(paragraphs: ReportParagraph[], box: ImageBox, preferred: number): number {
  const widthPoints = Math.max(10, box.width / 12700 - 24);
  const heightPoints = Math.max(10, box.height / 12700 - 12);
  const canvas = typeof CanvasRenderingContext2D !== 'undefined' ? document.createElement('canvas') : null;
  const context = canvas?.getContext('2d');
  for (let size = preferred; size >= 1; size -= 0.5) {
    if (context) context.font = `${size * 96 / 72}px Arial`;
    const measure = (text: string) => context ? context.measureText(text).width * 72 / 96 : Array.from(text).reduce((width, character) => width + (character.charCodeAt(0) > 127 ? size : size * 0.55), 0);
    let lineCount = 0;
    for (const paragraph of paragraphs) {
      let lineWidth = 0;
      lineCount += 1;
      for (const word of paragraph.text.split(/(\s+)/)) {
        const wordWidth = measure(word);
        if (lineWidth > 0 && lineWidth + wordWidth > widthPoints) { lineCount += 1; lineWidth = 0; }
        if (wordWidth > widthPoints) lineCount += Math.ceil(wordWidth / widthPoints) - 1;
        lineWidth += wordWidth % widthPoints;
      }
    }
    if (lineCount * size * 1.3 <= heightPoints) return size;
  }
  return 1;
}
function fillReportText(document: Document, id: number, paragraphs: ReportParagraph[]) {
  const shape = shapeById(document, id);
  const body = first(shape, NS.p, 'txBody');
  const originals = nodes(body, NS.a, 'p');
  const baseRun = first(body, NS.a, 'rPr');
  const fontSize = fitParagraphFont(paragraphs, boxOf(shape), Number(baseRun?.getAttribute('sz') ?? 1600) / 100);
  originals.forEach((paragraph) => paragraph.remove());
  for (const paragraph of paragraphs) {
    const value = element(document, NS.a, 'a:p');
    const properties = element(document, NS.a, 'a:pPr', { marL: 0, indent: 0 });
    properties.appendChild(element(document, NS.a, 'a:buNone'));
    const lineSpacing = element(document, NS.a, 'a:lnSpc');
    lineSpacing.appendChild(element(document, NS.a, 'a:spcPct', { val: 110000 }));
    properties.appendChild(lineSpacing);
    value.appendChild(properties);
    const run = element(document, NS.a, 'a:r');
    const runProperties = baseRun ? baseRun.cloneNode(true) as Element : element(document, NS.a, 'a:rPr');
    runProperties.setAttribute('sz', String(Math.round(fontSize * 100)));
    runProperties.setAttribute('b', paragraph.kind === 'content' ? '0' : '1');
    nodes(runProperties, NS.a, 'solidFill').forEach((fill) => fill.remove());
    const fill = element(document, NS.a, 'a:solidFill');
    fill.appendChild(element(document, NS.a, 'a:srgbClr', { val: '000000' }));
    runProperties.appendChild(fill);
    run.appendChild(runProperties);
    const text = element(document, NS.a, 'a:t');
    text.textContent = paragraph.kind === 'content' ? `o  ${paragraph.text}` : paragraph.text;
    run.appendChild(text);
    value.appendChild(run);
    body.appendChild(value);
  }
  if (paragraphs.length === 0) body.appendChild(element(document, NS.a, 'a:p'));
  const bodyProperties = first(body, NS.a, 'bodyPr');
  bodyProperties.setAttribute('wrap', 'square');
  Array.from(bodyProperties.children).filter((child) => ['noAutofit', 'spAutoFit', 'normAutofit'].includes(child.localName)).forEach((child) => child.remove());
  bodyProperties.appendChild(element(document, NS.a, 'a:normAutofit', { fontScale: 100000, lnSpcReduction: 0 }));
}

function fillKpiTable(document: Document, data: MonthlyReportExportData, plant: Plant, slidePosition: number, slideHeight: number) {
  const shape = shapeById(document, 8);
  const table = first(shape, NS.a, 'tbl');
  const templateRows = nodes(table, NS.a, 'tr');
  const header = templateRows[0].cloneNode(true) as Element;
  const rowTemplate = templateRows[1];
  const headerHeight = Number(header.getAttribute('h'));
  const rowHeight = Number(rowTemplate.getAttribute('h'));
  const columnWidths = nodes(table, NS.a, 'gridCol').map((column) => Number(column.getAttribute('w')) / 12700);
  const rows = buildExportKpiRows(data, plant);
  const headings = ['Plant KPI', 'Unit', `${data.year - 1}\nActual`, `${data.year}\nTarget`, ...MONTHS, 'YTD'];
  const format = (value: number | null | undefined) => value == null ? '' : value.toFixed(2);
  const values = rows.map((row) => [row.kpi.name, row.kpi.unit, format(row.target?.pyActual), format(row.target?.cyTarget), ...row.monthlyActuals.map(format), format(row.ytdActual)]);
  templateRows.forEach((row) => row.remove());
  const originalBox = boxOf(shape);
  const totalHeight = Math.min(originalBox.height, slideHeight - originalBox.y - 127000);
  const heightScale = Math.min(1, totalHeight / (headerHeight + rowHeight * values.length));
  const cellRows = [headings, ...values];
  let fontSize = 1;
  for (let candidate = 10; candidate >= 1; candidate -= 0.25) {
    const fits = cellRows.every((cells, rowIndex) => {
      const heightPoints = (rowIndex === 0 ? headerHeight : rowHeight) * heightScale / 12700;
      return cells.every((text, columnIndex) => {
        const widthPoints = Math.max(1, columnWidths[columnIndex] - 14);
        const widths = text.split('\n').map((line) => Array.from(line).reduce((width, character) => width + (character.charCodeAt(0) > 127 ? candidate : candidate * 0.62), 0));
        const lineCount = widths.reduce((count, width) => count + (columnIndex === 0 ? Math.max(1, Math.ceil(width / widthPoints)) : 1), 0);
        return (columnIndex === 0 || widths.every((width) => width <= widthPoints)) && lineCount * candidate * 1.3 + 8 <= heightPoints;
      });
    });
    if (fits) { fontSize = candidate; break; }
  }
  let fittedHeight = 0;
  cellRows.forEach((cells, index) => {
    const row = index === 0 ? header : rowTemplate.cloneNode(true) as Element;
    const height = Math.floor((index === 0 ? headerHeight : rowHeight) * heightScale);
    row.setAttribute('h', String(height));
    fittedHeight += height;
    const tableCells = nodes(row, NS.a, 'tc');
    if (tableCells.length !== headings.length) throw new Error('The KPI table template must contain 17 columns.');
    tableCells.forEach((cell, cellIndex) => {
      replaceText(cell, cells[cellIndex]);
      nodes(cell, NS.a, 'p').slice(1).forEach((paragraph) => paragraph.remove());
      nodes(cell, NS.a, 'r').filter((run) => !first(run, NS.a, 't')?.textContent).forEach((run) => run.remove());
      const paragraph = first(cell, NS.a, 'p');
      let paragraphProperties = first(paragraph, NS.a, 'pPr');
      if (!paragraphProperties) {
        paragraphProperties = element(document, NS.a, 'a:pPr');
        paragraph.insertBefore(paragraphProperties, paragraph.firstChild);
      }
      if (!first(paragraphProperties, NS.a, 'defRPr')) paragraphProperties.appendChild(element(document, NS.a, 'a:defRPr'));
      if (!first(paragraph, NS.a, 'endParaRPr')) paragraph.appendChild(element(document, NS.a, 'a:endParaRPr'));
      for (const name of ['rPr', 'endParaRPr', 'defRPr']) nodes(cell, NS.a, name).forEach((properties) => properties.setAttribute('sz', String(Math.round(fontSize * 100))));
      const body = first(cell, NS.a, 'bodyPr');
      body.setAttribute('wrap', cellIndex === 0 ? 'square' : 'none');
      Array.from(body.children).filter((child) => ['normAutofit', 'spAutoFit', 'noAutofit'].includes(child.localName)).forEach((child) => child.remove());
      body.appendChild(element(document, NS.a, 'a:noAutofit'));
    });
    table.appendChild(row);
  });
  first(first(shape, NS.p, 'xfrm'), NS.a, 'ext').setAttribute('cy', String(fittedHeight));
  replaceText(shapeById(document, 3), String(slidePosition));
}

function addPng(zip: JSZip, document: Document, relationships: Document, region: ImageBox, image: ExportImage, name: string, alignment: 'center' | 'top' | 'top-right' = 'center') {
  if (!image.dataUrl.startsWith('data:image/png;base64,')) throw new Error('An exported chart is not a PNG image.');
  zip.file(`ppt/media/${name}.png`, image.dataUrl.split(',')[1], { base64: true });
  const relationshipId = `rId${name}`;
  relationships.documentElement.appendChild(element(relationships, NS.rel, 'Relationship', { Id: relationshipId, Type: `${NS.r}/image`, Target: `../media/${name}.png` }));
  const tree = first(document, NS.p, 'spTree');
  const nextId = Math.max(1, ...nodes(tree, NS.p, 'cNvPr').map((properties) => Number(properties.getAttribute('id')))) + 1;
  const picture = element(document, NS.p, 'p:pic');
  const nonVisual = element(document, NS.p, 'p:nvPicPr');
  nonVisual.appendChild(element(document, NS.p, 'p:cNvPr', { id: nextId, name }));
  const pictureProperties = element(document, NS.p, 'p:cNvPicPr');
  pictureProperties.appendChild(element(document, NS.a, 'a:picLocks', { noChangeAspect: 1 }));
  nonVisual.appendChild(pictureProperties);
  nonVisual.appendChild(element(document, NS.p, 'p:nvPr'));
  picture.appendChild(nonVisual);
  const fill = element(document, NS.p, 'p:blipFill');
  const blip = element(document, NS.a, 'a:blip');
  blip.setAttributeNS(NS.r, 'r:embed', relationshipId);
  fill.appendChild(blip);
  const stretch = element(document, NS.a, 'a:stretch');
  stretch.appendChild(element(document, NS.a, 'a:fillRect'));
  fill.appendChild(stretch);
  picture.appendChild(fill);
  const properties = element(document, NS.p, 'p:spPr');
  const fitted = fitReportImage(image, region, alignment);
  const transform = element(document, NS.a, 'a:xfrm');
  transform.appendChild(element(document, NS.a, 'a:off', { x: fitted.x, y: fitted.y }));
  transform.appendChild(element(document, NS.a, 'a:ext', { cx: fitted.width, cy: fitted.height }));
  properties.appendChild(transform);
  const geometry = element(document, NS.a, 'a:prstGeom', { prst: 'rect' });
  geometry.appendChild(element(document, NS.a, 'a:avLst'));
  properties.appendChild(geometry);
  picture.appendChild(properties);
  const extensions = Array.from(tree.children).find((child) => child.localName === 'extLst');
  tree.insertBefore(picture, extensions ?? null);
}

export async function buildMonthlyReportPowerPoint(
  template: ArrayBuffer | Uint8Array,
  data: MonthlyReportExportData,
  renderPlant: (plant: Plant) => Promise<PlantReportImages>,
  onProgress: (message: string) => void = () => {},
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(template);
  const presentation = await readXml(zip, 'ppt/presentation.xml');
  const relationships = await readXml(zip, 'ppt/_rels/presentation.xml.rels');
  const contentTypes = await readXml(zip, '[Content_Types].xml');
  const slideSize = first(presentation, NS.p, 'sldSz');
  const slideWidth = Number(slideSize.getAttribute('cx'));
  const slideHeight = Number(slideSize.getAttribute('cy'));
  const slideIds = first(presentation, NS.p, 'sldIdLst');
  if (slideIds.children.length !== 6) throw new Error('The monthly report template must contain six slides.');
  const plants = orderedExportPlants(data);
  if (plants.length === 0) throw new Error('No plants are available to export.');
  nodes(relationships, NS.rel, 'Relationship').filter((relationship) => relationship.getAttribute('Type') === `${NS.r}/slide`).forEach((relationship) => relationship.remove());
  slideIds.replaceChildren();
  let position = 0;
  const appendSlide = (number: number) => {
    position += 1;
    const relationId = `rIdReportSlide${position}`;
    const slide = element(presentation, NS.p, 'p:sldId', { id: 255 + position });
    slide.setAttributeNS(NS.r, 'r:id', relationId);
    slideIds.appendChild(slide);
    relationships.documentElement.appendChild(element(relationships, NS.rel, 'Relationship', { Id: relationId, Type: `${NS.r}/slide`, Target: `slides/slide${number}.xml` }));
  };
  appendSlide(1);
  for (const [plantIndex, plant] of plants.entries()) {
    onProgress(`Exporting ${plant.name} (${plantIndex + 1}/${plants.length})`);
    const images = await renderPlant(plant);
    for (const templateNumber of [2, 3, 4, 5]) {
      const slideNumber = 7 + plantIndex * 4 + templateNumber - 2;
      const document = await readXml(zip, `ppt/slides/slide${templateNumber}.xml`);
      const slideRelationships = await readXml(zip, `ppt/slides/_rels/slide${templateNumber}.xml.rels`);
      nodes(document, NS.p, 'custDataLst').forEach((value) => value.remove());
      nodes(slideRelationships, NS.rel, 'Relationship').filter((relationship) => /\/(notesSlide|comments|tags)$/.test(relationship.getAttribute('Type') ?? '')).forEach((relationship) => relationship.remove());
      if (templateNumber === 2) {
        const aeRegion = boxOf(shapeById(document, 15));
        const volumeRegion = boxOf(shapeById(document, 33));
        const title = shapeById(document, 4);
        replaceText(title, nodes(title, NS.a, 't').map((text) => text.textContent ?? '').join('').replace(/Sep\s*2026/, `${MONTHS[data.month - 1]} ${data.year}`));
        replaceText(shapeById(document, 18), plant.name);
        fillReportText(document, 3, buildExportParagraphs(data, plant.id, 'operations'));
        for (const id of [17, 23, 5, 25, 28, 26, 27, 29, 30, 31, 21, 22, 6]) shapeById(document, id).remove();
        const narrowAeRegion = { ...aeRegion, x: aeRegion.x + aeRegion.width * 0.25, width: aeRegion.width * 0.75 };
        addPng(zip, document, slideRelationships, narrowAeRegion, images.ae, `report${slideNumber}ae`, 'top-right');
        addPng(zip, document, slideRelationships, volumeRegion, images.volume, `report${slideNumber}volume`, 'top');
      } else if (templateNumber === 3 || templateNumber === 4) {
        const production = templateNumber === 3;
        const chartRegion = boxOf(shapeById(document, production ? 14 : 22));
        updatePlantTitle(document, 2, plant);
        widenReportTitle(document, slideWidth);
        fillReportText(document, production ? 10 : 17, buildExportParagraphs(data, plant.id, production ? 'production' : 'quality'));
        shapeById(document, production ? 12 : 6).remove();
        addPng(zip, document, slideRelationships, chartRegion, production ? images.production : images.quality, `report${slideNumber}chart`);
      } else {
        updatePlantTitle(document, 2, plant);
        fillKpiTable(document, data, plant, position + 1, slideHeight);
      }
      removeMarkers(document);
      appendSlide(slideNumber);
      zip.file(`ppt/slides/slide${slideNumber}.xml`, serialize(document));
      zip.file(`ppt/slides/_rels/slide${slideNumber}.xml.rels`, serialize(slideRelationships));
      contentTypes.documentElement.appendChild(element(contentTypes, NS.content, 'Override', { PartName: `/ppt/slides/slide${slideNumber}.xml`, ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml' }));
    }
  }
  appendSlide(6);
  if (!nodes(contentTypes, NS.content, 'Default').some((value) => value.getAttribute('Extension') === 'png')) contentTypes.documentElement.appendChild(element(contentTypes, NS.content, 'Default', { Extension: 'png', ContentType: 'image/png' }));
  nodes(presentation, NS.p, 'custShowLst').forEach((value) => value.remove());
  Array.from(presentation.getElementsByTagName('*')).filter((value) => value.localName === 'sectionLst').forEach((value) => value.remove());
  zip.file('ppt/presentation.xml', serialize(presentation));
  zip.file('ppt/_rels/presentation.xml.rels', serialize(relationships));
  zip.file('[Content_Types].xml', serialize(contentTypes));
  const properties = await readXml(zip, 'docProps/app.xml');
  const slides = Array.from(properties.getElementsByTagName('*')).find((value) => value.localName === 'Slides');
  if (slides) slides.textContent = String(position);
  zip.file('docProps/app.xml', serialize(properties));
  onProgress('Preparing PowerPoint download');
  return zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
}