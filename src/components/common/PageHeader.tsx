import React, { type ReactNode } from 'react';
import { makeStyles, tokens, Title2, Subtitle2 } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalL,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalM,
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: tokens.fontWeightBold,
    color: '#0F172A',
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
});

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.titleGroup}>
          <Title2 className={styles.title}>{title}</Title2>
          {subtitle && <Subtitle2 className={styles.subtitle}>{subtitle}</Subtitle2>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
};
