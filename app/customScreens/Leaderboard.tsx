import React from 'react';
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

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#F0F0F0',
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
    { position: 1, name: 'Leo District 306 D11', logoUri: 'https://placehold.co/80x80/2D5F3F/FFF?text=D11' },
    { position: 2, name: 'Leo District 306 A2', logoUri: 'https://placehold.co/80x80/8B0000/FFF?text=A2' },
    { position: 3, name: 'Leo District 306 D01', logoUri: 'https://placehold.co/80x80/1E90FF/FFF?text=D01' },
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

export default function LeaderboardScreen() {
    const renderClubItem = ({ item }: { item: Club }) => (
        <View style={styles.clubRow}>
            <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{item.rank}</Text>
            </View>
            <Text style={styles.clubName}>{item.name}</Text>
            <Image source={{ uri: item.logoUri }} style={styles.clubLogo} />
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
                    <View style={[styles.podiumItem, styles.podiumSecond]}>
                        <View style={styles.positionBadge}>
                            <Text style={styles.positionText}>2</Text>
                        </View>
                        <Image
                            source={{ uri: TOP_3_CLUBS[1].logoUri }}
                            style={styles.podiumLogo}
                        />
                    </View>

                    {/* Position 1 - Center */}
                    <View style={[styles.podiumItem, styles.podiumFirst]}>
                        <View style={[styles.positionBadge, styles.firstBadge]}>
                            <Text style={styles.positionText}>1</Text>
                        </View>
                        <Image
                            source={{ uri: TOP_3_CLUBS[0].logoUri }}
                            style={[styles.podiumLogo, styles.firstLogo]}
                        />
                    </View>

                    {/* Position 3 - Right */}
                    <View style={[styles.podiumItem, styles.podiumThird]}>
                        <View style={styles.positionBadge}>
                            <Text style={styles.positionText}>3</Text>
                        </View>
                        <Image
                            source={{ uri: TOP_3_CLUBS[2].logoUri }}
                            style={styles.podiumLogo}
                        />
                    </View>
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
                />
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/customScreens/Marketplace')}
                >
                    <Ionicons name="bag-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Shop</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
                    <Ionicons name="trophy" size={24} color={COLORS.goldMid} />
                    <Text style={[styles.navText, styles.navTextActive]}>Leaderboard</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="calendar-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Events</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    podiumFirst: {
        marginBottom: 20,
    },
    podiumSecond: {
        marginBottom: 0,
    },
    podiumThird: {
        marginBottom: 0,
    },
    positionBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    firstBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    positionText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.white,
    },
    podiumLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.white,
    },
    firstLogo: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    rankingsCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 20,
        paddingBottom: 80,
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
    clubLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    navItemActive: {
        // Active state
    },
    navText: {
        fontSize: 11,
        color: COLORS.darkText,
        marginTop: 4,
    },
    navTextActive: {
        color: COLORS.goldMid,
        fontWeight: '600',
    },
});
