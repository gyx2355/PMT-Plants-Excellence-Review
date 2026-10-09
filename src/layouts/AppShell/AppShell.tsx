import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles, tokens, Drawer, DrawerBody } from '@fluentui/react-components';
import { AppHeader } from './AppHeader';
import { SideNavigation } from './SideNavigation';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    fontFamily: tokens.fontFamilyBase,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    overflow: 'hidden',
  },
  desktopSidebar: {
    height: '100%',
    flexShrink: 0,
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
  mainContent: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
    padding: tokens.spacingHorizontalL,
    boxSizing: 'border-box',
  },
  mobileDrawerBody: {
    padding: 0,
    backgroundColor: '#0F172A',
    height: '100%',
  },
});

export const AppShell: React.FC = () => {
  const styles = useStyles();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.root}>
      <AppHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />

      <div className={styles.body}>
        {/* Desktop Permanent Sidebar */}
        <div className={styles.desktopSidebar}>
          <SideNavigation
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile / Tablet Overlay Drawer */}
        <Drawer
          type="overlay"
          open={mobileMenuOpen}
          onOpenChange={(_e, { open }) => setMobileMenuOpen(open)}
          size="medium"
        >
          <DrawerBody className={styles.mobileDrawerBody}>
            <SideNavigation
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
              onMobileItemClick={() => setMobileMenuOpen(false)}
            />
          </DrawerBody>
        </Drawer>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
