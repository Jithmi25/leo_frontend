import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { Home, ShoppingBag, Award, Bell, Calendar } from 'lucide-react-native';

// Reuse COLORS from your NationalFeed.tsx (or define here if needed)
const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  lightGrey: '#E0E0E0',
  greyText: '#A0A0A0',
  goldAccent: '#FFC80A', // Adjusted to match NationalFeed's goldAccent if needed
  darkBackground: '#1C1C1E',
  darkText: '#EAEAEA',
};

// Define TabName to match NationalFeed.tsx
type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';

// Define tabs with updated paths to match your Expo Router routes
const tabs = [
  { name: 'Home', tab: 'home' as TabName, Icon: Home, path: '/Feeds/NationalFeed' },
  { name: 'Shop', tab: 'shop' as TabName, Icon: ShoppingBag, path: '/Feeds/NationalFeed' }, // Placeholder
  { name: 'Leaderboard', tab: 'leaderboard' as TabName, Icon: Award, path: '/Feeds/NationalFeed' }, // Placeholder
  { name: 'Notifications', tab: 'notifications' as TabName, Icon: Bell, path: '/Feeds/Notification' },
  { name: 'Events', tab: 'events' as TabName, Icon: Calendar, path: '/Events/UpcomingEvent' },
];

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (path: string, tab: TabName) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? COLORS.darkBackground : COLORS.white;
  const inactiveColor = COLORS.greyText;

  const renderNavItem = (item: typeof tabs[0]) => {
    const { Icon, name, tab, path } = item;
    const isActive = activeTab === tab;
    const iconColor = isActive ? COLORS.goldAccent : inactiveColor;
    const textColor = isActive ? COLORS.goldAccent : inactiveColor;

    return (
      <TouchableOpacity
        key={tab}
        style={styles.navItem}
        onPress={() => onTabPress(path, tab)} // Call the prop function
        activeOpacity={0.7}
      >
        {/* Active Indicator Bar at the Top */}
        {isActive && <View style={styles.activeIndicator} />}
        <Icon color={iconColor} size={24} style={styles.icon} />
        <Text style={[styles.navLabel, { color: textColor }]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {tabs.map(renderNavItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: COLORS.lightGrey,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 60,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: 2,
    backgroundColor: COLORS.goldAccent,
    borderRadius: 1.5,
  },
  icon: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default BottomNav;




// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { Home, ShoppingBag, Award, Bell, Calendar } from 'lucide-react-native';

// const COLORS = {
//   white: '#FFFFFF',
//   black: '#000000',
//   lightGrey: '#E0E0E0',
//   greyText: '#A0A0A0',
//   goldAccent: '#FFC80A',
//   darkBackground: '#1C1C1E',
//   darkText: '#EAEAEA',
// };

// type TabName = 'home' | 'shop' | 'leaderboard' | 'notifications' | 'events';

// const tabs = [
//   { name: 'Home', tab: 'home' as TabName, Icon: Home, path: '/home' },
//   { name: 'Shop', tab: 'shop' as TabName, Icon: ShoppingBag, path: '/app/shop' },
//   { name: 'Leaderboard', tab: 'leaderboard' as TabName, Icon: Award, path: '/app/LeaderBoard' },
//   { name: 'Notifications', tab: 'notifications' as TabName, Icon: Bell, path: '/app/Feed/Notification' },
//   { name: 'Events', tab: 'events' as TabName, Icon: Calendar, path: '/app/Events/UpcomingEvent' },
// ];

// interface BottomNavProps {
//   activeTab: TabName;
//   onTabPress: (path: string, tab: TabName) => void;
// }

// const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
//   const inactiveColor = COLORS.greyText;

//   const renderNavItem = (item: typeof tabs[0]) => {
//     const { Icon, name, tab, path } = item;
//     const isActive = activeTab === tab;
//     const iconColor = isActive ? COLORS.goldAccent : inactiveColor;
//     const textColor = isActive ? COLORS.goldAccent : inactiveColor;

//     return (
//       <TouchableOpacity
//         key={tab}
//         style={styles.navItem}
//         onPress={() => onTabPress(path, tab)}
//         activeOpacity={0.7}
//       >
//         {isActive && <View style={styles.activeIndicator} />}
//         <Icon color={iconColor} size={24} style={styles.icon} />
//         <Text style={[styles.navLabel, { color: textColor }]}>{name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container]}>
//       {tabs.map(renderNavItem)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderTopWidth: 2,
//     borderTopColor: COLORS.lightGrey,
//     backgroundColor: COLORS.white,
//     shadowColor: COLORS.black,
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     minWidth: 60,
//     position: 'relative',
//   },
//   activeIndicator: {
//     position: 'absolute',
//     top: 0,
//     width: '50%',
//     height: 2,
//     backgroundColor: COLORS.goldAccent,
//     borderRadius: 1.5,
//   },
//   icon: {
//     marginBottom: 4,
//   },
//   navLabel: {
//     fontSize: 10,
//     fontWeight: '500',
//   },
// });

// export default BottomNav;
