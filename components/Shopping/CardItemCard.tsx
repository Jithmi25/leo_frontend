import { Trash2, Minus, Plus } from 'lucide-react-native';

interface CartItem {
  id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm">
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-gray-900 font-medium mb-1">{item.product_name}</h3>
          <p className="text-yellow-600 font-bold text-lg">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1.5">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-gray-900 w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-600 transition-colors p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
