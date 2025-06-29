
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Leaf,
  TrendingUp,
  Users,
  MapPin,
  Grid,
  List
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Startups = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = [
    "All", "Tech & Software", "Fashion & Style", "Food & Beverage", 
    "Health & Wellness", "Education", "Sustainability", "Creative Arts", "Services"
  ];

  const filters = [
    "All", "Most Active", "Newest", "Highest Rated", "Most Sustainable"
  ];

  const startups = [
    {
      id: 1,
      name: "EcoThreads",
      tagline: "Sustainable fashion for conscious students",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&crop=faces",
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
      category: "Fashion & Style",
      rating: 4.8,
      reviews: 124,
      followers: 892,
      isSustainable: true,
      isActive: true,
      founded: "2023",
      location: "UC Berkeley"
    },
    {
      id: 2,
      name: "StudyBuddies",
      tagline: "Peer-to-peer tutoring made easy",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=faces",
      banner: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=300&fit=crop",
      category: "Education",
      rating: 4.9,
      reviews: 256,
      followers: 1420,
      isSustainable: false,
      isActive: true,
      founded: "2022",
      location: "Stanford University"
    },
    {
      id: 3,
      name: "GreenTech Solutions",
      tagline: "Smart campus solutions for a greener future",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop&crop=center",
      banner: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=300&fit=crop",
      category: "Tech & Software",
      rating: 4.7,
      reviews: 89,
      followers: 654,
      isSustainable: true,
      isActive: true,
      founded: "2023",
      location: "MIT"
    },
    {
      id: 4,
      name: "Campus Eats",
      tagline: "Healthy meal prep for busy students",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop&crop=center",
      banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=300&fit=crop",
      category: "Food & Beverage",
      rating: 4.6,
      reviews: 178,
      followers: 743,
      isSustainable: true,
      isActive: true,
      founded: "2023",
      location: "UCLA"
    },
    {
      id: 5,
      name: "ArtisticVibes",
      tagline: "Custom artwork and design services",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&crop=faces",
      banner: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=300&fit=crop",
      category: "Creative Arts",
      rating: 4.5,
      reviews: 67,
      followers: 423,
      isSustainable: false,
      isActive: false,
      founded: "2022",
      location: "NYU"
    },
    {
      id: 6,
      name: "WellnessHub",
      tagline: "Mental health and wellness support",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&crop=faces",
      banner: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=800&h=300&fit=crop",
      category: "Health & Wellness",
      rating: 4.9,
      reviews: 203,
      followers: 1156,
      isSustainable: false,
      isActive: true,
      founded: "2021",
      location: "Harvard University"
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
    
    let matchesFilter = true;
    if (selectedFilter === 'Most Active') matchesFilter = startup.isActive;
    if (selectedFilter === 'Highest Rated') matchesFilter = startup.rating >= 4.7;
    if (selectedFilter === 'Most Sustainable') matchesFilter = startup.isSustainable;
    
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const StartupCard = ({ startup }: { startup: typeof startups[0] }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img
          src={startup.banner}
          alt={startup.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {startup.isSustainable && (
            <Badge className="bg-green-500 text-white">
              <Leaf className="w-3 h-3 mr-1" />
              Sustainable
            </Badge>
          )}
          {startup.isActive && (
            <Badge className="bg-blue-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
        <div className="absolute -bottom-6 left-4">
          <img
            src={startup.logo}
            alt={startup.name}
            className="w-12 h-12 rounded-xl border-4 border-white object-cover"
          />
        </div>
      </div>
      
      <CardContent className="pt-8 pb-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg group-hover:text-green-600 transition-colors">
              {startup.name}
            </h3>
            <p className="text-gray-600 text-sm">{startup.tagline}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {startup.location}
            </div>
            <span>Founded {startup.founded}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{startup.rating}</span>
                <span className="text-gray-500 ml-1">({startup.reviews})</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {startup.followers}
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {startup.category}
            </Badge>
          </div>
          
          <Link to={`/startup/${startup.id}`}>
            <Button variant="primary" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Startups</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover innovative startups founded by your fellow students. Support the next generation of entrepreneurs.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {filters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between text-gray-600">
          <div>
            Showing <span className="font-medium">{filteredStartups.length}</span> of{' '}
            <span className="font-medium">{startups.length}</span> startups
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Leaf className="w-4 h-4 text-green-500 mr-1" />
              <span>{startups.filter(s => s.isSustainable).length} sustainable</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
              <span>{startups.filter(s => s.isActive).length} active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Startups Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
        
        {filteredStartups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No startups found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Startups;
