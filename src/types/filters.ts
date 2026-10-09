export interface GlobalFilterState {
  year: number;
  month: number;
  plantId: string;
  kpiCategory: string;
  kpiId: string;
  status: string;
}

export interface FilterOption {
  label: string;
  value: string | number;
}
