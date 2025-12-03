import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileCardProps {
  name: string;
  surname: string;
  profilePic: string;
  district: string;
  position: string;
  username: string;
}

export default function ProfileCard({
  name,
  surname,
  profilePic,
  district,
  position,
  username,
}: ProfileCardProps) {
  return (
    <LinearGradient
      colors={['#000000', '#8B4513', '#FFD700']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name} {surname}</Text>
          <Text style={styles.surname}>{surname}</Text>
          <View style={styles.divider} />
          <Text style={styles.district}>{district}</Text>
          <Text style={styles.position}>{position}</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  surname: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: 150,
    marginVertical: 12,
  },
  district: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 8,
  },
  username: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
