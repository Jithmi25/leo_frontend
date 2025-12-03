import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy } from 'lucide-react-native';

export default function LeaderboardCard() {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#FFD700', '#FFA500', '#FF8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}>
        <View style={styles.innerCard}>
          <View style={styles.content}>
            <Trophy color="#FFD700" size={40} />
            <View style={styles.textContainer}>
              <Text style={styles.leaderboardText}>Leaderboard </Text>
              <Text style={styles.ampersand}>&</Text>
            </View>
            <Text style={styles.achievementsText}>Achievements</Text>
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
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
  },
  ampersand: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 4,
  },
  achievementsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
});
