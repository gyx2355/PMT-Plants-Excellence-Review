import { getClient } from '@microsoft/power-apps/data';
import { dataSourcesInfo } from '../../../.power/schemas/appschemas/dataSourcesInfo';

const ATTACHMENT_DATA_SOURCE = 'apma_pmtreportattachmentrecords';
const ATTACHMENT_COLUMN = 'apma_attachment';

export interface DataverseFileDownload {
  fileName: string;
  content: Uint8Array;
}

export async function downloadDataverseAttachment(
  attachmentId: string,
  fileName: string,
): Promise<DataverseFileDownload> {
  if (!attachmentId) {
    throw new Error('An attachment record ID is required for download.');
  }

  const result = await getClient(dataSourcesInfo).downloadFileFromRecord(
    ATTACHMENT_DATA_SOURCE,
    attachmentId,
    ATTACHMENT_COLUMN,
  );

  if (!result.success) {
    throw result.error ?? new Error('Dataverse attachment download failed.');
  }

  return {
    fileName: fileName || result.fileName || 'attachment',
    content: result.data,
  };
}

export async function saveDataverseAttachmentToBrowser(
  attachmentId: string,
  fileName: string,
): Promise<void> {
  const downloadedFile = await downloadDataverseAttachment(attachmentId, fileName);
  const contentBuffer = new ArrayBuffer(downloadedFile.content.byteLength);
  new Uint8Array(contentBuffer).set(downloadedFile.content);
  const blob = new Blob([contentBuffer]);
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = objectUrl;
  anchor.download = downloadedFile.fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}
