import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Search } from 'lucide-react-native';
import { router } from 'expo-router';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  status: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Camera',
    price: 2500,
    image: 'https://images.pexels.com/photos/606933/pexels-photo-606933.jpeg',
    seller: 'John Doe',
    status: 'listed',
  },
  {
    id: '2',
    title: 'Leather Backpack',
    price: 1800,
    image: 'https://images.pexels.com/photos/1407407/pexels-photo-1407407.jpeg',
    seller: 'Jane Smith',
    status: 'listed',
  },
  {
    id: '3',
    title: 'Wireless Headphones',
    price: 3200,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    seller: 'Mike Johnson',
    status: 'listed',
  },
  {
    id: '4',
    title: 'Smart Watch',
    price: 4500,
    image: 'https://images.pexels.com/photos/3586127/pexels-photo-3586127.jpeg',
    seller: 'Sarah Lee',
    status: 'listed',
  },
];

export default function MarketplaceHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products] = useState(mockProducts);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            activeOpacity={0.8} 
            onPress={() => router.push('/SuperAdmin/ProductListing')}
          >
            <Plus color="#FFD700" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#999" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['All', 'Badges', 'Accessories', 'Apperal', 'Art'].map((category) => (
              <TouchableOpacity key={category} style={styles.filterChip}>
                <Text style={styles.filterText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.sellerName}>{product.seller}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>Rs. {product.price}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{product.status}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // REMOVED: paddingTop: StatusBar.currentHeight || 0
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12, // Note: 'gap' works in newer React Native versions. If layout breaks, use margins.
  },
  productCard: {
    width: '48%', // Adjusted slightly to ensure 2 fit with gap
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12, // Added margin bottom for vertical spacing
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E0E0E0',
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4CAF50',
  },
  bottomPadding: {
    height: 40,
  },
});