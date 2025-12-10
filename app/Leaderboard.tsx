import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    SafeAreaView, // FIX 1: Ensure SafeAreaView is imported
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import BottomNav from '@/components/BottomNav'; 

// --- Types and Constants ---
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';
const EXPO_ROUTER_PATHS: Record<TabName, string> = {
    home: '/Feeds/NationalFeed',
    shop: '/Shopping/Marketplace',
    leaderboard: '/customScreens/Leaderboard',
    notifications: '/Feeds/Notification',
    events: '/Events/UpcomingEvent',
};

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F0F0F0',
    goldAccent: '#FFC80A',
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

const TOP_3_CLUBS: TopClub[] = [
    { position: 1, name: 'Leo District 306 A2', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' }, 
    { position: 2, name: 'Leo District 306 D11', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' }, 
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
        <View style={[styles.positionBadge, rankStyle]}>
            <Text style={styles.positionText}>{club.position}</Text>
        </View>
        <Image
            source={{ uri: club.logoUri }}
            style={[styles.podiumLogo, sizeStyle]}
        />
    </TouchableOpacity>
);

export default function LeaderboardScreen() {
    const [activeTab, setActiveTab] = useState<TabName>('leaderboard');

    const handleTabPress = (path: string, tab: TabName) => {
        const navigationPath = EXPO_ROUTER_PATHS[tab];
        if (navigationPath && tab !== activeTab) {
            router.push(navigationPath as any); 
        }
        setActiveTab(tab);
    };
    
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
        // FIX 2: Use SafeAreaView as the root with Black background (for the top notch area)
        <SafeAreaView style={styles.safeArea}>
            {/* FIX 3: Clean StatusBar without transparency hacks */}
            <StatusBar barStyle="light-content" />

            {/* FIX 4: Wrapper View with White background for the main content */}
            <View style={styles.container}>
                
                {/* Top Section with Gradient */}
                <LinearGradient
                    colors={[COLORS.black, '#3D3A2E', COLORS.goldDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.topSection}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={28} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Leader Board</Text>
                    </View>

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
                <View style={styles.rankingsCard}>
                    <FlatList
                        data={CLUBS_DATA}
                        renderItem={renderClubItem}
                        keyExtractor={(item) => item.rank.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        scrollEnabled={true} 
                    />
                </View>

                {/* Integrated BottomNav */}
                <View style={styles.bottomNavContainer}>
                    <BottomNav 
                        activeTab={activeTab} 
                        onTabPress={handleTabPress} 
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // FIX 5: Updated safeArea style to handle the top notch background
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.black, // Matches the top gradient
        paddingTop: 5, // Small manual adjustment
    },
    // FIX 6: Updated container to handle the white background for the bottom
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
        alignItems: 'flex-end', 
        paddingHorizontal: 20,
        marginTop: 20,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    
    // --- Podium Positioning ---
    podiumFirst: {
        marginBottom: 0, 
    },
    podiumSecond: {
        marginBottom: 20, 
    },
    podiumThird: {
        marginBottom: 20, 
    },
    
    positionBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, 
        position: 'absolute', 
        top: -16, 
    },
    firstBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    secondBadge: {},
    thirdBadge: {},
    positionText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.white,
    },

    // --- Logo Styles ---
    podiumLogo: {
        backgroundColor: COLORS.redCircle,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.white,
        resizeMode: 'contain', 
    },
    firstLogo: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    secondLogo: {},
    thirdLogo: {},
    
    rankingsCard: {
        flex: 1, 
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
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
        zIndex: 100, 
    },
});