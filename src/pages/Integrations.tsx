import React, { useState } from 'react';
import { Settings, RefreshCw, CheckCircle, XCircle, AlertTriangle, Zap, Database, Cloud, Key, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Integrations = () => {
  const [cidbStatus, setCidbStatus] = useState(true);
  const [pharmaniagaStatus, setPharmanigaStatus] = useState(true);

  const integrations = [
    {
      id: 'cidb',
      name: 'CIDB System',
      description: 'Construction Industry Development Board integration for worker certification',
      status: 'Connected',
      lastSync: '2024-02-15 14:30:00',
      syncFrequency: 'Real-time',
      endpoint: 'https://api.cidb.gov.my/v2/',
      version: '2.1.4',
      uptime: 99.8,
      totalRequests: 12543,
      successRate: 98.7,
      averageResponseTime: 245,
      icon: Database,
      color: 'text-blue-600'
    },
    {
      id: 'pharmaniaga',
      name: 'Pharmaniaga NHG System',
      description: 'Medical screening and health record management system',
      status: 'Connected',
      lastSync: '2024-02-15 14:28:00',
      syncFrequency: 'Every 5 minutes',
      endpoint: 'https://api.pharmaniaga.com/nhg/v1/',
      version: '1.8.2',
      uptime: 99.5,
      totalRequests: 8721,
      successRate: 99.2,
      averageResponseTime: 180,
      icon: Activity,
      color: 'text-green-600'
    },
    {
      id: 'payment',
      name: 'Payment Gateway',
      description: 'Secure payment processing for registration fees',
      status: 'Connected',
      lastSync: '2024-02-15 14:32:00',
      syncFrequency: 'Real-time',
      endpoint: 'https://api.payment-gateway.my/v3/',
      version: '3.2.1',
      uptime: 99.9,
      totalRequests: 5432,
      successRate: 99.8,
      averageResponseTime: 120,
      icon: Zap,
      color: 'text-purple-600'
    },
    {
      id: 'aws',
      name: 'AWS Cloud Services',
      description: 'Document storage and backup services',
      status: 'Connected',
      lastSync: '2024-02-15 14:35:00',
      syncFrequency: 'Continuous',
      endpoint: 'https://s3.ap-southeast-1.amazonaws.com/',
      version: 'Latest',
      uptime: 99.99,
      totalRequests: 25687,
      successRate: 99.9,
      averageResponseTime: 95,
      icon: Cloud,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'Disconnected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Error': return 'bg-red-100 text-red-800 border-red-200';
      case 'Syncing': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Disconnected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Syncing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = [
    { title: 'Active Integrations', value: '4', icon: Database, color: 'text-blue-600' },
    { title: 'Daily API Calls', value: '15.2K', icon: Zap, color: 'text-purple-600' },
    { title: 'Success Rate', value: '99.1%', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Avg Response Time', value: '160ms', icon: Activity, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Integrations</h1>
          <p className="text-muted-foreground">Manage external system connections and API integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
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
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status Alert */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          All systems are operational. Last health check completed at 14:35 UTC.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <integration.icon className={`h-8 w-8 ${integration.color}`} />
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(integration.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(integration.status)}
                        {integration.status}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Sync:</span>
                        <div className="font-medium">{integration.lastSync}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <div className="font-medium">{integration.syncFrequency}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Version:</span>
                        <div className="font-medium">{integration.version}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>
                        <div className="font-medium text-green-600">{integration.uptime}%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Success Rate</span>
                        <span className="font-medium">{integration.successRate}%</span>
                      </div>
                      <Progress value={integration.successRate} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CIDB System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cidb-status">Enable CIDB Integration</Label>
                  <Switch
                    id="cidb-status"
                    checked={cidbStatus}
                    onCheckedChange={setCidbStatus}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidb-endpoint">API Endpoint</Label>
                  <Input
                    id="cidb-endpoint"
                    value="https://api.cidb.gov.my/v2/"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidb-key">API Key</Label>
                  <Input
                    id="cidb-key"
                    type="password"
                    value="****-****-****-****"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidb-sync">Sync Frequency</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Update Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pharmaniaga NHG Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pharmaniaga-status">Enable Pharmaniaga Integration</Label>
                  <Switch
                    id="pharmaniaga-status"
                    checked={pharmaniagaStatus}
                    onCheckedChange={setPharmanigaStatus}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmaniaga-endpoint">API Endpoint</Label>
                  <Input
                    id="pharmaniaga-endpoint"
                    value="https://api.pharmaniaga.com/nhg/v1/"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmaniaga-key">API Key</Label>
                  <Input
                    id="pharmaniaga-key"
                    type="password"
                    value="****-****-****-****"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmaniaga-sync">Sync Frequency</Label>
                  <Select defaultValue="5min">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Update Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="text-sm font-medium">160ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Peak Response Time</span>
                    <span className="text-sm font-medium">850ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Requests Today</span>
                    <span className="text-sm font-medium">15,243</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Errors Today</span>
                    <span className="text-sm font-medium text-red-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sync Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Worker Records</span>
                    <Badge className="bg-green-100 text-green-800">Synced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medical Records</span>
                    <Badge className="bg-green-100 text-green-800">Synced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Training Records</span>
                    <Badge className="bg-blue-100 text-blue-800">Syncing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Records</span>
                    <Badge className="bg-green-100 text-green-800">Synced</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CIDB System</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pharmaniaga NHG</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Gateway</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cloud Storage</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">CIDB API sync completed successfully</div>
                    <div className="text-xs text-muted-foreground">2024-02-15 14:30:00 - 1,234 records synchronized</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Pharmaniaga health records updated</div>
                    <div className="text-xs text-muted-foreground">2024-02-15 14:28:00 - 89 medical records processed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Payment gateway timeout warning</div>
                    <div className="text-xs text-muted-foreground">2024-02-15 14:25:00 - Response time exceeded threshold</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">AWS backup completed</div>
                    <div className="text-xs text-muted-foreground">2024-02-15 14:20:00 - 2.4GB uploaded to S3</div>
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

export default Integrations;