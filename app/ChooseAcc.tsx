import React from 'react';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Asset Imports
const appLogo = require('../assets/images/logo.png'); // App logo at the top of the card

// --- Color Constants ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C', 
  greyText: '#555555', // For secondary text in the account list
  lightGreyBackground: '#F0F0F0', // For the card background
};

// --- Type Definitions ---
interface Account {
  id: string;
  name?: string; // Optional name as per image structure where email might be on its own line
  email: string;
  avatarUri?: string; // Optional URI for the avatar image
  initials?: string; // Fallback for avatar if no URI
}

interface Style {
  container: ViewStyle;
  backButton: ViewStyle;
  headerContainer: ViewStyle;
  headerTitle: TextStyle;
  cardContainer: ViewStyle;
  cardLogo: ImageStyle;
  cardTitle: TextStyle;
  cardSubtitle: TextStyle;
  accountItem: ViewStyle;
  accountAvatarContainer: ViewStyle;
  accountAvatarText: TextStyle;
  accountInfo: ViewStyle;
  accountName: TextStyle;
  accountEmail: TextStyle;
  divider: ViewStyle; // Added style for the horizontal line
  addAccountItem: ViewStyle;
  addAccountIcon: TextStyle;
  addAccountText: TextStyle;
  footerText: TextStyle;
  accountImageAvatar: ImageStyle;
}

const ChooseAccountScreen = (): React.JSX.Element => {

  // Hardcoded account data (simulating data from a backend)
  const accounts: Account[] = [
    {
      id: '1',
      name: 'Amala Fernando',
      email: 'amala@gmail.com',
      initials: 'A',
    },
    {
      id: '2',
      name: 'Sithumi Fernando',
      email: 'sithumi@gmail.com',
      initials: 'S',
    },
  ];

  const handleGoBack = (): void => {
    console.log('Back button pressed');
  };

  const handleAccountSelect = (account: Account): void => {
    console.log(`Account selected: ${account.email}`);
  };

  const handleAddAnotherAccount = (): void => {
    console.log('Add another account pressed');
  };

  const renderAccountAvatar = (account: Account): React.JSX.Element => {
    // Note: The image shows different icons for each account. I will use 
    // MaterialCommunityIcons for the two hardcoded accounts for better fidelity 
    // to the image (initials for Amala, person icon for Sithumi).
    
    if (account.id === '1') {
      // Custom avatar for Amala (initials)
      return (
        <View style={[styles.accountAvatarContainer, { backgroundColor: COLORS.goldMid }]}>
          <Text style={styles.accountAvatarText}>{account.initials}</Text>
        </View>
      );
    } else if (account.id === '2') {
       // Custom avatar for Sithumi (female person icon with specific colors)
       return (
        <View style={[styles.accountAvatarContainer, { backgroundColor: '#F95D6A' }]}>
            <MaterialCommunityIcons name="face-woman" size={24} color={COLORS.white} />
        </View>
      );
    }
    
    // Default fallback (e.g., if more accounts were added)
    return (
      <View style={styles.accountAvatarContainer}>
        <Text style={styles.accountAvatarText}>{account.initials || '?'}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldMid]} 
      locations={[0.0, 0.5, 1.0]} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Top Header Section with Back Button and "Choose Account" Title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color={COLORS.white} />
        </TouchableOpacity>
        {/* Title is slightly offset from the left to center the card content */}
        <Text style={styles.headerTitle}>Choose Account</Text>
      </View>

      {/* Main Account Selection Card */}
      <View style={styles.cardContainer}>
        <Image source={appLogo} style={styles.cardLogo} resizeMode="contain" />
        <Text style={styles.cardTitle}>Choose an Account</Text>
        <Text style={styles.cardSubtitle}>To continue to LeoConnect</Text>

        {/* List of Accounts with Divider */}
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            {/* Conditional Divider: Render a line before all items except the first (index > 0) */}
            {index > 0 && <View style={styles.divider} />}
            
            <TouchableOpacity 
              style={styles.accountItem} 
              onPress={() => handleAccountSelect(account)}
            >
              {renderAccountAvatar(account)}
              <View style={styles.accountInfo}>
                {/* Account Name (in bold) and Email */}
                {account.name && (
                  <Text style={styles.accountName}>{account.name}</Text>
                )}
                <Text style={styles.accountEmail}>{account.email}</Text>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}

        {/* Divider before Add Another Account, matching the image */}
        <View style={styles.divider} />

        {/* Add Another Account Option */}
        <TouchableOpacity 
          style={styles.addAccountItem} 
          onPress={handleAddAnotherAccount}
        >
          {/* Using a generic user-plus icon */}
          <View style={[styles.accountAvatarContainer, { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.greyText }]}>
             <MaterialCommunityIcons name="account-plus" size={24} color={COLORS.greyText} />
          </View>
          <Text style={styles.addAccountText}>Add another account</Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          To continue, Google share your name, email address and profile picture with weverse.
        </Text>
      </View>
    </LinearGradient>
  );
};

// --- Styles ---
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {},
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 15,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  cardLogo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.greyText,
    marginBottom: 20,
    textAlign: 'center',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    // Note: Removed marginBottom to keep space tight around the divider
  },
  // NEW DIVIDER STYLE
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEEEEE',
    // Reduced vertical margin to make the line separation subtle, matching the image
  },
  accountAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // Background color is handled in renderAccountAvatar for customization
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  accountAvatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountImageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: COLORS.lightGreyBackground,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold', // Bolded name to match the image
    color: COLORS.black,
  },
  accountEmail: {
    fontSize: 13,
    color: COLORS.greyText,
  },
  addAccountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    // Removed marginTop, relying on the divider
  },
  addAccountIcon: {
    // This style is now largely unused since I updated renderAccountAvatar and addAccountItem to use a View for better avatar styling.
    // It is kept for interface completeness.
    marginRight: 15,
    width: 40, 
    textAlign: 'center',
  },
  addAccountText: {
    fontSize: 16,
    color: COLORS.black, // Changed to black for better contrast/matching
    fontWeight: '500',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.greyText,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },
} as const);

export default ChooseAccountScreen;