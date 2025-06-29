import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Building2, 
  GraduationCap, 
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import logo from '../assets/logo.svg';

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const roles = [
    {
      id: 'student',
      label: 'Student',
      icon: User,
      description: 'Browse and buy from fellow students'
    },
    {
      id: 'startup',
      label: 'Startup',
      icon: Building2,
      description: 'Sell your products and services'
    },
    {
      id: 'mentor',
      label: 'Mentor',
      icon: GraduationCap,
      description: 'Guide student entrepreneurs'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Shield,
      description: 'Platform administration'
    }
  ];

  const navigate = useNavigate();

  // Static credentials for each role
  const validCredentials = {
    student: { email: 'student@campus.edu', password: 'student123' },
    startup: { email: 'startup@campus.edu', password: 'startup123' },
    mentor: { email: 'mentor@campus.edu', password: 'mentor123' },
    admin: { email: 'admin@campus.edu', password: 'admin123' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roleCredentials = validCredentials[selectedRole as keyof typeof validCredentials];
    
    if (
      credentials.email === roleCredentials.email && 
      credentials.password === roleCredentials.password
    ) {
      // Store user session
      const userSession = {
        role: selectedRole,
        email: credentials.email,
        token: `dummy-jwt-token-${selectedRole}-${Date.now()}`,
        expiresIn: rememberMe ? '30d' : '1d'
      };
      
      localStorage.setItem('user', JSON.stringify(userSession));
      
      // Redirect to respective dashboard
      navigate(`/${selectedRole}/dashboard`);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <img src={logo} alt="Flow Up Logo" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Flow Up</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your campus commerce journey</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl text-center">Choose Your Role</CardTitle>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <role.icon className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm font-medium">{role.label}</div>
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@university.edu"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Sign In as {roles.find(r => r.id === selectedRole)?.label}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New to Flow Up?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
