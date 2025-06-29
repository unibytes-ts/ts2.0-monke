
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  ShoppingBag, 
  Wallet, 
  Users, 
  TrendingUp, 
  Calendar,
  Bell,
  Star
} from 'lucide-react';

const Home = () => {
  // Mock user data - in real app this would come from authentication
  const user = {
    name: "Alex Johnson",
    role: "Student",
    college: "Stanford University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const recentActivity = [
    { id: 1, action: "Purchased", item: "Handmade Study Planner", time: "2 hours ago", price: "$15" },
    { id: 2, action: "Saved", item: "Eco-Friendly Water Bottle", time: "1 day ago", price: "$22" },
    { id: 3, action: "Reviewed", item: "Campus Tutoring Service", time: "3 days ago", rating: 5 }
  ];

  const quickStats = [
    { label: "Orders", value: "12", icon: ShoppingBag, color: "text-green-600" },
    { label: "Wishlist", value: "8", icon: Star, color: "text-blue-600" },
    { label: "Balance", value: "$142", icon: Wallet, color: "text-purple-600" },
    { label: "Mentors", value: "3", icon: Users, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-600">{user.role} at {user.college}</p>
              </div>
            </div>
            <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="primary" className="h-20 flex-col space-y-2">
                    <ShoppingBag className="w-6 h-6" />
                    <span>Browse Marketplace</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Wallet className="w-6 h-6" />
                    <span>Manage Wallet</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Find Mentors</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calendar className="w-6 h-6" />
                    <span>View Events</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {activity.action} {activity.item}
                          </p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.price && (
                          <p className="font-medium text-green-600">{activity.price}</p>
                        )}
                        {activity.rating && (
                          <div className="flex items-center">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-blue-900">Campus Startup Fair</p>
                  <p className="text-sm text-blue-700">Join us next Friday for the biggest startup showcase!</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-medium text-green-900">New Eco-Friendly Badge</p>
                  <p className="text-sm text-green-700">Look for the green leaf on sustainable products.</p>
                </div>
              </CardContent>
            </Card>

            {/* Trending */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-sm">Study Buddy App</p>
                    <p className="text-xs text-gray-600">by TechStarters</p>
                  </div>
                  <Badge className="ml-auto">Hot</Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg"></div>
                  <div>
                    <p className="font-medium text-sm">Organic Snack Box</p>
                    <p className="text-xs text-gray-600">by GreenEats</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">Eco</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
