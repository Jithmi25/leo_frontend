import React, { useState, useEffect } from 'react';
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
    ActivityIndicator,
    RefreshControl,
    FlatList,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { usersApi } from '@/services/api';

const { height } = Dimensions.get('window');

const COLORS = {
    black: '#1a1a1a',
    darkText: '#000000',
    brownDark: '#2d1b0c',
    goldDark: '#8b6f1d',
    goldMid: '#FFC72C',
    white: '#FFFFFF',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
};

interface District {
    id: string;
    name: string;
    postCount: number;
    engagementRate: number;
    leadingClubs: number;
    trend: string;
    memberCount: number;
}

interface Club {
    id: string;
    name: string;
    district: string;
    memberCount: number;
    postCount: number;
    postChange: number;
    engagementScore: number;
    engagementChange: number;
}

const DISTRICTS_LIST: District[] = [
    {
        id: '306D01',
        name: '306 D01 - Colombo East',
        postCount: 2450,
        engagementRate: 78.5,
        leadingClubs: 8,
        trend: '12+',
        memberCount: 450,
    },
    {
        id: '306D02',
        name: '306 D02 - Colombo West',
        postCount: 2180,
        engagementRate: 75.2,
        leadingClubs: 7,
        trend: '8+',
        memberCount: 380,
    },
    {
        id: '306D03',
        name: '306 D03 - Kandy',
        postCount: 1950,
        engagementRate: 72.1,
        leadingClubs: 6,
        trend: '5+',
        memberCount: 320,
    },
];

const CLUBS_LIST: Club[] = [
    {
        id: 'club-1',
        name: 'Colombo Evergreen Leo Club',
        district: '306D01',
        memberCount: 65,
        postCount: 340,
        postChange: 12,
        engagementScore: 89.5,
        engagementChange: 5.2,
    },
    {
        id: 'club-2',
        name: 'Ananda College Leo Club',
        district: '306D01',
        memberCount: 52,
        postCount: 298,
        postChange: 8,
        engagementScore: 85.3,
        engagementChange: 3.1,
    },
    {
        id: 'club-3',
        name: 'Dehiwala East Leo Club',
        district: '306D02',
        memberCount: 48,
        postCount: 265,
        postChange: 5,
        engagementScore: 82.1,
        engagementChange: 1.5,
    },
    {
        id: 'club-4',
        name: 'Kandy Central Leo Club',
        district: '306D03',
        memberCount: 42,
        postCount: 238,
        postChange: 3,
        engagementScore: 78.9,
        engagementChange: 0.8,
    },
    {
        id: 'club-5',
        name: 'Leo Club of Moratuwa',
        district: '306D02',
        memberCount: 38,
        postCount: 220,
        postChange: 2,
        engagementScore: 76.2,
        engagementChange: 1.5,
    },
    {
        id: 'club-6',
        name: 'Leo Club of Piliyandala',
        district: '306D02',
        memberCount: 35,
        postCount: 198,
        postChange: 0,
        engagementScore: 73.8,
        engagementChange: 0,
    },
];

export default function WMLeaderboardScreen() {
    const [districts, setDistricts] = useState<District[]>([]);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');

    useEffect(() => {
        fetchLeaderboard();
    }, [timeRange]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            
            // Uncomment when backend is ready
            // const leaderboardData = await usersApi.getLeaderboard({
            //     timeframe: timeRange,
            //     limit: 20
            // });
            // setDistricts(leaderboardData.districts);
            // setClubs(leaderboardData.clubs);
            
            // For now, use mock data with time range variations
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let mockDistricts: District[];
            let mockClubs: Club[];
            
            switch (timeRange) {
                case 'week':
                    mockDistricts = DISTRICTS_LIST.map(d => ({
                        ...d,
                        postCount: Math.floor(d.postCount * 0.2),
                        leadingClubs: Math.max(1, d.leadingClubs - 2),
                        trend: `${Math.floor(Math.random() * 5) + 1}+`,
                    }));
                    mockClubs = CLUBS_LIST.map(c => ({
                        ...c,
                        postCount: Math.floor(c.postCount * 0.15),
                        postChange: Math.floor(Math.random() * 8) - 2,
                        engagementChange: (Math.random() * 10) - 5,
                    }));
                    break;
                case 'month':
                    mockDistricts = DISTRICTS_LIST;
                    mockClubs = CLUBS_LIST;
                    break;
                case 'all':
                    mockDistricts = DISTRICTS_LIST.map(d => ({
                        ...d,
                        postCount: d.postCount * 12,
                        leadingClubs: d.leadingClubs + 3,
                        trend: '',
                    }));
                    mockClubs = CLUBS_LIST.map(c => ({
                        ...c,
                        postCount: c.postCount * 12,
                        postChange: 0,
                        engagementChange: 8.5,
                    }));
                    break;
                default:
                    mockDistricts = DISTRICTS_LIST;
                    mockClubs = CLUBS_LIST;
            }
            
            setDistricts(mockDistricts);
            setClubs(mockClubs);
            
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchLeaderboard();
    };

    const handleTimeRangeChange = (range: 'week' | 'month' | 'all') => {
        setTimeRange(range);
    };

    const renderDistrictCard = (district: District, index: number) => (
        <View key={district.id} style={styles.districtCard}>
            <View style={styles.districtRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.districtInfo}>
                <Text style={styles.districtName}>{district.name}</Text>
                <View style={styles.districtStats}>
                    <View style={styles.statBadge}>
                        <Text style={styles.statLabel}>Posts:</Text>
                        <Text style={styles.statValue}>{district.postCount}</Text>
                    </View>
                    <View style={styles.statBadge}>
                        <Text style={styles.statLabel}>Engagement:</Text>
                        <Text style={styles.statValue}>{district.engagementRate}%</Text>
                    </View>
                    {district.trend && (
                        <View style={[styles.statBadge, styles.trendBadge]}>
                            <Ionicons name="trending-up" size={14} color={COLORS.goldMid} />
                            <Text style={styles.trendText}>{district.trend}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    const renderClubCard = (club: Club) => (
        <TouchableOpacity key={club.id} style={styles.clubCard} activeOpacity={0.7}>
            <View style={styles.clubRank}>
                <Text style={styles.clubRankText}>{clubs.indexOf(club) + 1}</Text>
            </View>
            <View style={styles.clubContent}>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubSubtitle}>{club.district}</Text>
                <View style={styles.clubStats}>
                    <View style={styles.clubStatItem}>
                        <Ionicons name="people" size={14} color={COLORS.goldMid} />
                        <Text style={styles.clubStatText}>{club.memberCount} members</Text>
                    </View>
                    <View style={styles.clubStatItem}>
                        <Ionicons name="chatbubbles" size={14} color={COLORS.goldMid} />
                        <Text style={styles.clubStatText}>{club.postCount} posts</Text>
                    </View>
                    <View style={styles.clubStatItem}>
                        <Ionicons name="flame" size={14} color={COLORS.goldMid} />
                        <Text style={styles.clubStatText}>{club.engagementScore}%</Text>
                    </View>
                </View>
                {club.postChange !== 0 && (
                    <View style={[styles.changeIndicator, club.postChange > 0 && styles.positiveChange]}>
                        <Ionicons 
                            name={club.postChange > 0 ? "arrow-up" : "arrow-down"} 
                            size={12} 
                            color={club.postChange > 0 ? '#4CAF50' : COLORS.red} 
                        />
                        <Text style={[
                            styles.changeText,
                            club.postChange > 0 && styles.positiveChangeText
                        ]}>
                            {Math.abs(club.postChange)} posts
                        </Text>
                    </View>
                )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.greyText} />
        </TouchableOpacity>
    );

    if (loading && districts.length === 0) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <LinearGradient
                    colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.fullScreen}
                >
                    <SafeAreaView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.goldMid} />
                        <Text style={styles.loadingText}>Loading leaderboard...</Text>
                    </SafeAreaView>
                </LinearGradient>
            </View>
        );
    }

    const timeLabel = timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'All Time';

    return (
        <LinearGradient
            colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* --- TOP SECTION (Scrolls away) --- */}
                <SafeAreaView>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Leaderboard</Text>
                        <View style={styles.timeRangeContainer}>
                            {(['week', 'month', 'all'] as const).map(range => (
                                <TouchableOpacity
                                    key={range}
                                    style={[
                                        styles.timeRangeButton,
                                        timeRange === range && styles.timeRangeButtonActive
                                    ]}
                                    onPress={() => handleTimeRangeChange(range)}
                                >
                                    <Text style={[
                                        styles.timeRangeText,
                                        timeRange === range && styles.timeRangeTextActive
                                    ]}>
                                        {range === 'week' ? 'W' : range === 'month' ? 'M' : 'A'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.headerTitle}>Leader Board</Text>
                        {/* Placeholder for symmetry or extra icon */}
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Districts Section Header */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Districts</Text>
                        <Text style={styles.sectionSubtitle}>{timeLabel}</Text>
                    </View>

                    {/* Districts List */}
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.districtsScroll}
                    >
                        {districts.map((district, idx) => renderDistrictCard(district, idx))}
                    </ScrollView>
                    {/* Districts List (Top Section) */}
                    <View style={styles.districtsList}>
                        {DISTRICTS_LIST.map(renderDistrictRow)}
                    </View>
                </SafeAreaView>

            </ScrollView>

            {/* Clubs Section */}
            <ScrollView
                style={styles.clubsSection}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.clubsContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.goldMid]}
                    />
                }
            >
                {/* Clubs List Header */}
                <View style={styles.clubsHeader}>
                    <Text style={styles.clubsTitle}>Top Performing Clubs</Text>
                    <Text style={styles.timeRangeLabel}>{timeLabel}</Text>
                </View>

                {clubs.map(renderClubCard)}

                <View style={{ height: 20 }} />
                {/* --- BOTTOM SECTION (White Card) --- */}
                {/* This card is inside the ScrollView, so it pushes up as you scroll */}
                <View style={styles.whiteCard}>
                    <Text style={styles.sectionTitle}>All Clubs</Text>
                    
                    {CLUBS_LIST.map(renderClubCard)}

                    {/* Load More Indicator */}
                    <TouchableOpacity style={styles.loadMoreButton}>
                        <Ionicons name="chevron-down" size={24} color={COLORS.darkText} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    fullScreen: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    scrollContent: {
        flexGrow: 1,
    },
    // HEADER
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.goldMid,
        textAlign: 'center',
    },
    timeRangeContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    timeRangeButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    timeRangeButtonActive: {
        backgroundColor: COLORS.goldMid,
    },
    timeRangeText: {
        fontSize: 12,
        color: COLORS.white,
        fontWeight: '700',
    },
    timeRangeTextActive: {
        color: COLORS.black,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 2,
    },
    districtsScroll: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    // PODIUM
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
    // DISTRICT LIST (In Top Section)
    districtsList: {
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 30, // Space before the white card starts
    },
    districtRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent or stick to lightGrey
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    districtCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 4,
        minWidth: 280,
        borderWidth: 1,
        borderColor: 'rgba(255, 199, 44, 0.3)',
    },
    districtRank: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.goldMid,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
    },
    districtInfo: {
        flex: 1,
    },
    districtName: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 8,
    },
    districtStats: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    statLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    statValue: {
        fontSize: 11,
        color: COLORS.goldMid,
        fontWeight: '700',
    },
    trendBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    trendText: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: '700',
    },
    clubsSection: {
        flex: 1,
    },
    clubsContent: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    clubsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    clubsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    timeRangeLabel: {
        fontSize: 12,
        color: COLORS.greyText,
        fontStyle: 'italic',
    },
    // WHITE CARD SECTION
    whiteCard: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 24,
        minHeight: height * 0.6, // Ensures it takes up meaningful space even if empty
        paddingBottom: 100, // Extra padding at bottom for scrolling feel
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 16,
        marginLeft: 4,
    },
    clubCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    clubRank: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.goldMid,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    clubRankText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.black,
    },
    clubContent: {
        flex: 1,
    },
    clubName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    clubSubtitle: {
        fontSize: 12,
        color: COLORS.greyText,
        marginTop: 2,
    },
    clubStats: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    clubStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    clubStatText: {
        fontSize: 11,
        color: COLORS.greyText,
    },
    changeIndicator: {
        marginTop: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#ffebee',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    positiveChange: {
        backgroundColor: '#e8f5e9',
    },
    changeText: {
        fontSize: 11,
        color: COLORS.red,
        fontWeight: '600',
    },
    positiveChangeText: {
        color: '#4CAF50',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.white,
    },
    loadMoreButton: {
        alignSelf: 'center',
        padding: 12,
        marginTop: 8,
    },
});

