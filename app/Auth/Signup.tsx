import React from 'react';
// 💡 FIX 1: Import Stack to control the header visibility
import { router, Stack } from 'expo-router';

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  ViewStyle, 
  TextStyle,
  ImageStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
  googleIcon: ImageStyle;
  signInButtonText: TextStyle;
}

const SignupScreen = (): React.JSX.Element => {

  const handleGoBack = (): void => {
    console.log('Back button pressed');
    // You might want to actually navigate back here
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldMid]} 
      locations={[0.0, 0.5, 1.0]} 
      style={styles.container}
    >
      {/* 💡 FIX 2: Explicitly hide the header for this screen */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Set status bar to transparent/translucent for gradient coverage */}
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
        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.replace('../../Auth/ChooseAcc')}
          activeOpacity={0.8}
        >
          <Image 
            source={googleIcon}
            style={styles.googleIcon}
          />
          <Text style={styles.signInButtonText}>Sign In With Google</Text>
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

    // Shadows
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
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
} as const); 

export default SignupScreen;