
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Star, Calendar, ArrowRight } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Jennifer Walsh",
    title: "Startup Advisor & Former VC",
    expertise: ["Fundraising", "Business Strategy", "Product Development"],
    rating: 4.9,
    sessions: 150,
    image: "photo-1649972904349-6e44c42644a7",
    available: true
  },
  {
    id: 2,
    name: "Michael Torres",
    title: "Tech Entrepreneur & Alumni",
    expertise: ["Software Development", "Team Building", "Marketing"],
    rating: 4.8,
    sessions: 89,
    image: "photo-1488590528505-98d2b5aba04b",
    available: true
  },
  {
    id: 3,
    name: "Lisa Kumar",
    title: "Sustainability Expert",
    expertise: ["Green Business", "Impact Investing", "Supply Chain"],
    rating: 4.9,
    sessions: 67,
    image: "photo-1581091226825-a6a2a5aee158",
    available: false
  }
];

const MentorshipSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Mentorship Program
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900">
                Learn from Industry 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Leaders</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get guidance from experienced entrepreneurs, industry professionals, 
                and successful alumni who are passionate about helping student founders succeed.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">1-on-1 Sessions</h3>
                  <p className="text-gray-600">
                    Personalized mentorship sessions tailored to your startup's specific needs and challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                  <p className="text-gray-600">
                    Learn from mentors with proven track records in various industries and business functions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Book sessions that fit your schedule with our easy-to-use scheduling platform.
                  </p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Find Your Mentor
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Content - Mentor Cards */}
          <div className="space-y-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="mentor-card">
                <div className="flex items-start space-x-4">
                  <img
                    src={`https://images.unsplash.com/${mentor.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {mentor.title}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mentor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {mentor.available ? 'Available' : 'Busy'}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          {mentor.rating}
                        </div>
                        <div>
                          {mentor.sessions} sessions
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={mentor.available ? "default" : "secondary"}
                        disabled={!mentor.available}
                        className={mentor.available ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {mentor.available ? 'Book Session' : 'Unavailable'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center pt-4">
              <Button variant="outline" className="w-full">
                View All Mentors
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
