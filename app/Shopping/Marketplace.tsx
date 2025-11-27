import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    TextInput,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '@/components/BottomNav'; // Assuming BottomNav.tsx is in the same directory; adjust path if needed

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    modalOverlay: 'rgba(0, 0, 0, 0.6)',
};

const LOGO_URL = 'https://placehold.co/50x50/DAA520/000?text=LIONS';
const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';

interface Product {
    id: string;
    name: string;
    code: string;
    price: number;
    imageUri: string;
    inStock: boolean;
}

const PRODUCTS_DATA: Product[] = [
    {
        id: '1',
        name: 'LEATHER SLIM WALLET',
        code: 'G2147BK',
        price: 12.95,
        imageUri: 'https://placehold.co/150x150/333/FFF?text=Wallet',
        inStock: true,
    },
    {
        id: '2',
        name: 'WOMENS CARDIGAN WRAP',
        code: '8801CS',
        price: 54.95,
        imageUri: 'https://placehold.co/150x150/666/FFF?text=Cardigan',
        inStock: true,
    },
    {
        id: '3',
        name: 'WOMENS CREDIT CARD HOLDER WALLET',
        code: 'G2143N',
        price: 12.95,
        imageUri: 'https://placehold.co/150x150/999/FFF?text=Holder',
        inStock: true,
    },
    {
        id: '4',
        name: 'LIONS WINTER SCARF',
        code: 'A513',
        price: 18.95,
        imageUri: 'https://placehold.co/150x150/1E90FF/FFF?text=Scarf',
        inStock: true,
    },
];

const CATEGORIES = ['Apparel', 'Awards & Recognition', 'Supplies', 'Accessories'];

export default function MarketplaceScreen() {
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'leaderboard' | 'notifications' | 'events'>('shop');

    const handleAddToCart = (product: Product) => {
        setSelectedProduct(product);
        setShowCartModal(true);
    };

    const handleQuickShop = (product: Product) => {
        // Navigate directly to the payment page
        router.push('/Shopping/Payment');
    };

    const onTabPress = (path: string, tab: 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events') => {
        setActiveTab(tab);
        router.push(path as any); // Cast to 'any' to bypass Expo Router's strict typing
    };

    const renderProduct = (product: Product, index: number) => (
        <View style={styles.productCard} key={product.id}>
            <View style={styles.productImageContainer}>
                <Image source={{ uri: product.imageUri }} style={styles.productImage} />
                {product.inStock && (
                    <View style={styles.stockBadge}>
                        <Text style={styles.stockText}>In Stock</Text>
                    </View>
                )}
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCode}>{product.code}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.productActions}>
                <TouchableOpacity
                    style={styles.quickShopButton}
                    onPress={() => handleQuickShop(product)}
                >
                    <Text style={styles.quickShopText}>Quick Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(product)}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Image source={{ uri: LOGO_URL }} style={styles.logoImage} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>LeoConnect</Text>
                    <Text style={styles.headerSubtitle}>SRI LANKA</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/Profile/OwnProfile')}>
                    <Image source={{ uri: AVATAR_URL }} style={styles.headerAvatar} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
                <TouchableOpacity style={styles.categoryDropdown}>
                    <Text style={styles.categoryDropdownText}>All Categories</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.darkText} />
                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="What Are You Looking For?"
                        placeholderTextColor={COLORS.greyText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity>
                        <Ionicons name="search" size={20} color={COLORS.darkText} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cartIcon} activeOpacity={0.7} onPress={() => router.push('/Shopping/Cart')}>
                    <Ionicons name="cart-outline" size={24} color={COLORS.darkText} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {CATEGORIES.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryTab}>
                            <Text style={styles.categoryTabText}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Hero Banner */}
                <LinearGradient
                    colors={[COLORS.black, '#3D3A2E', COLORS.goldDark]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.heroBanner}
                >
                    <Text style={styles.heroText}>
                        Welcome to Everything to <Text style={styles.heroTextGold}>Lions!</Text>
                    </Text>
                    <TouchableOpacity style={styles.heroButton} activeOpacity={0.8} onPress={() => router.push('/Shopping/Orders')}>
                        <Text style={styles.heroButtonText}>My Orders</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* New Products */}
                <View style={styles.productsSection}>
                    <Text style={styles.sectionTitle}>New Products</Text>
                    <View style={styles.productsGrid}>
                        {PRODUCTS_DATA.map((product, index) => renderProduct(product, index))}
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabPress={onTabPress} />

            {/* Add to Cart Modal */}
            <Modal
                transparent={true}
                visible={showCartModal}
                animationType="fade"
                onRequestClose={() => setShowCartModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowCartModal(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="checkmark-circle" size={28} color={COLORS.black} />
                            <Text style={styles.modalTitle}>Added to Your Cart:</Text>
                        </View>

                        {selectedProduct && (
                            <>
                                <Image
                                    source={{ uri: selectedProduct.imageUri }}
                                    style={styles.modalProductImage}
                                />
                                <View style={styles.modalSubtotal}>
                                    <Text style={styles.modalSubtotalLabel}>Cart Subtotal</Text>
                                    <Text style={styles.modalSubtotalAmount}>
                                        ${selectedProduct.price.toFixed(2)}
                                    </Text>
                                </View>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity 
                                        style={styles.viewCartButton}
                                        activeOpacity={0.7} 
                                        onPress={() => {
                                            setShowCartModal(false); // Close modal before navigating
                                            router.push('/Shopping/Cart');
                                        }}
                                    >
                                        <Text style={styles.viewCartText}>View Cart(1)</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.checkoutButton} 
                                        activeOpacity={0.7} 
                                        onPress={() => {
                                            setShowCartModal(false); // Close modal before navigating
                                            router.push('/Shopping/Payment');
                                        }}
                                    >
                                        <Text style={styles.checkoutText}>Checkout</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    logoImage: {
        width: 40,
        height: 40,
        marginLeft: 12,
    },
    headerTextContainer: {
        marginLeft: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.goldMid,
        letterSpacing: 0.5,
    },
    headerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    categoryDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 4,
    },
    categoryDropdownText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.darkText,
    },
    cartIcon: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    categoriesScroll: {
        maxHeight: 50,
    },
    categoriesContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    categoryTab: {
        paddingVertical: 8,
    },
    categoryTabText: {
        fontSize: 15,
        color: COLORS.darkText,
    },
    heroBanner: {
        margin: 16,
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroText: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 16,
    },
    heroTextGold: {
        color: COLORS.goldMid,
    },
    heroButton: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    heroButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    productsSection: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 16,
        textAlign: 'center',
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        marginBottom: 16,
        overflow: 'hidden',
    },
    productImageContainer: {
        position: 'relative',
        backgroundColor: COLORS.lightGrey,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    stockBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    stockText: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 4,
    },
    productCode: {
        fontSize: 11,
        color: COLORS.greyText,
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    productActions: {
        flexDirection: 'row',
        padding: 8,
        gap: 6,
    },
    quickShopButton: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
    },
    quickShopText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.white,
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
    },
    addToCartText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.modalOverlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 24,
        width: '85%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    modalProductImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
        marginBottom: 20,
    },
    modalSubtotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    modalSubtotalLabel: {
        fontSize: 16,
        color: COLORS.greyText,
    },
    modalSubtotalAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    viewCartButton: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    viewCartText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.white,
    },
    checkoutButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});