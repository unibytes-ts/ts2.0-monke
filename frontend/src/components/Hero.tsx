
import { Button } from './ui/button';
import { ArrowRight, Users, Leaf, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden">

      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4 mr-2" />
                Sustainable Campus Commerce
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight font-heading">
                Empowering 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Student</span>
                <br />
                Entrepreneurs
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with fellow students, discover unique products and services, 
                find mentors, and build sustainable businesses within your campus community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary"
                size="lg"
                className="text-lg px-8 py-3"
                onClick={() => navigate('/marketplace')}
              >
                Explore Marketplace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 border-2"
                onClick={() => navigate('/start-selling')}
              >
                Start Selling
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">2.5K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">450+</div>
                <div className="text-sm text-gray-600">Student Startups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">180+</div>
                <div className="text-sm text-gray-600">Mentors</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative lg:pl-8 animate-slide-up">
            <div className="relative">
              <img
                src={`https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt="Students collaborating with laptops"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">150+ New Users Today</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
