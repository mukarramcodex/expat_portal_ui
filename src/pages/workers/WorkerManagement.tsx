import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Download, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { ScheduleTrainingDialog } from '@/components/dialogs/schedule-training-dialog';
import { BulkActionsDialog } from '@/components/dialogs/bulk-actions-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const WorkerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showTrainingDialog, setShowTrainingDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const workers = [
    {
      id: 'WK001',
      name: 'Ahmad Rahman',
      passport: 'A12345678',
      nationality: 'Bangladesh',
      phone: '+60123456789',
      email: 'ahmad.rahman@email.com',
      agent: 'Global Manpower Sdn Bhd',
      clinic: 'KPJ Damansara',
      trainingCenter: 'CIDB Training Center',
      status: 'Medical Screening',
      progress: 45,
      registrationDate: '2024-01-15',
      expectedCompletion: '2024-03-15',
      avatar: '/avatars/ahmad.jpg'
    },
    {
      id: 'WK002',
      name: 'Ravi Kumar',
      passport: 'B87654321',
      nationality: 'India',
      phone: '+60187654321',
      email: 'ravi.kumar@email.com',
      agent: 'Asia Pacific Resources',
      clinic: 'Pantai Hospital',
      trainingCenter: 'IKBN Training Center',
      status: 'Training',
      progress: 75,
      registrationDate: '2024-01-08',
      expectedCompletion: '2024-02-28',
      avatar: '/avatars/ravi.jpg'
    },
    {
      id: 'WK003',
      name: 'Nguyen Van Duc',
      passport: 'C11223344',
      nationality: 'Vietnam',
      phone: '+60198765432',
      email: 'nguyen.duc@email.com',
      agent: 'Southeast Manpower',
      clinic: 'Gleneagles KL',
      trainingCenter: 'CIDB Training Center',
      status: 'Approved',
      progress: 100,
      registrationDate: '2023-12-20',
      expectedCompletion: '2024-02-15',
      avatar: '/avatars/nguyen.jpg'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Medical Screening': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Training': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.passport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || worker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Worker Management</h1>
          <p className="text-muted-foreground">Manage and track all registered workers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTrainingDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Training
          </Button>
          <Button variant="outline" onClick={() => setShowBulkDialog(true)}>
            Bulk Actions
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, passport, or nationality..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Medical Screening">Medical Screening</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
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

      {/* Workers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Workers ({filteredWorkers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Passport</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={worker.avatar} alt={worker.name} />
                        <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{worker.name}</div>
                        <div className="text-sm text-muted-foreground">{worker.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{worker.passport}</TableCell>
                  <TableCell>{worker.nationality}</TableCell>
                  <TableCell>{worker.agent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(worker.status)}>{worker.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={worker.progress} className="w-16 h-2" />
                      <span className="text-sm text-muted-foreground">{worker.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{worker.registrationDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedWorker(worker)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Worker Details - {worker.name}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="profile" className="w-full">
                            <TabsList>
                              <TabsTrigger value="profile">Profile</TabsTrigger>
                              <TabsTrigger value="progress">Progress</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Full Name</label>
                                  <p className="text-sm text-muted-foreground">{worker.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Passport Number</label>
                                  <p className="text-sm text-muted-foreground">{worker.passport}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Nationality</label>
                                  <p className="text-sm text-muted-foreground">{worker.nationality}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{worker.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{worker.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Agent</label>
                                  <p className="text-sm text-muted-foreground">{worker.agent}</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="progress" className="space-y-4">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span>Registration</span>
                                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Medical Screening</span>
                                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Training</span>
                                  <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Final Approval</span>
                                  <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="documents" className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 border rounded">
                                  <span>Passport Copy</span>
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                                <div className="flex items-center justify-between p-2 border rounded">
                                  <span>Medical Report</span>
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                                <div className="flex items-center justify-between p-2 border rounded">
                                  <span>Training Certificate</span>
                                  <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ScheduleTrainingDialog 
        open={showTrainingDialog} 
        onOpenChange={setShowTrainingDialog}
        workers={workers}
      />

      <BulkActionsDialog 
        open={showBulkDialog} 
        onOpenChange={setShowBulkDialog}
        selectedItems={selectedWorkers}
        itemType="workers"
      />
    </div>
  );
};

export default WorkerManagement;