import React from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F0F0F0',
    borderGrey: '#E0E0E0',
};

const LOGO_URL = 'https://placehold.co/50x50/DAA520/000?text=LIONS';
const AVATAR_URL = 'https://placehold.co/40x40/A088C3/000?text=U';

export default function ConfirmationScreen() {
    const orderNumber = '253698';

    const handleContinueShopping = () => {
        console.log('Continue shopping');
        // Navigate back to marketplace/shop
        router.push('/Shopping/Marketplace');
    };

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
                <TouchableOpacity>
                    <Image source={{ uri: AVATAR_URL }} style={styles.headerAvatar} />
                </TouchableOpacity>
            </View>

            {/* Progress Indicator - All Complete */}
            <View style={styles.progressContainer}>
                <View style={styles.progressStep}>
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                    <Text style={[styles.progressText, styles.progressTextActive]}>Cart</Text>
                </View>
                <View style={[styles.progressLine, styles.progressLineActive]} />
                <View style={styles.progressStep}>
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                </View>
                <View style={[styles.progressLine, styles.progressLineActive]} />
                <View style={styles.progressStep}>
                    <View style={[styles.progressDot, styles.progressDotActive]} />
                    <Text style={[styles.progressText, styles.progressTextActive]}>Confirmation</Text>
                </View>
            </View>

            <View style={styles.content}>
                {/* Confirmation Title */}
                <Text style={styles.pageTitle}>Confirmation</Text>

                {/* Success Checkmark */}
                <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark" size={120} color={COLORS.goldMid} />
                </View>

                {/* Success Message */}
                <Text style={styles.successText}>Successful !</Text>

                {/* Order Details */}
                <View style={styles.orderDetailsContainer}>
                    <Text style={styles.orderText}>
                        Your order number is{' '}
                        <Text style={styles.orderNumber}>#{orderNumber}</Text>
                    </Text>
                    <Text style={styles.emailMessage}>
                        You will receive the order confirmation email shortly
                    </Text>
                </View>

                {/* Thank You Message */}
                <Text style={styles.thankYouText}>Thank you for shopping with us</Text>

                {/* Continue Shopping Button */}
                <TouchableOpacity style={styles.continueButton} onPress={handleContinueShopping}>
                    <Text style={styles.continueButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
            </View>
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
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.goldMid,
        marginBottom: 40,
    },
    checkmarkContainer: {
        marginVertical: 40,
    },
    successText: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.goldMid,
        marginBottom: 60,
    },
    orderDetailsContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    orderText: {
        fontSize: 16,
        color: COLORS.darkText,
        textAlign: 'center',
        marginBottom: 12,
    },
    orderNumber: {
        color: COLORS.goldMid,
        fontWeight: '700',
    },
    emailMessage: {
        fontSize: 15,
        color: COLORS.darkText,
        textAlign: 'center',
        lineHeight: 22,
    },
    thankYouText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        textAlign: 'center',
        marginBottom: 60,
    },
    continueButton: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 48,
        paddingVertical: 16,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        minWidth: 280,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        textAlign: 'center',
    },
});
