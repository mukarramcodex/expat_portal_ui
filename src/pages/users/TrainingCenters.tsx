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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Add,
  Search,
  School,
  CheckCircle,
  Pending,
  Assignment,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';

interface TrainingCenter {
  id: string;
  name: string;
  registrationNumber: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  capacity: number;
  coursesOffered: string[];
  status: string;
  registrationDate: string;
  lastInspection: string;
  totalTrainees: number;
}

const mockTrainingCenters: TrainingCenter[] = [
  {
    id: '1',
    name: 'Malaysia Skills Development Center',
    registrationNumber: 'TC-2024-001',
    address: 'Jalan Teknologi, Cyberjaya, Selangor',
    contactPerson: 'Ahmad Ibrahim',
    email: 'admin@msdc.edu.my',
    phone: '+603-8000-1234',
    capacity: 200,
    coursesOffered: ['Construction Safety', 'Industrial Safety', 'Basic Safety Training'],
    status: 'approved',
    registrationDate: '2024-01-15',
    lastInspection: '2024-10-15',
    totalTrainees: 156
  },
  {
    id: '2',
    name: 'NIOSH Training Institute',
    registrationNumber: 'TC-2024-002',
    address: 'Bandar Baru Bangi, Selangor',
    contactPerson: 'Dr. Lim Wei Chong',
    email: 'training@niosh.com.my',
    phone: '+603-8769-2345',
    capacity: 150,
    coursesOffered: ['Occupational Safety', 'Health & Safety Management', 'Risk Assessment'],
    status: 'approved',
    registrationDate: '2024-02-20',
    lastInspection: '2024-11-01',
    totalTrainees: 89
  },
  {
    id: '3',
    name: 'Skilltech Training Academy',
    registrationNumber: 'TC-2024-003',
    address: 'Shah Alam, Selangor',
    contactPerson: 'Siti Aishah',
    email: 'info@skilltech.my',
    phone: '+603-5544-3456',
    capacity: 120,
    coursesOffered: ['Basic Workplace Safety', 'Equipment Handling'],
    status: 'pending_approval',
    registrationDate: '2024-03-10',
    lastInspection: 'Pending',
    totalTrainees: 0
  }
];

const TrainingCenters: React.FC = () => {
  const { toast } = useToast();
  const [trainingCenters, setTrainingCenters] = React.useState(mockTrainingCenters);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddCenterOpen, setIsAddCenterOpen] = React.useState(false);
  const [newCenter, setNewCenter] = React.useState({
    name: '',
    registrationNumber: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    capacity: '',
    coursesOffered: '',
    description: ''
  });

  const filteredCenters = trainingCenters.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCenter = () => {
    const center: TrainingCenter = {
      id: Date.now().toString(),
      name: newCenter.name,
      registrationNumber: newCenter.registrationNumber,
      address: newCenter.address,
      contactPerson: newCenter.contactPerson,
      email: newCenter.email,
      phone: newCenter.phone,
      capacity: parseInt(newCenter.capacity) || 0,
      coursesOffered: newCenter.coursesOffered.split(',').map(c => c.trim()),
      status: 'pending_approval',
      registrationDate: new Date().toISOString().split('T')[0],
      lastInspection: 'Pending',
      totalTrainees: 0
    };
    setTrainingCenters([...trainingCenters, center]);
    setNewCenter({
      name: '',
      registrationNumber: '',
      address: '',
      contactPerson: '',
      email: '',
      phone: '',
      capacity: '',
      coursesOffered: '',
      description: ''
    });
    setIsAddCenterOpen(false);
    toast({
      title: "Training Center Registered",
      description: `${newCenter.name} has been registered and is pending approval.`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUtilizationRate = (totalTrainees: number, capacity: number) => {
    return capacity > 0 ? Math.round((totalTrainees / capacity) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Training Centers</h1>
          <p className="text-muted-foreground mt-2">
            Manage training center registrations and monitor training programs for foreign workers
          </p>
        </div>
        <Dialog open={isAddCenterOpen} onOpenChange={setIsAddCenterOpen}>
          <DialogTrigger asChild>
            <Button>
              <Add className="mr-2 h-4 w-4" />
              Register Training Center
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Training Center</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="centerName">Training Center Name</Label>
                  <Input
                    id="centerName"
                    value={newCenter.name}
                    onChange={(e) => setNewCenter({...newCenter, name: e.target.value})}
                    placeholder="Enter center name"
                  />
                </div>
                <div>
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    value={newCenter.registrationNumber}
                    onChange={(e) => setNewCenter({...newCenter, registrationNumber: e.target.value})}
                    placeholder="Enter registration number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="centerAddress">Address</Label>
                <Textarea
                  id="centerAddress"
                  value={newCenter.address}
                  onChange={(e) => setNewCenter({...newCenter, address: e.target.value})}
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newCenter.contactPerson}
                    onChange={(e) => setNewCenter({...newCenter, contactPerson: e.target.value})}
                    placeholder="Enter contact person"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Training Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newCenter.capacity}
                    onChange={(e) => setNewCenter({...newCenter, capacity: e.target.value})}
                    placeholder="Maximum trainees"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="centerEmail">Email</Label>
                  <Input
                    id="centerEmail"
                    type="email"
                    value={newCenter.email}
                    onChange={(e) => setNewCenter({...newCenter, email: e.target.value})}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label htmlFor="centerPhone">Phone</Label>
                  <Input
                    id="centerPhone"
                    value={newCenter.phone}
                    onChange={(e) => setNewCenter({...newCenter, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="courses">Courses Offered</Label>
                <Input
                  id="courses"
                  value={newCenter.coursesOffered}
                  onChange={(e) => setNewCenter({...newCenter, coursesOffered: e.target.value})}
                  placeholder="Enter courses separated by commas"
                />
              </div>
              <Button onClick={handleAddCenter} className="w-full">
                <School className="mr-2 h-4 w-4" />
                Register Training Center
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <School className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Centers</p>
                <p className="text-2xl font-bold">31</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved Centers</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Assignment className="h-8 w-8 text-info" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Trainees</p>
                <p className="text-2xl font-bold">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pending className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Centers List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Training Centers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search training centers by name, registration number, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Center</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Capacity & Utilization</TableHead>
                <TableHead>Courses Offered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCenters.map((center) => (
                <TableRow key={center.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(center.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{center.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <LocationOn className="h-3 w-3 mr-1" />
                          {center.address.split(',')[0]}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="outline" className="font-mono mb-1">
                        {center.registrationNumber}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Registered: {new Date(center.registrationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{center.contactPerson}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Email className="h-3 w-3 mr-1" />
                        {center.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {center.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {center.totalTrainees}/{center.capacity}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getUtilizationRate(center.totalTrainees, center.capacity)}% utilized
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary rounded-full h-2" 
                          style={{ width: `${getUtilizationRate(center.totalTrainees, center.capacity)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {center.coursesOffered.slice(0, 2).map((course, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                      {center.coursesOffered.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{center.coursesOffered.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={center.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Assignment className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingCenters;