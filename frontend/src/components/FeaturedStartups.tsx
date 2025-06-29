
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const startups = [
  {
    id: 1,
    name: "EcoThreads",
    description: "Sustainable fashion made from recycled materials",
    founder: "Sarah Chen",
    rating: 4.8,
    reviews: 124,
    location: "UC Berkeley",
    category: "Fashion",
    image: "photo-1581091226825-a6a2a5aee158",
    eco: true,
    featured: true
  },
  {
    id: 2,
    name: "StudyBuddy AI",
    description: "AI-powered tutoring and study assistance platform",
    founder: "Marcus Johnson",
    rating: 4.9,
    reviews: 89,
    location: "Stanford",
    category: "EdTech",
    image: "photo-1498050108023-c5249f4df085",
    eco: false,
    featured: true
  },
  {
    id: 3,
    name: "Campus Meals",
    description: "Healthy, affordable meal delivery for busy students",
    founder: "Priya Patel",
    rating: 4.7,
    reviews: 201,
    location: "MIT",
    category: "Food",
    image: "photo-1486312338219-ce68d2c6f44d",
    eco: true,
    featured: false
  },
  {
    id: 4,
    name: "GreenTech Solutions",
    description: "Solar-powered charging stations for campus",
    founder: "Alex Rivera",
    rating: 4.6,
    reviews: 67,
    location: "Caltech",
    category: "CleanTech",
    image: "photo-1460925895917-afdab827c52f",
    eco: true,
    featured: false
  }
];

const FeaturedStartups = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
    Featured Student Startups
  </h2>
  <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
    Discover innovative businesses created by students. Support your peers while finding amazing products and services.
  </p>
</div>

        {/* Startup Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
  {/* Card 1: EcoThreads */}
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full max-w-xs mx-auto flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative mb-4">
      <img
        src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=250&fit=crop"
        alt="EcoThreads"
        className="w-full h-40 object-cover rounded-xl"
      />
      <div className="absolute top-3 right-3 bg-green-100 p-2 rounded-full shadow">
        <Leaf className="w-5 h-5 text-green-600" aria-label="Eco-friendly" />
      </div>
    </div>
    <Badge className="mb-3 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Fashion</Badge>
    <h3 className="font-bold text-xl text-gray-900 mb-1">EcoThreads</h3>
    <p className="text-gray-600 text-sm mb-6">Sustainable fashion made from recycled materials</p>
    <Link to="/startup/ecothreads" className="w-full mt-auto" tabIndex={-1}>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 font-semibold text-base border-gray-200 py-3"
      >
        View Startup
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Link>
  </div>
  {/* Card 2: StudyBuddy AI */}
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full max-w-xs mx-auto flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative mb-4">
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
        alt="StudyBuddy AI"
        className="w-full h-40 object-cover rounded-xl"
      />
    </div>
    <Badge className="mb-3 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">EdTech</Badge>
    <h3 className="font-bold text-xl text-gray-900 mb-1">StudyBuddy AI</h3>
    <p className="text-gray-600 text-sm mb-6">AI-powered tutoring and study assistance platform</p>
    <Link to="/startup/studybuddy-ai" className="w-full mt-auto" tabIndex={-1}>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 font-semibold text-base border-gray-200 py-3"
      >
        View Startup
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Link>
  </div>
  {/* Card 3: Campus Meals */}
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full max-w-xs mx-auto flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative mb-4">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop"
        alt="Campus Meals"
        className="w-full h-40 object-cover rounded-xl"
      />
    </div>
    <Badge className="mb-3 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Food</Badge>
    <h3 className="font-bold text-xl text-gray-900 mb-1">Campus Meals</h3>
    <p className="text-gray-600 text-sm mb-6">Healthy, affordable meal delivery for busy students</p>
    <Link to="/startup/campus-meals" className="w-full mt-auto" tabIndex={-1}>
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 font-semibold text-base border-gray-200 py-3"
      >
        View Startup
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Link>
  </div>
</div>

        {/* CTA */}
        <div className="text-center mt-12">
  <Link to="/startups" tabIndex={-1}>
    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
      Explore All Startups
      <ArrowRight className="w-5 h-5 ml-2" />
    </Button>
  </Link>
</div>
      </div>
    </section>
  );
};

export default FeaturedStartups;
