export interface YearMonth {
  year: number;
  month: number;
}

export function getPreviousPeriod(date = new Date()): YearMonth {
  const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  return { year: previousMonth.getFullYear(), month: previousMonth.getMonth() + 1 };
}
