import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  StatusBar,
  ViewStyle, 
  TextStyle,
  ImageStyle,
} from 'react-native';
// Since the background is now solid white, LinearGradient is replaced with a simple View
// import { LinearGradient } from 'expo-linear-gradient'; // <-- Removed

// Asset Imports
// Assuming GreenTick.png is a static local asset
const greenTickIcon = require('../../assets/GreenTick.png'); 

// --- Color Constants ---
const COLORS = {
  // CORRECTED COLORS for White Background Screen:
  black: '#000000', // Used for main text
  white: '#FFFFFF', // Used for screen background
  greenSuccess: '#4CAF50', // Standard green for the checkmark
  greyText: '#707070', // Used for secondary and footer text
  // The goldMid and black/white constants from your previous code are adjusted or replaced for clarity
};

// --- Type Definitions ---
interface Style {
  container: ViewStyle;
  content: ViewStyle;
  tickIcon: ImageStyle;
  headerMain: TextStyle;
  headerSub: TextStyle;
  footerText: TextStyle;
}

// Define props for navigation if it were a real screen
interface SuccessScreenProps {
  // Example: navigateToHome: () => void;
}

const SuccessScreen = ({ /* navigateToHome */ }: SuccessScreenProps): React.JSX.Element => {

  // Simulate automatic navigation after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
     router.replace('../Profile/profile.tsx'); // Navigate to Profile screen after delay
      
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [/* navigateToHome */]);

  return (
    // Replaced LinearGradient with a simple View for the solid white background
    <View style={styles.container}>
      {/* Status bar is now dark-content to be visible on a white background */}
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Main Content Area */}
      <View style={styles.content}>
        
        {/* Verification Icon */}
        <Image 
          source={greenTickIcon} 
          style={styles.tickIcon} 
          resizeMode="contain" 
        />
        
        {/* Header Text */}
        <Text style={styles.headerMain}>
          Congratilations !
        </Text>
        <Text style={styles.headerSub}>
         Event Registration successful ! 
        </Text>

      </View>
      
      {/* Footer Text for Security */}
      <Text style={styles.footerText}>
        You’ll receive reminders and  {'\n'}updates before the event date
      </Text>

      <View style={{ height: 40 }} /> {/* Bottom padding */}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Set the background to white
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: -80, // Keep content slightly up for better vertical balance
  },
  tickIcon: {
    width: 128, // Using the dimension shown in the image (128x128)
    height: 128,
    marginBottom: 40,
  },
  headerMain: {
    color: COLORS.black, // Changed to black text
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSub: {
    color: COLORS.black, // Changed to black text
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 28,
  },
  footerText: {
    color: COLORS.greyText, // Using the defined grey
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
} as const);

export default SuccessScreen;