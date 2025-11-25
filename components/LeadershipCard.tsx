import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LeadershipCardProps {
  name: string;
  position: string;
  imageUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function LeadershipCard({
  name,
  position,
  imageUrl,
  gradientFrom,
  gradientTo,
}: LeadershipCardProps) {
  return (
    <LinearGradient
      colors={[gradientFrom, gradientTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: 200,
    minHeight: 280,
    marginRight: 12,
  },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  position: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
});
