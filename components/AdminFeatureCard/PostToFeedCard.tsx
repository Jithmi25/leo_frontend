import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';

interface PostToFeedCardProps {
  title: string;
  status: string;
  imageUrl: string;
  likePercentage: number;
  commentPercentage: number;
}

export default function PostToFeedCard({
  title,
  status,
  imageUrl,
  likePercentage,
  commentPercentage,
}: PostToFeedCardProps) {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'rgba(139,69,19,0.4)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.postText}>Post to </Text>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTextWrapper}>
            <Text style={styles.feedText}>Feed</Text>
          </LinearGradient>
        </View>
        <ChevronRight color="#FFD700" size={24} />
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.previousPost}>{title}</Text>
          <Text style={styles.status}>{status}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.pieChart}>
                <View
                  style={[
                    styles.pieSegment,
                    {
                      width: `${likePercentage}%`,
                      backgroundColor: '#FFD700',
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{likePercentage}%</Text>
              <Text style={styles.statLabel}>Like</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.pieChart}>
                <View
                  style={[
                    styles.pieSegment,
                    {
                      width: `${commentPercentage}%`,
                      backgroundColor: '#FFD700',
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{commentPercentage}%</Text>
              <Text style={styles.statLabel}>Comment</Text>
            </View>
          </View>
        </View>

        <Image source={{ uri: imageUrl }} style={styles.postImage} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#2A2A2A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  gradientTextWrapper: {
    borderRadius: 4,
  },
  feedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
  previousPost: {
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
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});
