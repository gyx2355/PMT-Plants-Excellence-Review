import React from 'react';
import { Caption1, Card, Divider, makeStyles, tokens } from '@fluentui/react-components';
import { StatusBadge } from '../common/StatusBadge';
import type { ComparisonRow } from '../../pages/KPIComparisonPage/comparisonMetrics';

const useStyles = makeStyles({
  scroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '1050px', borderCollapse: 'collapse' },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
  header: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground2, fontWeight: tokens.fontWeightSemibold, fontSize: tokens.fontSizeBase200 },
  numeric: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
});

const format = (value: number | null | undefined, suffix = '') => value === null || value === undefined ? 'N/A' : `${value.toFixed(2)}${suffix}`;

export const KpiDetailTable: React.FC<{ rows: ComparisonRow[] }> = ({ rows }) => {
  const styles = useStyles();
  return <Card className={styles.scroll}><table className={styles.table}><thead><tr>{['Plant', 'KPI', 'Unit', 'PY Actual', 'CY Target', 'Monthly Actual', 'YTD Actual', 'Variance', 'Achievement', 'Status'].map((heading) => <th className={`${styles.cell} ${styles.header}`} key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={`${row.plant.id}:${row.kpi.id}`}><td className={styles.cell}>{row.plant.name}</td><td className={styles.cell}>{row.kpi.name}</td><td className={styles.cell}>{row.kpi.unit}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.pyActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.cyTarget)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.result?.monthlyActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.result?.ytdActual)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.variance)}</td><td className={`${styles.cell} ${styles.numeric}`}>{format(row.achievement, '%')}</td><td className={styles.cell}><StatusBadge status={row.status} /></td></tr>)}</tbody></table><Divider /><Caption1 style={{ display: 'block', padding: '12px 16px' }}>Achievement is N/A when the target is zero or missing.</Caption1></Card>;
};
