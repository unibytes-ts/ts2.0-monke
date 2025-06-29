import { useState } from 'react';
import { Users, BarChart3, Settings, Shield, BookOpen, Clock, FileText, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import BaseDashboard from './BaseDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'startup' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedDate: string;
  lastActive: string;
};

type SystemAlert = {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  timestamp: string;
  resolved: boolean;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@campus.edu',
      role: 'student',
      status: 'active',
      joinedDate: '2023-01-15',
      lastActive: '2023-06-28T14:30:00Z'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      email: 'sarah@startup.co',
      role: 'startup',
      status: 'active',
      joinedDate: '2023-02-20',
      lastActive: '2023-06-29T09:15:00Z'
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      email: 'michael@mentor.edu',
      role: 'mentor',
      status: 'active',
      joinedDate: '2023-03-10',
      lastActive: '2023-06-28T16:45:00Z'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@campus.edu',
      role: 'student',
      status: 'pending',
      joinedDate: '2023-06-25',
      lastActive: '2023-06-25T11:20:00Z'
    },
  ]);

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'High server load detected',
      timestamp: '2023-06-29T10:30:00Z',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Scheduled maintenance this weekend',
      timestamp: '2023-06-28T15:45:00Z',
      resolved: true
    },
    {
      id: '3',
      type: 'error',
      message: 'Payment processing issue',
      timestamp: '2023-06-27T09:15:00Z',
      resolved: false
    },
  ]);

  // Stats data
  const stats = [
    { name: 'Total Users', value: '1,248', change: '+12%', changeType: 'positive' },
    { name: 'Active Sessions', value: '347', change: '+5%', changeType: 'positive' },
    { name: 'Pending Approvals', value: '8', change: '-2', changeType: 'negative' },
    { name: 'System Health', value: '98%', change: '0%', changeType: 'neutral' },
  ];

  const recentActivities = [
    { id: 1, user: 'Alex Johnson', action: 'created a new startup profile', time: '2 minutes ago' },
    { id: 2, user: 'System', action: 'completed nightly backup', time: '3 hours ago' },
    { id: 3, user: 'Sarah Williams', action: 'updated payment information', time: '5 hours ago' },
    { id: 4, user: 'Dr. Michael Chen', action: 'scheduled a mentorship session', time: '1 day ago' },
  ];

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: user.status === 'active' ? 'suspended' : 'active' 
          } 
        : user
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="border-green-200 text-green-800 bg-green-50">Active</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="border-red-200 text-red-800 bg-red-50">Suspended</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-200 text-yellow-800 bg-yellow-50">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      student: 'bg-blue-100 text-blue-800',
      mentor: 'bg-purple-100 text-purple-800',
      startup: 'bg-green-100 text-green-800',
      admin: 'bg-red-100 text-red-800',
    };
    
    return (
      <Badge className={`${roleStyles[role as keyof typeof roleStyles]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <BaseDashboard role="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage platform users, monitor system health, and configure settings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <div className={`text-sm ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative' 
                    ? 'text-red-600' 
                    : 'text-gray-500'
                }`}>
                  {stat.change}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  vs last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Alerts
              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {alerts.filter(a => !a.resolved).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      View and manage all user accounts
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Search users..." className="max-w-xs" />
                    <Button variant="outline">Export</Button>
                    <Button>+ Add User</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button 
                              variant={user.status === 'active' ? 'outline' : 'default'} 
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                              className={user.status === 'active' ? 'text-red-600 border-red-200 hover:bg-red-50' : ''}
                            >
                              {user.status === 'active' ? 'Suspend' : 'Activate'}
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

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Monitor and resolve system issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 border rounded-lg ${
                        !alert.resolved ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {getAlertIcon(alert.type)}
                          </div>
                          <div>
                            <p className={`font-medium ${
                              !alert.resolved ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {alert.message}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {!alert.resolved && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Platform usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
                <div className="text-center space-y-2">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Settings panel coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 last:pb-0 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseDashboard>
  );
};

export default AdminDashboard;
