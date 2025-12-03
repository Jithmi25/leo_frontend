import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LeaderRoleManagementCard() {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#FFD700', '#FFA500', '#FF8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}>
        <View style={styles.innerCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.leaderText}>Leader </Text>
            <Text style={styles.roleText}>Role</Text>
          </View>
          <Text style={styles.managementText}>Management</Text>

          <View style={styles.profileContainer}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                }}
                style={styles.profileImage}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 16,
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  roleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
  },
  managementText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 16,
  },
  profileContainer: {
    marginTop: 8,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
