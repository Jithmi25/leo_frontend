import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#666666',
    lightGrey: '#F5F5F5',
    beige: '#F8F5F0',
    borderGrey: '#E0E0E0',
    greenBadge: '#4CAF50',
};

interface EventRegistration {
    id: string;
    title: string;
    club: string;
    date: string;
    time: string;
    location: string;
    imageUri: string;
    newRegistrations: number;
}

const EVENTS_DATA: EventRegistration[] = [
    {
        id: '1',
        title: 'Digital Literacy Workshop',
        club: 'Leo club Colombo',
        date: '21st September 2025',
        time: '9:00 AM - 1:00 PM',
        location: 'Colombo Public Hall',
        imageUri: 'https://placehold.co/120x120/FF9800/FFF?text=Digital',
        newRegistrations: 98,
    },
    {
        id: '2',
        title: "Elder's Home Visit",
        club: 'Leo club Colombo',
        date: '10th August 2025',
        time: '9:00 AM - 5:00 PM',
        location: "St. Mary's Elder's Home",
        imageUri: 'https://placehold.co/120x120/E91E63/FFF?text=Visit',
        newRegistrations: 23,
    },
];

export default function EventRegistrationScreen() {
    const [analysisView, setAnalysisView] = useState('this_week');

    const handleSeeAll = () => {
        console.log('See all events');
        // TODO: Navigate to all events list
    };

    const handleViewRegistrations = (eventId: string) => {
        console.log('View registrations for event:', eventId);
        // TODO: Navigate to registration details
    };

    const renderEventCard = (event: EventRegistration) => (
        <View style={styles.eventCard} key={event.id}>
            <Image source={{ uri: event.imageUri }} style={styles.eventImage} />
            <View style={styles.registrationBadge}>
                <Text style={styles.badgeNumber}>{event.newRegistrations} New</Text>
                <Text style={styles.badgeText}>Registrations</Text>
                <TouchableOpacity onPress={() => handleViewRegistrations(event.id)}>
                    <Text style={styles.seeAllLink}>See All</Text>
                </TouchableOpacity>
            </View>
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
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Events Registration</Text>
                <TouchableOpacity onPress={handleSeeAll} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.greyText} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Events List */}
                <View style={styles.eventsContainer}>
                    {EVENTS_DATA.map(renderEventCard)}
                </View>

                {/* Participation Analysis */}
                <View style={styles.analysisSection}>
                    <Text style={styles.analysisTitle}>Participation Analysis</Text>
                    <View style={styles.analysisHeader}>
                        <TouchableOpacity
                            style={styles.weekButton}
                            onPress={() => setAnalysisView('previous_week')}
                        >
                            <Ionicons name="arrow-back" size={20} color={COLORS.goldMid} />
                            <Text style={styles.weekButtonText}>Previous Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.weekButton}
                            onPress={() => setAnalysisView('this_week')}
                        >
                            <Text style={styles.weekButtonText}>This Week</Text>
                            <Ionicons name="arrow-forward" size={20} color={COLORS.goldMid} />
                        </TouchableOpacity>
                    </View>

                    {/* Chart */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartLabel}>Sample Participant Analysis Trend (7 Days)</Text>
                        <View style={styles.chart}>
                            {/* Y-axis labels */}
                            <View style={styles.yAxis}>
                                <Text style={styles.axisLabel}>70</Text>
                                <Text style={styles.axisLabel}>65</Text>
                                <Text style={styles.axisLabel}>60</Text>
                                <Text style={styles.axisLabel}>55</Text>
                                <Text style={styles.axisLabel}>50</Text>
                                <Text style={styles.axisLabel}>45</Text>
                            </View>

                            {/* Chart area placeholder */}
                            <View style={styles.chartArea}>
                                <View style={styles.chartPlaceholder}>
                                    <Text style={styles.chartPlaceholderText}>📈</Text>
                                    <Text style={styles.chartNote}>Participant trend visualization</Text>
                                </View>
                            </View>
                        </View>

                        {/* X-axis */}
                        <View style={styles.xAxis}>
                            <Text style={styles.axisLabel}>1</Text>
                            <Text style={styles.axisLabel}>2</Text>
                            <Text style={styles.axisLabel}>3</Text>
                            <Text style={styles.axisLabel}>4</Text>
                            <Text style={styles.axisLabel}>5</Text>
                            <Text style={styles.axisLabel}>6</Text>
                            <Text style={styles.axisLabel}>7</Text>
                        </View>
                        <Text style={styles.xAxisLabel}>Week (Day)</Text>
                    </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
    },
    headerTitle: {
        fontSize: 20,
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
        fontSize: 14,
        color: COLORS.greyText,
    },
    scrollView: {
        flex: 1,
    },
    eventsContainer: {
        padding: 16,
        gap: 16,
    },
    eventCard: {
        backgroundColor: COLORS.beige,
        borderRadius: 16,
        padding: 16,
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
    registrationBadge: {
        position: 'absolute',
        left: 16,
        top: 90,
        backgroundColor: COLORS.greenBadge,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 100,
    },
    badgeNumber: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.white,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: COLORS.white,
    },
    seeAllLink: {
        fontSize: 10,
        color: COLORS.white,
        textDecorationLine: 'underline',
        marginTop: 2,
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
    analysisSection: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    analysisTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 16,
        textAlign: 'center',
    },
    analysisHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    weekButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    weekButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.darkText,
    },
    chartContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    chartLabel: {
        fontSize: 13,
        color: COLORS.greyText,
        textAlign: 'center',
        marginBottom: 16,
    },
    chart: {
        flexDirection: 'row',
        height: 200,
    },
    yAxis: {
        justifyContent: 'space-between',
        paddingRight: 8,
        paddingVertical: 10,
    },
    axisLabel: {
        fontSize: 11,
        color: COLORS.greyText,
    },
    chartArea: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartPlaceholder: {
        alignItems: 'center',
    },
    chartPlaceholderText: {
        fontSize: 32,
        marginBottom: 8,
    },
    chartNote: {
        fontSize: 12,
        color: COLORS.greyText,
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        paddingHorizontal: 40,
    },
    xAxisLabel: {
        fontSize: 12,
        color: COLORS.greyText,
        textAlign: 'center',
        marginTop: 4,
    },
});
