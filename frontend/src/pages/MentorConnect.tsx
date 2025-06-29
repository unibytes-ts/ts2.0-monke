
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Users, 
  Clock,
  MessageCircle,
  Calendar,
  Award,
  Briefcase
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MentorHero from '@/components/MentorHero';
import CTABannerExact from '@/components/CTABannerExact';

const MentorConnect = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=faces",
      title: "Startup Advisor & Former Entrepreneur",
      university: "Stanford University",
      expertise: ["Business Strategy", "Fundraising", "Product Development"],
      rating: 4.9,
      reviews: 87,
      sessions: 234,
      responseTime: "< 2 hours",
      hourlyRate: 150,
      topMentor: true
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=faces",
      title: "Marketing Professor & Digital Strategy Expert",
      university: "UC Berkeley",
      expertise: ["Marketing", "Digital Strategy", "Brand Building"],
      rating: 4.8,
      reviews: 92,
      sessions: 189,
      responseTime: "< 4 hours",
      hourlyRate: 120,
      topMentor: false
    },
    {
      id: 3,
      name: "Lisa Zhang",
      photo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=faces",
      title: "Tech Entrepreneur & Angel Investor",
      university: "MIT",
      expertise: ["Technology", "Investment", "Scaling"],
      rating: 4.9,
      reviews: 76,
      sessions: 198,
      responseTime: "< 3 hours",
      hourlyRate: 200,
      topMentor: true
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      title: "Former Google PM & Startup Founder",
      university: "Harvard University",
      expertise: ["Product Management", "UX Design", "Agile"],
      rating: 4.7,
      reviews: 112,
      sessions: 276,
      responseTime: "< 1 hour",
      hourlyRate: 180,
      topMentor: true
    },
    {
      id: 5,
      name: "Priya Patel",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
      title: "Fintech Entrepreneur & Investor",
      university: "University of Pennsylvania",
      expertise: ["Fintech", "Blockchain", "Venture Capital"],
      rating: 4.9,
      reviews: 94,
      sessions: 203,
      responseTime: "< 6 hours",
      hourlyRate: 220,
      topMentor: false
    },
    {
      id: 6,
      name: "David Kim",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      title: "AI Research Scientist",
      university: "Carnegie Mellon University",
      expertise: ["Machine Learning", "AI Ethics", "Research"],
      rating: 4.8,
      reviews: 68,
      sessions: 145,
      responseTime: "< 3 hours",
      hourlyRate: 175,
      topMentor: true
    },
    {
      id: 7,
      name: "Maria Garcia",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
      title: "Social Impact Entrepreneur",
      university: "Yale University",
      expertise: ["Social Enterprise", "Nonprofit Management", "Grant Writing"],
      rating: 4.9,
      reviews: 53,
      sessions: 187,
      responseTime: "< 2 hours",
      hourlyRate: 140,
      topMentor: false
    },
    {
      id: 8,
      name: "Alex Turner",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      title: "Cybersecurity Expert",
      university: "Georgia Tech",
      expertise: ["Cybersecurity", "Blockchain", "Cloud Security"],
      rating: 4.7,
      reviews: 79,
      sessions: 165,
      responseTime: "< 5 hours",
      hourlyRate: 190,
      topMentor: true
    },
    {
      id: 9,
      name: "Dr. Aisha Mohammed",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      title: "Healthcare Innovation Leader",
      university: "Johns Hopkins University",
      expertise: ["Healthcare Tech", "Biotech", "Medtech"],
      rating: 4.9,
      reviews: 87,
      sessions: 201,
      responseTime: "< 4 hours",
      hourlyRate: 210,
      topMentor: false
    },
    {
      id: 10,
      name: "Raj Patel",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      title: "E-commerce Growth Expert",
      university: "University of Michigan",
      expertise: ["E-commerce", "Digital Marketing", "Growth Hacking"],
      rating: 4.6,
      reviews: 63,
      sessions: 178,
      responseTime: "< 3 hours",
      hourlyRate: 160,
      topMentor: false
    },
    {
      id: 11,
      name: "Sophie Laurent",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      title: "Sustainability Consultant",
      university: "ETH Zurich",
      expertise: ["Sustainability", "Green Tech", "ESG"],
      rating: 4.8,
      reviews: 72,
      sessions: 156,
      responseTime: "< 2 hours",
      hourlyRate: 180,
      topMentor: true
    }
  ];

  const expertiseAreas = [
    "Business Strategy",
    "Marketing",
    "Technology",
    "Fundraising",
    "Product Development",
    "Operations",
    "Leadership"
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExpertise = selectedExpertise === 'all' || 
                           mentor.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()));
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pt-1 pb-2">
        <MentorHero />

        {/* Search and Filters */}
        <div className="flex justify-center items-center w-full mt-2 mb-3">
          <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-gray-200 px-4 py-2 shadow-sm">
            <Search className="w-5 h-5 text-gray-400 mr-2" aria-label="Search" />
            <input
              type="text"
              placeholder="Browse Mentors, Courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base"
              aria-label="Search mentors or courses"
            />
            <div className="ml-2">
              <label htmlFor="expertise-filter" className="sr-only">Filter by expertise</label>
              <div className="relative">
                <select
                  id="expertise-filter"
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 pr-8 text-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer transition"
                  style={{ minWidth: 120 }}
                  aria-label="Expertise filter"
                >
                  <option value="all">All Expertise</option>
                  {expertiseAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <Filter className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Mentors Grid */}
        <div id="mentors-list" className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
           {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-4 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                {/* Profile Photo */}
                <div className="relative min-w-[56px]">
                  <img
                    src={mentor.photo}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-0.5">
  <h3 className="font-semibold text-gray-900 text-base leading-tight truncate" style={{letterSpacing: 0}}>{mentor.name}</h3>
  <div className="text-sm text-gray-700 font-normal leading-tight truncate">{mentor.title}</div>
  <div className="flex items-center text-xs text-gray-500 mt-0.5">
    <MapPin className="w-4 h-4 mr-1" aria-label="University" />
    <span className="truncate">{mentor.university}</span>
  </div>
  <div className="flex flex-wrap gap-2 mt-2">
    {mentor.expertise.slice(0,2).map((skill, index) => (
      <span key={index} className="bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs font-medium border border-gray-200">
        {skill}
      </span>
    ))}
  </div>
</div>
                </div>
              </div>
              {/* Stats Row */}
              <div className="flex items-center justify-between gap-2 mt-4 mb-2">
                <div className="flex items-center text-sm text-gray-700 gap-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-0.5" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500 text-xs">({mentor.reviews})</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 gap-1">
                  <Users className="w-4 h-4 text-blue-500 mr-0.5" />
                  <span>{mentor.sessions} sessions</span>
                </div>
                <div className="flex items-center text-sm text-gray-700 gap-1">
                  <Clock className="w-4 h-4 text-green-500 mr-0.5" />
                  <span>{mentor.responseTime}</span>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                <Link to={`/mentor/${mentor.id}`} className="flex-1">
                  <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    View Profile
                  </Button>
                </Link>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => {
                    // Open Google Calendar with a meeting link
                    window.open('https://calendar.google.com/calendar/u/0/r/eventedit', '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedExpertise('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}

        </div>
        
        <div className="bg-white border-t border-gray-100 py-12">
          <CTABannerExact />
        </div>
        <Footer />
    </div>
  );
};

export default MentorConnect;