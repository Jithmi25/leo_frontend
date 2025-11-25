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
    lightGrey: '#E8E8E8',
    inputBg: '#E8E8E8',
};

const AVATAR_PLACEHOLDER = 'https://placehold.co/200x200/D8C8E8/4A5568?text=USER';

type UserRole = 'leo_member' | 'webmaster_admin';

export default function ProfileSetupScreen() {
    const [selectedRole, setSelectedRole] = useState<UserRole>('leo_member');
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [club, setClub] = useState('');
    const [district, setDistrict] = useState('');

    const handleContinue = () => {
        console.log('Profile setup:', { selectedRole, name, nickName, club, district });
        // TODO: Save profile and navigate to next screen
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LinearGradient
                colors={[COLORS.black, COLORS.brownDark, COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientBackground}
            >
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={28} color={COLORS.white} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Customize the Profile</Text>
                        </View>

                        {/* Role Selection Section */}
                        <View style={styles.roleSection}>
                            <Text style={styles.roleSectionTitle}>
                                Choose Your Role in the Leo Community
                            </Text>
                            <View style={styles.roleButtonsContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.roleButton,
                                        selectedRole === 'leo_member' && styles.roleButtonActive,
                                    ]}
                                    onPress={() => setSelectedRole('leo_member')}
                                >
                                    <Text
                                        style={[
                                            styles.roleButtonText,
                                            selectedRole === 'leo_member' && styles.roleButtonTextActive,
                                        ]}
                                    >
                                        Leo Member
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.roleButton,
                                        selectedRole === 'webmaster_admin' && styles.roleButtonActive,
                                    ]}
                                    onPress={() => setSelectedRole('webmaster_admin')}
                                >
                                    <Text
                                        style={[
                                            styles.roleButtonText,
                                            selectedRole === 'webmaster_admin' && styles.roleButtonTextActive,
                                        ]}
                                    >
                                        Webmaster / Admin
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Avatar */}
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: AVATAR_PLACEHOLDER }} style={styles.avatar} />
                        </View>

                        {/* Form Card */}
                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="XXXXXXXXXX"
                                    placeholderTextColor={COLORS.greyText}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Nick Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={nickName}
                                    onChangeText={setNickName}
                                    placeholder="XXXXXXXXXX"
                                    placeholderTextColor={COLORS.greyText}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Club</Text>
                                <TextInput
                                    style={styles.input}
                                    value={club}
                                    onChangeText={setClub}
                                    placeholder="XXXXXXXXXX"
                                    placeholderTextColor={COLORS.greyText}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>District</Text>
                                <TextInput
                                    style={styles.input}
                                    value={district}
                                    onChangeText={setDistrict}
                                    placeholder="XXXXXXXXXX"
                                    placeholderTextColor={COLORS.greyText}
                                />
                            </View>
                        </View>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    gradientBackground: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        marginLeft: 16,
    },
    roleSection: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    roleSectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.white,
        marginBottom: 16,
    },
    roleButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.brownDark,
        backgroundColor: COLORS.brownDark,
        alignItems: 'center',
    },
    roleButtonActive: {
        borderColor: COLORS.goldMid,
        backgroundColor: 'transparent',
    },
    roleButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.greyText,
    },
    roleButtonTextActive: {
        color: COLORS.goldMid,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: COLORS.white,
    },
    formCard: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.greyText,
        marginBottom: 8,
    },
    input: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: COLORS.darkText,
    },
});
