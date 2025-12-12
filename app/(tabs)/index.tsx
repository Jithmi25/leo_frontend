import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { isAuthenticated } from '../../services/authService';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          router.replace('/Feed');
        } else {
          router.replace('/Onboarding');
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        // Handle error, maybe navigate to an error screen or Onboarding as a fallback
        router.replace('/Onboarding');
      }
    };

    // Give a small delay to prevent splash screen flickering
    const timer = setTimeout(checkAuthAndRedirect, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#B8860B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default Index;