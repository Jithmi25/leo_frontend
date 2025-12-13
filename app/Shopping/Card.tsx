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
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F0F0F0',
    borderGrey: '#E0E0E0',
};

const LOGO_URL = 'https://placehold.co/50x50/DAA520/000?text=LIONS';
const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';

export default function CardScreen() {
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [saveCard, setSaveCard] = useState(true);

    const subtotal = 12.95;
    const shippingFee = 0;
    const grandTotal = subtotal + shippingFee;

    



const handlePayNow = () => router.push("/Shopping/Confirmation");


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
                    <View style={[styles.progressLine, styles.progressLineActive]} />
                    <View style={styles.progressStep}>
                        <View style={[styles.progressDot, styles.progressDotActive]} />
                    </View>
                    <View style={styles.progressLine} />
                    <View style={styles.progressStep}>
                        <View style={styles.progressDot} />
                        <Text style={styles.progressText}>Confirmation</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Payment Title */}
                    <Text style={styles.pageTitle}>Payment</Text>
                    <Text style={styles.securityMessage}>
                        All transactions are secure and encrypted.
                    </Text>

                    {/* Payment Form */}
                    <View style={styles.form}>
                        <Text style={styles.label}>Cardholder Name</Text>
                        <TextInput
                            style={styles.input}
                            value={cardholderName}
                            onChangeText={setCardholderName}
                            placeholder=""
                            placeholderTextColor={COLORS.greyText}
                        />

                        <Text style={styles.label}>Card Number</Text>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            placeholder=""
                            placeholderTextColor={COLORS.greyText}
                            keyboardType="numeric"
                            maxLength={16}
                        />

                        <View style={styles.row}>
                            <View style={styles.halfField}>
                                <Text style={styles.label}>Expiration</Text>
                                <TextInput
                                    style={styles.input}
                                    value={expiration}
                                    onChangeText={setExpiration}
                                    placeholder="MM/YY"
                                    placeholderTextColor={COLORS.greyText}
                                    keyboardType="numeric"
                                    maxLength={5}
                                />
                            </View>
                            <View style={styles.halfField}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput
                                    style={styles.input}
                                    value={cvv}
                                    onChangeText={setCvv}
                                    placeholder=""
                                    placeholderTextColor={COLORS.greyText}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        {/* Save Card Toggle */}
                        <View style={styles.saveCardContainer}>
                            <Text style={styles.saveCardText}>Save this Card</Text>
                            <Switch
                                value={saveCard}
                                onValueChange={setSaveCard}
                                trackColor={{ false: '#D1D1D6', true: COLORS.goldMid }}
                                thumbColor={COLORS.white}
                            />
                        </View>

                        <Text style={styles.cardSecurityMessage}>
                            Your card information is safe with us.
                        </Text>
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping Fee</Text>
                            <Text style={styles.summaryValueGrey}>Shipping Free</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Grand Total</Text>
                            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Payment Footer */}
                    <View style={styles.paymentFooter}>
                        <Text style={styles.amountText}>USD ${grandTotal.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
                            <Text style={styles.payNowText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>

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
        paddingHorizontal: 40,
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
        position: 'absolute',
        bottom: -20,
    },
    progressTextActive: {
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    progressLine: {
        flex: 1,
        height: 3,
        backgroundColor: COLORS.lightGrey,
        marginHorizontal: 8,
    },
    progressLineActive: {
        backgroundColor: COLORS.goldMid,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.goldMid,
        textAlign: 'center',
        marginBottom: 8,
    },
    securityMessage: {
        fontSize: 13,
        color: COLORS.greyText,
        textAlign: 'center',
        marginBottom: 32,
    },
    form: {
        marginBottom: 32,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: COLORS.darkText,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    halfField: {
        flex: 1,
    },
    saveCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 8,
    },
    saveCardText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    cardSecurityMessage: {
        fontSize: 13,
        color: COLORS.greyText,
        textAlign: 'center',
        marginTop: 12,
    },
    summaryContainer: {
        marginBottom: 32,
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
        fontSize: 15,
        color: COLORS.greyText,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: COLORS.borderGrey,
        paddingTop: 16,
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
    paymentFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountText: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    payNowButton: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    payNowText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
