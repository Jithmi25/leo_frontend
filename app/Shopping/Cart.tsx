import React, { useState } from 'react';
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
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import CartItemCard, { CartItem } from '@/components/Shopping/CardItemCard';

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

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'LEATHER SLIM WALLET',
    code: 'G2147BK',
    price: 12.95,
    quantity: 2,
    imageUri: 'https://placehold.co/150x150/333/FFF?text=Wallet',
  },
  {
    id: '2',
    name: 'WOMENS CARDIGAN WRAP',
    code: '8801CS',
    price: 54.95,
    quantity: 1,
    imageUri: 'https://placehold.co/150x150/666/FFF?text=Cardigan',
  },
  {
    id: '3',
    name: 'WOMENS CREDIT CARD HOLDER WALLET',
    code: 'G2143N',
    price: 12.95,
    quantity: 3,
    imageUri: 'https://placehold.co/150x150/999/FFF?text=Holder',
  },
  {
    id: '4',
    name: 'LIONS WINTER SCARF',
    code: 'A513',
    price: 18.95,
    quantity: 1,
    imageUri: 'https://placehold.co/150x150/1E90FF/FFF?text=Scarf',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.darkText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={COLORS.greyText} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to get started</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.back()}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.cartHeader}>
              <Text style={styles.itemCount}>{cartItems.length} Items</Text>
            </View>

            <View style={styles.itemsList}>
              {cartItems.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <View style={{ height: 120 }} />
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.footerTotalLabel}>Total</Text>
              <Text style={styles.footerTotalValue}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                alert('Order placed successfully!');
                router.push('/Shopping/Payment');
              }}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
  cartHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkText,
  },
  itemsList: {
    paddingHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.greyText,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkText,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderGrey,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderGrey,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalContainer: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 13,
    color: COLORS.greyText,
    marginBottom: 4,
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
  },
  checkoutButton: {
    backgroundColor: COLORS.goldMid,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
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
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: COLORS.goldMid,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkText,
  },
});
