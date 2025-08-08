import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/ui/status-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Add,
  Search,
  LocalHospital,
  VerifiedUser,
  Assignment,
  CheckCircle,
  Pending,
  FileUpload,
  CalendarToday,
} from '@mui/icons-material';

interface ClinicStaff {
  id: string;
  name: string;
  email: string;
  clinic: string;
  role: string;
  licenseNumber: string;
  specialization: string;
  status: string;
  lastActive: string;
}

const mockClinicStaff: ClinicStaff[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmad',
    email: 'dr.sarah@klinikbangsar.my',
    clinic: 'Klinik Kesihatan Bangsar',
    role: 'Medical Officer',
    licenseNumber: 'MMA-12345',
    specialization: 'Occupational Medicine',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: '2',
    name: 'Dr. Raj Kumar',
    email: 'raj.kumar@panelclinic.my',
    clinic: 'Panel Clinic KL',
    role: 'Chief Medical Officer',
    licenseNumber: 'MMA-67890',
    specialization: 'General Practice',
    status: 'active',
    lastActive: '30 minutes ago'
  },
  {
    id: '3',
    name: 'Nurse Azlina Mohd',
    email: 'azlina@healthcare.my',
    clinic: 'Healthcare Associates',
    role: 'Senior Nurse',
    licenseNumber: 'NMB-54321',
    specialization: 'Pre-employment Screening',
    status: 'active',
    lastActive: '2 hours ago'
  }
];

interface Clinic {
  id: string;
  name: string;
  mohLicense: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
  registrationDate: string;
  lastAudit: string;
}

const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'Klinik Kesihatan Bangsar',
    mohLicense: 'MOH-KL-001',
    address: 'Jalan Bangsar, 59200 Kuala Lumpur',
    contactPerson: 'Dr. Sarah Ahmad',
    email: 'admin@klinikbangsar.my',
    phone: '+603-2201-1234',
    status: 'approved',
    registrationDate: '2024-01-15',
    lastAudit: '2024-11-15'
  },
  {
    id: '2',
    name: 'Panel Clinic KL',
    mohLicense: 'MOH-KL-002',
    address: 'Jalan Ampang, 50450 Kuala Lumpur',
    contactPerson: 'Dr. Raj Kumar',
    email: 'contact@panelclinic.my',
    phone: '+603-2161-2345',
    status: 'approved',
    registrationDate: '2024-02-10',
    lastAudit: '2024-10-20'
  },
  {
    id: '3',
    name: 'Healthcare Associates',
    mohLicense: 'MOH-SL-003',
    address: 'Petaling Jaya, 47800 Selangor',
    contactPerson: 'Dr. Lim Wei Ming',
    email: 'info@healthcare.my',
    phone: '+603-7956-3456',
    status: 'pending_audit',
    registrationDate: '2024-03-05',
    lastAudit: 'Pending'
  }
];

const ClinicStaffPage: React.FC = () => {
  const { toast } = useToast();
  const [clinicStaff, setClinicStaff] = React.useState(mockClinicStaff);
  const [clinics, setClinics] = React.useState(mockClinics);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddStaffOpen, setIsAddStaffOpen] = React.useState(false);
  const [isAddClinicOpen, setIsAddClinicOpen] = React.useState(false);
  
  const [newStaff, setNewStaff] = React.useState({
    name: '',
    email: '',
    clinic: '',
    role: '',
    licenseNumber: '',
    specialization: ''
  });

  const [newClinic, setNewClinic] = React.useState({
    name: '',
    mohLicense: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: ''
  });

  const filteredStaff = clinicStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.mohLicense.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    const staff: ClinicStaff = {
      id: Date.now().toString(),
      ...newStaff,
      status: 'active',
      lastActive: 'Just now'
    };
    setClinicStaff([...clinicStaff, staff]);
    setNewStaff({ name: '', email: '', clinic: '', role: '', licenseNumber: '', specialization: '' });
    setIsAddStaffOpen(false);
    toast({
      title: "Staff Added",
      description: `${newStaff.name} has been added to the clinic staff.`
    });
  };

  const handleAddClinic = () => {
    const clinic: Clinic = {
      id: Date.now().toString(),
      ...newClinic,
      status: 'pending_review',
      registrationDate: new Date().toISOString().split('T')[0],
      lastAudit: 'Pending'
    };
    setClinics([...clinics, clinic]);
    setNewClinic({ name: '', mohLicense: '', address: '', contactPerson: '', email: '', phone: '' });
    setIsAddClinicOpen(false);
    toast({
      title: "Clinic Registered",
      description: `${newClinic.name} has been registered and is pending review.`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Medical Officer') || role.includes('Doctor')) return <LocalHospital className="h-4 w-4" />;
    if (role.includes('Nurse')) return <VerifiedUser className="h-4 w-4" />;
    return <Assignment className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Clinics & Staff</h1>
          <p className="text-muted-foreground mt-2">
            Manage medical clinic registrations and healthcare professional staff
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isAddClinicOpen} onOpenChange={setIsAddClinicOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Add className="mr-2 h-4 w-4" />
                Register Clinic
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register New Medical Clinic</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      value={newClinic.name}
                      onChange={(e) => setNewClinic({...newClinic, name: e.target.value})}
                      placeholder="Enter clinic name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mohLicense">MOH License Number</Label>
                    <Input
                      id="mohLicense"
                      value={newClinic.mohLicense}
                      onChange={(e) => setNewClinic({...newClinic, mohLicense: e.target.value})}
                      placeholder="Enter MOH license"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="clinicAddress">Address</Label>
                  <Input
                    id="clinicAddress"
                    value={newClinic.address}
                    onChange={(e) => setNewClinic({...newClinic, address: e.target.value})}
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={newClinic.contactPerson}
                      onChange={(e) => setNewClinic({...newClinic, contactPerson: e.target.value})}
                      placeholder="Enter contact person"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clinicEmail">Email</Label>
                    <Input
                      id="clinicEmail"
                      type="email"
                      value={newClinic.email}
                      onChange={(e) => setNewClinic({...newClinic, email: e.target.value})}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newClinic.phone}
                    onChange={(e) => setNewClinic({...newClinic, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <Button onClick={handleAddClinic} className="w-full">
                  <LocalHospital className="mr-2 h-4 w-4" />
                  Register Clinic
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button>
                <Add className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Medical Staff</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffName">Full Name</Label>
                    <Input
                      id="staffName"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffEmail">Email</Label>
                    <Input
                      id="staffEmail"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staffClinic">Clinic</Label>
                    <Select value={newStaff.clinic} onValueChange={(value) => setNewStaff({...newStaff, clinic: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clinic" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinics.map(clinic => (
                          <SelectItem key={clinic.id} value={clinic.name}>{clinic.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="staffRole">Role</Label>
                    <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Medical Officer">Medical Officer</SelectItem>
                        <SelectItem value="Chief Medical Officer">Chief Medical Officer</SelectItem>
                        <SelectItem value="Senior Nurse">Senior Nurse</SelectItem>
                        <SelectItem value="Clinic Administrator">Clinic Administrator</SelectItem>
                        <SelectItem value="Medical Assistant">Medical Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={newStaff.licenseNumber}
                      onChange={(e) => setNewStaff({...newStaff, licenseNumber: e.target.value})}
                      placeholder="Enter license number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={newStaff.specialization}
                      onChange={(e) => setNewStaff({...newStaff, specialization: e.target.value})}
                      placeholder="Enter specialization"
                    />
                  </div>
                </div>
                <Button onClick={handleAddStaff} className="w-full">
                  <VerifiedUser className="mr-2 h-4 w-4" />
                  Add Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <LocalHospital className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Clinics</p>
                <p className="text-2xl font-bold">84</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <VerifiedUser className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Medical Staff</p>
                <p className="text-2xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-info" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved Clinics</p>
                <p className="text-2xl font-bold">79</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pending className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Audits</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Clinics and Staff */}
      <Tabs defaultValue="staff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">Medical Staff</TabsTrigger>
          <TabsTrigger value="clinics">Clinic Registry</TabsTrigger>
        </TabsList>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Medical Staff Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search staff by name, clinic, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Clinic</TableHead>
                    <TableHead>Role & License</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(staff.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-sm text-muted-foreground">{staff.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.clinic}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(staff.role)}
                            <span className="text-sm">{staff.role}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {staff.licenseNumber}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{staff.specialization}</TableCell>
                      <TableCell>
                        <StatusBadge status={staff.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {staff.lastActive}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinics">
          <Card>
            <CardHeader>
              <CardTitle>Medical Clinic Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search clinics by name, license, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clinic Details</TableHead>
                    <TableHead>MOH License</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClinics.map((clinic) => (
                    <TableRow key={clinic.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{clinic.name}</div>
                          <div className="text-sm text-muted-foreground">{clinic.address}</div>
                          <div className="text-sm text-muted-foreground">{clinic.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {clinic.mohLicense}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{clinic.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{clinic.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(clinic.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={clinic.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <FileUpload className="mr-1 h-3 w-3" />
                            Documents
                          </Button>
                          <Button variant="outline" size="sm">
                            <CalendarToday className="mr-1 h-3 w-3" />
                            Schedule Audit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicStaffPage;