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

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log('Login with:', email, password);
        // TODO: Implement login logic
    };

    const handleGoogleSignIn = () => {
        console.log('Sign in with Google');
        // TODO: Implement Google sign-in
    };

    const handleFacebookSignIn = () => {
        console.log('Sign in with Facebook');
        // TODO: Implement Facebook sign-in
    };

    const handleForgotPassword = () => {
        console.log('Forgot password');
        // TODO: Navigate to forgot password screen
    };

    const handleSignUp = () => {
        console.log('Navigate to sign up');
        // TODO: Navigate to sign up screen
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

            {/* Bottom Card with Login Form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.bottomCard}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.loginTitle}>Login</Text>

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

                    {/* Forgot Password */}
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Social Sign In Divider */}
                    <Text style={styles.dividerText}>- Or Sign In With -</Text>

                    {/* Social Login Buttons */}
                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                            <Text style={styles.socialButtonText}>G</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
                            <Ionicons name="logo-facebook" size={32} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>

                    {/* Sign Up Link */}
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't Have an Account? </Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
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
    loginTitle: {
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
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: COLORS.black,
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
    dividerText: {
        fontSize: 14,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginBottom: 30,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    socialButtonText: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.black,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 15,
        color: COLORS.black,
    },
    signUpLink: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.goldMid,
    },
});
