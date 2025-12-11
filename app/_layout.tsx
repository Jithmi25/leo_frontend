import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* 💡 CRITICAL FIX: 
         Move 'headerShown: false' here to screenOptions.
         This forces ALL screens (Webmaster, Events, Profile, etc.) 
         to hide their headers by default without listing them one by one.
      */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* You can still keep these if you need specific settings, 
            but they now inherit headerShown: false automatically. */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Webmaster" />

        {/* The modal is the exception, so we override it here */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal',
            headerShown: true // Only show header for modal
          }} 
        />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}