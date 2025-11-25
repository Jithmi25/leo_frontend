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
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    black: '#000000',
    white: '#FFFFFF',
    goldMid: '#FFC72C',
    goldDark: '#B8860B',
    darkText: '#000000',
    greyText: '#999999',
    lightGrey: '#E8E8E8',
    inputBg: '#E8E8E8',
};

const LOGO_URL = 'https://placehold.co/150x150/DAA520/000?text=LIONS';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showReenterPassword, setShowReenterPassword] = useState(false);

    const handleSignUp = () => {
        if (password !== reenterPassword) {
            console.log('Passwords do not match');
            // TODO: Show error message
            return;
        }
        console.log('Sign up with:', email, password);
        // TODO: Implement sign up logic
    };

    const handleLogin = () => {
        console.log('Navigate to login');
        router.push('/customScreens/Login');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Top Section with Gradient */}
            <LinearGradient
                colors={[COLORS.black, '#3D3A2E', COLORS.goldDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.topSection}
            >
                <SafeAreaView>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.goldMid} />
                    </TouchableOpacity>

                    <View style={styles.headerContent}>
                        <View style={styles.headerText}>
                            <Text style={styles.welcomeText}>WELCOME!</Text>
                            <Text style={styles.appNameText}>LeoConnect</Text>
                            <Text style={styles.countryText}>SRI LANKA</Text>
                        </View>
                        <Image source={{ uri: LOGO_URL }} style={styles.logoImage} />
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* Bottom Card with Sign Up Form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.bottomCard}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.signUpTitle}>Sign Up</Text>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="XXXXXXXXXX@gmail.com"
                            placeholderTextColor={COLORS.greyText}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="XXXXXXXXXX"
                                placeholderTextColor={COLORS.greyText}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={24}
                                    color={COLORS.greyText}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Re-enter Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Re-enter Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                value={reenterPassword}
                                onChangeText={setReenterPassword}
                                placeholder="XXXXXXXXXX"
                                placeholderTextColor={COLORS.greyText}
                                secureTextEntry={!showReenterPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowReenterPassword(!showReenterPassword)}
                            >
                                <Ionicons
                                    name={showReenterPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={24}
                                    color={COLORS.greyText}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already Have an Account? </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topSection: {
        paddingTop: 40,
        paddingBottom: 60,
    },
    backButton: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    headerText: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: '800',
        color: COLORS.white,
        marginBottom: 20,
    },
    appNameText: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.white,
        marginBottom: 4,
    },
    countryText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.goldMid,
        letterSpacing: 1,
    },
    logoImage: {
        width: 120,
        height: 120,
        marginLeft: 20,
    },
    bottomCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        paddingHorizontal: 30,
    },
    scrollContent: {
        paddingTop: 30,
    },
    signUpTitle: {
        fontSize: 40,
        fontWeight: '700',
        color: COLORS.goldMid,
        marginBottom: 30,
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
    passwordContainer: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: COLORS.darkText,
    },
    eyeIcon: {
        padding: 4,
    },
    signUpButton: {
        backgroundColor: COLORS.black,
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 15,
        color: COLORS.black,
    },
    loginLink: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
});
