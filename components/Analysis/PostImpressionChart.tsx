import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';

interface PostData {
  title: string;
  impressions: number;
}

interface PostImpressionChartProps {
  data: PostData[];
}

export default function PostImpressionChart({ data }: PostImpressionChartProps) {
  const [currentWeek, setCurrentWeek] = useState<'this' | 'previous'>('this');

  const chartWidth = 360;
  const chartHeight = 200;
  const padding = 40;
  const barWidth = 50;
  const maxValue = Math.max(...data.map(d => d.impressions));

  const getBarHeight = (value: number) => {
    return ((value / maxValue) * (chartHeight - 2 * padding));
  };

  const getXPosition = (index: number) => {
    const totalBarSpace = data.length * barWidth;
    const spacing = (chartWidth - 2 * padding - totalBarSpace) / (data.length + 1);
    return padding + spacing + (index * (barWidth + spacing));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Impression Overview</Text>

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Y-axis grid lines */}
            {[0, 500, 1000, 1500, 2000, 2500].map((value) => {
              const y = chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
              return (
                <React.Fragment key={value}>
                  <Line
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                  />
                  <SvgText
                    x={padding - 10}
                    y={y + 5}
                    fontSize="10"
                    fill="#666"
                    textAnchor="end">
                    {value}
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* Bars */}
            {data.map((post, index) => {
              const barHeight = getBarHeight(post.impressions);
              const x = getXPosition(index);
              const y = chartHeight - padding - barHeight;
              const colors = ['#FFD700', '#4A5568', '#FFD700', '#4A5568'];

              return (
                <React.Fragment key={index}>
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={colors[index % colors.length]}
                    rx="4"
                  />
                  <SvgText
                    x={x + barWidth / 2}
                    y={chartHeight - padding + 20}
                    fontSize="10"
                    fill="#666"
                    textAnchor="middle">
                    {post.title}
                  </SvgText>
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 5}
                    fontSize="10"
                    fill="#666"
                    textAnchor="middle"
                    fontWeight="600">
                    {post.impressions}
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* Y-axis label */}
            <SvgText
              x={15}
              y={chartHeight / 2}
              fontSize="12"
              fill="#666"
              textAnchor="middle"
              transform={`rotate(-90, 15, ${chartHeight / 2})`}>
              Number of Impressions
            </SvgText>

            {/* X-axis label */}
            <SvgText
              x={chartWidth / 2}
              y={chartHeight - 5}
              fontSize="12"
              fill="#666"
              textAnchor="middle">
              Post Title
            </SvgText>
          </Svg>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
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
    marginBottom: 16,
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
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 8,
  },
});
