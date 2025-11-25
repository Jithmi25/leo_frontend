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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    borderGrey: '#E0E0E0',
};

interface Notification {
    id: string;
    type: 'tag' | 'comment' | 'poll';
    emoji: string;
    message: string;
    timestamp: string;
    actionText: string;
    actionType: string;
}

// Placeholder data - will be fetched from backend
const NOTIFICATIONS_DATA: Notification[] = [
    {
        id: '1',
        type: 'tag',
        emoji: '🏷️',
        message: 'You were tagged in "Green Horizon 2025", Colombo Central',
        timestamp: '2h ago',
        actionText: 'View Post',
        actionType: 'post',
    },
    {
        id: '2',
        type: 'comment',
        emoji: '💬',
        message: 'Leo Nimal commented on your post : "Grate job leading this!"',
        timestamp: '2m ago',
        actionText: 'View comment',
        actionType: 'comment',
    },
    {
        id: '3',
        type: 'poll',
        emoji: '📊',
        message: 'New poll: "Should we host a Leo leaders\' workshop in Kandy?"',
        timestamp: 'Agree/Disagree',
        actionText: 'View poll',
        actionType: 'poll',
    },
    {
        id: '4',
        type: 'tag',
        emoji: '🏷️',
        message: 'You were tagged in "Project Launch: Q4 Strategy Session."',
        timestamp: '5h ago',
        actionText: 'View Post',
        actionType: 'post',
    },
    {
        id: '5',
        type: 'poll',
        emoji: '📊',
        message: 'New Poll: "Should we run a follow-up survey for Week 8 participants?"',
        timestamp: 'Agree/Disagree',
        actionText: 'View poll',
        actionType: 'poll',
    },
    {
        id: '6',
        type: 'comment',
        emoji: '💬',
        message: 'Alex Chen commented on your post: "The participant growth is fantastic!"',
        timestamp: '6h ago',
        actionText: 'View comment',
        actionType: 'comment',
    },
];

export default function WMNotificationsScreen() {
    const handleSeeAll = () => {
        console.log('See all notifications');
        // TODO: Implement see all notifications
    };

    const handleNotificationAction = (notification: Notification) => {
        console.log('Handle notification action:', notification.actionType, notification.id);
        // TODO: Navigate to respective screen based on action type
    };

    const renderNotificationCard = (notification: Notification) => (
        <TouchableOpacity
            key={notification.id}
            style={styles.notificationCard}
            onPress={() => handleNotificationAction(notification)}
        >
            <View style={styles.notificationContent}>
                <Text style={styles.notificationEmoji}>{notification.emoji}</Text>
                <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <View style={styles.notificationFooter}>
                        <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
                        <View style={styles.actionContainer}>
                            <View style={styles.actionDot} />
                            <Text style={styles.actionText}>{notification.actionText}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={handleSeeAll} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.greyText} />
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {NOTIFICATIONS_DATA.map(renderNotificationCard)}
                <View style={{ height: 20 }} />
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.darkText,
        flex: 1,
        marginLeft: 12,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 15,
        color: COLORS.greyText,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    notificationCard: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    notificationContent: {
        flexDirection: 'row',
        gap: 12,
    },
    notificationEmoji: {
        fontSize: 24,
    },
    notificationText: {
        flex: 1,
    },
    notificationMessage: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.darkText,
        lineHeight: 22,
        marginBottom: 8,
    },
    notificationFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationTimestamp: {
        fontSize: 13,
        color: COLORS.greyText,
        fontStyle: 'italic',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.greyText,
    },
    actionText: {
        fontSize: 13,
        color: COLORS.greyText,
        fontStyle: 'italic',
    },
});
