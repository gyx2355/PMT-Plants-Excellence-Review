import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory, Plant } from '../../domain/models';

export interface PlantReportGroup {
  plant: Plant;
  categories: Array<{
    category: ReportCategory;
    highlights?: MonthlyReport;
    lowlights?: MonthlyReport;
  }>;
}

export function filterMonthlyReports(
  reports: MonthlyReport[],
  filter: { plantIds: string[]; categoryIds: string[]; types: string[] },
): MonthlyReport[] {
  return reports.filter((report) =>
    (filter.plantIds.length === 0 || filter.plantIds.includes(report.plantId))
    && (filter.categoryIds.length === 0 || filter.categoryIds.includes(report.categoryId))
    && (filter.types.length === 0 || filter.types.includes(report.type)),
  );
}

export function groupReportsByPlantAndCategory(
  plants: Plant[],
  categories: ReportCategory[],
  reports: MonthlyReport[],
): PlantReportGroup[] {
  return [...plants]
    .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
    .map((plant) => ({
    plant,
    categories: [...categories]
      .sort((left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name))
      .map((category) => {
        const categoryReports = reports.filter((report) => report.plantId === plant.id && report.categoryId === category.id);
        return {
          category,
          highlights: categoryReports.find((report) => report.type === ReportType.Highlights),
          lowlights: categoryReports.find((report) => report.type === ReportType.Lowlights),
        };
        })
      }));
}
