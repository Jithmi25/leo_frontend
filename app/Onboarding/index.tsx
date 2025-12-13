import React from 'react';
// 💡 FIX 1: Import Stack to control navigation options
import { Stack } from 'expo-router';
import OnboardingScreen from '../../components/OnboardingScreening';

export default function OnboardingPage() {
  return (
    <>
      {/* 💡 FIX 2: Explicitly hide the header for this screen */}
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Render the actual Onboarding content */}
      <OnboardingScreen />
    </>
  );
}