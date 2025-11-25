import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions,
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
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    chartBlue: '#4A90E2',
    chartGrey: '#D0D0D0',
};

const PROFILE_AVATAR = 'https://placehold.co/80x80/4A5568/FFF?text=AF';
const screenWidth = Dimensions.get('window').width;

export default function WMAdminScreen() {
    const [chartView, setChartView] = useState('this_week');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Admin Overview</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <LinearGradient
                    colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.profileCard}
                >
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Leo Amaala{'\n'}Fernando</Text>
                        <Text style={styles.profileRole}>Webmaster</Text>
                        <Text style={styles.profileDistrict}>Leo District 306 D1</Text>
                    </View>
                    <View style={styles.profileAvatarContainer}>
                        <Image source={{ uri: PROFILE_AVATAR }} style={styles.profileAvatar} />
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Quick Actions Grid */}
                <View style={styles.quickActionsGrid}>
                    <TouchableOpacity style={styles.actionCard}>
                        <View style={styles.actionHeader}>
                            <Text style={styles.actionTitle}>Post to Feed</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.goldMid} />
                        </View>
                        <View style={styles.postPreview}>
                            <Text style={styles.previewLabel}>Previous Post</Text>
                            <View style={styles.leoBadge}>
                                <Text style={styles.leoBadgeText}>LEO'S</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard}>
                        <Text style={styles.actionTitle}>Leader Role{'\n'}Management</Text>
                        <Image
                            source={{ uri: 'https://placehold.co/60x60/4A5568/FFF?text=LDR' }}
                            style={styles.actionIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard}>
                        <View style={styles.actionHeader}>
                            <Text style={styles.actionTitle}>Events &{'\n'}RSVP</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.goldMid} />
                        </View>
                        <View style={styles.eventPreview}>
                            <Text style={styles.previewLabel}>Recent Event</Text>
                            <Text style={styles.eventName}>Webinar</Text>
                            <Text style={styles.eventDetail}>Presentation</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCardDark}>
                        <Text style={styles.actionTitleWhite}>Create a New Poll</Text>
                        <View style={styles.pollPreview}>
                            <Text style={styles.previewLabelWhite}>Previous Poll</Text>
                            <Text style={styles.pollQuestion}>Are we ready</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Activity Log */}
                <TouchableOpacity style={styles.activityCard}>
                    <View style={styles.activityContent}>
                        <View>
                            <Text style={styles.activityTitle}>You were Logged in</Text>
                            <Text style={styles.activityTime}>3 minutes ago</Text>
                            <Text style={styles.activityLocation}>8 storehouse in Dehiwala</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={24} color={COLORS.goldMid} />
                    </View>
                </TouchableOpacity>

                {/* Leaderboard & Achievements */}
                <TouchableOpacity style={styles.leaderboardCard}>
                    <Ionicons name="trophy" size={40} color={COLORS.goldMid} />
                    <Text style={styles.leaderboardText}>Leaderboard &{'\n'}Achievements</Text>
                </TouchableOpacity>

                {/* Club Analysis */}
                <View style={styles.analysisSection}>
                    <View style={styles.analysisSectionHeader}>
                        <TouchableOpacity>
                            <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.sectionTitle}>Club Analysis</Text>
                        <Text style={styles.weekSelector}>This Week</Text>
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chartContainer}>
                        {/* Placeholder for line chart */}
                        <View style={styles.lineChart}>
                            <Text style={styles.chartPlaceholder}>📈 Activity Chart</Text>
                        </View>
                    </View>
                </View>

                {/* Poll Analysis */}
                <View style={styles.analysisSection}>
                    <View style={styles.analysisSectionHeader}>
                        <TouchableOpacity>
                            <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.sectionTitle}>Poll Analysis</Text>
                        <Text style={styles.weekSelector}>This Week</Text>
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chartContainer}>
                        {/* Placeholder for donut chart */}
                        <View style={styles.donutChart}>
                            <View style={styles.donutOuter}>
                                <View style={styles.donutInner} />
                            </View>
                            <View style={styles.chartLegend}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: COLORS.goldMid }]} />
                                    <Text style={styles.legendText}>Survey said</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: COLORS.chartGrey }]} />
                                    <Text style={styles.legendText}>Pending yet</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Post Impression Overview */}
                <View style={styles.analysisSection}>
                    <View style={styles.analysisSectionHeader}>
                        <TouchableOpacity>
                            <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.sectionTitle}>Post Impression Overview</Text>
                        <Text style={styles.weekSelector}>This Week</Text>
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chartContainer}>
                        {/* Placeholder for bar chart */}
                        <View style={styles.barChart}>
                            <View style={styles.bars}>
                                <View style={[styles.bar, { height: 40, backgroundColor: COLORS.chartGrey }]} />
                                <View style={[styles.bar, { height: 80, backgroundColor: COLORS.goldMid }]} />
                                <View style={[styles.bar, { height: 100, backgroundColor: COLORS.black }]} />
                                <View style={[styles.bar, { height: 60, backgroundColor: COLORS.chartGrey }]} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Post Navigation */}
                <View style={styles.postNavigation}>
                    <TouchableOpacity style={styles.navButton}>
                        <Ionicons name="chevron-back" size={20} color={COLORS.goldMid} />
                        <View style={styles.navButtonContent}>
                            <Text style={styles.navButtonLabel}>Previous{'\n'}Post</Text>
                            <View style={styles.navPostPreview}>
                                <View style={styles.leoBadgeSmall}>
                                    <Text style={styles.leoBadgeTextSmall}>LEO'S</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton}>
                        <View style={styles.navButtonContent}>
                            <Text style={[styles.navButtonLabel, { textAlign: 'right' }]}>
                                Next{'\n'}Post
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={COLORS.goldMid} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        margin: 16,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 8,
    },
    profileRole: {
        fontSize: 14,
        color: COLORS.white,
        marginBottom: 4,
    },
    profileDistrict: {
        fontSize: 12,
        color: COLORS.lightGrey,
    },
    profileAvatarContainer: {
        alignItems: 'center',
    },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
    },
    editButton: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 12,
    },
    editButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    actionCard: {
        width: (screenWidth - 44) / 2,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        minHeight: 120,
    },
    actionCardDark: {
        width: (screenWidth - 44) / 2,
        backgroundColor: COLORS.black,
        borderRadius: 12,
        padding: 16,
        minHeight: 120,
    },
    actionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    actionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.darkText,
        flex: 1,
    },
    actionTitleWhite: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 8,
    },
    actionIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 8,
    },
    postPreview: {
        marginTop: 8,
    },
    previewLabel: {
        fontSize: 10,
        color: COLORS.greyText,
        marginBottom: 4,
    },
    previewLabelWhite: {
        fontSize: 10,
        color: COLORS.lightGrey,
        marginBottom: 4,
    },
    leoBadge: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    leoBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.black,
    },
    eventPreview: {
        marginTop: 8,
    },
    eventName: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    eventDetail: {
        fontSize: 11,
        color: COLORS.greyText,
    },
    pollPreview: {
        marginTop: 8,
    },
    pollQuestion: {
        fontSize: 11,
        color: COLORS.white,
    },
    activityCard: {
        margin: 16,
        marginTop: 8,
        backgroundColor: COLORS.black,
        borderRadius: 12,
        padding: 16,
    },
    activityContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 4,
    },
    activityTime: {
        fontSize: 12,
        color: COLORS.lightGrey,
        marginBottom: 2,
    },
    activityLocation: {
        fontSize: 11,
        color: COLORS.greyText,
    },
    leaderboardCard: {
        margin: 16,
        marginTop: 8,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    leaderboardText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    analysisSection: {
        marginHorizontal: 16,
        marginBottom: 20,
    },
    analysisSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
        flex: 1,
    },
    weekSelector: {
        fontSize: 13,
        color: COLORS.greyText,
    },
    chartContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    lineChart: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartPlaceholder: {
        fontSize: 24,
        color: COLORS.greyText,
    },
    donutChart: {
        alignItems: 'center',
    },
    donutOuter: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.goldMid,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    donutInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
    },
    chartLegend: {
        flexDirection: 'row',
        gap: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    barChart: {
        height: 120,
        justifyContent: 'flex-end',
    },
    bars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 100,
    },
    bar: {
        width: 40,
        borderRadius: 4,
    },
    postNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        gap: 12,
    },
    navButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.black,
        borderRadius: 12,
        padding: 12,
        gap: 8,
    },
    navButtonContent: {
        flex: 1,
    },
    navButtonLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.white,
        marginBottom: 8,
    },
    navPostPreview: {
        flexDirection: 'row',
    },
    leoBadgeSmall: {
        backgroundColor: COLORS.goldMid,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    leoBadgeTextSmall: {
        fontSize: 9,
        fontWeight: '700',
        color: COLORS.black,
    },
});
