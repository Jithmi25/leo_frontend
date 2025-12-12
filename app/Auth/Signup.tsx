import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageStyle,
  StatusBar,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

// Asset Imports
const logo = require('../../assets/images/logo.png');
const googleIcon = require('../../assets/images/google_icon.png');

// --- Color Constants ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldDark: '#DAA520',
  goldMid: '#FFC72C',
  yellowBase: '#FFC72C',
  errorRed: '#FF4444',
};

// Define a type for the styles object
interface Style {
  container: ViewStyle;
  backButton: ViewStyle;
  content: ViewStyle;
  headerWelcome: TextStyle;
  headerMain: TextStyle;
  headerSub: TextStyle;
  logo: ImageStyle;
  bottomSection: ViewStyle;
  signInButton: ViewStyle;
  signInButtonDisabled: ViewStyle;
  googleIcon: ImageStyle;
  signInButtonText: TextStyle;
  errorText: TextStyle;
  loadingContainer: ViewStyle;
}

const SignupScreen = (): React.JSX.Element => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { signIn, isLoading: googleLoading, error: googleError, result: googleResult, clearError, request } = useGoogleAuth();
  const { login, isLoading: authLoading, error: authError, clearError: clearAuthError } = useAuth();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        console.log('Backend Health Check:', data);
      } catch (error) {
        console.error('Backend Health Check Failed:', error);
        Alert.alert('Backend Error', 'Could not connect to the server. Please ensure the backend is running.');
      }
    };
    checkHealth();
  }, []);

  // Handle Google Sign-In result
  useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (googleResult?.idToken && !isProcessing) {
        setIsProcessing(true);
        try {
          // Send ID token to backend for verification
          const loggedInUser = await login(googleResult.idToken);
          
          // Role-based redirection
          if (loggedInUser) {
            switch (loggedInUser.role) {
              case 'webmaster':
                router.replace('/Feed');
                break;
              case 'superAdmin':
                router.replace('/SuperAdmin/Home');
                break;
              case 'member':
                router.replace('/Feeds/SearchProfile');
                break;
              default:
                // Fallback to a default success screen if role is not recognized
                router.replace('/Feedbacks/SuccsessSignup');
                break;
            }
          } else {
            // Handle case where user is not returned, e.g., show a generic error
             router.replace('/Feedbacks/AccNotReg');
          }
        } catch (error: any) {
          // Check if the error is "not registered"
          if (error.message?.includes('not a registered member') || 
              error.message?.includes('not registered')) {
            router.replace('/Feedbacks/AccNotReg');
          } else {
            Alert.alert(
              'Login Failed',
              error.message || 'An error occurred during login. Please try again.',
              [{ text: 'OK', onPress: () => clearAuthError() }]
            );
          }
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handleGoogleSignIn();
  }, [googleResult]);

  // Handle Google Sign-In errors
  useEffect(() => {
    if (googleError && googleError !== 'Sign-In was cancelled') {
      Alert.alert(
        'Sign-In Error',
        googleError,
        [{ text: 'OK', onPress: () => clearError() }]
      );
    }
  }, [googleError]);

  const handleSignIn = async (): Promise<void> => {
    try {
      clearError();
      clearAuthError();
      await signIn();
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  const handleGoBack = (): void => {
    router.back();
  };

  const isLoading = googleLoading || authLoading || isProcessing;

  return (
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldMid]}
      locations={[0.0, 0.5, 1.0]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={30} color={COLORS.white} />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.headerWelcome}>WELCOME TO</Text>
        <Text style={styles.headerMain}>LeoConnect</Text>
        <Text style={styles.headerSub}>SRI LANKA</Text>

        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Error Message */}
        {(googleError || authError) && (
          <Text style={styles.errorText}>
            {googleError || authError}
          </Text>
        )}

        {/* Developer Info Box */}


        {/* Sign In Button */}
        <TouchableOpacity 
          style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
          onPress={handleSignIn}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.black} />
              <Text style={styles.signInButtonText}>Signing In...</Text>
            </View>
          ) : (
            <>
              <Image 
                source={googleIcon}
                style={styles.googleIcon}
              />
              <Text style={styles.signInButtonText}>Sign In With Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// --- Styles ---
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
    paddingHorizontal: 20,
  },

  headerWelcome: {
    color: COLORS.white,
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerMain: {
    color: COLORS.white,
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  headerSub: {
    color: COLORS.yellowBase,
    fontSize: 28,
    fontWeight: '500',
    marginBottom: '15%',
  },

  logo: {
    width: '75%',
    height: 250,
  },

  bottomSection: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 50,
  },

  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '80%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },

  signInButtonDisabled: {
    opacity: 0.7,
  },

  googleIcon: {
    width: 24,
    height: 24,
  },

  signInButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
  },

  errorText: {
    color: COLORS.errorRed,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  
  devInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '90%',
  },

  devInfoText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
} as const);

export default SignupScreen;
