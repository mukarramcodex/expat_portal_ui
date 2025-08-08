import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, AlertTriangle, FileText, User, Building, GraduationCap } from 'lucide-react';
import { BulkActionsDialog } from '@/components/dialogs/bulk-actions-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Approvals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [selectedApprovals, setSelectedApprovals] = useState([]);

  const approvals = [
    {
      id: 'APP001',
      type: 'Worker Registration',
      applicantName: 'Ahmad Rahman',
      applicantId: 'WK001',
      submittedDate: '2024-02-10',
      submittedBy: 'Global Manpower Sdn Bhd',
      priority: 'High',
      status: 'Pending Review',
      assignedTo: 'Dr. Sarah Ahmad',
      dueDate: '2024-02-17',
      documents: ['Passport Copy', 'Medical Certificate', 'Payment Receipt'],
      stage: 'Medical Approval',
      description: 'Final medical clearance approval for construction worker'
    },
    {
      id: 'APP002',
      type: 'Clinic License',
      applicantName: 'Metro Medical Center',
      applicantId: 'CL004',
      submittedDate: '2024-02-08',
      submittedBy: 'Dr. Lim Wei Ming',
      priority: 'Medium',
      status: 'Under Review',
      assignedTo: 'En. Ahmad Zulkifli',
      dueDate: '2024-02-22',
      documents: ['MOH License', 'Business Registration', 'Facility Photos'],
      stage: 'License Verification',
      description: 'New medical clinic license application for worker health screening'
    },
    {
      id: 'APP003',
      type: 'Training Certificate',
      applicantName: 'Ravi Kumar',
      applicantId: 'WK002',
      submittedDate: '2024-02-12',
      submittedBy: 'CIDB Training Center',
      priority: 'Low',
      status: 'Approved',
      assignedTo: 'Ms. Fatimah Hassan',
      dueDate: '2024-02-19',
      documents: ['Training Certificate', 'Assessment Results', 'Attendance Record'],
      stage: 'Certificate Issuance',
      description: 'Construction safety training completion certification'
    },
    {
      id: 'APP004',
      type: 'Payment Verification',
      applicantName: 'Nguyen Van Duc',
      applicantId: 'WK003',
      submittedDate: '2024-02-14',
      submittedBy: 'Asia Pacific Resources',
      priority: 'High',
      status: 'Rejected',
      assignedTo: 'Mr. Raj Kumar',
      dueDate: '2024-02-21',
      documents: ['Payment Receipt', 'Bank Statement'],
      stage: 'Payment Review',
      description: 'Registration fee payment verification - insufficient documentation'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'On Hold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending Review': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Under Review': return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      case 'Approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Worker Registration': return <User className="h-4 w-4" />;
      case 'Clinic License': return <Building className="h-4 w-4" />;
      case 'Training Certificate': return <GraduationCap className="h-4 w-4" />;
      case 'Payment Verification': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = approval.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || approval.status === statusFilter;
    const matchesType = typeFilter === 'all' || approval.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = [
    { title: 'Total Pending', value: '89', change: '+12', icon: Clock, color: 'text-yellow-600' },
    { title: 'Under Review', value: '34', change: '+5', icon: AlertTriangle, color: 'text-blue-600' },
    { title: 'Approved Today', value: '23', change: '+8', icon: CheckCircle, color: 'text-green-600' },
    { title: 'High Priority', value: '15', change: '+3', icon: AlertTriangle, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Approval Management</h1>
          <p className="text-muted-foreground">Review and approve registration, license, and certification requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Export Report
          </Button>
          <Button onClick={() => setShowBulkDialog(true)}>
            Bulk Actions
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
                  <p className="text-xs text-green-600">{stat.change} today</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Alerts */}
      <div className="space-y-3">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>15 high-priority approvals</strong> require immediate attention. 3 are overdue.
          </AlertDescription>
        </Alert>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by applicant name, ID, or submitter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Worker Registration">Worker Registration</SelectItem>
                <SelectItem value="Clinic License">Clinic License</SelectItem>
                <SelectItem value="Training Certificate">Training Certificate</SelectItem>
                <SelectItem value="Payment Verification">Payment Verification</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Queue ({filteredApprovals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Details</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(approval.type)}
                      <div>
                        <div className="font-medium">{approval.type}</div>
                        <div className="text-sm text-muted-foreground">{approval.id}</div>
                        <div className="text-sm text-muted-foreground">{approval.stage}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{approval.applicantName}</div>
                      <div className="text-sm text-muted-foreground">{approval.applicantId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{approval.submittedBy}</div>
                      <div className="text-sm text-muted-foreground">{approval.submittedDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(approval.priority)}>{approval.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(approval.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(approval.status)}
                        {approval.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{approval.assignedTo}</TableCell>
                  <TableCell>
                    <div className={
                      new Date(approval.dueDate) < new Date() && approval.status !== 'Approved' && approval.status !== 'Rejected'
                        ? 'text-red-600 font-medium'
                        : ''
                    }>
                      {approval.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedApproval(approval)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Approval Details - {approval.id}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="details" className="w-full">
                            <TabsList>
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                              <TabsTrigger value="history">History</TabsTrigger>
                              <TabsTrigger value="action">Take Action</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Request Type</label>
                                  <p className="text-sm text-muted-foreground">{approval.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Current Stage</label>
                                  <p className="text-sm text-muted-foreground">{approval.stage}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Applicant</label>
                                  <p className="text-sm text-muted-foreground">{approval.applicantName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Submitted By</label>
                                  <p className="text-sm text-muted-foreground">{approval.submittedBy}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <Badge className={getPriorityColor(approval.priority)}>{approval.priority}</Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Badge className={getStatusColor(approval.status)}>{approval.status}</Badge>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="text-sm text-muted-foreground">{approval.description}</p>
                              </div>
                            </TabsContent>
                            <TabsContent value="documents" className="space-y-4">
                              <div className="space-y-2">
                                {approval.documents.map((doc, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                                    <span>{doc}</span>
                                    <Button variant="outline" size="sm">View</Button>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                            <TabsContent value="history" className="space-y-4">
                              <div className="space-y-2">
                                <div className="text-sm">
                                  <strong>{approval.submittedDate}:</strong> Request submitted by {approval.submittedBy}
                                </div>
                                <div className="text-sm">
                                  <strong>2024-02-11:</strong> Assigned to {approval.assignedTo}
                                </div>
                                <div className="text-sm">
                                  <strong>2024-02-12:</strong> Initial review completed
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="action" className="space-y-4">
                              {approval.status === 'Pending Review' || approval.status === 'Under Review' ? (
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium">Decision</label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select decision" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="approve">Approve</SelectItem>
                                        <SelectItem value="reject">Reject</SelectItem>
                                        <SelectItem value="request-info">Request More Information</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Comments</label>
                                    <Textarea placeholder="Add your comments here..." rows={4} />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Approve
                                    </Button>
                                    <Button variant="destructive">
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Reject
                                    </Button>
                                    <Button variant="outline">
                                      Request Information
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-muted-foreground py-8">
                                  This request has already been processed.
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      {(approval.status === 'Pending Review' || approval.status === 'Under Review') && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BulkActionsDialog 
        open={showBulkDialog} 
        onOpenChange={setShowBulkDialog}
        selectedItems={selectedApprovals}
        itemType="workers"
      />
    </div>
  );
};

export default Approvals;