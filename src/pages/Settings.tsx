import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Mail, Phone, Globe, Key, Users, Clock, AlertTriangle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [systemMaintenance, setSystemMaintenance] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const organizationSettings = {
    name: 'Expat Workers Integration Platform',
    abbreviation: 'EWIP',
    registrationNumber: 'EWIP-2024-001',
    address: 'Level 12, Menara TM, Jalan Pantai Baru, 50672 Kuala Lumpur',
    phone: '+60-3-2161-2323',
    email: 'admin@ewip.gov.my',
    website: 'https://ewip.gov.my',
    timeZone: 'Asia/Kuala_Lumpur',
    language: 'English',
    currency: 'MYR'
  };

  const systemLimits = [
    { setting: 'Max Workers per Agent', current: '500', recommended: '1000', adjustable: true },
    { setting: 'Document Upload Size', current: '10 MB', recommended: '25 MB', adjustable: true },
    { setting: 'Session Timeout', current: '30 min', recommended: '60 min', adjustable: true },
    { setting: 'API Rate Limit', current: '1000/hour', recommended: '2000/hour', adjustable: false },
    { setting: 'Bulk Import Limit', current: '100 records', recommended: '500 records', adjustable: true }
  ];

  const auditLogs = [
    { timestamp: '2024-02-15 14:30:00', user: 'admin@ewip.gov.my', action: 'Updated notification settings', ip: '192.168.1.100' },
    { timestamp: '2024-02-15 10:15:00', user: 'operator@ewip.gov.my', action: 'Changed API configuration', ip: '192.168.1.101' },
    { timestamp: '2024-02-14 16:45:00', user: 'admin@ewip.gov.my', action: 'Modified user permissions', ip: '192.168.1.100' },
    { timestamp: '2024-02-14 09:20:00', user: 'admin@ewip.gov.my', action: 'Updated system limits', ip: '192.168.1.100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and organizational settings</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Organization Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" value={organizationSettings.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-abbr">Abbreviation</Label>
                  <Input id="org-abbr" value={organizationSettings.abbreviation} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-number">Registration Number</Label>
                  <Input id="reg-number" value={organizationSettings.registrationNumber} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={organizationSettings.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={organizationSettings.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={organizationSettings.website} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" value={organizationSettings.address} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select defaultValue={organizationSettings.timeZone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kuala_Lumpur">Malaysia (UTC+8)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (UTC+8)</SelectItem>
                      <SelectItem value="Asia/Bangkok">Thailand (UTC+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={organizationSettings.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bahasa Malaysia">Bahasa Malaysia</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={organizationSettings.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MYR">Malaysian Ringgit (MYR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif" className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notif" className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Email Notification Types</h4>
                <div className="space-y-2">
                  {[
                    'New worker registrations',
                    'Approval requests',
                    'System maintenance alerts',
                    'Payment confirmations',
                    'Document submissions',
                    'Training completions'
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input type="checkbox" id={type} defaultChecked className="rounded" />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="notifications@ewip.gov.my"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa" className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input id="min-password-length" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">IP Restrictions</h4>
                <div className="space-y-2">
                  <Label htmlFor="allowed-ips">Allowed IP Addresses (comma-separated)</Label>
                  <Textarea
                    id="allowed-ips"
                    placeholder="192.168.1.0/24, 10.0.0.0/8"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance" className="text-base font-medium">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemMaintenance}
                    onCheckedChange={setSystemMaintenance}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup" className="text-base font-medium">Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Enable daily automatic backups</p>
                  </div>
                  <Switch
                    id="auto-backup"
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">System Limits</h4>
                <div className="space-y-3">
                  {systemLimits.map((limit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{limit.setting}</div>
                        <div className="text-sm text-muted-foreground">
                          Current: {limit.current} • Recommended: {limit.recommended}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {limit.adjustable ? (
                          <Button variant="outline" size="sm">Adjust</Button>
                        ) : (
                          <Badge variant="secondary">Fixed</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  API keys are sensitive information. Only share with authorized personnel.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidb-key">CIDB API Key</Label>
                  <Input id="cidb-key" type="password" value="****-****-****-****" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pharmaniaga-key">Pharmaniaga API Key</Label>
                  <Input id="pharmaniaga-key" type="password" value="****-****-****-****" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-key">Payment Gateway Key</Label>
                  <Input id="payment-key" type="password" value="****-****-****-****" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aws-key">AWS Access Key</Label>
                  <Input id="aws-key" type="password" value="****-****-****-****" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-webhook-endpoint.com/ewip"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Recent system configuration changes and administrative actions
                  </p>
                  <Button variant="outline" size="sm">Export Logs</Button>
                </div>
                
                <div className="space-y-2">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{log.action}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.timestamp} • {log.user} • IP: {log.ip}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;