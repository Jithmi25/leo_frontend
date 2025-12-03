import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';

interface YouWereTaggedCardProps {
  postsCount: number;
  messagesCount: number;
}

export default function YouWereTaggedCard({
  postsCount,
  messagesCount,
}: YouWereTaggedCardProps) {
  return (
    <LinearGradient
      colors={['#1A1A1A', '#2A2A2A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBorder}>
        <View style={styles.innerCard}>
          <View style={styles.header}>
            <Text style={styles.title}>You were tagged in</Text>
            <ChevronRight color="#FFD700" size={20} />
          </View>

          <View style={styles.divider} />

          <View style={styles.statsContainer}>
            <Text style={styles.statText}>
              <Text style={styles.count}>{postsCount}</Text>
              <Text style={styles.label}> Posts in Community</Text>
            </Text>
            <Text style={styles.statText}>
              <Text style={styles.count}>{messagesCount}</Text>
              <Text style={styles.label}> Messages in ChatRoom</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 2,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 16,
  },
  innerCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    marginVertical: 12,
  },
  statsContainer: {
    gap: 8,
  },
  statText: {
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontWeight: '700',
    color: '#FFD700',
    fontSize: 14,
  },
  label: {
    color: '#FFD700',
    fontSize: 13,
  },
});
