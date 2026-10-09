import React from 'react';
import { makeStyles, tokens, Subtitle2, Body1, Button } from '@fluentui/react-components';
import { ErrorCircle24Regular, ArrowSync24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    gap: tokens.spacingVerticalS,
    backgroundColor: '#FFF4F4',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorPaletteRedBorderActive}`,
    textAlign: 'center',
  },
  icon: {
    color: tokens.colorPaletteRedForeground1,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  message: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '500px',
  },
});

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function errorMessage(message: string): string {
  try {
    const parsed = JSON.parse(message) as { error?: { message?: string } };
    return parsed.error?.message ?? message;
  } catch {
    return message;
  }
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to Load Data',
  message = 'An error occurred while communicating with Dataverse. Please check your network or try again.',
  onRetry,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <ErrorCircle24Regular className={styles.icon} style={{ fontSize: '48px' }} />
      <Subtitle2 className={styles.title}>{title}</Subtitle2>
      <Body1 className={styles.message}>{errorMessage(message)}</Body1>
      {onRetry && (
        <Button
          appearance="primary"
          icon={<ArrowSync24Regular />}
          onClick={onRetry}
          style={{ marginTop: '12px' }}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
