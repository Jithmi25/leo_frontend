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
};

const LOGO_URL = 'https://placehold.co/60x60/DAA520/000?text=LIONS';
const PROFILE_AVATAR = 'https://placehold.co/40x40/A088C3/FFF?text=U';

export default function WMConfirmationScreen() {
    const handleGoToDashboard = () => {
        console.log('Navigate to admin dashboard');
        // TODO: Navigate to webmaster admin dashboard
        router.push('/Webmaster/WMAdmin');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <View style={styles.branding}>
                    <Image source={{ uri: LOGO_URL }} style={styles.logo} />
                    <View style={styles.brandingText}>
                        <Text style={styles.brandTitle}>LeoConnect</Text>
                        <Text style={styles.brandSubtitle}>SRI LANKA</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={{ uri: PROFILE_AVATAR }} style={styles.profileAvatar} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.successIconContainer}>
                    <View style={styles.checkmarkCircle}>
                        <Ionicons name="checkmark" size={80} color={COLORS.goldMid} />
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.successMessage}>
                  Your poll has been created 
{'\n'}successfully!
                </Text>

                {/* Info Text */}
                <Text style={styles.infoText}>
                    Members can now vote in the  
community section.{'\n'}
                </Text>

                {/* Dashboard Button */}
                <TouchableOpacity style={styles.dashboardButton} onPress={handleGoToDashboard}>
                    <Text style={styles.dashboardButtonText}>Main Dashboard</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    branding: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        width: 50,
        height: 50,
    },
    brandingText: {
        alignItems: 'flex-start',
    },
    brandTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    brandSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.goldMid,
        letterSpacing: 0.5,
    },
    profileAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    successIconContainer: {
        marginBottom: 40,
    },
    checkmarkCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: COLORS.goldMid,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    successMessage: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.goldMid,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 30,
    },
    infoText: {
        fontSize: 16,
        color: COLORS.darkText,
        textAlign: 'center',
        marginBottom: 60,
        lineHeight: 24,
    },
    dashboardButton: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 60,
        paddingVertical: 16,
        borderRadius: 28,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    dashboardButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
