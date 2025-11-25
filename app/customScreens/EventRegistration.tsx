import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#E8E8E8',
    borderGrey: '#E0E0E0',
    cardBg: '#F8F5F0',
};

export default function EventRegistrationScreen() {
    const [fullName, setFullName] = useState('');
    const [homeClub, setHomeClub] = useState('');
    const [district, setDistrict] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const handleSubmit = () => {
        console.log('Registering for event:', {
            fullName,
            homeClub,
            district,
            contactNumber,
            emailAddress,
        });
        // TODO: Implement registration logic
    };

    const handleClear = () => {
        setFullName('');
        setHomeClub('');
        setDistrict('');
        setContactNumber('');
        setEmailAddress('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details & Registration</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Event Details Card */}
                    <View style={styles.eventDetailsCard}>
                        <View style={styles.eventHeader}>
                            <Text style={styles.joinEventIcon}>🤝</Text>
                            <Text style={styles.joinEventText}>Join This Event</Text>
                        </View>
                        <Text style={styles.eventSubtitle}>
                            Confirm your participation and stay updated with event reminders.
                        </Text>

                        <View style={styles.eventInfo}>
                            <Text style={styles.infoLabel}>Event Title:</Text>
                            <Text style={styles.infoValue}>
                                "Green Horizon – National Tree Planting Drive"
                            </Text>

                            <Text style={styles.infoLabel}>Host Club:</Text>
                            <Text style={styles.infoValue}>Leo Club of Colombo Central</Text>

                            <Text style={styles.infoLabel}>Date:</Text>
                            <Text style={styles.infoValue}>25 Nov 2025</Text>

                            <Text style={styles.infoLabel}>Time:</Text>
                            <Text style={styles.infoValue}>9:00 AM – 2:00 PM</Text>

                            <Text style={styles.infoLabel}>Location:</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location" size={16} color={COLORS.greyText} />
                                <Text style={styles.infoValue}>Viharamahadevi Park, Colombo</Text>
                            </View>
                        </View>
                    </View>

                    {/* Event Registration Section */}
                    <Text style={styles.sectionTitle}>Event Registration</Text>

                    <View style={styles.formCard}>
                        {/* Full Name */}
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="e.g., Amaala Fernando"
                            placeholderTextColor={COLORS.greyText}
                        />

                        {/* Home Club */}
                        <Text style={styles.inputLabel}>Home Club</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={[styles.input, styles.dropdownInput]}
                                value={homeClub}
                                onChangeText={setHomeClub}
                                placeholder="Select your club"
                                placeholderTextColor={COLORS.greyText}
                            />
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color={COLORS.greyText}
                                style={styles.dropdownIcon}
                            />
                        </View>

                        {/* District */}
                        <Text style={styles.inputLabel}>District</Text>
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={[styles.input, styles.dropdownInput]}
                                value={district}
                                onChangeText={setDistrict}
                                placeholder="Select your district"
                                placeholderTextColor={COLORS.greyText}
                            />
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color={COLORS.greyText}
                                style={styles.dropdownIcon}
                            />
                        </View>

                        {/* Contact Number */}
                        <Text style={styles.inputLabel}>Contact Number</Text>
                        <TextInput
                            style={styles.input}
                            value={contactNumber}
                            onChangeText={setContactNumber}
                            placeholder="07XXXXXXXX"
                            placeholderTextColor={COLORS.greyText}
                            keyboardType="phone-pad"
                        />

                        {/* Email Address */}
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={emailAddress}
                            onChangeText={setEmailAddress}
                            placeholder="amaala.leo@clubx.com"
                            placeholderTextColor={COLORS.greyText}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {/* Action Buttons */}
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                                <Text style={styles.buttonText}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 40 }} />
                </View>
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
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGrey,
        gap: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    eventDetailsCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    joinEventIcon: {
        fontSize: 24,
    },
    joinEventText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.darkText,
    },
    eventSubtitle: {
        fontSize: 13,
        color: COLORS.greyText,
        marginBottom: 20,
        lineHeight: 18,
    },
    eventInfo: {
        gap: 8,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
        marginTop: 8,
    },
    infoValue: {
        fontSize: 14,
        color: COLORS.greyText,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 16,
    },
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.darkText,
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: COLORS.darkText,
    },
    dropdownContainer: {
        position: 'relative',
    },
    dropdownInput: {
        paddingRight: 40,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 16,
        top: '50%',
        marginTop: -10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    submitButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    clearButton: {
        flex: 1,
        backgroundColor: COLORS.goldMid,
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.darkText,
    },
});
