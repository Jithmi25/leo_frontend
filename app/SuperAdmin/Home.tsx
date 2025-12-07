import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Users, Trophy, ShoppingBag, LayoutDashboard } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router'; // Assuming expo-router is used for navigation

// --- THEME COLORS ---
const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    // Default gradient theme
    primaryGradientStart: '#000000', 
    primaryGradientEnd: '#333333', 
    secondaryGold: '#FFD700',
};

// Placeholder for the logo image
const logoImage = {
    uri: 'https://placehold.co/100x100/FFC72C/000?text=LOGO',
};

export default function SuperAdminHomeScreen() {
    const handleNavigate = (screen: string) => {
        console.log('Navigate to:', screen);
        // In a real app, you would use router.push(screen)
        // router.push(screen);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* --- TOP HEADER (Logo and Profile) --- */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={logoImage} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.appNameContainer}>
                        <Text style={styles.appName}>LeoConnect</Text>
                        <Text style={styles.appCountry}>SRI LANKA</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.profileButton} 
                    activeOpacity={0.8} 
                    onPress={() => router.push('/Profile/OwnProfile')}
                >
                    <Image
                        source={{
                            uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
                        }}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            {/* --- END TOP HEADER --- */}
            
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                
                {/* Dashboard Title Section */}
                <View style={styles.dashboardTitleSection}>
                    <LayoutDashboard color={COLORS.darkText} size={24} />
                    <Text style={styles.headerTitle}>Super Admin Dashboard</Text>
                    <Text style={styles.subtitle}>Manage your platform</Text>
                </View>

                <View style={styles.content}>
                    {/* --- SHORTCUT CARDS --- */}
                    
                    {/* 1. Role Management (Gold/Black Gradient) */}
                    <LinearGradient
                        colors={['#FFD700', '#FFA500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.shortcutGradient}>
                        <TouchableOpacity
                            style={styles.shortcutCard}
                            onPress={() => handleNavigate('role-management')}>
                            <View style={styles.iconContainer}>
                                <Users color={COLORS.black} size={32} />
                            </View>
                            <View style={styles.shortcutContent}>
                                <Text style={styles.shortcutTitle}>Role Management</Text>
                                <Text style={styles.shortcutDescription}>
                                    Manage user roles and permissions
                                </Text>
                            </View>
                            <ChevronRight color={COLORS.black} size={24} />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* 2. Leaderboard (Black/Grey Gradient) */}
                    <LinearGradient
                        colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.shortcutGradient}>
                        <TouchableOpacity
                            style={styles.shortcutCard}
                            onPress={() => handleNavigate('leaderboard')}>
                            <View style={[styles.iconContainer, {backgroundColor: 'rgba(255, 255, 255, 0.1)'}]}>
                                <Trophy color={COLORS.secondaryGold} size={32} />
                            </View>
                            <View style={styles.shortcutContent}>
                                <Text style={[styles.shortcutTitle, { color: COLORS.white }]}>
                                    Leaderboard
                                </Text>
                                <Text style={[styles.shortcutDescription, { color: COLORS.greyText }]}>
                                    View achievements and rankings
                                </Text>
                            </View>
                            <ChevronRight color={COLORS.white} size={24} />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* 3. Marketplace (Black/Grey Gradient) */}
                    <LinearGradient
                        colors={[COLORS.primaryGradientStart, COLORS.primaryGradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.shortcutGradient}>
                        <TouchableOpacity
                            style={styles.shortcutCard}
                            onPress={() => handleNavigate('marketplace')}>
                            <View style={[styles.iconContainer, {backgroundColor: 'rgba(255, 255, 255, 0.1)'}]}>
                                <ShoppingBag color={COLORS.secondaryGold} size={32} />
                            </View>
                            <View style={styles.shortcutContent}>
                                <Text style={[styles.shortcutTitle, { color: COLORS.white }]}>
                                    Marketplace
                                </Text>
                                <Text style={[styles.shortcutDescription, { color: COLORS.greyText }]}>
                                    View and manage product listings
                                </Text>
                            </View>
                            <ChevronRight color={COLORS.white} size={24} />
                        </TouchableOpacity>
                    </LinearGradient>
                    
                    {/* --- STATS OVERVIEW --- */}
                    <View style={styles.statsSection}>
                        <Text style={styles.sectionTitle}>Quick Stats</Text>
                        <View style={styles.statsGrid}>
                            {/* Stat Card 1 */}
                            <View style={styles.statCard}>
                                <Text style={[styles.statValue, { color: COLORS.goldMid }]}>24</Text>
                                <Text style={styles.statLabel}>Active Users</Text>
                            </View>
                            {/* Stat Card 2 */}
                            <View style={styles.statCard}>
                                <Text style={[styles.statValue, { color: COLORS.goldMid }]}>156</Text>
                                <Text style={styles.statLabel}>Total Products</Text>
                            </View>
                            {/* Stat Card 3 */}
                            <View style={styles.statCard}>
                                <Text style={[styles.statValue, { color: COLORS.goldMid }]}>12</Text>
                                <Text style={styles.statLabel}>Pending Events</Text>
                            </View>
                            {/* Stat Card 4 */}
                            <View style={styles.statCard}>
                                <Text style={[styles.statValue, { color: COLORS.goldMid }]}>89</Text>
                                <Text style={styles.statLabel}>Registrations</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    scrollView: {
        flex: 1,
    },
    // NEW LOGO/PROFILE HEADER STYLES
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
        borderRadius: 8, // Optional: for a subtle rounded look on the logo
    },
    appNameContainer: {
        justifyContent: 'center',
    },
    appName: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.darkText,
    },
    appCountry: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.goldMid,
        letterSpacing: 1.5,
        marginTop: -3,
    },
    profileButton: {
        // Shadow/elevation can be added here if desired
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
    },
    // END NEW LOGO/PROFILE HEADER STYLES

    // DASHBOARD TITLE SECTION
    dashboardTitleSection: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.darkText,
        marginLeft: 8,
    },
    subtitle: {
        width: '100%',
        fontSize: 14,
        color: COLORS.greyText,
        fontWeight: '500',
        marginTop: 4,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
    },
    // SHORTCUT CARDS
    shortcutGradient: {
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        // Subtle shadow for lift
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    shortcutCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background for gold gradient icons
        justifyContent: 'center',
        alignItems: 'center',
    },
    shortcutContent: {
        flex: 1,
    },
    shortcutTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText, // Default to dark text
        marginBottom: 4,
    },
    shortcutDescription: {
        fontSize: 12,
        color: COLORS.greyText, // Default to grey text
        fontWeight: '500',
    },
    // STATS SECTION
    statsSection: {
        marginTop: 24,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12, // Use gap for consistency
    },
    statCard: {
        width: '48%',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    statValue: {
        fontSize: 26,
        fontWeight: '700',
        // Color is overridden inline to use goldMid
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.greyText,
        fontWeight: '600',
        textAlign: 'center',
    },
});