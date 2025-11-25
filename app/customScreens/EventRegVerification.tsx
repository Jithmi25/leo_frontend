import React from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
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
    greyText: '#666666',
    successGreen: '#2E7D32',
};

export default function EventRegVerificationScreen() {
    const handleViewMyEvents = () => {
        console.log('Navigate to My Events');
        // Navigate to My Events tab in Event screen
        router.push('/customScreens/Event');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
            </TouchableOpacity>

            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.successIconContainer}>
                    <View style={styles.successCircle}>
                        <Ionicons name="checkmark" size={100} color={COLORS.white} />
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.congratsText}>Congratulations !!</Text>
                <Text style={styles.successText}>Event Registration successful !</Text>

                {/* Info Message */}
                <Text style={styles.infoText}>
                    You'll receive reminders and{'\n'}updates before the event date.
                </Text>

                {/* View My Events Button */}
                <TouchableOpacity style={styles.viewEventsButton} onPress={handleViewMyEvents}>
                    <Text style={styles.viewEventsText}>View My Events</Text>
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
    backButton: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    successIconContainer: {
        marginBottom: 40,
    },
    successCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: COLORS.successGreen,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    congratsText: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 8,
        textAlign: 'center',
    },
    successText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 40,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 15,
        color: COLORS.greyText,
        marginBottom: 60,
        textAlign: 'center',
        lineHeight: 22,
    },
    viewEventsButton: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.goldMid,
        paddingBottom: 4,
    },
    viewEventsText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
});
