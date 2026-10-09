import React, { useState } from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Button,
  Avatar,
  Tooltip,
} from '@fluentui/react-components';
import {
  Info24Regular,
  Navigation24Regular,
} from '@fluentui/react-icons';
import { AboutDialog } from './AboutDialog';
import { useCurrentUser } from '../../hooks/queries';

const useStyles = makeStyles({
  header: {
    height: '56px',
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    boxShadow: tokens.shadow2,
    zIndex: 10,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  toggleButton: {
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: tokens.fontWeightBold,
    color: '#0F172A',
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
  },
  userName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
});

interface AppHeaderProps {
  onToggleMobileMenu: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const styles = useStyles();
  const [aboutOpen, setAboutOpen] = useState(false);
  const currentUserQuery = useCurrentUser();
  const userName = currentUserQuery.data?.displayName || 'BASF User';

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Button
          appearance="subtle"
          icon={<Navigation24Regular />}
          className={styles.toggleButton}
          onClick={onToggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        />
        <div className={styles.titleContainer}>
          <Text className={styles.title}>PMT Plants Excellence Review System</Text>
          <Text className={styles.subtitle}>
            Manage KPI Input, Review, Four-Plant Status and Monthly Reports in One Platform
          </Text>
        </div>
      </div>

      <div className={styles.rightSection}>
        <Tooltip content="System Info & About" relationship="label">
          <Button
            appearance="subtle"
            icon={<Info24Regular />}
            onClick={() => setAboutOpen(true)}
            aria-label="About system"
          />
        </Tooltip>

        <div className={styles.userInfo}>
          <Avatar name={userName} color="brand" badge={{ status: 'available' }} />
          <Text className={styles.userName}>{userName}</Text>
        </div>
      </div>

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </header>
  );
};
