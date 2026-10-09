import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataverseRepositories } from '../data/adapters/dataverseRepositories';
import { getActiveUserProfiles, getCurrentUserProfile } from '../data/adapters/currentUser';
import type { AeCategory, AeRecord, ProductionLine, ProductionLineMatrix, ProductionKpiMatrix, ProductionKpiRecord, VolumePacRecord } from '../domain/models/charts';
import type {
  Plant,
  KpiDefinition,
  Target,
  MonthlyKpiResult,
  ReportCategory,
  MonthlyReport,
  UserProfile,
} from '../domain/models';
import { ReportType } from '../domain/enums';
import { buildMissingAeRecords } from '../domain/services/aeBatch';
import { buildMissingVolumePacRecords } from '../domain/services/volumePacBatch';

const {
  plantRepository,
  kpiDefinitionRepository,
  targetRepository,
  monthlyKpiResultRepository,
  reportCategoryRepository,
  monthlyReportRepository,
  attachmentRepository,
} = dataverseRepositories;

const getVolumePacRepository = async () => (await import('../data/adapters/volumePacRepository')).volumePacRepository;
const getProductionKpiRepository = async () => (await import('../data/adapters/productionKpiRepository')).productionKpiRepository;

export const useProductionKpiRecords = (enabled = true) => useQuery<ProductionKpiRecord[]>({
  queryKey: ['productionKpiRecords'],
  queryFn: async () => (await getProductionKpiRepository()).getAll(),
  enabled,
});

export const useSaveProductionKpis = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (records: Array<Omit<ProductionKpiRecord, 'id'> & { id?: string }>) => (await getProductionKpiRepository()).saveBatch(records),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['productionKpiRecords'] }),
  });
};

export const useCurrentUser = () => {
  return useQuery<UserProfile>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserProfile,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
};

export const useActiveUsers = (enabled = true) => useQuery<UserProfile[]>({
  queryKey: ['activeUsers'],
  queryFn: getActiveUserProfiles,
  staleTime: 1000 * 60 * 30,
  enabled,
});

export const useProductionLines = (enabled = true) => useQuery<ProductionLine[]>({
  queryKey: ['productionLines'],
  queryFn: async () => (await getVolumePacRepository()).getProductionLines(),
  enabled,
});

export const useProductionLineMatrices = (enabled = true) => useQuery<ProductionLineMatrix[]>({
  queryKey: ['productionLineMatrices'],
  queryFn: async () => (await getVolumePacRepository()).getProductionLineMatrices(),
  enabled,
});

export const useProductionKpiMatrices = (enabled = true) => useQuery<ProductionKpiMatrix[]>({
  queryKey: ['productionKpiMatrices'],
  queryFn: async () => (await getVolumePacRepository()).getProductionKpiMatrices(),
  enabled,
});

export const useAeCategories = (enabled = true) => useQuery<AeCategory[]>({
  queryKey: ['aeCategories'],
  queryFn: async () => (await getVolumePacRepository()).getAeCategories(),
  enabled,
});

export const useVolumePac = (year: number, enabled = true) => useQuery<VolumePacRecord[]>({
  queryKey: ['volumePac', year],
  queryFn: async () => (await getVolumePacRepository()).getVolumePac(year),
  enabled,
});

export const useAe = (year: number, month: number, enabled = true) => useQuery<AeRecord[]>({
  queryKey: ['ae', year, month],
  queryFn: async () => (await getVolumePacRepository()).getAe(year, month),
  enabled,
});

export const useAllVolumePac = () => useQuery<VolumePacRecord[]>({
  queryKey: ['volumePac', 'all'],
  queryFn: async () => (await getVolumePacRepository()).getAllVolumePac(),
});

export const useAllAe = () => useQuery<AeRecord[]>({
  queryKey: ['ae', 'all'],
  queryFn: async () => (await getVolumePacRepository()).getAllAe(),
});

export const useChartAdminMutations = () => {
  const queryClient = useQueryClient();
  return {
    createLine: useMutation({ mutationFn: async (value: Omit<ProductionLine, 'id'>) => (await getVolumePacRepository()).createProductionLine(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    updateLine: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Partial<ProductionLine> }) => (await getVolumePacRepository()).updateProductionLine(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    deleteLine: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionLine(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLines'] }) }),
    createMatrix: useMutation({ mutationFn: async (value: Omit<ProductionLineMatrix, 'id' | 'mainName'>) => (await getVolumePacRepository()).createProductionLineMatrix(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    updateMatrix: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<ProductionLineMatrix, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateProductionLineMatrix(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    deleteMatrix: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionLineMatrix(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionLineMatrices'] }) }),
    createKpiMatrix: useMutation({ mutationFn: async (value: Omit<ProductionKpiMatrix, 'id' | 'mainName'>) => (await getVolumePacRepository()).createProductionKpiMatrix(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    updateKpiMatrix: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<ProductionKpiMatrix, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateProductionKpiMatrix(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    deleteKpiMatrix: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteProductionKpiMatrix(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['productionKpiMatrices'] }) }),
    createCategory: useMutation({ mutationFn: async (value: Omit<AeCategory, 'id'>) => (await getVolumePacRepository()).createAeCategory(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    updateCategory: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Partial<AeCategory> }) => (await getVolumePacRepository()).updateAeCategory(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    deleteCategory: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteAeCategory(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aeCategories'] }) }),
    createAe: useMutation({ mutationFn: async (value: Omit<AeRecord, 'id' | 'mainName'>) => (await getVolumePacRepository()).createAe(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    updateAe: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<AeRecord, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateAe(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    deleteAe: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteAe(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }) }),
    createMissingAe: useMutation({
      mutationFn: async ({ year, month, plants, matrices, categories, existing }: { year: number; month: number; plants: Plant[]; matrices: ProductionLineMatrix[]; categories: AeCategory[]; existing: AeRecord[] }) => {
        const repository = await getVolumePacRepository();
        const missing = buildMissingAeRecords(year, month, plants, matrices, categories, existing);
        for (const record of missing) await repository.createAe(record);
        return missing.length;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }),
    }),
    updateAeValues: useMutation({
      mutationFn: async (records: Array<{ record: AeRecord; value: number | null }>) => {
        const repository = await getVolumePacRepository();
        for (const { record, value } of records) await repository.updateAe(record.id, { ...record, value });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ae'] }),
    }),
    createVolumePac: useMutation({ mutationFn: async (value: Omit<VolumePacRecord, 'id' | 'mainName'>) => (await getVolumePacRepository()).createVolumePac(value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    updateVolumePac: useMutation({ mutationFn: async ({ id, value }: { id: string; value: Omit<VolumePacRecord, 'id' | 'mainName'> }) => (await getVolumePacRepository()).updateVolumePac(id, value), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    deleteVolumePac: useMutation({ mutationFn: async (id: string) => (await getVolumePacRepository()).deleteVolumePac(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }) }),
    createMissingVolumePac: useMutation({
      mutationFn: async ({ year, month, plants, matrices, existing }: { year: number; month: number; plants: Plant[]; matrices: ProductionLineMatrix[]; existing: VolumePacRecord[] }) => {
        const repository = await getVolumePacRepository();
        const missing = buildMissingVolumePacRecords(year, month, plants, matrices, existing);
        for (const record of missing) await repository.createVolumePac(record);
        return missing.length;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }),
    }),
    updateVolumePacValues: useMutation({
      mutationFn: async (records: Array<{ record: VolumePacRecord; volume: number | null; forecast: number | null; pac: number | null }>) => {
        const repository = await getVolumePacRepository();
        for (const { record, volume, forecast, pac } of records) await repository.updateVolumePac(record.id, { ...record, volume, forecast, pac });
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['volumePac'] }),
    }),
  };
};

// Plants Query
export const usePlants = () => {
  return useQuery<Plant[]>({
    queryKey: ['plants'],
    queryFn: () => plantRepository.getAll(),
  });
};

// KPI Definitions Query
export const useKpiDefinitions = () => {
  return useQuery<KpiDefinition[]>({
    queryKey: ['kpiDefinitions'],
    queryFn: () => kpiDefinitionRepository.getAll(),
  });
};

// Targets Query
export const useAllTargets = () => {
  return useQuery<Target[]>({
    queryKey: ['targets', 'all'],
    queryFn: () => targetRepository.getAll(),
  });
};

export const useTargets = (year: number, plantId = 'all', enabled = true) => {
  return useQuery<Target[]>({
    queryKey: ['targets', year, plantId],
    queryFn: () => targetRepository.getByPlantAndYear(plantId, year),
    enabled,
  });
};


export const usePlantMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['plants'] });
  return {
    create: useMutation({ mutationFn: (plant: Omit<Plant, 'id'>) => plantRepository.create(plant), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<Plant> }) => plantRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => plantRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useKpiDefinitionMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['kpiDefinitions'] });
  return {
    create: useMutation({ mutationFn: (kpi: Omit<KpiDefinition, 'id'>) => kpiDefinitionRepository.create(kpi), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<KpiDefinition> }) => kpiDefinitionRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => kpiDefinitionRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useReportCategoryMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['reportCategories'] });
  return {
    create: useMutation({ mutationFn: (category: Omit<ReportCategory, 'id'>) => reportCategoryRepository.create(category), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<ReportCategory> }) => reportCategoryRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => reportCategoryRepository.delete(id), onSuccess: invalidate }),
  };
};

export const useTargetMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['targets'] });
  return {
    create: useMutation({ mutationFn: (target: Omit<Target, 'id'>) => targetRepository.create(target), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<Target> }) => targetRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => targetRepository.delete(id), onSuccess: invalidate }),
    updateValues: useMutation({
      mutationFn: async (targets: Array<{ id: string; pyActual: number | null; cyTarget: number | null }>) => {
        for (const target of targets) {
          await targetRepository.update(target.id, { pyActual: target.pyActual, cyTarget: target.cyTarget });
        }
      },
      onSuccess: invalidate,
    }),
    createMissing: useMutation({
      mutationFn: async ({ year, plants, kpis, existing }: { year: number; plants: Plant[]; kpis: KpiDefinition[]; existing: Target[] }) => {
        const existingKeys = new Set(existing.filter((target) => target.targetYear === year).map((target) => `${target.plantId}:${target.kpiId}`));
        const missing = plants.flatMap((plant) => kpis
          .filter((kpi) => !existingKeys.has(`${plant.id}:${kpi.id}`))
          .map((kpi) => ({ targetYear: year, plantId: plant.id, kpiId: kpi.id, pyActual: null, cyTarget: null })));
        for (const target of missing) await targetRepository.create(target);
        return missing.length;
      },
      onSuccess: invalidate,
    }),
  };
};

export const useMonthlyReportMutations = () => {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
  return {
    create: useMutation({ mutationFn: (report: Omit<MonthlyReport, 'id'>) => monthlyReportRepository.create(report), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, changes }: { id: string; changes: Partial<MonthlyReport> }) => monthlyReportRepository.update(id, changes), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: (id: string) => monthlyReportRepository.delete(id), onSuccess: invalidate }),
    createMissing: useMutation({
      mutationFn: async ({ year, month, plants, categories, existing }: { year: number; month: number; plants: Plant[]; categories: ReportCategory[]; existing: MonthlyReport[] }) => {
        const types = [ReportType.Highlights, ReportType.Lowlights];
        const existingKeys = new Set(existing.filter((report) => report.year === year && report.month === month).map((report) => `${report.plantId}:${report.categoryId}:${report.type}`));
        const missing = plants.flatMap((plant) => categories.flatMap((category) => types
          .filter((type) => !existingKeys.has(`${plant.id}:${category.id}:${type}`))
          .map((type) => ({ year, month, plantId: plant.id, categoryId: category.id, type, content: '', displayOrder: category.displayOrder }))));
        for (const report of missing) await monthlyReportRepository.create(report);
        return missing.length;
      },
      onSuccess: invalidate,
    }),
    updateContents: useMutation({
      mutationFn: async (reports: Array<{ id: string; content: string }>) => {
        for (const report of reports) await monthlyReportRepository.update(report.id, { content: report.content });
      },
      onSuccess: invalidate,
    }),
  };
};


// Monthly KPI Results Query
export const useMonthlyKpiResults = (year: number, month: number, plantId = 'all') => {
  return useQuery<MonthlyKpiResult[]>({
    queryKey: ['monthlyKpiResults', year, month, plantId],
    queryFn: () => monthlyKpiResultRepository.getByPlantAndPeriod(plantId, year, month),
  });
};

export const useMonthlyKpiResultsByYear = (year: number, enabled = true) => useQuery<MonthlyKpiResult[]>({
  queryKey: ['monthlyKpiResults', year, 'allMonths'],
  queryFn: () => monthlyKpiResultRepository.getByYear(year),
  enabled,
});

// Save Monthly KPI Results Mutation
export const useSaveMonthlyKpiResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (results: Array<Omit<MonthlyKpiResult, 'id'> & { id?: string }>) =>
      monthlyKpiResultRepository.saveBatch(results),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyKpiResults'] });
    },
  });
};

// Report Categories Query
export const useReportCategories = (enabled = true) => {
  return useQuery<ReportCategory[]>({
    queryKey: ['reportCategories'],
    queryFn: () => reportCategoryRepository.getAll(),
    enabled,
  });
};

// Monthly Reports Query
export const useAllMonthlyReports = () => {
  return useQuery<MonthlyReport[]>({
    queryKey: ['monthlyReports', 'all'],
    queryFn: () => monthlyReportRepository.getAll(),
  });
};

export const useMonthlyReports = (year: number, month: number, plantId = 'all') => {
  return useQuery<MonthlyReport[]>({
    queryKey: ['monthlyReports', year, month, plantId],
    queryFn: () => monthlyReportRepository.getByPlantAndPeriod(plantId, year, month),
  });
};

// Save Monthly Report Mutation
export const useSaveMonthlyReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      report,
      isEdit,
    }: {
      report: Omit<MonthlyReport, 'id'> & { id?: string };
      isEdit: boolean;
    }) => {
      if (isEdit && report.id) {
        return monthlyReportRepository.update(report.id, report);
      }
      return monthlyReportRepository.create(report);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
    },
  });
};

// Report Attachments Query
export const useReportAttachments = (reportId: string | null) => {
  return useQuery({
    queryKey: ['reportAttachments', reportId],
    queryFn: () => (reportId ? attachmentRepository.getByReportId(reportId) : Promise.resolve([])),
    enabled: !!reportId,
  });
};

export const useDownloadAttachment = () => {
  return useMutation({
    mutationFn: ({ attachmentId, fileName }: { attachmentId: string; fileName?: string }) =>
      attachmentRepository.download(attachmentId, fileName),
  });
};

export const useUploadAttachment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ monthlyReportId, title, file }: { monthlyReportId: string; title: string; file: File }) =>
      attachmentRepository.upload(monthlyReportId, title, file),
    onSuccess: (_attachment, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reportAttachments', variables.monthlyReportId] });
      queryClient.invalidateQueries({ queryKey: ['monthlyReports'] });
    },
  });
};
