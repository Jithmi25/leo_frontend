import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UpcomingEventCard, { UpcomingEventData } from '@/components/UpCommingEventCard';
import BottomNav from '@/components/BottomNav';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  darkBackground: '#1C1C1E',
  darkText: '#EAEAEA',
  greyText: '#A0A0A0',
  olive: '#6B6B47',
  oliveLight: '#8B8B67',
};

const mockUpcomingEvents: UpcomingEventData[] = [
  {
    id: '1',
    title: 'Green Leo National Day',
    organization: 'Leo Club Colombo',
    date: '22nd November 2025',
    time: '9:00 AM – 2:00 PM',
    location: 'Viharamahadevi Park, Colombo',
    imageUrl: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg',
    badge: 'Counts Toward\nService Hours',
  },
  {
    id: '2',
    title: 'Leo National Green Wave',
    organization: 'Leo Club of Colombo',
    date: '25th November 2025',
    time: '9:00 AM – 2:00 PM',
    location: 'Independence Square',
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg',
    badge: 'Eligible for 5\nVolunteer Hours',
  },
];

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const DATES = [19, 20, 21, 22, 23];

// Define TabName to match BottomNav.tsx
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';

export default function UpcomingEvent() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(22);
  const [searchQuery, setSearchQuery] = useState('');

  // Updated to match BottomNav's onTabPress signature: (path: string, tab: TabName) => void
  const handleTabPress = (path: string, tab: TabName) => {
    router.push(path as any); // Cast to any to bypass strict typing
  };

  return (
    <LinearGradient
      colors={['#000000', '#2C2B29', COLORS.goldAccent]}
      locations={[0.0, 0.35, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event & Project</Text>
        <TouchableOpacity>
          <User color={COLORS.white} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContent}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Event Here..."
            placeholderTextColor={COLORS.greyText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Search color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.dateLabel}>November 20, 2025</Text>
        <Text style={styles.todayLabel}>TODAY</Text>

        <View style={styles.dateSelector}>
          {DATES.map((date, index) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateNumber,
                  selectedDate === date && styles.dateTextActive,
                ]}
              >
                {date}
              </Text>
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === date && styles.dateTextActive,
                ]}
              >
                {WEEKDAYS[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabSelector}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/app/Events/PastEvent' as any)}>
            <Text style={styles.tabText}>Past</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/app/Events/MyEvent' as any)}>
            <Text style={styles.tabText}>My Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.whiteCard}>
        <ScrollView
          style={styles.eventsContainer}
          contentContainerStyle={styles.eventsContent}
          showsVerticalScrollIndicator={false}
        >
          {mockUpcomingEvents.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </ScrollView>
      </View>

      <BottomNav activeTab="events" onTabPress={handleTabPress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: COLORS.goldAccent,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  dateLabel: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  todayLabel: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: COLORS.oliveLight,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    marginHorizontal: 4,
  },
  dateButtonActive: {
    borderColor: COLORS.goldAccent,
    backgroundColor: 'rgba(139, 139, 103, 0.8)',
  },
  dateNumber: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  dateDay: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '500',
  },
  dateTextActive: {
    color: COLORS.goldAccent,
  },
  tabSelector: {
    flexDirection: 'row',
    gap: 24,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.goldAccent,
    paddingBottom: 4,
  },
  tabTextActive: {
    color: COLORS.goldAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  tabText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  whiteCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  eventsContainer: {
    flex: 1,
  },
  eventsContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 100,
  },
});
