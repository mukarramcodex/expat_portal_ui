import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, Download, MapPin, Clock, CheckCircle, AlertTriangle, FileText, Plus } from 'lucide-react';
import { ScheduleAuditDialog } from '@/components/dialogs/schedule-audit-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ClinicAudits = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showAuditDialog, setShowAuditDialog] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const audits = [
    {
      id: 'AU001',
      clinicName: 'KPJ Damansara Specialist Hospital',
      auditType: 'License Compliance Audit',
      auditor: 'Dr. Fatimah Hassan',
      scheduledDate: '2024-02-15',
      completedDate: '2024-02-15',
      status: 'Completed',
      score: 95,
      findings: 2,
      criticalFindings: 0,
      location: 'Damansara, Kuala Lumpur',
      duration: '4 hours',
      nextAudit: '2024-08-15',
      areas: [
        { category: 'Facility Standards', score: 98, status: 'Pass' },
        { category: 'Equipment Safety', score: 95, status: 'Pass' },
        { category: 'Documentation', score: 90, status: 'Pass' },
        { category: 'Staff Credentials', score: 97, status: 'Pass' },
        { category: 'Patient Safety', score: 92, status: 'Pass' }
      ]
    },
    {
      id: 'AU002',
      clinicName: 'Pantai Hospital Kuala Lumpur',
      auditType: 'Safety Compliance Audit',
      auditor: 'Mr. Ahmad Razak',
      scheduledDate: '2024-02-20',
      completedDate: null,
      status: 'In Progress',
      score: null,
      findings: null,
      criticalFindings: null,
      location: 'Bangsar, Kuala Lumpur',
      duration: '6 hours',
      nextAudit: null,
      areas: [
        { category: 'Facility Standards', score: null, status: 'Pending' },
        { category: 'Equipment Safety', score: 85, status: 'In Review' },
        { category: 'Documentation', score: null, status: 'Pending' },
        { category: 'Staff Credentials', score: null, status: 'Pending' },
        { category: 'Patient Safety', score: null, status: 'Pending' }
      ]
    },
    {
      id: 'AU003',
      clinicName: 'Gleneagles Kuala Lumpur',
      auditType: 'Annual Compliance Review',
      auditor: 'Dr. Sarah Lim',
      scheduledDate: '2024-02-25',
      completedDate: null,
      status: 'Scheduled',
      score: null,
      findings: null,
      criticalFindings: null,
      location: 'Ampang, Kuala Lumpur',
      duration: '8 hours',
      nextAudit: null,
      areas: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Scheduled': return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: 'Total Audits', value: '247', change: '+18', icon: FileText, color: 'text-blue-600' },
    { title: 'Completed', value: '198', change: '+15', icon: CheckCircle, color: 'text-green-600' },
    { title: 'In Progress', value: '12', change: '+3', icon: Clock, color: 'text-blue-600' },
    { title: 'Overdue', value: '3', change: '-2', icon: AlertTriangle, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic Audit Management</h1>
          <p className="text-muted-foreground">Schedule, track, and manage clinic compliance audits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAuditDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Audit
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change} this month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by clinic name, auditor, or audit type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audits Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Records ({filteredAudits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinic Information</TableHead>
                <TableHead>Audit Details</TableHead>
                <TableHead>Auditor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{audit.clinicName}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {audit.location}
                      </div>
                      <div className="text-sm text-muted-foreground">ID: {audit.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{audit.auditType}</div>
                      <div className="text-sm text-muted-foreground">Duration: {audit.duration}</div>
                      {audit.findings !== null && (
                        <div className="text-sm text-muted-foreground">
                          {audit.findings} findings ({audit.criticalFindings} critical)
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{audit.auditor}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(audit.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(audit.status)}
                        {audit.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {audit.score !== null ? (
                      <div className={`font-bold ${getScoreColor(audit.score)}`}>
                        {audit.score}/100
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{audit.scheduledDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedAudit(audit)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Audit Details - {audit.clinicName}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList>
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="findings">Findings</TabsTrigger>
                              <TabsTrigger value="scores">Detailed Scores</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Audit Type</label>
                                  <p className="text-sm text-muted-foreground">{audit.auditType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Auditor</label>
                                  <p className="text-sm text-muted-foreground">{audit.auditor}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Scheduled Date</label>
                                  <p className="text-sm text-muted-foreground">{audit.scheduledDate}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Duration</label>
                                  <p className="text-sm text-muted-foreground">{audit.duration}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Badge className={getStatusColor(audit.status)}>{audit.status}</Badge>
                                </div>
                                {audit.score && (
                                  <div>
                                    <label className="text-sm font-medium">Overall Score</label>
                                    <p className={`text-sm font-bold ${getScoreColor(audit.score)}`}>
                                      {audit.score}/100
                                    </p>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                            <TabsContent value="findings" className="space-y-4">
                              {audit.status === 'Completed' ? (
                                <div className="space-y-3">
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge className="bg-yellow-100 text-yellow-800">Minor</Badge>
                                      <span className="font-medium">Equipment Calibration</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      X-ray equipment calibration certificate expires in 30 days. Schedule renewal.
                                    </p>
                                  </div>
                                  <div className="p-3 border rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge className="bg-blue-100 text-blue-800">Observation</Badge>
                                      <span className="font-medium">Documentation Update</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Update staff training records to reflect recent certifications.
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-muted-foreground py-8">
                                  Findings will be available after audit completion
                                </div>
                              )}
                            </TabsContent>
                            <TabsContent value="scores" className="space-y-4">
                              {audit.areas.length > 0 ? (
                                <div className="space-y-3">
                                  {audit.areas.map((area, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                      <div>
                                        <span className="font-medium">{area.category}</span>
                                        <Badge className={`ml-2 ${
                                          area.status === 'Pass' ? 'bg-green-100 text-green-800' :
                                          area.status === 'In Review' ? 'bg-blue-100 text-blue-800' :
                                          'bg-gray-100 text-gray-800'
                                        }`}>
                                          {area.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {area.score && (
                                          <>
                                            <Progress value={area.score} className="w-20 h-2" />
                                            <span className={`font-medium ${getScoreColor(area.score)}`}>
                                              {area.score}%
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center text-muted-foreground py-8">
                                  Detailed scores will be available during audit
                                </div>
                              )}
                            </TabsContent>
                            <TabsContent value="documents" className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 border rounded">
                                  <span>Audit Checklist</span>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                                {audit.status === 'Completed' && (
                                  <>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                      <span>Final Audit Report</span>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-2 border rounded">
                                      <span>Photographic Evidence</span>
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ScheduleAuditDialog 
        open={showAuditDialog} 
        onOpenChange={setShowAuditDialog}
        clinic={selectedClinic}
      />
    </div>
  );
};

export default ClinicAudits;