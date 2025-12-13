import React, { useState } from 'react';
import { router } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    Switch,
    Dimensions,
    Modal, // 👈 New Import
    TextInput, // 👈 New Import
    Alert, // 👈 New Import for notifications
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AVATAR_URL = 'https://placehold.co/120x120/A088C3/000?text=USER';
const avatarPlaceholder = { uri: AVATAR_URL };

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#DAA520',
    darkText: '#333333',
    lightText: '#FFFFFF',
    greyText: '#666666',
    lightGrey: '#F8F8F8',
    borderGrey: '#E0E0E0',
};

interface Badge {
    id: string;
    code: string;
    description: string;
    imageUri: string;
}

const BADGES_DATA: Badge[] = [
    { id: '1', code: 'L258Y', description: 'COUNCIL CHAIRPERSON', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=L1' },
    { id: '2', code: 'A150', description: 'DISTRICT OFFICER CREST', imageUri: 'https://placehold.co/100x100/DAA520/000?text=A2' },
    { id: '3', code: 'B6PP', description: 'PAST PRESIDENT DELUXE', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=B3' },
    { id: '4', code: 'L23Y11G', description: 'PAST INTERNATIONAL DIRECTOR', imageUri: 'https://placehold.co/100x100/DAA520/000?text=L4' },
];

export default function SetProfileScreen() {
    // --- State for Notifications (Original) ---
    const [notificationNewPosts, setNotificationNewPosts] = useState(true);
    const [notificationDistrict, setNotificationDistrict] = useState(false);
    const [notificationEvents, setNotificationEvents] = useState(false);

    // --- State for Email and Contact (New/Modified) ---
    const [email, setEmail] = useState('amaalafernando@gmail.com');
    const [contact, setContact] = useState('0711234567');
    
    // --- State for Modals (New) ---
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isContactModalVisible, setContactModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState(email);
    const [newContact, setNewContact] = useState(contact);


    // --- Handlers (Modified to open modals) ---
    const handleEditProfile = () => {
      
              router.replace('/Profile/ProfileCustermization');
          
    };

    const handleEditEmail = () => {
        setNewEmail(email); // Reset input field to current value
        setEmailModalVisible(true);
    };

    const handleEditContact = () => {
        setNewContact(contact); // Reset input field to current value
        setContactModalVisible(true);
    };

    const handleSaveEmail = () => {
        if (!newEmail.includes('@') || newEmail.trim() === '') {
            Alert.alert('Invalid Input', 'Please enter a valid email address.');
            return;
        }
        setEmail(newEmail.trim());
        setEmailModalVisible(false);
        Alert.alert('Success', 'Email updated successfully!');
    };

    const handleSaveContact = () => {
        // Simple numeric check
        if (!/^[0-9]+$/.test(newContact.trim()) || newContact.trim().length < 7) {
            Alert.alert('Invalid Input', 'Please enter a valid contact number (digits only).');
            return;
        }
        setContact(newContact.trim());
        setContactModalVisible(false);
        Alert.alert('Success', 'Contact updated successfully!');
    };

    const handleAppLanguage = () => {
        console.log('Change app language');
    };

    const handleLogout = () => {
        router.replace('/Onboarding');
    };

    const renderBadge = (badge: Badge) => (
        <View style={styles.badgeCard} key={badge.id}>
            <Image source={{ uri: badge.imageUri }} style={styles.badgeImage} resizeMode="contain" />
            <Text style={styles.badgeCode}>{badge.code}</Text>
            <Text style={styles.badgeDescription} numberOfLines={2}>{badge.description}</Text>
        </View>
    );
    
    // --- Reusable Modal Component (New) ---
    const EditProfileModal = ({
        isVisible,
        title,
        currentValue,
        onClose,
        onSave,
        onInputChange,
        keyboardType = 'default',
    }: {
        isVisible: boolean;
        title: string;
        currentValue: string;
        onClose: () => void;
        onSave: () => void;
        onInputChange: (text: string) => void;
        keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    }) => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Edit {title}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onInputChange}
                        value={currentValue}
                        placeholder={`Enter new ${title.toLowerCase()}`}
                        placeholderTextColor={COLORS.greyText}
                        autoCapitalize="none"
                        keyboardType={keyboardType}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonClose]} 
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={onSave}
                        >
                            <Text style={styles.textStyle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCardContainer}>
                    <LinearGradient
                        colors={[COLORS.black, '#3D3A2E', COLORS.goldDark]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.profileCard}
                    >
                        <View style={styles.profileInfo}>
                            <View style={styles.nameRow}>
                                <Text style={styles.nameText}>Leo Amaala</Text>
                                <TouchableOpacity onPress={handleEditProfile}>
                                    <MaterialCommunityIcons name="pencil" size={16} color={COLORS.lightText} style={styles.editIconSmall} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.nameTextSecondary}>Fernando</Text>
                            <View style={styles.separator} />
                            <Text style={styles.districtText}>Leo District 306 D1</Text>
                            <Text style={styles.positionText}>Club President</Text>
                        </View>
                        <View style={styles.avatarSection}>
                            <Image source={avatarPlaceholder} style={styles.avatar} resizeMode="cover" />
                            <Text style={styles.handleText}>@Ami</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Badges Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Badges</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
                        {BADGES_DATA.map(renderBadge)}
                    </ScrollView>
                </View>

                {/* Email Section (Updated) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Email</Text>
                        <TouchableOpacity onPress={handleEditEmail}>
                            <MaterialCommunityIcons name="pencil" size={20} color={COLORS.darkText} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoText}>{email}</Text> {/* Display dynamic state */}
                </View>

                {/* Contact Section (Updated) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Contact</Text>
                        <TouchableOpacity onPress={handleEditContact}>
                            <MaterialCommunityIcons name="pencil" size={20} color={COLORS.darkText} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoText}>{contact}</Text> {/* Display dynamic state */}
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings Section</Text>

                    {/* App Language */}
                    <TouchableOpacity style={styles.settingCard} onPress={handleAppLanguage}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="globe-outline" size={24} color={COLORS.goldMid} />
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>App Language</Text>
                                <Text style={styles.settingDescription}>Select your preferred language for the LeoConnect app.</Text>
                            </View>
                        </View>
                        <View style={styles.settingRight}>
                            <Text style={styles.languageText}>English 🇬🇧</Text>
                            <Ionicons name="chevron-forward" size={20} color={COLORS.greyText} />
                        </View>
                    </TouchableOpacity>

                    {/* Notifications */}
                    <View style={styles.settingCard}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications-outline" size={24} color={COLORS.goldMid} />
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Notifications</Text>
                                <Text style={styles.settingDescription}>Control what updates you receive</Text>
                            </View>
                        </View>
                    </View>

                    {/* Notification Toggles */}
                    <View style={styles.notificationToggles}>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleText}>National Announcements</Text>
                            <Switch
                                value={notificationNewPosts}
                                onValueChange={setNotificationNewPosts}
                                trackColor={{ false: '#D1D1D6', true: COLORS.goldMid }}
                                thumbColor={COLORS.white}
                            />
                        </View>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleText}>District announcements</Text>
                            <Switch
                                value={notificationDistrict}
                                onValueChange={setNotificationDistrict}
                                trackColor={{ false: '#D1D1D6', true: COLORS.goldMid }}
                                thumbColor={COLORS.white}
                            />
                        </View>
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleText}>Home Club Announcements</Text>
                            <Switch
                                value={notificationEvents}
                                onValueChange={setNotificationEvents}
                                trackColor={{ false: '#D1D1D6', true: COLORS.goldMid }}
                                thumbColor={COLORS.white}
                            />
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* --- Modals Rendered Here --- */}
            <EditProfileModal
                isVisible={isEmailModalVisible}
                title="Email"
                currentValue={newEmail}
                onClose={() => setEmailModalVisible(false)}
                onSave={handleSaveEmail}
                onInputChange={setNewEmail}
                keyboardType="email-address"
            />
            
            <EditProfileModal
                isVisible={isContactModalVisible}
                title="Contact"
                currentValue={newContact}
                onClose={() => setContactModalVisible(false)}
                onSave={handleSaveContact}
                onInputChange={setNewContact}
                keyboardType="phone-pad"
            />
            {/* ---------------------------- */}
        </View>
    );
}

const AVATAR_SIZE = 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: StatusBar.currentHeight || 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.darkText,
        marginLeft: 16,
    },
    scrollView: {
        flex: 1,
    },
    profileCardContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    profileInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.lightText,
        marginRight: 8,
    },
    nameTextSecondary: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.lightText,
        marginBottom: 8,
    },
    editIconSmall: {
        marginLeft: 4,
    },
    separator: {
        width: '70%',
        height: 1.5,
        backgroundColor: COLORS.lightText,
        opacity: 0.7,
        marginVertical: 8,
    },
    districtText: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.lightText,
    },
    positionText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.lightText,
        marginTop: 2,
    },
    avatarSection: {
        alignItems: 'center',
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        marginBottom: 6,
    },
    handleText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.lightText,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        color: COLORS.greyText,
    },
    badgesScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    badgeCard: {
        width: 100,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 12,
        marginRight: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        elevation: 1,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    badgeImage: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    badgeCode: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.darkText,
        textAlign: 'center',
    },
    badgeDescription: {
        fontSize: 10,
        fontWeight: '400',
        color: COLORS.greyText,
        textAlign: 'center',
        marginTop: 4,
    },
    settingCard: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    settingTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.darkText,
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 13,
        color: COLORS.greyText,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkText,
        marginRight: 4,
    },
    notificationToggles: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    toggleText: {
        fontSize: 15,
        color: COLORS.darkText,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.darkText,
        marginBottom: 12,
    },
    logoutButton: {
        borderWidth: 2,
        borderColor: COLORS.goldMid,
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
    // --- New Styles for Modal ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.darkText,
        marginBottom: 15,
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        paddingHorizontal: 15,
        borderRadius: 8,
        color: COLORS.darkText,
        fontSize: 16,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: COLORS.greyText,
    },
    buttonSave: {
        backgroundColor: COLORS.goldMid,
    },
    textStyle: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});


