import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  status: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'Dr. Sarah Ahmad',
    action: 'Approved medical screening for',
    target: 'Muhammad Ali Rahman',
    status: 'approved',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    user: 'Agent Services Sdn Bhd',
    action: 'Submitted new worker registration for',
    target: 'Rajesh Kumar Patel',
    status: 'pending',
    timestamp: '15 minutes ago',
  },
  {
    id: '3',
    user: 'Training Center KL',
    action: 'Completed safety training for',
    target: 'Nguyen Van Duc',
    status: 'approved',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    user: 'System Administrator',
    action: 'Updated clinic license for',
    target: 'Klinik Kesihatan Bangsar',
    status: 'processing',
    timestamp: '2 hours ago',
  },
  {
    id: '5',
    user: 'Pharmaniaga Approver',
    action: 'Rejected payment verification for',
    target: 'PT Construction Services',
    status: 'rejected',
    timestamp: '3 hours ago',
  },
];

export const RecentActivity: React.FC = () => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-border last:border-0 last:pb-0">
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {getInitials(activity.user)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm">
                <span className="font-medium text-foreground">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action} </span>
                <span className="font-medium text-foreground">{activity.target}</span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <StatusBadge status={activity.status} />
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <button className="text-sm text-primary hover:text-primary-hover font-medium transition-colors">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};