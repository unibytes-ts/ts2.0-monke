import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, User, ShoppingBag, Users, Settings, Home } from 'lucide-react';

const BaseDashboard = ({ role, children }: { role: string; children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">{roleName} Dashboard</h1>
        </div>
        
        <nav className="mt-6">
          <Link 
            to={`/${role}/dashboard`}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Home className="w-5 h-5 mr-3" />
            Overview
          </Link>
          
          <Link 
            to={`/${role}/profile`}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <User className="w-5 h-5 mr-3" />
            Profile
          </Link>
          
          {role === 'admin' && (
            <Link 
              to="/admin/users"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <Users className="w-5 h-5 mr-3" />
              Manage Users
            </Link>
          )}
          
          {role === 'student' && (
            <Link 
              to="/student/marketplace"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Marketplace
            </Link>
          )}
          
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="ml-64 p-8">
        <div className="bg-white rounded-lg shadow p-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default BaseDashboard;
