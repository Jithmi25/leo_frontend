import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface EventsCardProps {
  receivedCount: number;
}

export default function EventsCard({ receivedCount }: EventsCardProps) {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#FFD700', '#FFA500', '#FF8C00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}>
        <View style={styles.innerCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.eventsText}>Events </Text>
            <Text style={styles.ampersand}>&</Text>
          </View>
          <Text style={styles.rsvpText}>RSVP</Text>

          <View style={styles.divider} />

          <Text style={styles.recentEvent}>Recent Event</Text>

          <View style={styles.receivedContainer}>
            <Text style={styles.receivedLabel}>Received</Text>
            <View style={styles.countContainer}>
              <Text style={styles.count}>{receivedCount}</Text>
              <Text style={styles.registrations}>Registrations</Text>
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
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  ampersand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginLeft: 4,
  },
  rsvpText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#000000',
    marginVertical: 12,
    width: 60,
  },
  recentEvent: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 12,
  },
  receivedContainer: {
    marginTop: 8,
  },
  receivedLabel: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '600',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  count: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFD700',
  },
  registrations: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '600',
  },
});
