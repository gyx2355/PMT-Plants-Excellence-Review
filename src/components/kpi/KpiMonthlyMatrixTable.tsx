import React from 'react';
import { Card, makeStyles, tokens } from '@fluentui/react-components';
import type { KpiMonthlyMatrixRow } from '../../pages/KPIOverviewPage/overviewMetrics';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const useStyles = makeStyles({
  scroll: { overflowX: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium },
  table: { width: '100%', minWidth: '1900px', tableLayout: 'fixed', borderCollapse: 'collapse' },
  cell: { padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`, borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, textAlign: 'left', whiteSpace: 'nowrap' },
  header: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground2, fontWeight: tokens.fontWeightSemibold, fontSize: tokens.fontSizeBase200 },
  numeric: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' },
});

const format = (value: number | null | undefined) => value === null || value === undefined ? '' : value.toFixed(2);

export const KpiMonthlyMatrixTable: React.FC<{ rows: KpiMonthlyMatrixRow[] }> = ({ rows }) => {
  const styles = useStyles();
  return <Card className={styles.scroll}><table className={styles.table}>
    <colgroup>
      <col style={{ width: '180px' }} /><col style={{ width: '250px' }} /><col style={{ width: '90px' }} />
      <col style={{ width: '115px' }} /><col style={{ width: '115px' }} />
      {MONTHS.map((month) => <col key={month} style={{ width: '85px' }} />)}
      <col style={{ width: '130px' }} />
    </colgroup>
    <thead><tr>{['Plant Name', 'KPI', 'Unit', 'PY Actual', 'CY Target', ...MONTHS, 'YTD Actual'].map((heading, index) => <th className={`${styles.cell} ${styles.header} ${index >= 3 ? styles.numeric : ''}`} key={heading}>{heading}</th>)}</tr></thead>
    <tbody>{rows.map((row) => <tr key={`${row.plant.id}:${row.kpi.id}`}>
      <td className={styles.cell}>{row.plant.name}</td>
      <td className={styles.cell}>{row.kpi.name}</td>
      <td className={styles.cell}>{row.kpi.unit}</td>
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.pyActual)}</td>
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.target?.cyTarget)}</td>
      {row.monthlyActuals.map((value, index) => <td className={`${styles.cell} ${styles.numeric}`} key={MONTHS[index]}>{format(value)}</td>)}
      <td className={`${styles.cell} ${styles.numeric}`}>{format(row.ytdActual)}</td>
    </tr>)}</tbody>
  </table></Card>;
};
