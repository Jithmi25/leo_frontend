import { Package, ChevronRight } from 'lucide-react-native';

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

interface OrderCardProps {
  order: Order;
  items: OrderItem[];
  onTrack: (orderId: string) => void;
}

export function OrderCard({ order, items, onTrack }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'processing':
        return 'text-blue-600';
      case 'shipped':
        return 'text-purple-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-gray-600 text-sm">Order #{order.order_number}</p>
            <p className="text-gray-500 text-xs mt-1">{formatDate(order.created_at)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-900 font-bold text-lg">${order.total_amount.toFixed(2)}</p>
            <p className={`text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
              {order.status}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {items.slice(0, 2).map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm font-medium">{item.product_name}</p>
              <p className="text-gray-600 text-xs mt-1">Qty: {item.quantity}</p>
            </div>
            <p className="text-yellow-600 text-sm font-medium">${item.price.toFixed(2)}</p>
          </div>
        ))}
        {items.length > 2 && (
          <p className="text-gray-600 text-sm">+{items.length - 2} more items</p>
        )}
      </div>

      <button
        onClick={() => onTrack(order.id)}
        className="w-full bg-gray-50 hover:bg-gray-100 transition-colors p-4 flex items-center justify-between text-yellow-600 font-medium border-t border-gray-200"
      >
        <span>Track Order</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
