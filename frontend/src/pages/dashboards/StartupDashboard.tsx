import { useState } from 'react';
import { Lightbulb, Users, MessageSquare, FileText, Clock, Search, Plus, MessageCircle, User, ArrowRight } from 'lucide-react';
import BaseDashboard from './BaseDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Idea = {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'funded';
  createdAt: string;
  updatedAt: string;
  views: number;
  interestedMentors: number;
};

type Mentor = {
  id: string;
  name: string;
  expertise: string[];
  company: string;
  available: boolean;
  lastActive: string;
};

const StartupDashboard = () => {
  const [activeTab, setActiveTab] = useState('ideas');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for ideas
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: '1',
      title: 'Eco-Friendly Campus Delivery',
      description: 'A sustainable delivery service using electric vehicles and reusable packaging for campus food and grocery delivery.',
      status: 'published',
      createdAt: '2023-06-15',
      updatedAt: '2023-06-20',
      views: 124,
      interestedMentors: 5
    },
    {
      id: '2',
      title: 'Study Space Finder App',
      description: 'Mobile app that helps students find available study spaces on campus in real-time using IoT sensors.',
      status: 'draft',
      createdAt: '2023-06-25',
      updatedAt: '2023-06-25',
      views: 0,
      interestedMentors: 0
    },
  ]);

  // Mock data for mentors
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: 'm1',
      name: 'Dr. Sarah Chen',
      expertise: ['Sustainable Tech', 'Business Development'],
      company: 'Green Ventures',
      available: true,
      lastActive: '2 hours ago'
    },
    {
      id: 'm2',
      name: 'James Wilson',
      expertise: ['Mobile Apps', 'UI/UX Design'],
      company: 'TechStart Inc.',
      available: true,
      lastActive: '1 day ago'
    },
    {
      id: 'm3',
      name: 'Emily Rodriguez',
      expertise: ['Marketing', 'E-commerce'],
      company: 'MarketGrow',
      available: false,
      lastActive: '3 days ago'
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-gray-300">Draft</Badge>;
      case 'funded':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Funded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAvailabilityBadge = (available: boolean) => {
    return available ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        Available
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500">
        Unavailable
      </Badge>
    );
  };

  return (
    <BaseDashboard role="startup">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Startup Dashboard</h2>
          <p className="text-muted-foreground">
            Showcase your ideas and connect with expert mentors
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4" />
                Your Ideas
              </CardDescription>
              <CardTitle className="text-3xl">{ideas.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {ideas.filter(i => i.status === 'published').length} published
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4" />
                Mentor Connections
              </CardDescription>
              <CardTitle className="text-3xl">
                {mentors.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {mentors.filter(m => m.available).length} currently available
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                Total Views
              </CardDescription>
              <CardTitle className="text-3xl">
                {ideas.reduce((sum, idea) => sum + idea.views, 0).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Across all your ideas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ideas" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="ideas" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> My Ideas
              </TabsTrigger>
              <TabsTrigger value="mentors" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Find Mentors
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Messages
              </TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="ideas" className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Idea
              </Button>
            </div>
            
            <div className="grid gap-4">
              {ideas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{idea.title}</h3>
                          {getStatusBadge(idea.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {new Date(idea.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {idea.interestedMentors}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" /> {idea.views}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {idea.description.length > 200 
                        ? `${idea.description.substring(0, 200)}...` 
                        : idea.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">View Details</Button>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" /> Chat
                      </Button>
                      <Button size="sm">
                        Edit <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {ideas.length === 0 && (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium">No ideas yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start by creating your first startup idea to get feedback from mentors
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Idea
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden">
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{mentor.company}</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl font-medium">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Expertise:</span>{' '}
                        <span className="text-muted-foreground">
                          {mentor.expertise.join(', ')}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Status:</span>{' '}
                        {getAvailabilityBadge(mentor.available)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active {mentor.lastActive}
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex justify-between pt-4 border-t mt-4">
                    <Button variant="outline" size="sm" disabled={!mentor.available}>
                      <MessageCircle className="h-4 w-4 mr-2" /> Message
                    </Button>
                    <Button size="sm" disabled={!mentor.available}>
                      Request Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {mentors.length === 0 && (
              <div className="text-center py-12 bg-muted/50 rounded-lg">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium">No mentors available</h3>
                <p className="text-sm text-muted-foreground">
                  Check back later or contact support for assistance
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium">Your messages will appear here</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Connect with mentors and start conversations to get feedback on your ideas
              </p>
              <Button className="mt-4">
                <Users className="h-4 w-4 mr-2" /> Find Mentors
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </BaseDashboard>
  );
};

export default StartupDashboard;
