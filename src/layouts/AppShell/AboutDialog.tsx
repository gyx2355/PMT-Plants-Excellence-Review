import React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Body1,
  Caption1,
  makeStyles,
  tokens,
  Badge,
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: tokens.spacingVerticalS,
    alignItems: 'center',
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
});

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ open, onOpenChange }) => {
  const styles = useStyles();

  return (
    <Dialog open={open} onOpenChange={(_e, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle action={<Info24Regular />}>
            About PMT Plants Excellence Review System
          </DialogTitle>
          <DialogContent className={styles.container}>
            <Body1>
              PMT Plants Excellence Review System provides centralized data entry,
              multi-plant status comparison, monthly report highlights/lowlights review, and target tracking for BASF TPU sites.
            </Body1>
            <div className={styles.infoGrid}>
              <Caption1 className={styles.label}>Version:</Caption1>
              <Caption1>1.0.0 (Phase 1 Build)</Caption1>

              <Caption1 className={styles.label}>Platform:</Caption1>
              <Caption1>Power Apps Code App (React 19 + Fluent UI v9)</Caption1>

              <Caption1 className={styles.label}>Environment:</Caption1>
              <Badge color="brand" appearance="tint">Prod (4d7fa01b...)</Badge>

              <Caption1 className={styles.label}>Supported Plants:</Caption1>
              <Caption1>Pudong-TPU, Zhanjiang-TPU, Changhua-TPU, Yokkaichi-TPU</Caption1>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
