import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Button,
  Tooltip,
} from '@fluentui/react-components';
import {
  Home24Regular,
  Home24Filled,
  DataBarHorizontal24Regular,
  DataBarHorizontal24Filled,
  Form24Regular,
  Form24Filled,
  DocumentText24Regular,
  DocumentText24Filled,
  Settings24Regular,
  Settings24Filled,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  ChevronDown24Regular,
  ChevronUp24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: '#0F172A', // Dark Navy
    color: '#F8FAFC',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'width 0.2s ease-in-out',
    boxShadow: tokens.shadow16,
    userSelect: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  expanded: {
    width: '240px',
  },
  collapsed: {
    width: '64px',
  },
  brandHeader: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    borderBottom: '1px solid #1E293B',
    gap: '12px',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#005A9E',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 8px',
    flexGrow: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    borderRadius: '6px',
    padding: '0 12px',
    color: '#94A3B8',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease-in-out',
    gap: '12px',
    textDecoration: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    ':hover': {
      backgroundColor: '#1E293B',
      color: '#F8FAFC',
    },
  },
  activeNavItem: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    fontWeight: tokens.fontWeightSemibold,
    '::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '6px',
      bottom: '6px',
      width: '4px',
      borderRadius: '0 4px 4px 0',
      backgroundColor: '#2563EB',
    },
  },
  disabledNavItem: {
    opacity: 0.5,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#94A3B8',
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '24px',
    height: '24px',
  },
  label: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1,
  },
  badge: {
    marginLeft: 'auto',
    flexShrink: 0,
  },
  footer: {
    padding: '12px 8px',
    borderTop: '1px solid #1E293B',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toggleButton: {
    color: '#94A3B8',
    ':hover': {
      color: '#FFFFFF',
      backgroundColor: '#1E293B',
    },
  },
});

interface SideNavigationProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onMobileItemClick?: () => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  collapsed,
  onToggleCollapse,
  onMobileItemClick,
}) => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [administrationExpanded, setAdministrationExpanded] = React.useState(location.pathname.startsWith('/administration'));
  const [chartExpanded, setChartExpanded] = React.useState(location.pathname.startsWith('/chart'));

  const navItems: Array<{
    key: string;
    path: string;
    label: string;
    icon: React.ReactNode;
    isMatch: (path: string) => boolean;
    disabled?: boolean;
    badge?: string;
  }> = [
    {
      key: 'overview',
      path: '/kpi-overview',
      label: 'KPI Overview',
      icon: location.pathname === '/kpi-overview' || location.pathname === '/' ? <Home24Filled /> : <Home24Regular />,
      isMatch: (p: string) => p === '/' || p === '/kpi-overview',
    },
    {
      key: 'chart',
      path: '/chart',
      label: 'Chart',
      icon: location.pathname.startsWith('/chart') ? <DataBarHorizontal24Filled /> : <DataBarHorizontal24Regular />,
      isMatch: (path: string) => path.startsWith('/chart'),
    },
    {
      key: 'entry',
      path: '/kpi-entry',
      label: 'KPI Data Entry',
      icon: location.pathname.startsWith('/kpi-entry') ? <Form24Filled /> : <Form24Regular />,
      isMatch: (p: string) => p.startsWith('/kpi-entry'),
    },
    {
      key: 'production-entry',
      path: '/production-entry',
      label: 'Production Data Entry',
      icon: location.pathname.startsWith('/production-entry') ? <Form24Filled /> : <Form24Regular />,
      isMatch: (path: string) => path.startsWith('/production-entry'),
    },
    {
      key: 'reports',
      path: '/monthly-reports',
      label: 'Monthly Reports',
      icon: location.pathname.startsWith('/monthly-reports') ? <DocumentText24Filled /> : <DocumentText24Regular />,
      isMatch: (p: string) => p.startsWith('/monthly-reports'),
    },
    {
      key: 'administration',
      path: '/administration',
      label: 'Administration',
      icon: location.pathname.startsWith('/administration') ? <Settings24Filled /> : <Settings24Regular />,
      isMatch: (p: string) => p.startsWith('/administration'),
    },
  ];

  const handleNavigate = (path: string, disabled?: boolean) => {
    if (disabled) return;
    navigate(path);
    if (onMobileItemClick) {
      onMobileItemClick();
    }
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles.brandHeader}>
        <div className={styles.brandLogo}>TPU</div>
        {!collapsed && <Text className={styles.brandTitle}>PMT Review</Text>}
      </div>

      <nav className={styles.navList}>
        {navItems.map((item) => {
          const isActive = item.isMatch(location.pathname);
          const isParent = item.key === 'administration' || item.key === 'chart';
          const expanded = item.key === 'chart' ? chartExpanded : administrationExpanded;
          const childItems = item.key === 'chart'
            ? [{ label: 'Volume & PAC', path: '/chart/volume-pac' }, { label: 'Production & Quality', path: '/chart/production-quality' }]
            : item.key === 'administration'
              ? [{ label: 'Configuration', path: '/administration/configuration' }, { label: 'Basic Data Management', path: '/administration/basic-data' }]
              : [];
          const className = `${styles.navItem} ${isActive ? styles.activeNavItem : ''} ${
            item.disabled ? styles.disabledNavItem : ''
          }`;

          const content = (
            <button
              key={item.key}
              type="button"
              className={className}
              onClick={() => {
                if (isParent) {
                  if (collapsed) onToggleCollapse();
                  if (item.key === 'chart') setChartExpanded((value) => collapsed || !value);
                  else setAdministrationExpanded((value) => collapsed || !value);
                } else handleNavigate(item.path, item.disabled);
              }}
              aria-disabled={item.disabled}
              aria-expanded={isParent ? expanded : undefined}
              aria-current={!isParent && isActive ? 'page' : undefined}
            >
              <div className={styles.iconContainer}>{item.icon}</div>
              {!collapsed && (
                <>
                  <span className={styles.label}>{item.label}</span>
                  {isParent ? (expanded ? <ChevronUp24Regular /> : <ChevronDown24Regular />) : null}
                  {item.badge && (
                    <Badge size="small" appearance="tint" color="informative" className={styles.badge}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.key} content={item.label} relationship="label" positioning="after">
                {content}
              </Tooltip>
            );
          }

          return <React.Fragment key={item.key}>
            {content}
            {isParent && expanded ? <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '36px' }}>
              {childItems.map((child) => <button key={child.path} type="button" className={`${styles.navItem} ${location.pathname === child.path ? styles.activeNavItem : ''}`} onClick={() => handleNavigate(child.path)} aria-current={location.pathname === child.path ? 'page' : undefined}>{child.label}</button>)}
            </div> : null}
          </React.Fragment>;
        })}
      </nav>

      <div className={styles.footer}>
        <Button
          appearance="subtle"
          icon={collapsed ? <ChevronRight24Regular /> : <ChevronLeft24Regular />}
          onClick={onToggleCollapse}
          className={styles.toggleButton}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        />
      </div>
    </aside>
  );
};
