import { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react-native';
import { CartItemCard } from '@/components/Shopping/CardItemCard';
import { router } from 'expo-router';

interface CartItem {
  id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

interface CartProps {
  onNavigate: (page: string, orderId?: string) => void;
  onCheckout: (items: CartItem[]) => void;
}

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    product_name: 'Leather Slim Wallet',
    product_image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 12.95,
    quantity: 1,
  },
  {
    id: '2',
    product_name: "Women's Cardigan Wrap",
    product_image: 'https://images.pexels.com/photos/2959199/pexels-photo-2959199.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 54.95,
    quantity: 1,
  },
  {
    id: '3',
    product_name: "Women's Credit Card Holder",
    product_image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 12.95,
    quantity: 2,
  },
];

export function Cart({ onNavigate, onCheckout }: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    onCheckout(cartItems);
    onNavigate('orders');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="p-4 flex items-center gap-4">
            <button
              onClick={() => onNavigate('main')}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-gray-900 text-xl font-bold flex items-center gap-2">
              <ShoppingCart size={24} />
              Shopping Cart
            </h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <ShoppingCart 
  size={64} 
  color="#D1D5DB" // Tailwind gray-300
  style={{ marginBottom: 16 }} // mb-4 equivalent
/>

            <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
            <button
              onClick={() => onNavigate('main')}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-3">
              {cartItems.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-900 text-lg font-medium">Total</span>
                <span className="text-yellow-600 text-2xl font-bold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors"
              >
                Checkout ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
