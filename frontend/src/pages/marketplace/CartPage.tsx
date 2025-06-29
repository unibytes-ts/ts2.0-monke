import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock cart data - in a real app, this would come from a state management solution
const mockCartItems = [
  {
    id: 1,
    title: 'Introduction to Entrepreneurship Textbook',
    price: '25.00',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Graphic Design Services',
    price: '50.00',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

const CartPage = () => {
  const navigate = useNavigate();
  
  // Calculate subtotal
  const subtotal = mockCartItems.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {mockCartItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                    <div className="flex items-center col-span-6 w-full">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <button className="text-sm text-gray-500 hover:text-red-500 flex items-center mt-1">
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:text-center col-span-2 text-gray-700">
                      ${item.price}
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center border rounded-md">
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="font-medium text-right col-span-2">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/marketplace')}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    Subtotal ({mockCartItems.reduce((sum, item) => sum + item.quantity, 0)} items):
                  </div>
                  <div className="text-xl font-bold">${subtotal.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full md:w-auto md:float-right px-8">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="text-gray-500 mt-1 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/marketplace')}>
              Browse Marketplace
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
