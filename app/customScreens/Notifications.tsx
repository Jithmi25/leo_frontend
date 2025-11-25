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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#999999',
    lightBg: '#F8F8F8',
    borderGold: '#FFD700',
};

interface Notification {
    id: string;
    title: string;
    description?: string;
    emoji: string;
    timestamp: Date;
}

const NOTIFICATIONS_DATA: Notification[] = [
    {
        id: '1',
        title: 'Profile Updated Successfully!',
        emoji: '✅',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
        id: '2',
        title: 'Verification Complete',
        description: 'Your Leo Membership is Now Confirmed.',
        emoji: '📋',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
        id: '3',
        title: 'Congrats!',
        description: 'You earned the District Officer Crest badge!',
        emoji: '🎉',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
        id: '4',
        title: 'Stay connected!',
        description: 'Turn on notifications to never miss a Leo update.',
        emoji: '📧',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
];

export default function NotificationsScreen() {
    const handleSeeAll = () => {
        console.log('See all notifications');
    };

    const renderNotificationItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity style={styles.notificationCard} activeOpacity={0.7}>
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                    {item.title} {item.emoji}
                </Text>
                {item.description && (
                    <Text style={styles.cardDescription}>{item.description}</Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-down" size={18} color={COLORS.greyText} />
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <FlatList
                data={NOTIFICATIONS_DATA}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="bag-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Shop</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="trophy-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Leaderboard</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
                    <Ionicons name="notifications" size={24} color={COLORS.goldMid} />
                    <Text style={[styles.navText, styles.navTextActive]}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="calendar-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Events</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.white,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.darkText,
        marginLeft: 12,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        fontSize: 16,
        color: COLORS.greyText,
        marginRight: 4,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    notificationCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 14,
        color: COLORS.greyText,
        lineHeight: 20,
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
        // Active state styling
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
