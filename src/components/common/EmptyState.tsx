import React, { type ReactNode } from 'react';
import { makeStyles, tokens, Subtitle2, Body1, Button } from '@fluentui/react-components';
import { Folder24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    gap: tokens.spacingVerticalS,
    backgroundColor: '#FFFFFF',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: 'center',
  },
  icon: {
    color: tokens.colorNeutralForeground3,
    fontSize: '48px',
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  message: {
    color: tokens.colorNeutralForeground3,
    maxWidth: '400px',
  },
});

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  message = 'There are no records matching your current filter criteria.',
  icon = <Folder24Regular style={{ fontSize: '48px' }} />,
  action,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <Subtitle2 className={styles.title}>{title}</Subtitle2>
      <Body1 className={styles.message}>{message}</Body1>
      {action && (
        <Button appearance="primary" onClick={action.onClick} style={{ marginTop: '12px' }}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
