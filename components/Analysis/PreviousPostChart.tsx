import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface PreviousPostCardProps {
  title: string;
  status: string;
  imageUrl: string;
  likePercentage: number;
  commentPercentage: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function PreviousPostCard({
  title,
  status,
  imageUrl,
  likePercentage,
  commentPercentage,
  onPrevious,
  onNext,
}: PreviousPostCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
          <ChevronLeft color="#000000" size={24} />
          <Text style={styles.navText}>Previous Post</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onNext}>
          <Text style={styles.navText}>Next Post</Text>
          <ChevronRight color="#000000" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>{title}</Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  status: {
    fontSize: 13,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 6,
  },
  pieSegment: {
    height: 6,
    borderRadius: 3,
  },
  percentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 16,
  },
});
