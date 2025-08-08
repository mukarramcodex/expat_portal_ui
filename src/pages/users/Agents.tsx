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
import { useToast } from '@/hooks/use-toast';
import {
  Add,
  Search,
  WorkOutline,
  Business,
  People,
  Assignment,
  Upload,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

interface Agent {
  id: string;
  name: string;
  email: string;
  company: string;
  licenseNumber: string;
  workersManaged: number;
  status: string;
  joinDate: string;
  lastSubmission: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Agent Services Sdn Bhd',
    email: 'admin@agentservices.com.my',
    company: 'Agent Services Sdn Bhd',
    licenseNumber: 'AS-2024-001',
    workersManaged: 156,
    status: 'active',
    joinDate: '2024-01-15',
    lastSubmission: '2 hours ago'
  },
  {
    id: '2',
    name: 'Malaysia Workforce Solutions',
    email: 'contact@mwsolutions.my',
    company: 'Malaysia Workforce Solutions',
    licenseNumber: 'MWS-2024-002',
    workersManaged: 89,
    status: 'active',
    joinDate: '2024-02-10',
    lastSubmission: '1 day ago'
  },
  {
    id: '3',
    name: 'Global Labor Agency',
    email: 'info@globallabor.com.my',
    company: 'Global Labor Agency Sdn Bhd',
    licenseNumber: 'GLA-2024-003',
    workersManaged: 234,
    status: 'pending_review',
    joinDate: '2024-03-05',
    lastSubmission: '3 days ago'
  }
];

const Agents: React.FC = () => {
  const { toast } = useToast();
  const [agents, setAgents] = React.useState(mockAgents);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddAgentOpen, setIsAddAgentOpen] = React.useState(false);
  const [newAgent, setNewAgent] = React.useState({
    name: '',
    email: '',
    company: '',
    licenseNumber: '',
    address: '',
    contactPerson: ''
  });

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      email: newAgent.email,
      company: newAgent.company,
      licenseNumber: newAgent.licenseNumber,
      workersManaged: 0,
      status: 'pending_review',
      joinDate: new Date().toISOString().split('T')[0],
      lastSubmission: 'Just now'
    };
    setAgents([...agents, agent]);
    setNewAgent({ name: '', email: '', company: '', licenseNumber: '', address: '', contactPerson: '' });
    setIsAddAgentOpen(false);
    toast({
      title: "Agent Registered",
      description: `${newAgent.company} has been registered and is pending review.`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage registered employment agents and their worker portfolios
          </p>
        </div>
        <Dialog open={isAddAgentOpen} onOpenChange={setIsAddAgentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Add className="mr-2 h-4 w-4" />
              Register Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Employment Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={newAgent.company}
                    onChange={(e) => setNewAgent({...newAgent, company: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={newAgent.licenseNumber}
                    onChange={(e) => setNewAgent({...newAgent, licenseNumber: e.target.value})}
                    placeholder="Enter license number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={newAgent.contactPerson}
                    onChange={(e) => setNewAgent({...newAgent, contactPerson: e.target.value})}
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={newAgent.address}
                  onChange={(e) => setNewAgent({...newAgent, address: e.target.value})}
                  placeholder="Enter complete business address"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddAgent} className="w-full">
                <Business className="mr-2 h-4 w-4" />
                Register Agent
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
              <Business className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <People className="h-8 w-8 text-info" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Workers Managed</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Warning className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Management */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Employment Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search agents by name, company, or license number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Company</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Workers Managed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Submission</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {getInitials(agent.company)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.company}</div>
                        <div className="text-sm text-muted-foreground">{agent.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {agent.licenseNumber}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <People className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{agent.workersManaged}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={agent.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {agent.lastSubmission}
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

export default Agents;