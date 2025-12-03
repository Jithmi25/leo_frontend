import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';

// 1. Update the Interface names to match the incoming data
interface PollCardProps {
  title: string;
  status: string;
  imageUrl: string;
  // Change 'likePercentage' to 'agreePercentage'
  agreePercentage: number;
  // Change 'commentPercentage' to 'disagreePercentage'
  disagreePercentage: number;
}

// 2. Update the function signature and destructured props
export default function PostToFeedCard({
  title,
  status,
  imageUrl,
  // Use the new prop names
  agreePercentage,
  disagreePercentage,
}: PollCardProps) {
  const renderPercentageCircle = (percentage: number) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <Svg width={44} height={44} viewBox="0 0 44 44">
        <Circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2.5"
        />
        <Circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#FFD700"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="22, 22"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.gradientBorder}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.borderGradient}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.postText}>Create new</Text>
              <View style={styles.feedBackground}>
                <Text style={styles.feedText}>Poll</Text>
              </View>
            </View>
            <ChevronRight color="#FFD700" size={24} strokeWidth={3} />
          </View>

          <View style={styles.divider} />

          <View style={styles.content}>
            <View style={styles.leftContent}>
              <Text style={styles.previousPost}>{title}</Text>
              <Text style={styles.status}>{status}</Text>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  {/* 3. Use 'agreePercentage' */}
                  {renderPercentageCircle(agreePercentage)}
                  {/* 4. Use 'agreePercentage' for text display */}
                  <Text style={styles.percentage}>{agreePercentage}%</Text>
                  <Text style={styles.statLabel}>Agree</Text>
                </View>

                <View style={styles.statItem}>
                  {/* 5. Use 'disagreePercentage' */}
                  {renderPercentageCircle(disagreePercentage)}
                  {/* 6. Use 'disagreePercentage' for text display */}
                  <Text style={styles.percentage}>{disagreePercentage}%</Text>
                  <Text style={styles.statLabel}>Dissagree</Text>
                </View>
              </View>
            </View>

            <Image source={{ uri: imageUrl }} style={styles.postImage} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  borderGradient: {
    padding: 2,
    borderRadius: 16,
  },
  card: {
    backgroundColor: '#3A3A3A',
    borderRadius: 14,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  feedBackground: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  feedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#FFD700',
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  leftContent: {
    flex: 1,
  },
  previousPost: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 18,
  },
  status: {
    fontSize: 12,
    color: '#FFD700',
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  percentage: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
  statLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  postImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
});