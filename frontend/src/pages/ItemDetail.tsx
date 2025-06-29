
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowLeft,
  MapPin,
  User,
  Globe,
  Mail
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ItemDetail = () => {
  const { id, type } = useParams();

  // Mock data - in real app this would come from API
  const mockItem = {
    id: 1,
    name: "Handmade Study Planner",
    price: 15,
    originalPrice: 20,
    seller: "CreativeMinds",
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    description: "A beautifully crafted study planner made from recycled materials. Perfect for organizing your academic life while being environmentally conscious.",
    category: "Study Materials",
    isEcoFriendly: true,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
    ]
  };

  const mockStartup = {
    id: 1,
    name: "EcoThreads",
    tagline: "Sustainable fashion for conscious students",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&crop=faces",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop",
    story: "Founded by two environmental science students, EcoThreads creates stylish, eco-friendly clothing from recycled materials.",
    location: "UC Berkeley",
    website: "www.ecothreads.com",
    email: "hello@ecothreads.com",
    rating: 4.8,
    reviews: 124,
    followers: 892
  };

  const isStartup = type === 'startup';
  const data = isStartup ? mockStartup : mockItem;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to={isStartup ? "/startups" : "/marketplace"}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {isStartup ? "Startups" : "Marketplace"}
          </Button>
        </Link>

        {isStartup ? (
          // Startup Detail Layout
          <div className="space-y-8">
            {/* Header */}
            <Card>
              <div className="relative">
                <img
                  src={mockStartup.banner}
                  alt={mockStartup.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute -bottom-12 left-8">
                  <img
                    src={mockStartup.logo}
                    alt={mockStartup.name}
                    className="w-24 h-24 rounded-2xl border-4 border-white object-cover"
                  />
                </div>
              </div>
              
              <CardContent className="pt-16 pb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockStartup.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{mockStartup.tagline}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {mockStartup.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {mockStartup.rating} ({mockStartup.reviews} reviews)
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {mockStartup.followers} followers
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6 md:mt-0">
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
              </CardContent>
            </Card>

            {/* Story & Contact */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Our Story</h2>
                  <p className="text-gray-600">{mockStartup.story}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact</h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-3 text-gray-400" />
                      <a href={`https://${mockStartup.website}`} className="text-green-600 hover:underline">
                        {mockStartup.website}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <a href={`mailto:${mockStartup.email}`} className="text-green-600 hover:underline">
                        {mockStartup.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Item Detail Layout
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={mockItem.image}
                  alt={mockItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {mockItem.images.slice(1).map((img, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${mockItem.name} ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{mockItem.category}</Badge>
                  {mockItem.isEcoFriendly && (
                    <Badge className="bg-green-100 text-green-800">Eco-Friendly</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockItem.name}</h1>
                <p className="text-gray-600 mb-4">by {mockItem.seller}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{mockItem.rating}</span>
                    <span className="text-gray-500 ml-1">({mockItem.reviews} reviews)</span>
                  </div>
                  <Badge variant={mockItem.inStock ? "default" : "secondary"}>
                    {mockItem.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-green-600">${mockItem.price}</span>
                  {mockItem.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${mockItem.originalPrice}</span>
                  )}
                </div>

                <div className="space-y-4">
                  <Button variant="primary" className="w-full" size="lg"
                    disabled={!mockItem.inStock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{mockItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ItemDetail;
