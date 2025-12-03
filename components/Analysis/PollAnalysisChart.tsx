import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';

interface PollAnalysisChartProps {
  agreePercentage: number;
  disagreePercentage: number;
}

export default function PollAnalysisChart({
  agreePercentage,
  disagreePercentage,
}: PollAnalysisChartProps) {
  const [currentWeek, setCurrentWeek] = useState<'this' | 'previous'>('this');

  const size = 200;
  const strokeWidth = 40;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const agreeAngle = (agreePercentage / 100) * 360;
  const disagreeAngle = (disagreePercentage / 100) * 360;

  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poll Analysis</Text>

      <View style={styles.weekSelector}>
        <TouchableOpacity
          style={styles.weekButton}
          onPress={() => setCurrentWeek('previous')}>
          <ChevronLeft color="#FFD700" size={20} />
          <Text style={styles.weekText}>Previous Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.weekButton}
          onPress={() => setCurrentWeek('this')}>
          <Text style={styles.weekText}>This Week</Text>
          <ChevronRight color="#FFD700" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {/* Disagree segment (gray) */}
            <Path
              d={createArc(0, disagreeAngle)}
              stroke="#808080"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Agree segment (gold) */}
            <Path
              d={createArc(disagreeAngle, disagreeAngle + agreeAngle)}
              stroke="#FFD700"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </G>
        </Svg>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#FFD700' }]} />
            <Text style={styles.legendText}>Agree</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#808080' }]} />
            <Text style={styles.legendText}>Disagree</Text>
          </View>
        </View>

        <View style={styles.percentageContainer}>
          <View style={styles.percentageItem}>
            <Text style={styles.percentageLabel}>Disagree: 32%</Text>
          </View>
          <View style={styles.percentageItem}>
            <Text style={styles.percentageLabel}>Agree: 68%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000000',
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  weekButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weekText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  chartContainer: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  percentageContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  percentageItem: {
    marginVertical: 4,
  },
  percentageLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});
