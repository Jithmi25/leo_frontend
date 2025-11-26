import { useState } from 'react';
import { Package, ArrowLeft } from 'lucide-react-native';
import { OrderCard } from '@/components/Shopping/OrderCard';
import { router } from 'expo-router';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrdersProps {
  onNavigate: (page: string, orderId?: string) => void;
}

const INITIAL_ORDERS: Array<{ order: Order; items: OrderItem[] }> = [
  {
    order: {
      id: 'order1',
      order_number: 'ORD20251126001',
      total_amount: 139.45,
      status: 'delivered',
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    items: [
      {
        id: 'item1',
        product_name: 'Leather Slim Wallet',
        product_image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 12.95,
        quantity: 1,
      },
      {
        id: 'item2',
        product_name: "Women's Cardigan Wrap",
        product_image: 'https://images.pexels.com/photos/2959199/pexels-photo-2959199.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 54.95,
        quantity: 1,
      },
      {
        id: 'item3',
        product_name: "Women's Credit Card Holder",
        product_image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 12.95,
        quantity: 2,
      },
    ],
  },
  {
    order: {
      id: 'order2',
      order_number: 'ORD20251124001',
      total_amount: 67.90,
      status: 'shipped',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    items: [
      {
        id: 'item4',
        product_name: "Men's Winter Scarf",
        product_image: 'https://images.pexels.com/photos/3621881/pexels-photo-3621881.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 18.95,
        quantity: 1,
      },
      {
        id: 'item5',
        product_name: 'Wool Beanie Hat',
        product_image: 'https://images.pexels.com/photos/3661134/pexels-photo-3661134.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 9.95,
        quantity: 3,
      },
    ],
  },
  {
    order: {
      id: 'order3',
      order_number: 'ORD20251122001',
      total_amount: 89.85,
      status: 'processing',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    items: [
      {
        id: 'item6',
        product_name: 'Leather Belt',
        product_image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 24.95,
        quantity: 2,
      },
      {
        id: 'item7',
        product_name: 'Silk Scarf',
        product_image: 'https://images.pexels.com/photos/3621881/pexels-photo-3621881.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 19.95,
        quantity: 1,
      },
    ],
  },
];

export function Orders({ onNavigate }: OrdersProps) {
  const [orders] = useState(INITIAL_ORDERS);

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
              <Package size={24} />
              Order History
            </h1>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
<Package
  size={64}
  color="#D1D5DB" // gray-300 hex
  style={{ marginBottom: 16 }} // mb-4 -> 16px
/>
            <p className="text-gray-500 text-lg mb-2">No orders yet</p>
            <p className="text-gray-600 text-sm mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => onNavigate('main')}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {orders.map(({ order, items }) => (
              <OrderCard
                key={order.id}
                order={order}
                items={items}
                onTrack={(orderId) => onNavigate('tracking', orderId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
