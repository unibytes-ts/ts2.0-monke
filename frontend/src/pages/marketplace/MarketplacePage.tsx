import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  seller: string;
};

// Mock data for marketplace
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Introduction to Entrepreneurship Textbook',
    price: '25.00',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Latest edition with minimal highlighting. Perfect condition.',
    seller: 'Business Student'
  },
  {
    id: 2,
    title: 'Graphic Design Services',
    price: '50.00',
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Professional logo and branding design for your startup.',
    seller: 'Design Major'
  },
  {
    id: 3,
    title: 'Used MacBook Pro 2020',
    price: '850.00',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: '13-inch, 16GB RAM, 512GB SSD. Battery health 92%.',
    seller: 'CS Senior'
  },
  {
    id: 4,
    title: 'Calculus Study Guide',
    price: '15.00',
    category: 'Study Materials',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'Comprehensive study guide with practice problems and solutions.',
    seller: 'Math Tutor'
  },
];

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{product: Product; quantity: number}[]>([]);

  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(mockProducts.map(product => product.category))];

  // Add to cart function
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Calculate cart total items
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Find textbooks, services, and more from your peers</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0"
          onClick={() => {}}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          View Cart
          {cartItemCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2 h-14">{product.title}</CardTitle>
              <CardDescription className="line-clamp-2 h-10">{product.description}</CardDescription>
              <div className="text-sm text-gray-500">Sold by: {product.seller}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${product.price}</div>
              <div className="text-sm text-gray-500">{product.category}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
