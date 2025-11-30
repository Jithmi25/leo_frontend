import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// NOTE: You must replace '@/components/BottomNav' with the actual path to your BottomNav file.
import BottomNav from '@/components/BottomNav'; 

// --- START: Types and Constants copied from BottomNav for compilation ---
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';
const EXPO_ROUTER_PATHS: Record<TabName, string> = {
    home: '/Feeds/NationalFeed',
    shop: '/Shopping/Marketplace',
    leaderboard: '/customScreens/Leaderboard',
    notifications: '/Feeds/Notification',
    events: '/Events/UpcomingEvent',
};
// --- END: Types and Constants ---

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F0F0F0',
    goldAccent: '#FFC80A',
    // Added for the red circle color from the image:
    redCircle: '#8B0000', 
};

interface TopClub {
    position: number;
    name: string;
    logoUri: string;
}

interface Club {
    rank: number;
    name: string;
    logoUri: string;
}

// Updated TOP_3_CLUBS to match image text and colors
const TOP_3_CLUBS: TopClub[] = [
    // Position 1 (Center) - Red Circle, Gold Badge
    { position: 1, name: 'Leo District 306 A2', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' }, 
    // Position 2 (Left) - Red Circle, Gold Badge
    { position: 2, name: 'Leo District 306 D11', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' }, 
    // Position 3 (Right) - Red Circle, Gold Badge
    { position: 3, name: 'Leo District 306 D01', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' }, 
];

const CLUBS_DATA: Club[] = [
    { rank: 1, name: 'Leo Club of Colombo Evergreen', logoUri: 'https://placehold.co/40x40/2D5F3F/FFF?text=CE' },
    { rank: 2, name: 'Leo Club of Ananda College', logoUri: 'https://placehold.co/40x40/8B0000/FFF?text=AC' },
    { rank: 3, name: 'Leo Club of Dehiwala East', logoUri: 'https://placehold.co/40x40/708090/FFF?text=DE' },
    { rank: 4, name: 'Leo Club of Royal Achievers', logoUri: 'https://placehold.co/40x40/1E90FF/FFF?text=RA' },
    { rank: 5, name: 'Leo Club of Chundinuli Girls College', logoUri: 'https://placehold.co/40x40/708090/FFF?text=CG' },
    { rank: 6, name: 'Leo Club of University of Peradeniya', logoUri: 'https://placehold.co/40x40/FFD700/000?text=UP' },
    { rank: 7, name: 'Leo Club of Pepiliyana Woodlands', logoUri: 'https://placehold.co/40x40/4682B4/FFF?text=PW' },
    { rank: 8, name: 'Leo Club of Moratuwa', logoUri: 'https://placehold.co/40x40/1E90FF/FFF?text=M' },
    { rank: 9, name: 'Leo Club of Jaffna City', logoUri: 'https://placehold.co/40x40/DAA520/000?text=JC' },
    { rank: 10, name: 'Leo Club of Kandy', logoUri: 'https://placehold.co/40x40/4682B4/FFF?text=K' },
];

// --- NEW PODIUM COMPONENT ---
interface PodiumPlaceProps {
    club: TopClub;
    sizeStyle: any;
    rankStyle: any;
    containerStyle: any;
}

const PodiumPlace = ({ club, sizeStyle, rankStyle, containerStyle }: PodiumPlaceProps) => (
    <TouchableOpacity
        style={[styles.podiumItem, containerStyle]}
        onPress={() => router.push('/Community/Community')}
    >
        {/* Position Badge */}
        <View style={[styles.positionBadge, rankStyle]}>
            <Text style={styles.positionText}>{club.position}</Text>
        </View>

        {/* Logo (The Red Circle with "A2" text) */}
        <Image
            source={{ uri: club.logoUri }}
            style={[styles.podiumLogo, sizeStyle]}
        />
    </TouchableOpacity>
);
// ----------------------------

export default function LeaderboardScreen() {
    // 1. State for active tab, defaulting to 'leaderboard'
    const [activeTab, setActiveTab] = useState<TabName>('leaderboard');

    // 2. Tab Press Handler: Navigates using Expo Router and updates the state
    const handleTabPress = (path: string, tab: TabName) => {
        const navigationPath = EXPO_ROUTER_PATHS[tab];
        if (navigationPath && tab !== activeTab) {
            router.push(navigationPath as any); 
        }
        setActiveTab(tab);
    };
    
    // Helper to find data by position (1, 2, or 3)
    const getTopClub = (position: 1 | 2 | 3) => TOP_3_CLUBS.find(club => club.position === position);

    const renderClubItem = ({ item }: { item: Club }) => (
        <View style={styles.clubRow}>
            <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{item.rank}</Text>
            </View>
            <Text style={styles.clubName}>{item.name}</Text>
            <View style={[styles.clubLogoContainer, { backgroundColor: item.rank === 1 ? COLORS.goldMid : COLORS.greyText }]}>
                <Image source={{ uri: item.logoUri }} style={styles.clubLogo} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Top Section with Gradient */}
            <LinearGradient
                colors={[COLORS.black, '#3D3A2E', COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topSection}
            >
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Leader Board</Text>
                    </View>
                </SafeAreaView>

                {/* Top 3 Podium */}
                <View style={styles.podiumContainer}>
                    
                    {/* Position 2 - Left */}
                    <PodiumPlace 
                        club={getTopClub(2)!} 
                        sizeStyle={styles.secondLogo} 
                        rankStyle={styles.secondBadge} 
                        containerStyle={styles.podiumSecond}
                    />


                    {/* Position 1 - Center */}
                    <PodiumPlace 
                        club={getTopClub(1)!} 
                        sizeStyle={styles.firstLogo} 
                        rankStyle={styles.firstBadge} 
                        containerStyle={styles.podiumFirst}
                    />


                    {/* Position 3 - Right */}
                    <PodiumPlace 
                        club={getTopClub(3)!} 
                        sizeStyle={styles.thirdLogo} 
                        rankStyle={styles.thirdBadge} 
                        containerStyle={styles.podiumThird}
                    />

                </View>
            </LinearGradient>

            {/* Bottom Rankings Card */}
            {/* Changed TouchableOpacity wrapping FlatList to View, as scrolling content 
                should not be wrapped in a navigation button. Added a separate touchable 
                area if navigation is required. For now, removed external touchable. */}
            <View style={styles.rankingsCard}>
                <FlatList
                    data={CLUBS_DATA}
                    renderItem={renderClubItem}
                    keyExtractor={(item) => item.rank.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    scrollEnabled={true} // Ensure scrolling is enabled inside this view
                />
            </View>


            {/* 3. Integrated BottomNav */}
            <View style={styles.bottomNavContainer}>
                <BottomNav 
                    activeTab={activeTab} 
                    onTabPress={handleTabPress} 
                />
            </View>
        </View>
    );
}

// ----------------------------------------------------------------------
// --- STYLES ---
// ----------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        marginLeft: 16,
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end', // Aligns items to the bottom baseline
        paddingHorizontal: 20,
        marginTop: 20,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    
    // --- Podium Positioning (Height Difference) ---
    podiumFirst: {
        marginBottom: 0, // Sits highest
    },
    podiumSecond: {
        marginBottom: 20, // Sits lower
    },
    podiumThird: {
        marginBottom: 20, // Sits lower
    },
    // ---------------------------------------------
    
    positionBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // Absolute positioning to place it on top of the logo circle
        zIndex: 10, 
        position: 'absolute', 
        top: -16, // Adjusted to sit just above the circle's top edge
    },
    firstBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    secondBadge: {
        // No change
    },
    thirdBadge: {
        // No change
    },
    positionText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.white,
    },

    // --- Logo Styles (Size Difference) ---
    podiumLogo: {
        // Base style for all logos (Red circle from image)
        backgroundColor: COLORS.redCircle,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.white,
        // The image itself is the text "A2" with a transparent background in the placeholder URL
        resizeMode: 'contain', 
    },
    firstLogo: {
        // Largest for 1st place
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    secondLogo: {
        // No change, uses podiumLogo size
    },
    thirdLogo: {
        // No change, uses podiumLogo size
    },
    // ------------------------------------
    
    rankingsCard: {
        // Flex 1 to ensure it takes up the remaining space
        flex: 1, 
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        // Reduced bottom padding to account for the fixed BottomNav
        paddingBottom: 100, 
    },
    listContent: {
        paddingHorizontal: 20,
    },
    clubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    rankBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rankText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.white,
    },
    clubName: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    clubLogoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // Note: The logo in the list is an initial circle, using background color to simulate the placeholder
    },
    clubLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100, // Ensure it's on top of the scrollable content
    },
});