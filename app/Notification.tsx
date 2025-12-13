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
} from 'react-native';
// ⚠️ Updated to use lucide-react-native icons for consistency with BottomNav
import { ArrowLeft, ChevronDown } from 'lucide-react-native';

// Import the new BottomNav component (assuming it's in './BottomNav')
import BottomNav from '@/components/BottomNav';

// Define the TabName type from BottomNav.tsx
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C', // Used as primary accent in the old Notifications screen
    darkText: '#000000',
    greyText: '#999999',
    lightBg: '#F8F8F8',
    borderGold: '#FFD700',
    // Aligning colors with BottomNav.tsx's internal constants
    goldAccent: '#FFC80A', 
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
    // 1. State for active tab, defaulting to 'notifications'
    const [activeTab, setActiveTab] = useState<TabName>('notifications');

    const handleSeeAll = () => {
        console.log('See all notifications');
    };

    // 2. Tab Press Handler: Navigates using Expo Router and updates the state
    const handleTabPress = (path: string, tab: TabName) => {
        if (path && tab !== activeTab) {
            router.push(path as any); // Enabled navigation with type casting to bypass Expo Router's strict typing
        }
        setActiveTab(tab);
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
                        {/* Updated Icon */}
                        <ArrowLeft size={28} color={COLORS.goldMid} /> 
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                    {/* Updated Icon */}
                    <ChevronDown size={18} color={COLORS.greyText} /> 
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

            {/* 3. Integrated BottomNav */}
            <View style={styles.bottomNavContainer}>
                <BottomNav 
                    activeTab={activeTab} 
                    onTabPress={handleTabPress} 
                />
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
        // Ensure there is enough padding at the bottom for the fixed BottomNav
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
    // New container to hold the BottomNav in a fixed position
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // The SafeAreaView in the parent handles the bottom inset, but this view ensures
        // the BottomNav component itself is rendered correctly at the very bottom.
    },
});
