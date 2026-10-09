import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  CheckmarkCircle16Filled,
  Warning16Filled,
  DismissCircle16Filled,
  QuestionCircle16Filled,
} from '@fluentui/react-icons';
import { KpiStatus } from '../../domain/enums';
import { statusColors } from '../../styles/theme';

const useStyles = makeStyles({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
  },
  green: {
    backgroundColor: statusColors.greenBg,
    color: statusColors.greenFg,
    border: `1px solid ${statusColors.greenBorder}`,
  },
  amber: {
    backgroundColor: statusColors.amberBg,
    color: statusColors.amberFg,
    border: `1px solid ${statusColors.amberBorder}`,
  },
  red: {
    backgroundColor: statusColors.redBg,
    color: statusColors.redFg,
    border: `1px solid ${statusColors.redBorder}`,
  },
  grey: {
    backgroundColor: statusColors.greyBg,
    color: statusColors.greyFg,
    border: `1px solid ${statusColors.greyBorder}`,
  },
});

interface StatusBadgeProps {
  status: KpiStatus | string;
  showText?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showText = true }) => {
  const styles = useStyles();

  let badgeClass: string;
  let icon: React.ReactNode;
  let label: string;

  switch (status) {
    case KpiStatus.Green:
    case 'Green':
      badgeClass = styles.green;
      icon = <CheckmarkCircle16Filled />;
      label = 'Green / On Target';
      break;
    case KpiStatus.Amber:
    case 'Amber':
    case 'Yellow':
      badgeClass = styles.amber;
      icon = <Warning16Filled />;
      label = 'Amber / Attention';
      break;
    case KpiStatus.Red:
    case 'Red':
      badgeClass = styles.red;
      icon = <DismissCircle16Filled />;
      label = 'Red / Action Req.';
      break;
    case KpiStatus.Grey:
    case 'Grey':
      badgeClass = styles.grey;
      icon = <QuestionCircle16Filled />;
      label = 'Not Applicable';
      break;
    case KpiStatus.Missing:
    case 'Missing':
    default:
      badgeClass = styles.grey;
      icon = <QuestionCircle16Filled />;
      label = 'Missing / Not Entered';
      break;
  }

  return (
    <span className={`${styles.badge} ${badgeClass}`} title={label} aria-label={label}>
      {icon}
      {showText && <span>{label}</span>}
    </span>
  );
};
