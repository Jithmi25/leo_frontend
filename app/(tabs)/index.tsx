import React, { useEffect } from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
// 💡 FIX 1: Import Stack to locally hide the header
import { useRouter, Stack } from 'expo-router'; 

const logoImage = require('../../assets/images/logo.png'); 

const SplashScreen = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Onboarding after 4 seconds
      router.replace('/Onboarding');
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    // 💡 FIX 2: Use SafeAreaView as the root container
    <SafeAreaView style={styles.container}>
      
      {/* 💡 FIX 3: Explicitly hide the header for this screen */}
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* 💡 FIX 4: Set StatusBar to match the white background */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Image 
          source={logoImage} 
          style={styles.logo}
          resizeMode="contain" 
        />
        <Text style={styles.title}>
          LeoConnect Sri Lanka
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0
  },
  content: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  logo: {
    width: 200, 
    height: 200, 
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    color: '#B8860B', 
    fontWeight: '600',
  },
});

export default SplashScreen;