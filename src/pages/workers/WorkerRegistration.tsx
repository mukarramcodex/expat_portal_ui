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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Add,
  Search,
  PersonAdd,
  Upload,
  CameraAlt,
  Assignment,
  AccountBox,
  Flag,
  Schedule,
  CheckCircle,
  Pending,
  Warning,
  FileUpload,
} from '@mui/icons-material';

interface Worker {
  id: string;
  name: string;
  passportNumber: string;
  nationality: string;
  agent: string;
  registrationDate: string;
  status: string;
  currentStage: string;
  medicalStatus: string;
  trainingStatus: string;
  profilePhoto?: string;
}

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Muhammad Ali Rahman',
    passportNumber: 'BD1234567',
    nationality: 'Bangladesh',
    agent: 'Agent Services Sdn Bhd',
    registrationDate: '2024-11-01',
    status: 'medical_screening',
    currentStage: 'Medical Screening',
    medicalStatus: 'scheduled',
    trainingStatus: 'pending'
  },
  {
    id: '2',
    name: 'Rajesh Kumar Patel',
    passportNumber: 'IN9876543',
    nationality: 'India',
    agent: 'Malaysia Workforce Solutions',
    registrationDate: '2024-10-28',
    status: 'training',
    currentStage: 'Safety Training',
    medicalStatus: 'approved',
    trainingStatus: 'in_progress'
  },
  {
    id: '3',
    name: 'Nguyen Van Duc',
    passportNumber: 'VN5555444',
    nationality: 'Vietnam',
    agent: 'Global Labor Agency',
    registrationDate: '2024-10-25',
    status: 'completed',
    currentStage: 'Integration Complete',
    medicalStatus: 'approved',
    trainingStatus: 'completed'
  }
];

const WorkerRegistration: React.FC = () => {
  const { toast } = useToast();
  const [workers, setWorkers] = React.useState(mockWorkers);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [newWorker, setNewWorker] = React.useState({
    name: '',
    passportNumber: '',
    nationality: '',
    agent: '',
    dateOfBirth: '',
    contactNumber: '',
    emergencyContact: '',
    address: '',
    jobCategory: '',
    expectedSalary: ''
  });

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || worker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRegisterWorker = () => {
    const worker: Worker = {
      id: Date.now().toString(),
      name: newWorker.name,
      passportNumber: newWorker.passportNumber,
      nationality: newWorker.nationality,
      agent: newWorker.agent,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'registration_submitted',
      currentStage: 'Document Verification',
      medicalStatus: 'pending',
      trainingStatus: 'pending'
    };
    setWorkers([...workers, worker]);
    setNewWorker({
      name: '', passportNumber: '', nationality: '', agent: '', dateOfBirth: '',
      contactNumber: '', emergencyContact: '', address: '', jobCategory: '', expectedSalary: ''
    });
    setIsRegisterOpen(false);
    toast({
      title: "Worker Registered",
      description: `${newWorker.name} has been registered successfully.`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStageProgress = (status: string) => {
    const stages = ['registration_submitted', 'document_verification', 'medical_screening', 'training', 'final_review', 'completed'];
    return ((stages.indexOf(status) + 1) / stages.length) * 100;
  };

  const workflowSteps = [
    { id: 'registration', title: 'Registration', icon: PersonAdd },
    { id: 'documents', title: 'Document Upload', icon: FileUpload },
    { id: 'biometric', title: 'Biometric Capture', icon: CameraAlt },
    { id: 'payment', title: 'Payment Verification', icon: Upload },
    { id: 'medical', title: 'Medical Screening', icon: Assignment },
    { id: 'training', title: 'Safety Training', icon: Schedule },
    { id: 'review', title: 'Final Review', icon: CheckCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expat Worker Registration</h1>
          <p className="text-muted-foreground mt-2">
            Manage the complete registration and integration workflow for foreign workers
          </p>
        </div>
        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogTrigger asChild>
            <Button>
              <Add className="mr-2 h-4 w-4" />
              Register New Worker
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Register New Foreign Worker</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workerName">Full Name</Label>
                  <Input
                    id="workerName"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                    placeholder="Enter full name as per passport"
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={newWorker.passportNumber}
                    onChange={(e) => setNewWorker({...newWorker, passportNumber: e.target.value})}
                    placeholder="Enter passport number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select value={newWorker.nationality} onValueChange={(value) => setNewWorker({...newWorker, nationality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                      <SelectItem value="Myanmar">Myanmar</SelectItem>
                      <SelectItem value="Nepal">Nepal</SelectItem>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="Philippines">Philippines</SelectItem>
                      <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newWorker.dateOfBirth}
                    onChange={(e) => setNewWorker({...newWorker, dateOfBirth: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="workerAgent">Recruiting Agent</Label>
                <Select value={newWorker.agent} onValueChange={(value) => setNewWorker({...newWorker, agent: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recruiting agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agent Services Sdn Bhd">Agent Services Sdn Bhd</SelectItem>
                    <SelectItem value="Malaysia Workforce Solutions">Malaysia Workforce Solutions</SelectItem>
                    <SelectItem value="Global Labor Agency">Global Labor Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={newWorker.contactNumber}
                    onChange={(e) => setNewWorker({...newWorker, contactNumber: e.target.value})}
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={newWorker.emergencyContact}
                    onChange={(e) => setNewWorker({...newWorker, emergencyContact: e.target.value})}
                    placeholder="Enter emergency contact"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Home Address</Label>
                <Textarea
                  id="address"
                  value={newWorker.address}
                  onChange={(e) => setNewWorker({...newWorker, address: e.target.value})}
                  placeholder="Enter complete home address"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobCategory">Job Category</Label>
                  <Select value={newWorker.jobCategory} onValueChange={(value) => setNewWorker({...newWorker, jobCategory: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Plantation">Plantation</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expectedSalary">Expected Monthly Salary (RM)</Label>
                  <Input
                    id="expectedSalary"
                    type="number"
                    value={newWorker.expectedSalary}
                    onChange={(e) => setNewWorker({...newWorker, expectedSalary: e.target.value})}
                    placeholder="Enter expected salary"
                  />
                </div>
              </div>
              <Button onClick={handleRegisterWorker} className="w-full">
                <PersonAdd className="mr-2 h-4 w-4" />
                Register Worker
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
              <AccountBox className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Registered</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Pending className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">1,924</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Warning className="h-8 w-8 text-destructive" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Requires Attention</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workers">Worker Registry</TabsTrigger>
          <TabsTrigger value="workflow">Registration Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="workers">
          <Card>
            <CardHeader>
              <CardTitle>Worker Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search workers by name, passport, or nationality..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="registration_submitted">Registration Submitted</SelectItem>
                    <SelectItem value="medical_screening">Medical Screening</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Worker Details</TableHead>
                    <TableHead>Passport & Nationality</TableHead>
                    <TableHead>Recruiting Agent</TableHead>
                    <TableHead>Current Stage</TableHead>
                    <TableHead>Medical Status</TableHead>
                    <TableHead>Training Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {getInitials(worker.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{worker.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Registered: {new Date(worker.registrationDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant="outline" className="mb-1">
                            {worker.passportNumber}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Flag className="h-3 w-3 mr-1" />
                            {worker.nationality}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{worker.agent}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {worker.currentStage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={worker.medicalStatus} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={worker.trainingStatus} />
                      </TableCell>
                      <TableCell>
                        <div className="w-20">
                          <div className="text-xs text-muted-foreground mb-1">
                            {Math.round(getStageProgress(worker.status))}%
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary rounded-full h-2" 
                              style={{ width: `${getStageProgress(worker.status)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Assignment className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle>Registration Workflow Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {workflowSteps.map((step, index) => (
                  <Card key={step.id} className="text-center">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">Step {index + 1}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-4">Workflow Process</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">1</div>
                    <span><strong>Registration:</strong> Worker submits basic information and documents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">2</div>
                    <span><strong>Document Upload:</strong> Passport, certificates, and supporting documents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">3</div>
                    <span><strong>Biometric Capture:</strong> Facial recognition and fingerprint scanning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">4</div>
                    <span><strong>Payment Verification:</strong> Processing fees and agent payments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">5</div>
                    <span><strong>Medical Screening:</strong> Health examination at approved clinics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">6</div>
                    <span><strong>Safety Training:</strong> Mandatory workplace safety courses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-success-foreground text-xs font-bold">✓</div>
                    <span><strong>Final Review:</strong> Complete integration and work permit issuance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkerRegistration;