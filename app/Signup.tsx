import React from 'react';
import { router } from 'expo-router';

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  ViewStyle, // Import types for styling
  TextStyle,
  ImageStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// ✔ Correct Asset Imports
// Note: In a real project, these require statements might need adjustments 
// or TypeScript definitions if you're not using a specific asset loader configuration.
const logo = require('../assets/images/logo.png');
const googleIcon = require('../assets/images/google_icon.png');

// --- Color Constants ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldDark: '#DAA520',
  goldMid: '#FFC72C', // Used for the main gold and text color
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

  // const handleSignIn = (): void => {
  //   console.log('Sign In With Google pressed');
  // };

  const handleGoBack = (): void => {
    console.log('Back button pressed');
  };

  return (
    // 1. Full-screen LinearGradient replaces the primary View
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldMid]} // Transition from black to a dark-grey mid-point, ending in gold
      locations={[0.0, 0.5, 1.0]} // Specifies the color stop points (Top, Middle, Bottom)
      style={styles.container}
    >
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

      {/* Bottom Section (Positioning container for the button) */}
      <View style={styles.bottomSection}>
        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.replace('/ChooseAcc')}
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
// Cast the StyleSheet.create result to the defined Style interface
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    // The background is now handled by the LinearGradient colors prop
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
    // Removed explicit background color here, as the full-screen gradient provides the gold color
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 50,
  },

  // The original gradientOverlay style is removed as it's no longer needed

  signInButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',   // <-- Centers icon + text together
  gap: 10,                    // <-- Clean spacing between icon & text
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
}as const); // Use 'as const' to improve type safety for static styles

export default SignupScreen;