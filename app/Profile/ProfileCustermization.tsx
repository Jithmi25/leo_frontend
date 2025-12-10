import React, { useState } from 'react';
// 💡 FIX 1: Import Stack to control the header visibility
import { router, Stack } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    ScrollView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AVATAR_URL = 'https://placehold.co/120x120/A088C3/000?text=USER';
const avatarPlaceholder = { uri: AVATAR_URL };

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#DAA520',
    darkText: '#333333',
    lightText: '#FFFFFF',
    inputBg: '#E8E8E8',
    placeholderText: '#999999',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalBg: '#1C1C1E',
};

export default function CustomizeProfileScreen() {
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [homeClub, setHomeClub] = useState('');
    const [district, setDistrict] = useState('');

    const handlePhotoAction = (action: 'take' | 'upload' | 'delete') => {
        console.log(`Photo action: ${action}`);
        setShowPhotoModal(false);
        // TODO: Implement actual photo handling
    };

    const handleSave = () => {
        console.log('Saving profile:', { fullName, displayName, homeClub, district });
        // TODO: Implement save functionality
    };

    const handleClear = () => {
        setFullName('');
        setDisplayName('');
        setHomeClub('');
        setDistrict('');
    };

    return (
        <View style={styles.container}>
            {/* 💡 FIX 2: Explicitly hide the header for this screen */}
            <Stack.Screen options={{ headerShown: false }} />

            <LinearGradient
                colors={[COLORS.black, '#2C2B29', COLORS.goldMid]}
                locations={[0.0, 0.35, 0.6]}
                style={styles.gradientBg}
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={30} color={COLORS.lightText} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Customize Your Profile</Text>
                </View>

                {/* White Card Container */}
                <View style={styles.whiteCard}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Form Fields */}
                        <View style={styles.formSection}>
                            {/* Full Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    placeholder="e.g., Amaala Fernando"
                                    placeholderTextColor={COLORS.placeholderText}
                                />
                            </View>

                            {/* Display Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Display Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={displayName}
                                    onChangeText={setDisplayName}
                                    placeholder="e.g., Ami"
                                    placeholderTextColor={COLORS.placeholderText}
                                />
                            </View>

                            {/* Home Club */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Home Club</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={homeClub}
                                    onChangeText={setHomeClub}
                                    placeholder="Select your club"
                                    placeholderTextColor={COLORS.placeholderText}
                                />
                            </View>

                            {/* District */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>District</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={district}
                                    onChangeText={setDistrict}
                                    placeholder="Select your district"
                                    placeholderTextColor={COLORS.placeholderText}
                                />
                            </View>
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save & Continue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                                <Text style={styles.clearButtonText}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                {/* Profile Avatar - Positioned to overlap the white card */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
                            <Image source={avatarPlaceholder} style={styles.avatarImage} resizeMode="cover" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.editIconContainer}
                            onPress={() => setShowPhotoModal(true)}
                        >
                            <MaterialCommunityIcons name="pencil" size={18} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Photo Options Modal */}
                <Modal
                    transparent={true}
                    visible={showPhotoModal}
                    animationType="fade"
                    onRequestClose={() => setShowPhotoModal(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowPhotoModal(false)}
                    >
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handlePhotoAction('take')}
                            >
                                <Ionicons name="camera-outline" size={28} color={COLORS.white} />
                                <Text style={styles.modalOptionText}>Take Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => handlePhotoAction('upload')}
                            >
                                <Ionicons name="image-outline" size={28} color={COLORS.white} />
                                <Text style={styles.modalOptionText}>Upload From Gallery</Text>
                            </TouchableOpacity>

                            <View style={styles.modalSeparator} />

                            <TouchableOpacity
                                style={[styles.modalOption, { borderBottomWidth: 0 }]}
                                onPress={() => handlePhotoAction('delete')}
                            >
                                <Ionicons name="trash-outline" size={28} color={COLORS.white} />
                                <Text style={styles.modalOptionText}>Delete Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </LinearGradient>
        </View>
    );
}

const AVATAR_SIZE = 120;
const CARD_TOP_POSITION = 280;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBg: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        color: COLORS.lightText,
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 15,
    },
    whiteCard: {
        position: 'absolute',
        top: CARD_TOP_POSITION,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        zIndex: 5,
    },
    scrollContent: {
        paddingTop: 80,
        paddingBottom: 30,
    },
    formSection: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkText,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: COLORS.inputBg,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 10,
        fontSize: 16,
        color: COLORS.darkText,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    saveButton: {
        flex: 2,
        backgroundColor: COLORS.goldMid,
        paddingVertical: 16,
        borderRadius: 50,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    saveButtonText: {
        color: COLORS.black,
        fontSize: 18,
        fontWeight: '700',
    },
    clearButton: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        borderRadius: 50,
        marginLeft: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.goldMid,
    },
    clearButtonText: {
        color: COLORS.goldMid,
        fontSize: 18,
        fontWeight: '700',
    },
    avatarSection: {
        position: 'absolute',
        top: CARD_TOP_POSITION - (AVATAR_SIZE / 2),
        right: 50,
        zIndex: 10,
    },
    avatarContainer: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: COLORS.white,
        position: 'relative',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: AVATAR_SIZE / 2,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: COLORS.goldMid,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.black,
        elevation: 3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.modalOverlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.modalBg,
        borderRadius: 16,
        width: '80%',
        maxWidth: 350,
        overflow: 'hidden',
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalOptionText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 16,
    },
    modalSeparator: {
        height: 1,
        backgroundColor: COLORS.goldMid,
        marginHorizontal: 20,
    },
});