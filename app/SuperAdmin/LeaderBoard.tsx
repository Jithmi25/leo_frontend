import React from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    brownDark: '#3D3A2E',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#E8E8E8',
    greenTrend: '#4CAF50',
    redTrend: '#F44336',
};

interface District {
    rank: number;
    name: string;
    leadingClubs: number;
    trend: string;
    logoUri: string;
}

interface Club {
    rank: number;
    name: string;
    postChange: number;
    postCount: number;
    engagementChange: number;
    logoUri: string;
}

const TOP_DISTRICTS: District[] = [
    {
        rank: 1,
        name: 'Leo District 306 D03',
        leadingClubs: 3,
        trend: '3+',
        logoUri: 'https://placehold.co/80x80/00BCD4/FFF?text=D03',
    },
    {
        rank: 2,
        name: 'Leo District 306 D01',
        leadingClubs: 2,
        trend: '',
        logoUri: 'https://placehold.co/80x80/E91E63/FFF?text=D01',
    },
    {
        rank: 3,
        name: 'Leo District 306 D04',
        leadingClubs: 2,
        trend: '1+',
        logoUri: 'https://placehold.co/80x80/2196F3/FFF?text=D04',
    },
];

const DISTRICTS_LIST: District[] = [
    {
        rank: 1,
        name: 'Leo District 306 D03',
        leadingClubs: 3,
        trend: '3+',
        logoUri: 'https://placehold.co/60x60/00BCD4/FFF?text=D03',
    },
    {
        rank: 2,
        name: 'Leo District 306 D01',
        leadingClubs: 2,
        trend: '',
        logoUri: 'https://placehold.co/60x60/8B0000/FFF?text=D01',
    },
    {
        rank: 3,
        name: 'Leo District 306 D04',
        leadingClubs: 2,
        trend: '1+',
        logoUri: 'https://placehold.co/60x60/2196F3/FFF?text=D04',
    },
];

const CLUBS_LIST: Club[] = [
    {
        rank: 1,
        name: 'Leo Club of Colombo Evergreen',
        postChange: 1,
        postCount: 8,
        engagementChange: 4,
        logoUri: 'https://placehold.co/60x60/00BCD4/FFF?text=CE',
    },
    {
        rank: 2,
        name: 'Leo Club of Ananda College',
        postChange: -1,
        postCount: 5,
        engagementChange: -0.76,
        logoUri: 'https://placehold.co/60x60/8B0000/FFF?text=AC',
    },
    {
        rank: 3,
        name: 'Leo Club of Dehiwala East',
        postChange: -1,
        postCount: 4,
        engagementChange: -0.66,
        logoUri: 'https://placehold.co/60x60/00BCD4/FFF?text=DE',
    },
];

export default function WMLeaderboardScreen() {
    const renderDistrictRow = (district: District) => (
        <View style={styles.districtRow} key={district.rank}>
            <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{district.rank}</Text>
            </View>
            <View style={styles.districtInfo}>
                <Text style={styles.districtName}>{district.name}</Text>
                <Text style={styles.districtSubtext}>
                    With {district.leadingClubs} leading clubs
                </Text>
            </View>
            {district.trend && (
                <View style={styles.trendBadge}>
                    <Text style={styles.trendText}>{district.trend}</Text>
                    <Ionicons name="arrow-up" size={16} color={COLORS.greenTrend} />
                </View>
            )}
            <Image source={{ uri: district.logoUri }} style={styles.districtLogo} />
        </View>
    );

    const renderClubCard = (club: Club) => (
        <View style={styles.clubCard} key={club.rank}>
            <View style={styles.clubRankBadge}>
                <Text style={styles.clubRankText}>{club.rank}</Text>
            </View>
            <View style={styles.clubContent}>
                <View style={styles.clubHeader}>
                    <Text style={styles.clubName}>{club.name}</Text>
                    <Image source={{ uri: club.logoUri }} style={styles.clubLogo} />
                </View>
                <View style={styles.clubStats}>
                    <View style={styles.statItem}>
                        <Text
                            style={[
                                styles.statChange,
                                { color: club.postChange > 0 ? COLORS.greenTrend : COLORS.redTrend },
                            ]}
                        >
                            {club.postChange > 0 ? `${club.postChange}+` : `${Math.abs(club.postChange)}-`}
                        </Text>
                        <Ionicons
                            name={club.postChange > 0 ? 'arrow-up' : 'arrow-down'}
                            size={14}
                            color={club.postChange > 0 ? COLORS.greenTrend : COLORS.redTrend}
                        />
                    </View>
                    <View style={styles.statItem}>
                        <Text
                            style={[
                                styles.engagementChange,
                                { color: club.engagementChange > 0 ? COLORS.greenTrend : COLORS.redTrend },
                            ]}
                        >
                            {club.engagementChange > 0
                                ? `${club.engagementChange}%`
                                : `${Math.abs(club.engagementChange)}%`}
                        </Text>
                        <Ionicons
                            name={club.engagementChange > 0 ? 'arrow-up' : 'arrow-down'}
                            size={14}
                            color={club.engagementChange > 0 ? COLORS.greenTrend : COLORS.redTrend}
                        />
                    </View>
                </View>
                <View style={styles.clubDetails}>
                    <Text style={styles.postCount}>With {club.postCount} posts</Text>
                    <Text style={styles.engagementLabel}>Member Engagement</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LinearGradient
                colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topSection}
            >
                <SafeAreaView>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Leader Board</Text>
                    </View>

                    {/* Top 3 Podium */}
                    <View style={styles.podiumContainer}>
                        {/* Position 2 - Left */}
                        <View style={[styles.podiumItem, styles.podiumSecond]}>
                            <View style={styles.positionBadge}>
                                <Text style={styles.positionText}>2</Text>
                            </View>
                            <Image
                                source={{ uri: TOP_DISTRICTS[1].logoUri }}
                                style={styles.podiumLogo}
                            />
                        </View>

                        {/* Position 1 - Center */}
                        <View style={[styles.podiumItem, styles.podiumFirst]}>
                            <View style={[styles.positionBadge, styles.firstBadge]}>
                                <Text style={styles.positionText}>1</Text>
                            </View>
                            <Image
                                source={{ uri: TOP_DISTRICTS[0].logoUri }}
                                style={[styles.podiumLogo, styles.firstLogo]}
                            />
                        </View>

                        {/* Position 3 - Right */}
                        <View style={[styles.podiumItem, styles.podiumThird]}>
                            <View style={styles.positionBadge}>
                                <Text style={styles.positionText}>3</Text>
                            </View>
                            <Image
                                source={{ uri: TOP_DISTRICTS[2].logoUri }}
                                style={styles.podiumLogo}
                            />
                        </View>
                    </View>

                    {/* Districts List */}
                    <View style={styles.districtsList}>
                        {DISTRICTS_LIST.map(renderDistrictRow)}
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* Clubs Section */}
            <ScrollView
                style={styles.clubsSection}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.clubsContent}
            >
                {CLUBS_LIST.map(renderClubCard)}

                {/* Load More Indicator */}
                <TouchableOpacity style={styles.loadMoreButton}>
                    <Ionicons name="chevron-down" size={24} color={COLORS.darkText} />
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
        gap: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.white,
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    podiumItem: {
        alignItems: 'center',
        marginHorizontal: 12,
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
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    firstBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    positionText: {
        fontSize: 14,
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
    districtsList: {
        paddingHorizontal: 16,
        gap: 12,
    },
    districtRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 12,
    },
    rankBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.white,
    },
    districtInfo: {
        flex: 1,
    },
    districtName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 2,
    },
    districtSubtext: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    trendText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.greenTrend,
    },
    districtLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    clubsSection: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
    },
    clubsContent: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    clubCard: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        gap: 12,
    },
    clubRankBadge: {
        backgroundColor: COLORS.goldMid,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubRankText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.white,
    },
    clubContent: {
        flex: 1,
    },
    clubHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    clubName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.darkText,
        flex: 1,
    },
    clubLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    clubStats: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statChange: {
        fontSize: 14,
        fontWeight: '700',
    },
    engagementChange: {
        fontSize: 14,
        fontWeight: '700',
    },
    clubDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postCount: {
        fontSize: 13,
        fontStyle: 'italic',
        color: COLORS.darkText,
    },
    engagementLabel: {
        fontSize: 11,
        color: COLORS.greyText,
        fontStyle: 'italic',
    },
    loadMoreButton: {
        alignSelf: 'center',
        padding: 12,
    },
});
