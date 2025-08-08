import React, { useState } from 'react';
import { Download, Calendar, Filter, BarChart3, PieChart, TrendingUp, Users, Building, FileText, Eye } from 'lucide-react';
import { ScheduleReportsDialog } from '@/components/dialogs/schedule-reports-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('worker-summary');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  const reportTemplates = [
    {
      id: 'worker-summary',
      name: 'Worker Registration Summary',
      description: 'Comprehensive overview of worker registrations, approvals, and status',
      category: 'Workers',
      frequency: 'Daily',
      lastGenerated: '2024-02-15 09:00:00',
      size: '2.4 MB',
      format: 'PDF, Excel',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'clinic-performance',
      name: 'Clinic Performance Report',
      description: 'Medical screening efficiency and clinic capacity utilization',
      category: 'Clinics',
      frequency: 'Weekly',
      lastGenerated: '2024-02-12 08:00:00',
      size: '1.8 MB',
      format: 'PDF, Excel',
      icon: Building,
      color: 'text-green-600'
    },
    {
      id: 'training-analytics',
      name: 'Training Center Analytics',
      description: 'Training completion rates, center performance, and capacity analysis',
      category: 'Training',
      frequency: 'Monthly',
      lastGenerated: '2024-02-01 07:00:00',
      size: '3.2 MB',
      format: 'PDF, Excel',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      id: 'approval-workflow',
      name: 'Approval Workflow Report',
      description: 'Processing times, bottlenecks, and approval success rates',
      category: 'Operations',
      frequency: 'Weekly',
      lastGenerated: '2024-02-14 10:00:00',
      size: '1.5 MB',
      format: 'PDF, Excel',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      id: 'financial-summary',
      name: 'Financial Summary Report',
      description: 'Payment processing, revenue tracking, and financial metrics',
      category: 'Finance',
      frequency: 'Monthly',
      lastGenerated: '2024-02-01 09:00:00',
      size: '2.1 MB',
      format: 'PDF, Excel',
      icon: PieChart,
      color: 'text-red-600'
    },
    {
      id: 'compliance-audit',
      name: 'Compliance & Audit Report',
      description: 'Regulatory compliance status and audit findings',
      category: 'Compliance',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-15 08:00:00',
      size: '4.1 MB',
      format: 'PDF',
      icon: FileText,
      color: 'text-indigo-600'
    }
  ];

  const quickStats = [
    { title: 'Reports Generated', value: '1,247', change: '+89', period: 'this month' },
    { title: 'Data Points', value: '2.4M', change: '+156K', period: 'this month' },
    { title: 'Automated Reports', value: '156', change: '+12', period: 'active' },
    { title: 'Report Views', value: '8,945', change: '+234', period: 'this week' }
  ];

  const recentReports = [
    {
      name: 'Weekly Worker Registration Summary',
      type: 'Automated',
      generated: '2024-02-15 09:00:00',
      status: 'Completed',
      downloads: 45,
      size: '2.4 MB'
    },
    {
      name: 'Clinic Performance Dashboard',
      type: 'Manual',
      generated: '2024-02-14 14:30:00',
      status: 'Completed',
      downloads: 23,
      size: '1.8 MB'
    },
    {
      name: 'Monthly Training Analytics',
      type: 'Scheduled',
      generated: '2024-02-13 08:00:00',
      status: 'Processing',
      downloads: 0,
      size: 'Pending'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and analyze system performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change} {stat.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="workers">Workers</SelectItem>
                    <SelectItem value="clinics">Clinics</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frequencies</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <template.icon className={`h-8 w-8 ${template.color}`} />
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <div className="font-medium">{template.frequency}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <div className="font-medium">{template.size}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <div className="font-medium">{template.format}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Generated:</span>
                        <div className="font-medium text-xs">{template.lastGenerated}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Generated: {report.generated} • Type: {report.type}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {report.downloads} downloads • {report.size}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scheduled Reports</CardTitle>
                <Button onClick={() => setShowScheduleDialog(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Weekly Worker Registration Summary</div>
                    <div className="text-sm text-muted-foreground">Every Monday at 9:00 AM</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <div className="text-sm text-muted-foreground">Next: Feb 19, 2024</div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Monthly Training Analytics</div>
                    <div className="text-sm text-muted-foreground">First day of each month at 8:00 AM</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <div className="text-sm text-muted-foreground">Next: Mar 1, 2024</div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Quarterly Compliance Report</div>
                    <div className="text-sm text-muted-foreground">Every 3 months on 15th at 7:00 AM</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-gray-100 text-gray-800">Paused</Badge>
                    <div className="text-sm text-muted-foreground">Next: May 15, 2024</div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Build custom reports with specific data points and filters
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Report Name</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md" 
                        placeholder="Enter report name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Data Source</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workers">Worker Registration Data</SelectItem>
                          <SelectItem value="clinics">Medical Clinic Data</SelectItem>
                          <SelectItem value="training">Training Center Data</SelectItem>
                          <SelectItem value="approvals">Approval Workflow Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date Range</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">Last 7 days</SelectItem>
                          <SelectItem value="30days">Last 30 days</SelectItem>
                          <SelectItem value="90days">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Output Format</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Group By</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grouping" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Filters</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Add filters" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="nationality">Nationality</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button>Generate Report</Button>
                  <Button variant="outline">Preview</Button>
                  <Button variant="outline">Save Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ScheduleReportsDialog 
        open={showScheduleDialog} 
        onOpenChange={setShowScheduleDialog}
      />
    </div>
  );
};

export default Reports;