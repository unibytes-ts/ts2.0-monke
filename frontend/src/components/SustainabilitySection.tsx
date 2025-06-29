
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Leaf, Recycle, Heart, TrendingUp } from 'lucide-react';

const SustainabilitySection = () => {
  const stats = [
    { icon: Leaf, value: "25%", label: "Carbon Footprint Reduction", color: "text-green-600" },
    { icon: Recycle, value: "1.2K", label: "Products Upcycled", color: "text-blue-600" },
    { icon: Heart, value: "89%", label: "Eco-Conscious Students", color: "text-pink-600" },
    { icon: TrendingUp, value: "340+", label: "Green Startups", color: "text-indigo-600" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4 mr-2" />
            Sustainability Impact
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Building a 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Sustainable</span>
            {' '}Future
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every purchase on Flow Up supports sustainable practices and helps reduce environmental impact. 
            Join our community of eco-conscious students making a difference.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white/70 backdrop-blur-sm border-white/20">
              <div className={`w-16 h-16 ${stat.color} bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-white/20">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Eco-Friendly Products</h3>
            <p className="text-gray-600 mb-4">
              Discover products made from sustainable materials, including recycled, 
              biodegradable, and ethically sourced items.
            </p>
            <Button variant="outline" size="sm">
              Shop Green
            </Button>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-sm border-white/20">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Carbon Tracking</h3>
            <p className="text-gray-600 mb-4">
              Track your environmental impact with our built-in carbon footprint calculator 
              and offset programs.
            </p>
            <Button variant="outline" size="sm">
              Track Impact
            </Button>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-sm border-white/20">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
            <p className="text-gray-600 mb-4">
              Join sustainability challenges, participate in campus clean-up events, 
              and connect with like-minded students.
            </p>
            <Button variant="outline" size="sm">
              Get Involved
            </Button>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="primary" size="lg">
            Join the Movement
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
