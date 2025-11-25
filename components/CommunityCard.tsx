import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CommunityCardProps {
  districtName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function CommunityCard({
  districtName,
  tagline,
  description,
  logoUrl,
  gradientFrom,
  gradientTo,
}: CommunityCardProps) {
  return (
    <LinearGradient
      colors={[gradientFrom, gradientTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Leo District</Text>
          <Text style={styles.districtName}>{districtName}</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>{tagline}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.logoSection}>
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 32,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textSection: {
    flex: 1,
    marginRight: 24,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
    marginBottom: 8,
  },
  districtName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'System',
    marginBottom: 16,
  },
  divider: {
    width: 64,
    height: 4,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 20,
    maxWidth: 300,
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 192,
    height: 192,
    resizeMode: 'contain',
  },
});
