
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar,
  Star,
  Award,
  Users,
  Clock,
  MessageCircle,
  CheckCircle,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MentorProfile = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const mentor = {
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=faces",
    title: "Startup Advisor & Former Entrepreneur",
    bio: "Former founder of two successful tech startups. Now helping the next generation of student entrepreneurs turn their ideas into reality. Specializing in business strategy, funding, and scaling operations.",
    university: "Stanford University",
    experience: "15+ years",
    rating: 4.9,
    reviews: 87,
    sessions: 234,
    responseTime: "< 2 hours"
  };

  const expertise = [
    "Business Strategy",
    "Fundraising",
    "Product Development",
    "Marketing",
    "Operations",
    "Leadership"
  ];

  const availability = [
    { day: "Monday", times: ["9:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tuesday", times: ["10:00 AM", "3:00 PM"] },
    { day: "Wednesday", times: ["9:00 AM", "1:00 PM", "5:00 PM"] },
    { day: "Thursday", times: ["11:00 AM", "2:00 PM"] },
    { day: "Friday", times: ["9:00 AM", "3:00 PM", "4:00 PM"] }
  ];

  const testimonials = [
    {
      id: 1,
      student: "Alex Chen",
      startup: "GreenTech Solutions",
      rating: 5,
      comment: "Dr. Johnson helped me refine my business model and secure our first round of funding. Her insights were invaluable!"
    },
    {
      id: 2,
      student: "Maria Rodriguez",
      startup: "Campus Eats",
      rating: 5,
      comment: "Amazing mentor! She guided me through the challenges of scaling my food delivery startup on campus."
    },
    {
      id: 3,
      student: "David Kim",
      startup: "StudyBuddy App",
      rating: 5,
      comment: "Sarah's experience in product development helped me build a better user experience for my app."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-100"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{mentor.name}</h1>
                <Badge className="bg-blue-100 text-blue-800">
                  <Award className="w-3 h-3 mr-1" />
                  Top Mentor
                </Badge>
              </div>
              
              <p className="text-lg text-gray-600 mb-2">{mentor.title}</p>
              <p className="text-gray-600 mb-4">{mentor.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mentor.university}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {mentor.experience} experience
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {mentor.rating} ({mentor.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {mentor.sessions} sessions completed
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Responds in {mentor.responseTime}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Request Mentorship
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expertise */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>What Students Say</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium">{testimonial.student}</span>
                          <span className="text-gray-500 text-sm ml-2">• {testimonial.startup}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Startups Funded</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Session</span>
                  <span className="font-semibold">45 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="font-semibold text-blue-600">$150/hr</span>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availability.map((day, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">{day.day}</h4>
                      <div className="flex flex-wrap gap-1">
                        {day.times.map((time, timeIndex) => (
                          <button
                            key={timeIndex}
                            onClick={() => setSelectedDate(`${day.day} ${time}`)}
                            className={`px-2 py-1 text-xs rounded border ${
                              selectedDate === `${day.day} ${time}`
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Selected: <span className="font-medium">{selectedDate}</span>
                    </p>
                    <Button className="w-full mt-2" size="sm">
                      Book This Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MentorProfile;
