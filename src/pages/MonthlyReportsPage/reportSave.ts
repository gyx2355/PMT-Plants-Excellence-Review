export const REPORT_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

export interface ReportSaveHandle {
  createWritable(): Promise<{
    write(data: Blob): Promise<void>;
    close(): Promise<void>;
    abort(): Promise<void>;
  }>;
}

type ReportSaveWindow = Window & {
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: Array<{ description: string; accept: Record<string, string[]> }>;
  }) => Promise<ReportSaveHandle>;
};

export function reportFileName(year: number, month: number): string {
  return `TPU monthly report_${year}_${String(month).padStart(2, '0')}.pptx`;
}

export async function pickReportSaveLocation(fileName: string): Promise<ReportSaveHandle | null> {
  const browser = window as ReportSaveWindow;
  if (!browser.showSaveFilePicker) return null;
  try {
    return await browser.showSaveFilePicker({
      suggestedName: fileName,
      types: [{ description: 'PowerPoint Presentation', accept: { [REPORT_MIME_TYPE]: ['.pptx'] } }],
    });
  } catch (failure) {
    if (failure instanceof DOMException && ['SecurityError', 'NotAllowedError'].includes(failure.name)) return null;
    throw failure;
  }
}

export async function writeReportFile(handle: ReportSaveHandle, blob: Blob): Promise<void> {
  const writable = await handle.createWritable();
  try {
    await writable.write(blob);
    await writable.close();
  } catch (failure) {
    await writable.abort().catch(() => {});
    throw failure;
  }
}