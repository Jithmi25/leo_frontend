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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    greyButton: '#CCCCCC',
};

const LOGO_URL = 'https://placehold.co/50x50/DAA520/000?text=LIONS';
const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';
const PRODUCT_IMAGE = 'https://placehold.co/80x80/333/FFF?text=Wallet';

export default function PaymentScreen() {
    const [email, setEmail] = useState('');
    const [emailOffers, setEmailOffers] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [discountCode, setDiscountCode] = useState('');

    const subtotal = 12.95;
    const shipping = 0; // Will be calculated after address
    const total = subtotal + shipping;

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

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressStep}>
                        <View style={[styles.progressDot, styles.progressDotActive]} />
                        <Text style={[styles.progressText, styles.progressTextActive]}>Cart</Text>
                    </View>
                    <View style={styles.progressLine} />
                    <View style={styles.progressStep}>
                        <View style={styles.progressDot} />
                        <Text style={styles.progressText}>Express Checkout</Text>
                    </View>
                    <View style={styles.progressLine} />
                    <View style={styles.progressStep}>
                        <View style={styles.progressDot} />
                        <Text style={styles.progressText}>Confirmation</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Express Checkout Buttons */}
                    <View style={styles.expressCheckoutContainer}>
                        <TouchableOpacity style={styles.expressButton} disabled>
                            <View style={styles.expressButtonPlaceholder} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.expressButton} disabled>
                            <View style={styles.expressButtonPlaceholder} />
                        </TouchableOpacity>
                    </View>

                    {/* OR Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Contact Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Contact</Text>
                            <TouchableOpacity>
                                <Text style={styles.signInText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLORS.greyText}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setEmailOffers(!emailOffers)}
                        >
                            <View style={styles.checkbox}>
                                {emailOffers && <View style={styles.checkboxInner} />}
                            </View>
                            <Text style={styles.checkboxLabel}>Email me with news and offers</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Delivery Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Delivery</Text>
                        <View style={styles.countrySelector}>
                            <View>
                                <Text style={styles.countrySelectorLabel}>Country/Region</Text>
                                <Text style={styles.countrySelectorValue}>Sri Lanka</Text>
                            </View>
                            <Ionicons name="chevron-down" size={20} color={COLORS.greyText} />
                        </View>

                        <View style={styles.nameRow}>
                            <TextInput
                                style={[styles.input, styles.inputHalf]}
                                placeholder="First Name"
                                placeholderTextColor={COLORS.greyText}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                style={[styles.input, styles.inputHalf]}
                                placeholder="Last Name"
                                placeholderTextColor={COLORS.greyText}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            placeholderTextColor={COLORS.greyText}
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>

                    {/* Product Summary */}
                    <View style={styles.productSummary}>
                        <Image source={{ uri: PRODUCT_IMAGE }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>LEATHER SLIM WALLET</Text>
                        </View>
                        <Text style={styles.productPrice}>${subtotal.toFixed(2)}</Text>
                    </View>

                    {/* Discount Code */}
                    <View style={styles.discountContainer}>
                        <TextInput
                            style={styles.discountInput}
                            placeholder="Discount code or gift card"
                            placeholderTextColor={COLORS.greyText}
                            value={discountCode}
                            onChangeText={setDiscountCode}
                        />
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValueGrey}>Enter shipping Address</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} activeOpacity={0.7} onPress={() => router.push('/Shopping/Card')}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
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
    scrollView: {
        flex: 1,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    progressStep: {
        alignItems: 'center',
    },
    progressDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.lightGrey,
        marginBottom: 4,
    },
    progressDotActive: {
        backgroundColor: COLORS.goldMid,
    },
    progressText: {
        fontSize: 11,
        color: COLORS.greyText,
    },
    progressTextActive: {
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: COLORS.lightGrey,
        marginHorizontal: 8,
    },
    content: {
        paddingHorizontal: 20,
    },
    expressCheckoutContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    expressButton: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        backgroundColor: COLORS.lightGrey,
        overflow: 'hidden',
    },
    expressButtonPlaceholder: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.borderGrey,
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: COLORS.greyText,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    signInText: {
        fontSize: 14,
        color: COLORS.goldMid,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.darkText,
        backgroundColor: COLORS.white,
        marginBottom: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: COLORS.borderGrey,
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: COLORS.goldMid,
        borderRadius: 2,
    },
    checkboxLabel: {
        fontSize: 14,
        color: COLORS.darkText,
    },
    countrySelector: {
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    countrySelectorLabel: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    countrySelectorValue: {
        fontSize: 15,
        color: COLORS.darkText,
        fontWeight: '600',
        marginTop: 2,
    },
    nameRow: {
        flexDirection: 'row',
        gap: 12,
    },
    inputHalf: {
        flex: 1,
    },
    productSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    discountContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    discountInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.darkText,
    },
    applyButton: {
        backgroundColor: COLORS.greyButton,
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        justifyContent: 'center',
    },
    applyButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.white,
    },
    summaryContainer: {
        marginBottom: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 15,
        color: COLORS.darkText,
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    summaryValueGrey: {
        fontSize: 13,
        color: COLORS.greyText,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: COLORS.borderGrey,
        paddingTop: 12,
        marginTop: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    submitButton: {
        backgroundColor: COLORS.greyButton,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 40,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },
});
