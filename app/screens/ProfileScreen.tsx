import React from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// BottomNav removed – isolated screen

// Responsive calculations
const { width } = Dimensions.get('window');

// Placeholder avatar (replace with real asset later)
const AVATAR_URL = 'https://placehold.co/120x120/A088C3/000?text=USER';
const avatarPlaceholder = { uri: AVATAR_URL };

// Color palette – matches the rest of the app
const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#DAA520',
    darkText: '#333333',
    lightText: '#FFFFFF',
};

// Hard‑coded user data (replace with real API later)
const USER_DATA = {
    firstName: 'Leo Amaala',
    lastName: 'Fernando',
    displayName: '@Ami',
    position: 'Club President',
    district: 'Leo District 306 D1',
};

// Sample badge data – mirrors the original design
const BADGES_DATA = [
    { id: '1', code: 'L258Y', description: 'COUNCIL CHAIRPERSON', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=L1' },
    { id: '2', code: 'A150', description: 'DISTRICT OFFICER CREST', imageUri: 'https://placehold.co/100x100/DAA520/000?text=A2' },
    { id: '3', code: 'B6PP', description: 'PAST PRESIDENT DELUXE LAPEL TACK', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=B3' },
    { id: '4', code: 'L23Y11G', description: 'PAST INTERNATIONAL DIRECTOR BADGE, MISSION TO GROW', imageUri: 'https://placehold.co/100x100/DAA520/000?text=L4' },
    { id: '5', code: 'W900', description: 'WORLDWIDE SERVICE AWARD', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=W5' },
    { id: '6', code: 'I10A', description: 'INTERNATIONAL ACTIVITY AWARD', imageUri: 'https://placehold.co/100x100/DAA520/000?text=I6' },
];

export default function ProfileScreen() {
    const handleEditPress = () => {
        // Navigate to the customization screen – keep the original route for now
        router.replace('/Profile/ProfileCustermization');
    };

    interface Badge { id: string; code: string; description: string; imageUri: string; }

    const renderBadge = (badge: Badge) => (
        <View style={styles.badgeItem} key={badge.id}>
            <Image source={{ uri: badge.imageUri }} style={styles.badgeImage} resizeMode="contain" />
            <Text style={styles.badgeCode}>{badge.code}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => console.log('Back pressed')}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.darkText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Scrollable content */}
            <ScrollView style={styles.contentWrapper} contentContainerStyle={{ paddingBottom: 50 }}>
                {/* Profile card */}
                <View style={styles.profileCardContainer}>
                    <LinearGradient
                        colors={[COLORS.black, COLORS.goldDark]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.profileCardGradient}
                    >
                        <View style={styles.userInfoContainer}>
                            <View style={styles.nameBlock}>
                                <Text style={styles.nameTextPrimary}>{USER_DATA.firstName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.nameTextSecondary}>{USER_DATA.lastName}</Text>
                                    <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
                                        <MaterialCommunityIcons name="pencil" size={16} color={COLORS.lightText} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.separatorLine} />
                            <Text style={styles.positionText}>{USER_DATA.district}</Text>
                            <Text style={styles.positionText}>{USER_DATA.position}</Text>
                        </View>
                        <View style={styles.avatarWrapper}>
                            <Image source={avatarPlaceholder} style={styles.avatarImage} resizeMode="cover" />
                            <Text style={styles.displayNameText}>{USER_DATA.displayName}</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Badges section */}
                <View style={styles.badgesSection}>
                    <Text style={styles.sectionTitle}>Badges</Text>
                    <View style={styles.badgesGrid}>{BADGES_DATA.map(renderBadge)}</View>
                </View>
            </ScrollView>

            {/* Bottom navigation – keep existing tab handling */}
            {/* Bottom navigation omitted for isolated screen */}
        </View>
    );
}

const HEADER_HEIGHT = 80;
const CARD_MARGIN_HORIZONTAL = 20;
const AVATAR_SIZE = 120;
const BADGE_ITEM_WIDTH = (width - CARD_MARGIN_HORIZONTAL * 2 - 30) / 2;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        height: HEADER_HEIGHT,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: { color: COLORS.darkText, fontSize: 22, fontWeight: '700', marginLeft: 15 },
    contentWrapper: { flex: 1, backgroundColor: COLORS.white },
    profileCardContainer: { paddingHorizontal: CARD_MARGIN_HORIZONTAL, marginTop: 20, marginBottom: 30 },
    profileCardGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 15,
        elevation: 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    userInfoContainer: { flex: 1, paddingRight: 15 },
    nameBlock: { marginBottom: 10 },
    nameTextPrimary: { color: COLORS.lightText, fontSize: 24, fontWeight: '800', lineHeight: 28 },
    nameTextSecondary: { color: COLORS.lightText, fontSize: 24, fontWeight: '500', lineHeight: 28 },
    editIcon: { marginLeft: 8, alignSelf: 'flex-start', marginTop: 5 },
    separatorLine: { height: 1.5, width: '70%', backgroundColor: COLORS.lightText, opacity: 0.7, marginVertical: 10 },
    positionText: { color: COLORS.lightText, fontSize: 14, fontWeight: '500', lineHeight: 20 },
    avatarWrapper: { alignItems: 'center' },
    avatarImage: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
    displayNameText: { color: COLORS.lightText, fontSize: 14, fontWeight: '600', marginTop: 5 },
    badgesSection: { paddingHorizontal: CARD_MARGIN_HORIZONTAL, paddingTop: 0 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: COLORS.darkText, marginBottom: 20 },
    badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    badgeItem: { width: BADGE_ITEM_WIDTH, backgroundColor: COLORS.white, borderRadius: 15, padding: 10, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0', elevation: 1, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
    badgeImage: { width: 80, height: 80, marginBottom: 5 },
    badgeCode: { fontSize: 12, fontWeight: '700', color: COLORS.darkText, textAlign: 'center', marginTop: 5 },
    badgeDescription: { fontSize: 12, fontWeight: '400', color: COLORS.darkText, textAlign: 'center', marginTop: 2 },
});
