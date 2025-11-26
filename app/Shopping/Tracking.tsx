import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react-native';
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

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
}

interface TrackingProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

const TRACKING_DATA: Record<string, { order: Order; items: OrderItem[]; events: TrackingEvent[] }> = {
  order1: {
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
    ],
    events: [
      {
        id: 'event1',
        status: 'pending',
        description: 'Order placed successfully',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event2',
        status: 'processing',
        description: 'Order is being processed',
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event3',
        status: 'shipped',
        description: 'Package shipped with tracking ID: 1234567890',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event4',
        status: 'delivered',
        description: 'Package delivered successfully',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  order2: {
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
    ],
    events: [
      {
        id: 'event5',
        status: 'pending',
        description: 'Order placed successfully',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event6',
        status: 'processing',
        description: 'Order is being processed',
        timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event7',
        status: 'shipped',
        description: 'Package shipped with tracking ID: 0987654321',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  order3: {
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
    ],
    events: [
      {
        id: 'event8',
        status: 'pending',
        description: 'Order placed successfully',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'event9',
        status: 'processing',
        description: 'Order is being processed',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
};

export function Tracking({ orderId, onNavigate }: TrackingProps) {
  const data = TRACKING_DATA[orderId];
  const order = data?.order;
  const items = data?.items || [];
  const trackingEvents = data?.events || [];

  const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle size={24} color="#16A34A" />; // green-600
    case 'shipped':
      return <Truck size={24} color="#7C3AED" />; // purple-600
    case 'processing':
      return <Package size={24} color="#3B82F6" />; // blue-600
    default:
      return <CheckCircle size={24} color="#CA8A04" />; // yellow-600
  }
};


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="p-4 flex items-center gap-4">
            <button
              onClick={() => onNavigate('orders')}
              className="text-yellow-600 hover:text-yellow-700"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-gray-900 text-xl font-bold">Track Order</h1>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">Order Number</p>
                <p className="text-gray-900 font-bold text-lg">{order.order_number}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-yellow-600 font-bold text-lg">${order.total_amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Order Items</p>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm font-medium">{item.product_name}</p>
                      <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-gray-900 font-bold text-lg mb-6">Tracking History</h2>
            <div className="space-y-6">
              {trackingEvents.map((event, index) => {
                const isLast = index === trackingEvents.length - 1;
                return (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(event.status)}
                      {!isLast && (
                        <div className="w-0.5 h-12 bg-gray-300 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-gray-900 font-medium capitalize mb-1">{event.status}</p>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                      <p className="text-gray-500 text-xs">{formatDate(event.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
