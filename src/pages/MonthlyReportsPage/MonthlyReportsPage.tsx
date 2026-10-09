import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { GlobalFilters } from '../../components/filters/GlobalFilters';
import { ReportFilters, type ReportFilterState } from '../../components/filters/ReportFilters';
import type { GlobalFilterState } from '../../types/filters';
import {
  useDownloadAttachment,
  useMonthlyReports,
  usePlants,
  useReportAttachments,
  useReportCategories,
  useSaveMonthlyReport,
  useUploadAttachment,
} from '../../hooks/queries';
import { useAppToast } from '../../hooks/useAppToast';
import { ErrorState } from '../../components/common/ErrorState';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory } from '../../domain/models';
import { filterMonthlyReports, groupReportsByPlantAndCategory } from './reportView';
import { getPreviousPeriod } from '../../domain/services/period';
import { pickReportSaveLocation, reportFileName, writeReportFile } from './reportSave';
import {
  Button,
  Card,
  CardHeader,
  Caption1,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Label,
  makeStyles,
  Text,
  Textarea,
  tokens,
} from '@fluentui/react-components';
import { ArrowDownload24Regular, Edit24Regular, Save24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  page: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', gap: tokens.spacingVerticalL },
  dataArea: { display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', gap: tokens.spacingVerticalL },
  plantSection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  plantCard: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, padding: tokens.spacingHorizontalL, backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium, boxShadow: tokens.shadow2 },
  plantHeading: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold, marginBottom: tokens.spacingVerticalXS },
  categorySection: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, padding: tokens.spacingHorizontalM, backgroundColor: tokens.colorNeutralBackground2, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
  categoryHeading: { fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground2 },
  reportGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: tokens.spacingHorizontalM, '@media (max-width: 800px)': { gridTemplateColumns: '1fr' } },
  reportCard: { minWidth: 0 },
  reportContent: { whiteSpace: 'pre-wrap', color: tokens.colorNeutralForeground2, minHeight: '64px', lineHeight: tokens.lineHeightBase300 },
  reportMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalM, flexWrap: 'wrap' },
  emptyContent: { color: tokens.colorNeutralForeground3, fontStyle: 'italic', minHeight: '64px' },
  dialogField: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, marginBottom: tokens.spacingVerticalM },
  attachmentList: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, marginTop: tokens.spacingVerticalS },
  attachmentRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacingHorizontalS, padding: tokens.spacingVerticalXS, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusSmall },
});

interface ReportCardProps {
  report?: MonthlyReport;
  type: ReportType;
  plantId: string;
  onEdit: (report: MonthlyReport | undefined, type: ReportType, categoryId: string, plantId: string) => void;
  categoryId: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, type, plantId, onEdit, categoryId }) => {
  const styles = useStyles();
  const { notifyError } = useAppToast();
  const attachmentsQuery = useReportAttachments(report?.id ?? null);
  const downloadMutation = useDownloadAttachment();
  const label = type === ReportType.Highlights ? 'Highlights' : 'Lowlights';

  const download = async (attachmentId: string, fileName?: string) => {
    try {
      await downloadMutation.mutateAsync({ attachmentId, fileName });
    } catch {
      notifyError('Download failed', 'The attachment could not be downloaded.');
    }
  };

  return (
    <Card className={styles.reportCard}>
      <CardHeader
        header={<Text weight="semibold" style={{ color: type === ReportType.Highlights ? '#107C10' : '#D13438' }}>{type === ReportType.Highlights ? '+ ' : '- '}{label}</Text>}
        action={<Button appearance="subtle" icon={<Edit24Regular />} onClick={() => onEdit(report, type, categoryId, plantId)} aria-label={`Edit ${label}`} />}
      />
      {report?.content ? <Text className={styles.reportContent}>{report.content}</Text> : <Text className={styles.emptyContent}>No content entered</Text>}
      <div className={styles.reportMeta}>
        <Caption1>{report?.attachmentsCount ?? attachmentsQuery.data?.length ?? 0} attachment(s)</Caption1>
        {attachmentsQuery.data && attachmentsQuery.data.length > 0 ? (
          <div className={styles.attachmentList}>
            {attachmentsQuery.data.map((attachment) => (
              <div className={styles.attachmentRow} key={attachment.id}>
                <Caption1>{attachment.fileName ?? attachment.title}</Caption1>
                <Button appearance="subtle" icon={<ArrowDownload24Regular />} onClick={() => download(attachment.id, attachment.fileName ?? attachment.title)} aria-label={`Download ${attachment.fileName ?? attachment.title}`} disabled={downloadMutation.isPending} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
};

interface ReportEditDialogProps {
  open: boolean;
  plantId: string;
  plantName: string;
  year: number;
  month: number;
  categories: ReportCategory[];
  report?: MonthlyReport;
  type: ReportType;
  categoryId: string;
  onClose: () => void;
}

const ReportEditDialog: React.FC<ReportEditDialogProps> = ({ open, plantId, plantName, year, month, categories, report, type, categoryId, onClose }) => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const saveMutation = useSaveMonthlyReport();
  const uploadMutation = useUploadAttachment();
  const [content, setContent] = useState(report?.content ?? '');
  const [displayOrder, setDisplayOrder] = useState(String(report?.displayOrder ?? 1));
  const [savedReport, setSavedReport] = useState<MonthlyReport | undefined>(report);

  const save = async () => {
    if (!plantId || categoryId === 'all') {
      notifyError('Required fields missing', 'Select a plant and report category before saving.');
      return;
    }
    try {
      const result = await saveMutation.mutateAsync({
        isEdit: Boolean(savedReport?.id),
        report: {
          id: savedReport?.id,
          year,
          month,
          plantId,
          categoryId,
          type,
          content,
          displayOrder: Number(displayOrder) || 1,
        },
      });
      setSavedReport(result);
      notifySuccess('Report saved', 'The monthly report content was saved to Dataverse.');
      onClose();
    } catch {
      notifyError('Save failed', 'The monthly report could not be saved.');
    }
  };

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !savedReport?.id) {
      if (file) notifyError('Save report first', 'Save the report before uploading an attachment.');
      return;
    }
    try {
      await uploadMutation.mutateAsync({ monthlyReportId: savedReport.id, title: file.name, file });
      notifySuccess('Attachment uploaded', file.name);
      event.target.value = '';
    } catch {
      notifyError('Upload failed', 'The attachment could not be uploaded.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_event, data) => { if (!data.open) onClose(); }}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{savedReport ? 'Edit monthly report' : 'New monthly report'}</DialogTitle>
          <DialogContent>
            <div className={styles.dialogField}><Label>Plant</Label><Input value={plantName} readOnly /></div>
            <div className={styles.dialogField}><Label>Year / Month</Label><Input value={`${year} / ${month}`} readOnly /></div>
            <div className={styles.dialogField}><Label>Report Category</Label><Input value={categories.find((category) => category.id === categoryId)?.name ?? ''} readOnly /></div>
            <div className={styles.dialogField}><Label>Type</Label><Input value={type} readOnly /></div>
            <div className={styles.dialogField}><Label htmlFor="report-content">Content</Label><Textarea id="report-content" rows={8} resize="vertical" value={content} onChange={(_event, data) => setContent(data.value)} /></div>
            <div className={styles.dialogField}><Label htmlFor="report-order">Display Order</Label><Input id="report-order" type="number" value={displayOrder} readOnly onChange={(_event, data) => setDisplayOrder(data.value)} /></div>
            <div className={styles.dialogField}><Label htmlFor="report-attachment">Attachment</Label><input id="report-attachment" type="file" onChange={upload} disabled={!savedReport?.id || uploadMutation.isPending} /></div>
          </DialogContent>
          <DialogActions><Button appearance="secondary" onClick={onClose}>Cancel</Button><Button appearance="primary" icon={<Save24Regular />} onClick={save} disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Saving...' : 'Save'}</Button></DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const MonthlyReportsPage: React.FC = () => {
  const styles = useStyles();
  const { notifySuccess, notifyError } = useAppToast();
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [reportDownload, setReportDownload] = useState<{ fileName: string; url: string } | null>(null);
  useEffect(() => {
    if (!reportDownload) return;
    return () => URL.revokeObjectURL(reportDownload.url);
  }, [reportDownload]);
  const previousPeriod = getPreviousPeriod();
  const [filters, setFilters] = useState<GlobalFilterState>({ year: previousPeriod.year, month: previousPeriod.month, plantId: 'all', kpiCategory: 'all', kpiId: 'all', status: 'all' });
  const [reportFilters, setReportFilters] = useState<ReportFilterState>({ plantIds: [], categoryIds: [], types: [] });
  const [editState, setEditState] = useState<{ report?: MonthlyReport; type: ReportType; categoryId: string; plantId: string } | null>(null);
  const plantsQuery = usePlants();
  const categoriesQuery = useReportCategories();
  const reportsQuery = useMonthlyReports(filters.year, filters.month, 'all');
  const selectedReports = useMemo(() => filterMonthlyReports(reportsQuery.data ?? [], reportFilters), [reportFilters, reportsQuery.data]);
  const selectedPlants = useMemo(() => (plantsQuery.data ?? []).filter((plant) => reportFilters.plantIds.length === 0 || reportFilters.plantIds.includes(plant.id)), [plantsQuery.data, reportFilters.plantIds]);
  const selectedCategories = useMemo(() => (categoriesQuery.data ?? []).filter((category) => reportFilters.categoryIds.length === 0 || reportFilters.categoryIds.includes(category.id)), [categoriesQuery.data, reportFilters.categoryIds]);
  const reportGroups = useMemo(() => groupReportsByPlantAndCategory(selectedPlants, selectedCategories, selectedReports), [selectedCategories, selectedPlants, selectedReports]);
  const isLoading = plantsQuery.isLoading || categoriesQuery.isLoading || reportsQuery.isLoading;
  const error = plantsQuery.error || categoriesQuery.error || reportsQuery.error;

  const exportReport = async () => {
    if (exporting) return;
    setExporting(true);
    setReportDownload(null);
    setExportProgress('Loading report data');
    try {
      const fileName = reportFileName(filters.year, filters.month);
      const destination = await pickReportSaveLocation(fileName);
      const { exportMonthlyReport } = await import('./exportMonthlyReport');
      const blob = await exportMonthlyReport(filters.year, filters.month, setExportProgress);
      if (destination) {
        setExportProgress('Saving PowerPoint file');
        try {
          await writeReportFile(destination, blob);
          notifySuccess('Report saved', fileName);
        } catch (failure) {
          setReportDownload({ fileName, url: URL.createObjectURL(blob) });
          notifyError('Save failed', failure instanceof Error ? failure.message : 'The selected file could not be written.');
        }
      } else {
        setReportDownload({ fileName, url: URL.createObjectURL(blob) });
        notifySuccess('Report ready', fileName);
      }
    } catch (failure) {
      if (failure instanceof DOMException && failure.name === 'AbortError') return;
      notifyError('Export failed', failure instanceof Error ? failure.message : 'The monthly report could not be exported.');
    } finally {
      setExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader title="Monthly Reports" subtitle="Browse plant highlights and lowlights by report category with attachments" />
      <GlobalFilters value={filters} onChange={setFilters} showPlant={false} showCategory={false} />
      <ReportFilters value={reportFilters} plants={plantsQuery.data ?? []} categories={categoriesQuery.data ?? []} onChange={setReportFilters}
        actions={<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          {exporting ? <Caption1 role="status" aria-live="polite">{exportProgress}</Caption1> : null}
          <Button appearance="primary" icon={<ArrowDownload24Regular />} onClick={() => void exportReport()} disabled={exporting || isLoading || Boolean(error) || (plantsQuery.data ?? []).length === 0}>Export Report</Button>
        </div>} />
      <div className={styles.dataArea}>
      {error ? <ErrorState message={error instanceof Error ? error.message : 'Monthly Reports could not load the selected Dataverse period.'} /> : null}
      {isLoading ? <LoadingSkeleton rows={5} /> : null}
      {!isLoading && !error && reportGroups.length > 0 ? <div className={styles.plantSection}>{reportGroups.map((plantGroup) => <section className={styles.plantCard} key={plantGroup.plant.id}><Text className={styles.plantHeading}>{plantGroup.plant.name}</Text>{plantGroup.categories.map((group) => <div className={styles.categorySection} key={group.category.id}><Text className={styles.categoryHeading}>{group.category.name}</Text><div className={styles.reportGrid}>{(reportFilters.types.length === 0 || reportFilters.types.includes(ReportType.Highlights)) ? <ReportCard report={group.highlights} type={ReportType.Highlights} plantId={plantGroup.plant.id} categoryId={group.category.id} onEdit={(report, type, categoryId, plantId) => setEditState({ report, type, categoryId, plantId })} /> : null}{(reportFilters.types.length === 0 || reportFilters.types.includes(ReportType.Lowlights)) ? <ReportCard report={group.lowlights} type={ReportType.Lowlights} plantId={plantGroup.plant.id} categoryId={group.category.id} onEdit={(report, type, categoryId, plantId) => setEditState({ report, type, categoryId, plantId })} /> : null}</div></div>)}</section>)}</div> : null}
      {editState ? <ReportEditDialog key={`${editState.report?.id ?? 'new'}:${editState.plantId}:${editState.categoryId}:${editState.type}`} open plantId={editState.plantId} plantName={plantsQuery.data?.find((plant) => plant.id === editState.plantId)?.name ?? ''} year={filters.year} month={filters.month} categories={categoriesQuery.data ?? []} report={editState.report} type={editState.type} categoryId={editState.categoryId} onClose={() => setEditState(null)} /> : null}
      </div>
      {reportDownload ? <Dialog open onOpenChange={(_event, data) => { if (!data.open) setReportDownload(null); }}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Report ready</DialogTitle>
            <DialogContent><Text>{reportDownload.fileName}</Text></DialogContent>
            <DialogActions>
              <Button onClick={() => setReportDownload(null)}>Close</Button>
              <Button as="a" appearance="primary" icon={<ArrowDownload24Regular />} href={reportDownload.url} download={reportDownload.fileName}>Download PPT</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog> : null}
    </div>
  );
};
