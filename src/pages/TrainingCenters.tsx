import React, { useState } from 'react';
import { Search, Filter, Eye, Plus, Edit, Users, MapPin, Phone, Mail, Calendar, Award, Clock } from 'lucide-react';
import { AddTrainingCenterDialog } from '@/components/dialogs/add-training-center-dialog';
import { ScheduleTrainingDialog } from '@/components/dialogs/schedule-training-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const TrainingCenters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTrainingDialog, setShowTrainingDialog] = useState(false);

  const trainingCenters = [
    {
      id: 'TC001',
      name: 'CIDB Training Institute Kuala Lumpur',
      registrationNumber: 'CIDB-KL-2024-001',
      type: 'Construction Skills',
      status: 'Active',
      capacity: 200,
      currentEnrollment: 145,
      location: 'Cheras, Kuala Lumpur',
      contactPerson: 'Ahmad Zulkifli',
      phone: '+60312345678',
      email: 'ahmad@cidb-training.my',
      establishedDate: '2020-03-15',
      accreditation: 'CIDB Approved',
      programs: [
        { name: 'Basic Construction Safety', duration: '5 days', capacity: 50, enrolled: 35 },
        { name: 'Scaffolding Training', duration: '3 days', capacity: 30, enrolled: 28 },
        { name: 'Heavy Machinery Operation', duration: '7 days', capacity: 25, enrolled: 20 }
      ],
      facilitators: [
        { name: 'Ir. Rahman Ali', certification: 'Professional Engineer', experience: '15 years' },
        { name: 'Mr. Lim Wei Chong', certification: 'CIDB Trainer', experience: '12 years' }
      ],
      completionRate: 92,
      rating: 4.8
    },
    {
      id: 'TC002',
      name: 'IKBN Selangor Training Center',
      registrationNumber: 'IKBN-SEL-2024-002',
      type: 'Industrial Skills',
      status: 'Active',
      capacity: 150,
      currentEnrollment: 98,
      location: 'Shah Alam, Selangor',
      contactPerson: 'Siti Nurhaliza',
      phone: '+60355667788',
      email: 'siti@ikbn-selangor.my',
      establishedDate: '2019-08-22',
      accreditation: 'DSD Approved',
      programs: [
        { name: 'Welding Certification', duration: '10 days', capacity: 40, enrolled: 32 },
        { name: 'Electrical Installation', duration: '14 days', capacity: 35, enrolled: 30 },
        { name: 'Plumbing Skills', duration: '8 days', capacity: 25, enrolled: 18 }
      ],
      facilitators: [
        { name: 'En. Rosli Hassan', certification: 'Master Craftsman', experience: '20 years' },
        { name: 'Ms. Kavitha Devi', certification: 'Electrical Engineer', experience: '10 years' }
      ],
      completionRate: 89,
      rating: 4.6
    },
    {
      id: 'TC003',
      name: 'Malaysia-German Training Institute',
      registrationNumber: 'MGTI-2024-003',
      type: 'Technical Skills',
      status: 'Pending Review',
      capacity: 120,
      currentEnrollment: 0,
      location: 'Cyberjaya, Selangor',
      contactPerson: 'Dr. Hans Mueller',
      phone: '+60387654321',
      email: 'hans@mgti.my',
      establishedDate: '2024-01-10',
      accreditation: 'Under Review',
      programs: [
        { name: 'Advanced Manufacturing', duration: '21 days', capacity: 30, enrolled: 0 },
        { name: 'Automation Systems', duration: '15 days', capacity: 25, enrolled: 0 }
      ],
      facilitators: [],
      completionRate: null,
      rating: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Suspended': return 'bg-red-100 text-red-800 border-red-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCenters = trainingCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || center.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: 'Total Centers', value: '45', change: '+5', icon: Users, color: 'text-blue-600' },
    { title: 'Active Centers', value: '38', change: '+3', icon: Award, color: 'text-green-600' },
    { title: 'Total Capacity', value: '8,500', change: '+850', icon: Users, color: 'text-purple-600' },
    { title: 'Current Enrollment', value: '6,234', change: '+234', icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Centers Management</h1>
          <p className="text-muted-foreground">Manage training centers and their programs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Training Center
          </Button>
          <Button onClick={() => setShowTrainingDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Training
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
                  placeholder="Search by center name, location, or type..."
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
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Centers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Training Centers ({filteredCenters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Center Information</TableHead>
                <TableHead>Type & Accreditation</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{center.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {center.location}
                      </div>
                      <div className="text-sm text-muted-foreground">ID: {center.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{center.type}</div>
                      <div className="text-sm text-muted-foreground">{center.accreditation}</div>
                      <div className="text-sm text-muted-foreground">Est. {center.establishedDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{center.currentEnrollment}/{center.capacity}</span>
                        <Progress 
                          value={(center.currentEnrollment / center.capacity) * 100} 
                          className="w-16 h-2" 
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((center.currentEnrollment / center.capacity) * 100)}% utilized
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{center.contactPerson}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {center.phone}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {center.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(center.status)}>{center.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {center.completionRate !== null ? (
                      <div>
                        <div className="text-sm font-medium">{center.completionRate}% completion</div>
                        <div className="text-sm text-muted-foreground">
                          {center.rating}⭐ rating
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">New center</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCenter(center)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{center.name}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList>
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="programs">Programs</TabsTrigger>
                              <TabsTrigger value="facilitators">Facilitators</TabsTrigger>
                              <TabsTrigger value="performance">Performance</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Registration Number</label>
                                  <p className="text-sm text-muted-foreground">{center.registrationNumber}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Type</label>
                                  <p className="text-sm text-muted-foreground">{center.type}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Accreditation</label>
                                  <p className="text-sm text-muted-foreground">{center.accreditation}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Established</label>
                                  <p className="text-sm text-muted-foreground">{center.establishedDate}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Total Capacity</label>
                                  <p className="text-sm text-muted-foreground">{center.capacity} trainees</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Current Enrollment</label>
                                  <p className="text-sm text-muted-foreground">{center.currentEnrollment} trainees</p>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="programs" className="space-y-4">
                              <div className="space-y-3">
                                {center.programs.map((program, index) => (
                                  <Card key={index}>
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-medium">{program.name}</h4>
                                          <p className="text-sm text-muted-foreground">Duration: {program.duration}</p>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm font-medium">
                                            {program.enrolled}/{program.capacity} enrolled
                                          </div>
                                          <Progress 
                                            value={(program.enrolled / program.capacity) * 100} 
                                            className="w-20 h-2 mt-1" 
                                          />
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                            <TabsContent value="facilitators" className="space-y-4">
                              <div className="space-y-3">
                                {center.facilitators.length > 0 ? (
                                  center.facilitators.map((facilitator, index) => (
                                    <Card key={index}>
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <h4 className="font-medium">{facilitator.name}</h4>
                                            <p className="text-sm text-muted-foreground">{facilitator.certification}</p>
                                          </div>
                                          <Badge variant="secondary">{facilitator.experience}</Badge>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))
                                ) : (
                                  <div className="text-center text-muted-foreground py-8">
                                    No facilitators assigned yet
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                            <TabsContent value="performance" className="space-y-4">
                              {center.completionRate !== null ? (
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardContent className="p-4 text-center">
                                      <div className="text-2xl font-bold text-green-600">{center.completionRate}%</div>
                                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4 text-center">
                                      <div className="text-2xl font-bold text-blue-600">{center.rating}⭐</div>
                                      <div className="text-sm text-muted-foreground">Average Rating</div>
                                    </CardContent>
                                  </Card>
                                </div>
                              ) : (
                                <div className="text-center text-muted-foreground py-8">
                                  Performance data will be available after first batch completion
                                </div>
                              )}
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

      <AddTrainingCenterDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />

      <ScheduleTrainingDialog 
        open={showTrainingDialog} 
        onOpenChange={setShowTrainingDialog}
        workers={[]}
      />
    </div>
  );
};

export default TrainingCenters;