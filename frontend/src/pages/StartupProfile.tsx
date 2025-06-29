
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Calendar,
  Star,
  Leaf,
  Award,
  Users,
  TrendingUp,
  Heart,
  ShoppingCart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StartupProfile = () => {
  const [activeTab, setActiveTab] = useState('products');

  const startup = {
    name: "EcoThreads",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&crop=faces",
    tagline: "Sustainable fashion for conscious students",
    story: "Founded by two environmental science students, EcoThreads creates stylish, eco-friendly clothing from recycled materials. We believe fashion shouldn't cost the earth.",
    location: "University of California, Berkeley",
    founded: "2023",
    website: "www.ecothreads.com",
    email: "hello@ecothreads.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    reviews: 124,
    followers: 892,
    sustainabilityScore: 95
  };

  const products = [
    {
      id: 1,
      name: "Recycled Denim Jacket",
      price: 89,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 23,
      eco: true
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 45,
      eco: true
    },
    {
      id: 3,
      name: "Bamboo Fiber Hoodie",
      price: 65,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 31,
      eco: true
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      comment: "Amazing quality and super sustainable! Love supporting fellow students.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike K.",
      rating: 5,
      comment: "The denim jacket is my new favorite piece. Great fit and style!",
      date: "1 month ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-gray-100"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                <Badge className="bg-green-100 text-green-800">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              
              <p className="text-lg text-gray-600 mb-4">{startup.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {startup.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Founded {startup.founded}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {startup.rating} ({startup.reviews} reviews)
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {startup.followers} followers
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button variant="primary">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sustainability Score</p>
                  <p className="text-2xl font-bold text-green-600">{startup.sustainabilityScore}%</p>
                </div>
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-blue-600">{products.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                  <p className="text-2xl font-bold text-purple-600">{startup.reviews}</p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-8 px-8">
              {['products', 'story', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-8">
            {activeTab === 'products' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {product.eco && (
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                          <Leaf className="w-3 h-3 mr-1" />
                          Eco-Friendly
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {product.rating} ({product.reviews})
                        </div>
                      </div>
                      <Button className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {activeTab === 'story' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Our Story</h3>
                <p className="text-gray-600 mb-6">{startup.story}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        <a href={`https://${startup.website}`} className="hover:text-green-600">
                          {startup.website}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <a href={`mailto:${startup.email}`} className="hover:text-green-600">
                          {startup.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {startup.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Sustainability Commitment</h4>
                    <p className="text-gray-600">
                      We're committed to reducing fashion waste by using 100% recycled materials 
                      and partnering with local suppliers to minimize our carbon footprint.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-semibold">{startup.rating}</span>
                    <span className="text-gray-500 ml-1">({startup.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StartupProfile;
