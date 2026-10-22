export function sumFinite(values: Array<number | null | undefined>): number | null {
  const present = values.filter((value): value is number => value !== null && value !== undefined && Number.isFinite(value));
  return present.length === 0 ? null : present.reduce((total, value) => total + value, 0);
}

export function calculateRatioPercent(numerator: number | null, denominator: number | null): number | null {
  if (numerator === null || denominator === null || denominator === 0) return null;
  const ratio = numerator / denominator * 100;
  return Number.isFinite(ratio) ? ratio : null;
}

export function calculateWasteQuantity(rm: number | null, fg: number | null, nt: number | null): number | null {
  return rm === null && fg === null && nt === null ? null : (rm ?? 0) - (fg ?? 0) - (nt ?? 0);
}

export function calculateFpyQuantity(fg: number | null, defect: number | null): number | null {
  return fg === null && defect === null ? null : (fg ?? 0) - (defect ?? 0);
}