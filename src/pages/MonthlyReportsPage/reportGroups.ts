import { ReportType } from '../../domain/enums';
import type { MonthlyReport, ReportCategory } from '../../domain/models';

export interface ReportGroup {
  category: ReportCategory;
  highlights?: MonthlyReport;
  lowlights?: MonthlyReport;
}

export function groupMonthlyReports(
  categories: ReportCategory[],
  reports: MonthlyReport[],
): ReportGroup[] {
  const reportsByCategory = new Map<string, MonthlyReport[]>();
  reports.forEach((report) => {
    const current = reportsByCategory.get(report.categoryId) ?? [];
    reportsByCategory.set(report.categoryId, [...current, report]);
  });

  return [...categories]
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((category) => {
      const categoryReports = reportsByCategory.get(category.id) ?? [];
      return {
        category,
        highlights: categoryReports.find((report) => report.type === ReportType.Highlights),
        lowlights: categoryReports.find((report) => report.type === ReportType.Lowlights),
      };
    });
}
