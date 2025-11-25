import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Info, Award, Clock } from 'lucide-react-native';
import BottomNav from '@/components/BottomNav';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  greyText: '#707070',
  lightGrey: '#EAEAEA',
  red: '#FF3B30',
  green: '#4CAF50',
  blue: '#2196F3',
};

type NotificationType = 'success' | 'info' | 'badge' | 'reminder';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

const getNotificationMetadata = (type: NotificationType) => {
  switch (type) {
    case 'success': return { icon: Check, color: COLORS.green };
    case 'info': return { icon: Info, color: COLORS.blue };
    case 'badge': return { icon: Award, color: COLORS.goldAccent };
    case 'reminder': return { icon: Clock, color: COLORS.red };
    default: return { icon: Info, color: COLORS.greyText };
  }
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "just now";
};

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'success',
      title: 'Transfer Complete!',
      content: 'Your recent payment of $450 to Jane Doe has been processed.',
      timestamp: new Date(Date.now() - 30000),
      isRead: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Subscription Renewal Alert',
      content: 'Your premium membership is due for renewal tomorrow.',
      timestamp: new Date(Date.now() - 3600000),
      isRead: false,
    },
    {
      id: '3',
      type: 'badge',
      title: 'New Level Unlocked!',
      content: 'You reached Level 5! Claim your badge and reward now.',
      timestamp: new Date(Date.now() - 86400000 * 2),
      isRead: true,
    },
  ]);

  const handleTabPress = (path: string, tab: any) => {
    router.push(path as any);
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    const { icon: Icon, color } = getNotificationMetadata(item.type);
    return (
      <TouchableOpacity
        style={[styles.card, !item.isRead && styles.unreadCard]}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon color={color} size={24} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <Text style={styles.timeText}>{formatTimeAgo(item.timestamp)}</Text>
        </View>
        <Text style={styles.cardContent}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={COLORS.black} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <BottomNav activeTab="notifications" onTabPress={handleTabPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.goldAccent,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.greyText,
  },
  cardContent: {
    fontSize: 14,
    color: COLORS.greyText,
    lineHeight: 20,
    marginLeft: 32,
  },
});