import React, { useState } from 'react';
import { Search, Calendar, Filter, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WorkerProgress = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const progressData = [
    {
      id: 'WK001',
      name: 'Ahmad Rahman',
      passport: 'A12345678',
      currentStage: 'Medical Screening',
      progress: 45,
      stages: [
        { name: 'Registration', status: 'completed', date: '2024-01-15', duration: 1 },
        { name: 'Document Verification', status: 'completed', date: '2024-01-16', duration: 1 },
        { name: 'Payment Verification', status: 'completed', date: '2024-01-17', duration: 1 },
        { name: 'Medical Screening', status: 'in-progress', date: '2024-01-20', duration: 5 },
        { name: 'Training', status: 'pending', date: null, duration: 14 },
        { name: 'Final Approval', status: 'pending', date: null, duration: 3 }
      ]
    },
    {
      id: 'WK002',
      name: 'Ravi Kumar',
      passport: 'B87654321',
      currentStage: 'Training',
      progress: 75,
      stages: [
        { name: 'Registration', status: 'completed', date: '2024-01-08', duration: 1 },
        { name: 'Document Verification', status: 'completed', date: '2024-01-09', duration: 1 },
        { name: 'Payment Verification', status: 'completed', date: '2024-01-10', duration: 1 },
        { name: 'Medical Screening', status: 'completed', date: '2024-01-15', duration: 5 },
        { name: 'Training', status: 'in-progress', date: '2024-01-22', duration: 14 },
        { name: 'Final Approval', status: 'pending', date: null, duration: 3 }
      ]
    }
  ];

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStageColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = [
    { title: 'Total Workers', value: '1,234', change: '+12%', trend: 'up' },
    { title: 'In Registration', value: '156', change: '+5%', trend: 'up' },
    { title: 'Medical Screening', value: '89', change: '-2%', trend: 'down' },
    { title: 'In Training', value: '234', change: '+8%', trend: 'up' },
    { title: 'Completed', value: '755', change: '+15%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Worker Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor worker registration and approval progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Progress
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Progress Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottleneck Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by worker name or passport..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Registration">Registration</SelectItem>
                    <SelectItem value="Medical Screening">Medical Screening</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Final Approval">Final Approval</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Cards */}
          <div className="space-y-4">
            {progressData.map((worker) => (
              <Card key={worker.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{worker.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Passport: {worker.passport}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Overall Progress</div>
                      <div className="flex items-center gap-2">
                        <Progress value={worker.progress} className="w-24 h-2" />
                        <span className="text-sm font-medium">{worker.progress}%</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {worker.stages.map((stage, index) => (
                      <div key={index} className="text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`p-2 rounded-full border-2 ${
                            stage.status === 'completed' ? 'border-green-200 bg-green-50' :
                            stage.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                            'border-gray-200 bg-gray-50'
                          }`}>
                            {getStageIcon(stage.status)}
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-medium">{stage.name}</p>
                            <Badge className={`text-xs ${getStageColor(stage.status)}`}>
                              {stage.status === 'in-progress' ? 'In Progress' : 
                               stage.status === 'completed' ? 'Completed' : 'Pending'}
                            </Badge>
                            {stage.date && (
                              <p className="text-xs text-muted-foreground">{stage.date}</p>
                            )}
                            <p className="text-xs text-muted-foreground">{stage.duration} days</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-muted-foreground">
                  Timeline visualization coming soon...
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Delays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Medical Screening</span>
                    <Badge className="bg-red-100 text-red-800">Avg: 7 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Training Enrollment</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Avg: 5 days</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Final Approval</span>
                    <Badge className="bg-green-100 text-green-800">Avg: 2 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Medical Clinics</span>
                    <Badge className="bg-blue-100 text-blue-800">85% Capacity</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Training Centers</span>
                    <Badge className="bg-green-100 text-green-800">60% Capacity</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approval Queue</span>
                    <Badge className="bg-yellow-100 text-yellow-800">70% Capacity</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerProgress;