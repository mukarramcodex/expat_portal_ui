import React from 'react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  People,
  LocalHospital,
  School,
  Assignment,
  TrendingUp,
  PendingActions,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Workers Registered',
      value: '2,847',
      change: { value: '+12% from last month', trend: 'up' as const },
      icon: People,
    },
    {
      title: 'Pending Approvals',
      value: '156',
      change: { value: '+8 new today', trend: 'up' as const },
      icon: PendingActions,
    },
    {
      title: 'Active Clinics',
      value: '84',
      change: { value: '+2 this week', trend: 'up' as const },
      icon: LocalHospital,
    },
    {
      title: 'Training Centers',
      value: '31',
      change: { value: 'No change', trend: 'neutral' as const },
      icon: School,
    },
    {
      title: 'Completed Integrations',
      value: '1,924',
      change: { value: '+15% completion rate', trend: 'up' as const },
      icon: CheckCircle,
    },
    {
      title: 'System Alerts',
      value: '7',
      change: { value: '-3 from yesterday', trend: 'down' as const },
      icon: Warning,
    },
  ];

  const quickActions = [
    { title: 'Register New Worker', description: 'Start the worker registration process', color: 'primary' },
    { title: 'Review Pending Approvals', description: '156 items awaiting your attention', color: 'warning' },
    { title: 'Add New Clinic', description: 'Register a new medical clinic', color: 'secondary' },
    { title: 'Generate Reports', description: 'Create monthly integration reports', color: 'info' },
  ];

  const workflowOverview = [
    { stage: 'Registration Submitted', count: 45, status: 'pending' },
    { stage: 'Medical Screening', count: 32, status: 'processing' },
    { stage: 'Training Scheduled', count: 28, status: 'active' },
    { stage: 'Final Review', count: 19, status: 'approved' },
    { stage: 'Integration Complete', count: 156, status: 'approved' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Expat Workers Integration Platform. Monitor and manage the complete workflow from registration to integration.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left"
              >
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Workflow Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Workflow Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {workflowOverview.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{item.stage}</div>
                  <div className="text-xs text-muted-foreground">{item.count} workers</div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            System Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">99.8%</div>
              <div className="text-sm text-muted-foreground">CIDB API Uptime</div>
              <StatusBadge status="active" className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">99.5%</div>
              <div className="text-sm text-muted-foreground">Pharmaniaga NHG Sync</div>
              <StatusBadge status="active" className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">98.1%</div>
              <div className="text-sm text-muted-foreground">Document Processing</div>
              <StatusBadge status="processing" className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;