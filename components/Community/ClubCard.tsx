import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native'; // Add this if not already imported
import { router } from 'expo-router';
interface ClubCardProps {
  clubName: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function ClubCard({
  clubName,
  gradientFrom,
  gradientTo,
}: ClubCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[gradientFrom, gradientTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >

        <TouchableOpacity 
  style={styles.innerContent} 
  onPress={() => router.push('/Community/HomeCommunity')} // Navigate to the community/homeCommunity route
>
  <Text style={styles.clubName}>{clubName}</Text>
</TouchableOpacity>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    minWidth: 240,
  },
  border: {
    padding: 3,
    borderRadius: 16,
  },
  innerContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
  },
});
