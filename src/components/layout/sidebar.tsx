import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Dashboard,
  People,
  LocalHospital,
  School,
  Assignment,
  Settings,
  ExpandLess,
  ExpandMore,
  AccountBox,
  WorkOutline,
  Assessment,
  IntegrationInstructions,
  AdminPanelSettings,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ElementType;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: Dashboard,
  },
  {
    label: 'User Management',
    path: '/users',
    icon: People,
    children: [
      { label: 'Admins & Operators', path: '/users/admins', icon: AdminPanelSettings },
      { label: 'Agents', path: '/users/agents', icon: WorkOutline },
      { label: 'Clinic Staff', path: '/users/clinics', icon: LocalHospital },
      { label: 'Training Centers', path: '/users/training', icon: School },
    ],
  },
  {
    label: 'Expat Workers',
    path: '/workers',
    icon: AccountBox,
    children: [
      { label: 'Registration', path: '/workers/register', icon: Assignment },
      { label: 'Management', path: '/workers/manage', icon: People },
      { label: 'Progress Tracking', path: '/workers/progress', icon: Assessment },
    ],
  },
  {
    label: 'Medical Clinics',
    path: '/clinics',
    icon: LocalHospital,
    children: [
      { label: 'Registration', path: '/clinics/register', icon: Assignment },
      { label: 'License Management', path: '/clinics/licenses', icon: LocalHospital },
      { label: 'Audit Management', path: '/clinics/audits', icon: Assessment },
    ],
  },
  {
    label: 'Training Centers',
    path: '/training-centers',
    icon: School,
  },
  {
    label: 'Approval Workflows',
    path: '/approvals',
    icon: Assignment,
  },
  {
    label: 'Integrations',
    path: '/integrations',
    icon: IntegrationInstructions,
  },
  {
    label: 'Reports & Analytics',
    path: '/reports',
    icon: Assessment,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
];

const SidebarItem: React.FC<{
  item: NavigationItem;
  collapsed: boolean;
  level?: number;
}> = ({ item, collapsed, level = 0 }) => {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = location.pathname === item.path;
  const isParentActive = item.children?.some(child => location.pathname === child.path);

  React.useEffect(() => {
    if (isParentActive) {
      setExpanded(true);
    }
  }, [isParentActive]);

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
  };

  const itemContent = (
    <div
      className={cn(
        "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
        level > 0 && "ml-4",
        isActive || isParentActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
      style={{ paddingLeft: collapsed ? '12px' : `${12 + level * 16}px` }}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="ml-3 flex-1">{item.label}</span>
          {hasChildren && (
            <div className="ml-auto">
              {expanded ? (
                <ExpandLess className="h-4 w-4" />
              ) : (
                <ExpandMore className="h-4 w-4" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div>
      {hasChildren ? (
        <button onClick={handleClick} className="w-full text-left">
          {itemContent}
        </button>
      ) : (
        <NavLink to={item.path} className="block">
          {itemContent}
        </NavLink>
      )}
      
      {hasChildren && expanded && !collapsed && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child) => (
            <SidebarItem
              key={child.path}
              item={child}
              collapsed={collapsed}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  return (
    <div
      className={cn(
        "bg-card border-r border-border transition-all duration-normal",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EW</span>
            </div>
            <div>
              <h1 className="font-semibold text-sm">EWIP</h1>
              <p className="text-xs text-muted-foreground">Integration Platform</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-accent transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigationItems.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </div>
  );
};