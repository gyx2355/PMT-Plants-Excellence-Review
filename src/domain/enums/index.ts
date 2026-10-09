export const KpiStatus = {
  Green: 'Green',
  Amber: 'Amber',
  Red: 'Red',
  Grey: 'Grey',
  Missing: 'Missing',
} as const;
export type KpiStatus = (typeof KpiStatus)[keyof typeof KpiStatus];

export const KpiCategory = {
  EHS: 'EHS',
  Production: 'Production',
  Quality: 'Quality',
} as const;
export type KpiCategory = (typeof KpiCategory)[keyof typeof KpiCategory];

export const ReportType = {
  Highlights: 'Highlights',
  Lowlights: 'Lowlights',
} as const;
export type ReportType = (typeof ReportType)[keyof typeof ReportType];
