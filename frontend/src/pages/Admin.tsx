
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Flag,
  Eye,
  EyeOff
} from 'lucide-react';

const Admin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const adminCapabilities = [
    {
      icon: Users,
      title: "User Management",
      description: "Manage student, startup, and mentor accounts"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "View platform metrics and performance data"
    },
    {
      icon: Flag,
      title: "Content Moderation",
      description: "Review flagged content and manage reports"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle admin login logic here
    console.log('Admin login attempt:', credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">Secure login for platform administrators</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white text-center">
              Sign In to Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@flowup.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                Access Admin Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admin Capabilities Overview */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white text-center mb-4">
            Admin Capabilities
          </h3>
          {adminCapabilities.map((capability, index) => (
            <Card key={index} className="backdrop-blur-sm bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <capability.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{capability.title}</h4>
                    <p className="text-sm text-slate-400">{capability.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Need help? Contact{' '}
            <a href="mailto:support@flowup.com" className="text-green-400 hover:text-green-300">
              support@edumarket.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
