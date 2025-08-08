import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Calendar, AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';
import { ScheduleInspectionDialog } from '@/components/dialogs/schedule-inspection-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ClinicLicenses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showInspectionDialog, setShowInspectionDialog] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const licenses = [
    {
      id: 'CL001',
      clinicName: 'KPJ Damansara Specialist Hospital',
      licenseNumber: 'MOH-KL-2024-001',
      licenseType: 'Private Hospital License',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      issuingAuthority: 'Ministry of Health',
      location: 'Damansara, Kuala Lumpur',
      services: ['General Medicine', 'Surgery', 'Emergency Care', 'Radiology'],
      capacity: 200,
      contactPerson: 'Dr. Sarah Ahmad',
      phone: '+60312345678',
      lastRenewal: '2024-01-15',
      nextInspection: '2024-07-15'
    },
    {
      id: 'CL002',
      clinicName: 'Pantai Hospital Kuala Lumpur',
      licenseNumber: 'MOH-KL-2023-089',
      licenseType: 'Private Hospital License',
      issueDate: '2023-11-20',
      expiryDate: '2024-11-20',
      status: 'Expiring Soon',
      issuingAuthority: 'Ministry of Health',
      location: 'Bangsar, Kuala Lumpur',
      services: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics'],
      capacity: 350,
      contactPerson: 'Dr. Lim Wei Ming',
      phone: '+60387654321',
      lastRenewal: '2023-11-20',
      nextInspection: '2024-05-20'
    },
    {
      id: 'CL003',
      clinicName: 'Gleneagles Kuala Lumpur',
      licenseNumber: 'MOH-KL-2024-023',
      licenseType: 'Private Hospital License',
      issueDate: '2024-02-10',
      expiryDate: '2025-02-10',
      status: 'Active',
      issuingAuthority: 'Ministry of Health',
      location: 'Ampang, Kuala Lumpur',
      services: ['Orthopedics', 'Gastroenterology', 'Dermatology'],
      capacity: 280,
      contactPerson: 'Dr. Raj Kumar',
      phone: '+60356789012',
      lastRenewal: '2024-02-10',
      nextInspection: '2024-08-10'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'Suspended': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Expiring Soon': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Expired': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Suspended': return <Clock className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: 'Total Licenses', value: '156', change: '+12', icon: FileText, color: 'text-blue-600' },
    { title: 'Active Licenses', value: '142', change: '+8', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Expiring Soon', value: '9', change: '+3', icon: AlertTriangle, color: 'text-yellow-600' },
    { title: 'Expired/Suspended', value: '5', change: '-2', icon: Clock, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinic License Management</h1>
          <p className="text-muted-foreground">Monitor and manage medical clinic licenses and certifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowInspectionDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Inspection
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

      {/* Alerts */}
      <div className="space-y-3">
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>9 licenses</strong> are expiring within the next 30 days. Please ensure timely renewal.
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
                  placeholder="Search by clinic name, license number, or location..."
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Licenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>License Records ({filteredLicenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinic Information</TableHead>
                <TableHead>License Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Next Inspection</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{license.clinicName}</div>
                      <div className="text-sm text-muted-foreground">{license.location}</div>
                      <div className="text-sm text-muted-foreground">Capacity: {license.capacity} beds</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-mono text-sm">{license.licenseNumber}</div>
                      <div className="text-sm text-muted-foreground">{license.licenseType}</div>
                      <div className="text-sm text-muted-foreground">{license.issuingAuthority}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(license.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(license.status)}
                        {license.status}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{license.issueDate}</TableCell>
                  <TableCell>
                    <div className={license.status === 'Expiring Soon' ? 'text-yellow-600 font-medium' : ''}>
                      {license.expiryDate}
                    </div>
                  </TableCell>
                  <TableCell>{license.nextInspection}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLicense(license)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>License Details - {license.clinicName}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="details" className="w-full">
                            <TabsList>
                              <TabsTrigger value="details">License Details</TabsTrigger>
                              <TabsTrigger value="services">Services</TabsTrigger>
                              <TabsTrigger value="compliance">Compliance</TabsTrigger>
                              <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">License Number</label>
                                  <p className="text-sm text-muted-foreground font-mono">{license.licenseNumber}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">License Type</label>
                                  <p className="text-sm text-muted-foreground">{license.licenseType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Issuing Authority</label>
                                  <p className="text-sm text-muted-foreground">{license.issuingAuthority}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <Badge className={getStatusColor(license.status)}>{license.status}</Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Contact Person</label>
                                  <p className="text-sm text-muted-foreground">{license.contactPerson}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{license.phone}</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="services" className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Authorized Medical Services</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {license.services.map((service) => (
                                    <Badge key={service} variant="secondary">{service}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Bed Capacity</label>
                                <p className="text-sm text-muted-foreground">{license.capacity} beds</p>
                              </div>
                            </TabsContent>
                            <TabsContent value="compliance" className="space-y-4">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span>Last Safety Inspection</span>
                                  <Badge className="bg-green-100 text-green-800">Passed</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Equipment Certification</span>
                                  <Badge className="bg-green-100 text-green-800">Valid</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Staff Credentials</span>
                                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Insurance Coverage</span>
                                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="history" className="space-y-4">
                              <div className="space-y-2">
                                <div className="text-sm">
                                  <strong>2024-01-15:</strong> License renewed for 1 year
                                </div>
                                <div className="text-sm">
                                  <strong>2023-12-10:</strong> Inspection completed - No issues found
                                </div>
                                <div className="text-sm">
                                  <strong>2023-01-15:</strong> Initial license issued
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ScheduleInspectionDialog 
        open={showInspectionDialog} 
        onOpenChange={setShowInspectionDialog}
        clinic={selectedClinic}
      />
    </div>
  );
};

export default ClinicLicenses;