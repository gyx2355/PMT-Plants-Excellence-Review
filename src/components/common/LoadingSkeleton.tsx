import React from 'react';
import { Skeleton, SkeletonItem, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
});

interface LoadingSkeletonProps {
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 4 }) => {
  const styles = useStyles();

  return (
    <Skeleton className={styles.container}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.row}>
          <SkeletonItem style={{ height: '36px', width: '30%' }} />
          <SkeletonItem style={{ height: '36px', width: '40%' }} />
          <SkeletonItem style={{ height: '36px', width: '30%' }} />
        </div>
      ))}
    </Skeleton>
  );
};
