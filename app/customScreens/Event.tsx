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
    TextInput,
    ScrollView,
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
    greyText: '#999999',
    lightGrey: '#F5F5F5',
    borderGrey: '#E0E0E0',
    cardBg: '#F8F5F0',
};

const PROFILE_AVATAR = 'https://placehold.co/40x40/A088C3/FFF?text=U';

type TabType = 'upcoming' | 'past' | 'my_event';

interface DateItem {
    day: number;
    dayName: string;
}

interface Event {
    id: string;
    title: string;
    club: string;
    date: string;
    time: string;
    location: string;
    imageUri: string;
    badge?: string;
    badgeColor?: string;
    isCompleted?: boolean;
}

const DATES: DateItem[] = [
    { day: 19, dayName: 'MON' },
    { day: 20, dayName: 'TUE' },
    { day: 21, dayName: 'WED' },
    { day: 22, dayName: 'THU' },
    { day: 23, dayName: 'FRI' },
];

const UPCOMING_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Green Leo National Day',
        club: 'Leo club Colombo',
        date: '22nd November 2025',
        time: '9:00 AM - 2:00 PM',
        location: 'Viharamahadevi Park, Colombo',
        imageUri: 'https://placehold.co/120x120/4CAF50/FFF?text=Green',
        badge: 'Counts Toward\nService Hours',
        badgeColor: '#5A5A5A',
    },
    {
        id: '2',
        title: 'Leo National Green Wave',
        club: 'Leo Club of Colombo',
        date: '25th November 2025',
        time: '9:00 AM - 2:00 PM',
        location: 'Independence Square',
        imageUri: 'https://placehold.co/120x120/2196F3/FFF?text=Wave',
        badge: 'Eligible for 5\nVolunteer Hours',
        badgeColor: '#5A5A5A',
    },
];

const PAST_EVENTS: Event[] = [
    {
        id: '3',
        title: 'Community Beach Cleanup',
        club: 'Leo club Colombo',
        date: '15th November 2025',
        time: '8:00 AM - 12:00 PM',
        location: 'Mount Lavinia Beach',
        imageUri: 'https://placehold.co/120x120/00BCD4/FFF?text=Beach',
        badge: 'Completed',
        badgeColor: COLORS.goldMid,
    },
];

const MY_EVENTS: Event[] = [
    {
        id: '4',
        title: 'Digital Literacy Workshop',
        club: 'Leo club Colombo',
        date: '21st September 2025',
        time: '9:00 AM - 1:00 PM',
        location: 'Colombo Public Hall',
        imageUri: 'https://placehold.co/120x120/FF9800/FFF?text=Digital',
        badge: 'Completed',
        badgeColor: COLORS.goldMid,
        isCompleted: true,
    },
    {
        id: '5',
        title: "Elder's Home Visit",
        club: 'Leo club Colombo',
        date: '10th August 2025',
        time: '9:00 AM - 5:00 PM',
        location: "St. Mary's Elder's Home",
        imageUri: 'https://placehold.co/120x120/E91E63/FFF?text=Visit',
        badge: 'Completed',
        badgeColor: COLORS.goldMid,
        isCompleted: true,
    },
    {
        id: '6',
        title: 'Leadership Workshop',
        club: 'Leo club Colombo',
        date: '5th July 2025',
        time: '10:00 AM - 4:00 PM',
        location: 'Cinnamon Grand Hotel',
        imageUri: 'https://placehold.co/120x120/9C27B0/FFF?text=Lead',
        badge: 'Completed',
        badgeColor: COLORS.goldMid,
        isCompleted: true,
    },
];

export default function EventScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');
    const [selectedDate, setSelectedDate] = useState(22);
    const [searchQuery, setSearchQuery] = useState('');

    const getEventsForTab = () => {
        switch (activeTab) {
            case 'upcoming':
                return UPCOMING_EVENTS;
            case 'past':
                return PAST_EVENTS;
            case 'my_event':
                return MY_EVENTS;
            default:
                return [];
        }
    };

    const renderEventCard = (event: Event) => (
        <View style={styles.eventCard} key={event.id}>
            <Image source={{ uri: event.imageUri }} style={styles.eventImage} />
            {event.badge && (
                <View style={[styles.badge, { backgroundColor: event.badgeColor }]}>
                    <Text style={styles.badgeText}>{event.badge}</Text>
                </View>
            )}
            <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventClub}>{event.club}</Text>
                <View style={styles.eventMetaRow}>
                    <Ionicons name="calendar-outline" size={16} color={COLORS.greyText} />
                    <Text style={styles.eventMetaText}>{event.date}</Text>
                </View>
                <View style={styles.eventMetaRow}>
                    <Ionicons name="time-outline" size={16} color={COLORS.greyText} />
                    <Text style={styles.eventMetaText}>{event.time}</Text>
                </View>
                <View style={styles.eventMetaRow}>
                    <Ionicons name="location-outline" size={16} color={COLORS.greyText} />
                    <Text style={styles.eventMetaText}>{event.location}</Text>
                </View>

                {!event.isCompleted && (
                    <View style={styles.eventActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="people-outline" size={18} color={COLORS.darkText} />
                            <Text style={styles.actionButtonText}>Attend</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="share-outline" size={18} color={COLORS.darkText} />
                            <Text style={styles.actionButtonText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="notifications-outline" size={18} color={COLORS.darkText} />
                            <Text style={styles.actionButtonText}>Reminder</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LinearGradient
                colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientHeader}
            >
                <SafeAreaView>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Event & Project</Text>
                        <TouchableOpacity>
                            <Image source={{ uri: PROFILE_AVATAR }} style={styles.headerAvatar} />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search Event Here..."
                            placeholderTextColor={COLORS.greyText}
                        />
                        <TouchableOpacity style={styles.searchButton}>
                            <Ionicons name="search" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>

                    {/* Date Display */}
                    <View style={styles.dateDisplay}>
                        <Text style={styles.dateText}>November 20, 2025</Text>
                        <Text style={styles.todayText}>TODAY</Text>
                    </View>

                    {/* Date Selector */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateScrollContent}
                        style={styles.dateScroll}
                    >
                        {DATES.map((date) => (
                            <TouchableOpacity
                                key={date.day}
                                style={[
                                    styles.dateCard,
                                    selectedDate === date.day && styles.dateCardActive,
                                ]}
                                onPress={() => setSelectedDate(date.day)}
                            >
                                {selectedDate === date.day && <View style={styles.dateDot} />}
                                <Text style={styles.dateNumber}>{date.day}</Text>
                                <Text style={styles.dateName}>{date.dayName}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => setActiveTab('upcoming')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'upcoming' && styles.tabTextActive,
                                ]}
                            >
                                Upcoming
                            </Text>
                            {activeTab === 'upcoming' && <View style={styles.tabIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('past')}>
                            <Text
                                style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}
                            >
                                Past
                            </Text>
                            {activeTab === 'past' && <View style={styles.tabIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tab}
                            onPress={() => setActiveTab('my_event')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'my_event' && styles.tabTextActive,
                                ]}
                            >
                                My Event
                            </Text>
                            {activeTab === 'my_event' && <View style={styles.tabIndicator} />}
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* Events List */}
            <ScrollView
                style={styles.eventsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.eventsContent}
            >
                {getEventsForTab().map(renderEventCard)}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
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

                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.darkText} />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
                    <Ionicons name="calendar" size={24} color={COLORS.goldMid} />
                    <Text style={[styles.navText, styles.navTextActive]}>Events</Text>
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
    gradientHeader: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.darkText,
    },
    searchButton: {
        backgroundColor: COLORS.goldMid,
        borderRadius: 12,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateDisplay: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    dateText: {
        fontSize: 14,
        color: COLORS.white,
        marginBottom: 4,
    },
    todayText: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.white,
    },
    dateScroll: {
        marginBottom: 20,
    },
    dateScrollContent: {
        paddingHorizontal: 20,
        gap: 12,
    },
    dateCard: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        minWidth: 70,
        position: 'relative',
    },
    dateCardActive: {
        backgroundColor: 'rgba(255, 199, 44, 0.1)',
    },
    dateDot: {
        position: 'absolute',
        top: -8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.goldMid,
    },
    dateNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 4,
    },
    dateName: {
        fontSize: 12,
        color: COLORS.white,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    tab: {
        paddingVertical: 12,
        position: 'relative',
    },
    tabText: {
        fontSize: 16,
        color: COLORS.white,
        opacity: 0.6,
    },
    tabTextActive: {
        fontWeight: '600',
        opacity: 1,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: COLORS.goldMid,
        borderRadius: 2,
    },
    eventsContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    eventsContent: {
        padding: 16,
    },
    eventCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    badge: {
        position: 'absolute',
        left: 16,
        top: 90,
        backgroundColor: COLORS.darkText,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.white,
        textAlign: 'center',
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 4,
    },
    eventClub: {
        fontSize: 13,
        color: COLORS.greyText,
        marginBottom: 8,
    },
    eventMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },
    eventMetaText: {
        fontSize: 13,
        color: COLORS.greyText,
    },
    eventActions: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.darkText,
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
    navItemActive: {},
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
