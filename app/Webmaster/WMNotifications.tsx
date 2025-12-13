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
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { notificationsApi } from '@/services/api';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    red: '#E84A5F',
    lightGold: '#FFFBF0',
};

interface Notification {
    id: string;
    message: string;
    emoji: string;
    timestamp: string;
    isRead: boolean;
    actionType: 'post' | 'comment' | 'poll' | 'event' | 'other';
    actionText: string;
    postId?: string;
    commentId?: string;
}

const NOTIFICATIONS_DATA: Notification[] = [
    {
        id: '1',
        message: 'Your post "Digital Literacy Workshop" received 25 new likes',
        emoji: '',
        timestamp: '2 minutes ago',
        isRead: false,
        actionType: 'post',
        actionText: 'View Post',
        postId: 'post-1',
    },
    {
        id: '2',
        message: 'New comment on your event registration',
        emoji: '',
        timestamp: '1 hour ago',
        isRead: false,
        actionType: 'comment',
        actionText: 'View Comment',
        postId: 'post-2',
        commentId: 'comment-1',
    },
    {
        id: '3',
        message: 'Your poll "Best Leo Activity?" has 15 new responses',
        emoji: '',
        timestamp: '3 hours ago',
        isRead: true,
        actionType: 'poll',
        actionText: 'View Results',
    },
    {
        id: '4',
        message: 'Event "Community Cleanup" registration closed',
        emoji: '',
        timestamp: 'Yesterday',
        isRead: true,
        actionType: 'event',
        actionText: 'View Event',
    },
    {
        id: '5',
        message: 'New member joined your district community',
        emoji: '',
        timestamp: '2 days ago',
        isRead: true,
        actionType: 'other',
        actionText: 'View Profile',
    },
    {
        id: '6',
        message: 'Your post reached 100 members in the nation',
        emoji: '',
        timestamp: '3 days ago',
        isRead: true,
        actionType: 'post',
        actionText: 'View Stats',
    },
];

export default function WMNotificationsScreen() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            
            // Fetch from backend
            const response = await notificationsApi.getAllNotifications();
            
            setNotifications(response.data || NOTIFICATIONS_DATA);
            
            // Count unread notifications
            const unread = (response.data || []).filter((n: Notification) => !n.isRead).length;
            setUnreadCount(unread);
            
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Fallback to mock data
            setNotifications(NOTIFICATIONS_DATA);
            const unread = NOTIFICATIONS_DATA.filter(n => !n.isRead).length;
            setUnreadCount(unread);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            // Call backend API
            await notificationsApi.markAsRead(notificationId);
            
            // Update local state
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId ? { ...notif, isRead: true } : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
            
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            // Call backend API
            await notificationsApi.markAllAsRead();
            
            // Update local state
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, isRead: true }))
            );
            setUnreadCount(0);
            
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const handleDeleteNotification = async (notificationId: string) => {
        try {
            // Call backend API
            await notificationsApi.deleteNotification(notificationId);
            
            // Update local state
            setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
            
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchNotifications();
    };

    const handleNotificationAction = (notification: Notification) => {
        // Mark as read first
        if (!notification.isRead) {
            handleMarkAsRead(notification.id);
        }
        
        // Navigate based on action type
        switch (notification.actionType) {
            case 'post':
                console.log('Navigate to post:', notification.postId);
                break;
            case 'comment':
                console.log('Navigate to comment:', notification.commentId);
                break;
            case 'poll':
                console.log('Navigate to poll');
                router.push('/Webmaster/PollCreation');
                break;
            case 'event':
                console.log('Navigate to event');
                router.push('/Webmaster/EventCreation');
                break;
            default:
                console.log('Unknown action type:', notification.actionType);
        }
    };

    const renderNotificationCard = (notification: Notification) => (
        <TouchableOpacity
            key={notification.id}
            style={[styles.notificationCard, !notification.isRead && styles.unreadCard]}
            onPress={() => handleNotificationAction(notification)}
            activeOpacity={0.7}
        >
            <View style={styles.notificationContent}>
                <Text style={styles.notificationEmoji}>{notification.emoji}</Text>
                <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                        {notification.message}
                    </Text>
                    <View style={styles.notificationFooter}>
                        <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
                        <View style={styles.actionContainer}>
                            {!notification.isRead && <View style={styles.unreadDot} />}
                            <Text style={styles.actionText}>{notification.actionText}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => handleDeleteNotification(notification.id)}
                    hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                    <Ionicons name="trash-outline" size={18} color={COLORS.greyText} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading && notifications.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.goldMid} />
                    <Text style={styles.loadingText}>Loading notifications...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity 
                    style={styles.markAllButton}
                    onPress={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                    hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                    <Text style={[styles.markAllText, unreadCount === 0 && styles.markAllDisabled]}>
                        Mark all
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.goldMid]}
                    />
                }
            >
                {notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={64} color={COLORS.greyText} />
                        <Text style={styles.emptyTitle}>No notifications</Text>
                        <Text style={styles.emptySubtitle}>
                            You'\''re all caught up! New notifications will appear here.
                        </Text>
                    </View>
                ) : (
                    <>
                        {notifications.map(renderNotificationCard)}
                        <View style={{ height: 20 }} />
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
        backgroundColor: COLORS.white,
    },
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    unreadBadge: {
        backgroundColor: COLORS.goldMid,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },
    unreadBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.white,
    },
    markAllButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    markAllText: {
        fontSize: 12,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    markAllDisabled: {
        color: COLORS.borderGrey,
    },
    notificationCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    unreadCard: {
        borderColor: COLORS.goldMid,
        backgroundColor: COLORS.lightGold,
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    notificationEmoji: {
        fontSize: 32,
        marginRight: 12,
    },
    notificationText: {
        flex: 1,
    },
    notificationMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkText,
        lineHeight: 20,
    },
    notificationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    notificationTimestamp: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unreadDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.goldMid,
        marginRight: 6,
    },
    actionText: {
        fontSize: 12,
        color: COLORS.goldMid,
        fontWeight: '600',
    },
    menuButton: {
        padding: 8,
        marginLeft: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: COLORS.greyText,
    },
    emptyContainer: {
        paddingVertical: 60,
        paddingHorizontal: 40,
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: COLORS.greyText,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
