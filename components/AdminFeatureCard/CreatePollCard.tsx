import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CreatePollCardProps {
  title: string;
  status: string;
  imageUrl: string;
  agreePercentage: number;
  disagreePercentage: number;
}

export default function CreatePollCard({
  title,
  status,
  imageUrl,
  agreePercentage,
  disagreePercentage,
}: CreatePollCardProps) {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.9)', 'rgba(139,69,19,0.5)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.createText}>Create a </Text>
        <Text style={styles.newPollText}>New Poll</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.previousPoll}>{title}</Text>
          <Text style={styles.status}>{status}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.pieChart}>
                <View
                  style={[
                    styles.pieSegment,
                    {
                      width: `${agreePercentage}%`,
                      backgroundColor: '#FFD700',
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{agreePercentage}%</Text>
              <Text style={styles.statLabel}>Agree</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.pieChart}>
                <View
                  style={[
                    styles.pieSegment,
                    {
                      width: `${disagreePercentage}%`,
                      backgroundColor: '#FFD700',
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{disagreePercentage}%</Text>
              <Text style={styles.statLabel}>Disagree</Text>
            </View>
          </View>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.pollImage} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#2A2A2A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  newPollText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  previousPoll: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#FFD700',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  pieChart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 4,
  },
  pieSegment: {
    height: 4,
    borderRadius: 2,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  pollImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});
