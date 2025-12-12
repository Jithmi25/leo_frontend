import { AuthProvider } from '@/context/AuthContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Auth screens */}
          <Stack.Screen name="Auth/Signup" />
          <Stack.Screen name="Auth/ChooseAcc" />
          
          {/* Main screens based on roles */}
          <Stack.Screen name="Feed" />
          <Stack.Screen name="Feeds/SearchProfile" />
          <Stack.Screen name="SuperAdmin/Home" />
          
          {/* Onboarding */}
          <Stack.Screen name="Onboarding/index" />
          
          {/* Feedback screens */}
          <Stack.Screen name="Feedbacks/SuccsessSignup" />
          <Stack.Screen name="Feedbacks/AccNotReg" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
