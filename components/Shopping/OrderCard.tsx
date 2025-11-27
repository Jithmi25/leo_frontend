import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';


const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C',
  goldDark: '#B8860B',
  darkText: '#000000',
  greyText: '#999999',
  lightGrey: '#F5F5F5',
  borderGrey: '#E0E0E0',
  success: '#4CAF50',
};

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: {
    id: string;
    name: string;
    imageUri: string;
    quantity: number;
  }[];
}

interface OrderCardProps {
  order: Order;
  onTrackOrder: (orderId: string) => void;
}

export default function OrderCard({ order, onTrackOrder }: OrderCardProps) {
  const getStatusColor = () => {
    switch (order.status) {
      case 'Processing':
        return COLORS.goldMid;
      case 'Shipped':
        return '#2196F3';
      case 'Delivered':
        return COLORS.success;
      case 'Cancelled':
        return '#F44336';
      default:
        return COLORS.greyText;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.itemsContainer}>
        {order.items.slice(0, 3).map((item, index) => (
          <Image
            key={item.id}
            source={{ uri: item.imageUri }}
            style={[styles.itemImage, index > 0 && { marginLeft: -10 }]}
          />
        ))}
        {order.items.length > 3 && (
          <View style={styles.moreItems}>
            <Text style={styles.moreItemsText}>+{order.items.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} 
        onPress={() => router.push('/Shopping/Tracking')}
          style={styles.trackButton}
          
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
          <ChevronRight size={16} color={COLORS.darkText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: COLORS.greyText,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderGrey,
    marginVertical: 12,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  moreItems: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  moreItemsText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.greyText,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    color: COLORS.greyText,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldMid,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkText,
  },
});
