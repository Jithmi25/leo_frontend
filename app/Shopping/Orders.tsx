import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Package } from 'lucide-react-native';
import OrderCard, { Order } from '@/components/Shopping/OrderCard';

const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C',
  goldDark: '#B8860B',
  darkText: '#000000',
  greyText: '#999999',
  lightGrey: '#F5F5F5',
  borderGrey: '#E0E0E0',
};

const ORDERS_DATA: Order[] = [
  {
    id: '1',
    orderNumber: 'LN2024001',
    date: 'Nov 25, 2024',
    total: 98.75,
    status: 'Shipped',
    items: [
      {
        id: '1',
        name: 'LEATHER SLIM WALLET',
        imageUri: 'https://placehold.co/150x150/333/FFF?text=Wallet',
        quantity: 2,
      },
      {
        id: '2',
        name: 'WOMENS CARDIGAN WRAP',
        imageUri: 'https://placehold.co/150x150/666/FFF?text=Cardigan',
        quantity: 1,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'LN2024002',
    date: 'Nov 20, 2024',
    total: 156.80,
    status: 'Delivered',
    items: [
      {
        id: '3',
        name: 'WOMENS CREDIT CARD HOLDER WALLET',
        imageUri: 'https://placehold.co/150x150/999/FFF?text=Holder',
        quantity: 3,
      },
      {
        id: '4',
        name: 'LIONS WINTER SCARF',
        imageUri: 'https://placehold.co/150x150/1E90FF/FFF?text=Scarf',
        quantity: 4,
      },
      {
        id: '5',
        name: 'LEATHER BELT',
        imageUri: 'https://placehold.co/150x150/8B4513/FFF?text=Belt',
        quantity: 1,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'LN2024003',
    date: 'Nov 15, 2024',
    total: 45.90,
    status: 'Processing',
    items: [
      {
        id: '6',
        name: 'LIONS CAP',
        imageUri: 'https://placehold.co/150x150/FF6347/FFF?text=Cap',
        quantity: 1,
      },
    ],
  },
  {
    id: '4',
    orderNumber: 'LN2024004',
    date: 'Nov 10, 2024',
    total: 234.50,
    status: 'Delivered',
    items: [
      {
        id: '7',
        name: 'LEATHER JACKET',
        imageUri: 'https://placehold.co/150x150/2F4F4F/FFF?text=Jacket',
        quantity: 1,
      },
      {
        id: '8',
        name: 'DRESS SHOES',
        imageUri: 'https://placehold.co/150x150/654321/FFF?text=Shoes',
        quantity: 1,
      },
    ],
  },
];

export default function OrderHistoryScreen() {
  const handleTrackOrder = (orderId: string) => {
    router.push(`/Shopping/TrackStatus?orderId=${orderId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={styles.placeholder} />
      </View>

      {ORDERS_DATA.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Package size={64} color={COLORS.greyText} />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.ordersContainer}>
            {ORDERS_DATA.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onTrackOrder={handleTrackOrder}
              />
            ))}
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: StatusBar.currentHeight || 0
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGrey,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.greyText,
  },
});
