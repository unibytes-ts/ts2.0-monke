
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Leaf, 
  TrendingUp, 
  TrendingDown,
  Bell,
  X,
  Filter,
  SortAsc
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Wishlist = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const wishlistItems = [
    {
      id: 1,
      name: "Recycled Denim Jacket",
      startup: "EcoThreads",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 23,
      eco: true,
      priceAlert: true,
      priceChange: -15,
      availability: "In Stock",
      addedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Campus Study Planner",
      startup: "StudyBuddy",
      price: 25,
      originalPrice: 25,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      eco: false,
      priceAlert: false,
      priceChange: 0,
      availability: "Limited Stock",
      addedDate: "2024-01-10"
    },
    {
      id: 3,
      name: "Organic Coffee Blend",
      startup: "Bean There",
      price: 18,
      originalPrice: 22,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      eco: true,
      priceAlert: true,
      priceChange: -18,
      availability: "Out of Stock",
      addedDate: "2024-01-08"
    },
    {
      id: 4,
      name: "Handmade Ceramic Mug",
      startup: "Clay Creations",
      price: 35,
      originalPrice: 30,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 34,
      eco: true,
      priceAlert: false,
      priceChange: 17,
      availability: "In Stock",
      addedDate: "2024-01-05"
    }
  ];

  const removeFromWishlist = (id: number) => {
    console.log('Removing item from wishlist:', id);
  };

  const addToCart = (id: number) => {
    console.log('Adding to cart:', id);
  };

  const togglePriceAlert = (id: number) => {
    console.log('Toggling price alert for:', id);
  };

  const filteredItems = wishlistItems.filter(item => {
    if (filterBy === 'eco') return item.eco;
    if (filterBy === 'sale') return item.priceChange < 0;
    if (filterBy === 'available') return item.availability === 'In Stock';
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'recent') return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save your favorite products and get notified about price drops</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                <p className="text-sm text-gray-600">Saved Items</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingDown className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {wishlistItems.filter(item => item.priceChange < 0).length}
                </p>
                <p className="text-sm text-gray-600">Price Drops</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {wishlistItems.filter(item => item.eco).length}
                </p>
                <p className="text-sm text-gray-600">Eco-Friendly</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Bell className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {wishlistItems.filter(item => item.priceAlert).length}
                </p>
                <p className="text-sm text-gray-600">Price Alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Items</option>
                <option value="eco">Eco-Friendly</option>
                <option value="sale">On Sale</option>
                <option value="available">Available</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            {sortedItems.length} of {wishlistItems.length} items
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {item.eco && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      Eco
                    </Badge>
                  )}
                  {item.priceChange < 0 && (
                    <Badge className="bg-red-100 text-red-800 text-xs">
                      {item.priceChange}%
                    </Badge>
                  )}
                  {item.priceChange > 0 && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">
                      +{item.priceChange}%
                    </Badge>
                  )}
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
                
                {/* Availability Status */}
                <div className="absolute bottom-2 left-2">
                  <Badge 
                    variant={item.availability === 'In Stock' ? 'default' : 
                            item.availability === 'Limited Stock' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {item.availability}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">by {item.startup}</p>
                
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {item.rating} ({item.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">${item.price}</span>
                    {item.originalPrice !== item.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => togglePriceAlert(item.id)}
                    className={`p-1 rounded ${
                      item.priceAlert 
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={item.availability === 'Out of Stock'}
                  onClick={() => addToCart(item.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {item.availability === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or browse our marketplace</p>
            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Browse Marketplace
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
