import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Heart, 
  Star, 
  Leaf,
  ShoppingBag,
  Grid,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentMarketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    "All", "Study Materials", "Tech & Electronics", "Fashion", "Food & Drinks", 
    "Services", "Eco-Friendly", "Handmade", "Books"
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Handmade Study Planner",
      price: 15,
      originalPrice: 20,
      seller: "CreativeMinds",
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
      isEcoFriendly: true,
      isFeatured: true,
      tags: ["Handmade", "Sustainable"]
    },
    {
      id: 2,
      name: "Campus Tutoring - Math & Physics",
      price: 25,
      seller: "StudyBuddies",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=300&fit=crop",
      isEcoFriendly: false,
      isFeatured: true,
      tags: ["Service", "Academic"]
    },
    {
      id: 3,
      name: "Eco-Friendly Water Bottle",
      price: 22,
      seller: "GreenTech",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      isEcoFriendly: true,
      isFeatured: false,
      tags: ["Eco-Friendly", "Daily Use"]
    },
    {
      id: 4,
      name: "Custom Laptop Stickers Pack",
      price: 8,
      seller: "ArtisticVibes",
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      isEcoFriendly: false,
      isFeatured: false,
      tags: ["Art", "Tech"]
    },
    {
      id: 5,
      name: "Organic Snack Box",
      price: 18,
      seller: "HealthyEats",
      rating: 4.5,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?w=300&h=300&fit=crop",
      isEcoFriendly: true,
      isFeatured: true,
      tags: ["Food", "Organic"]
    },
    {
      id: 6,
      name: "Vintage University Hoodie",
      price: 35,
      originalPrice: 45,
      seller: "VintageStyle",
      rating: 4.4,
      reviews: 91,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
      isEcoFriendly: false,
      isFeatured: false,
      tags: ["Fashion", "Vintage"]
    }
  ];

  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product }: { product: typeof featuredProducts[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart 
            className={`w-4 h-4 ${
              wishlist.includes(product.id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            }`} 
          />
        </Button>
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">Featured</Badge>
        )}
        {product.isEcoFriendly && (
          <Badge className="absolute bottom-2 left-2 bg-green-500">
            <Leaf className="w-3 h-3 mr-1" />
            Eco
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <Link to={`/item/product/${product.id}`}>
            <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">by {product.seller}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <Link to={`/item/product/${product.id}`}>
              <Button variant="primary" size="sm">
                <ShoppingBag className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Flow Up</h1>
              <p className="text-gray-600">Discover unique products and services from fellow students</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products, services, or startups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className={category === 'All' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing <span className="font-medium">1-{featuredProducts.length}</span> of{' '}
            <span className="font-medium">247</span> products
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Leaf className="w-4 h-4 text-green-500" />
            <span>{featuredProducts.filter(p => p.isEcoFriendly).length} eco-friendly options</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentMarketplace;
