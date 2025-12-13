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
          {/* Auth */}
          <Stack.Screen name="Auth/Signup" />
          <Stack.Screen name="Auth/ChooseAcc" />

          {/* Main / role-based */}
          <Stack.Screen name="Feed" />
          <Stack.Screen name="Feeds/SearchProfile" />
          <Stack.Screen name="SuperAdmin/Home" />

          {/* Onboarding */}
          <Stack.Screen name="Onboarding/index" />

          {/* Feedback */}
          <Stack.Screen name="Feedbacks/SuccsessSignup" />
          <Stack.Screen name="Feedbacks/AccNotReg" />

          {/* Tabs and other sections */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Webmaster" />

          {/* Modal overrides header */}
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal', headerShown: true }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
