import { Stack } from 'expo-router';

export default function WebmasterLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, // This hides the header for every file INSIDE this folder
      }} 
    />
  );
}