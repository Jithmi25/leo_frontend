import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

interface ClubData {
  club: number;
  lastWeek: number;
  thisWeek: number;
}

interface ClubAnalysisChartProps {
  data: ClubData[];
}

export default function ClubAnalysisChart({ data }: ClubAnalysisChartProps) {
  const [currentWeek, setCurrentWeek] = useState<'this' | 'previous'>('this');

  const chartWidth = 360;
  const chartHeight = 200;
  const padding = 40;
  const maxValue = Math.max(...data.map(d => Math.max(d.lastWeek, d.thisWeek)));

  const getYPosition = (value: number) => {
    return chartHeight - padding - ((value / maxValue) * (chartHeight - 2 * padding));
  };

  const getXPosition = (index: number) => {
    return padding + (index * ((chartWidth - 2 * padding) / (data.length - 1)));
  };

  const createPath = (dataKey: 'lastWeek' | 'thisWeek') => {
    let path = `M ${getXPosition(0)} ${getYPosition(data[0][dataKey])}`;
    for (let i = 1; i < data.length; i++) {
      const x = getXPosition(i);
      const y = getYPosition(data[i][dataKey]);
      const prevX = getXPosition(i - 1);
      const prevY = getYPosition(data[i - 1][dataKey]);
      const cpX = (prevX + x) / 2;
      path += ` Q ${cpX} ${prevY}, ${cpX} ${(prevY + y) / 2} Q ${cpX} ${y}, ${x} ${y}`;
    }
    return path;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Club Analysis</Text>

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

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#6B7FFF' }]} />
          <Text style={styles.legendText}>Last Week</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
          <Text style={styles.legendText}>This Week</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Y-axis grid lines */}
            {[0, 2, 4, 6, 8, 10, 12].map((value) => (
              <React.Fragment key={value}>
                <Path
                  d={`M ${padding} ${getYPosition(value)} L ${chartWidth - padding} ${getYPosition(value)}`}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="1"
                />
                <SvgText
                  x={padding - 10}
                  y={getYPosition(value) + 5}
                  fontSize="10"
                  fill="#666"
                  textAnchor="end">
                  {value}
                </SvgText>
              </React.Fragment>
            ))}

            {/* Last Week Line */}
            <Path
              d={createPath('lastWeek')}
              stroke="#6B7FFF"
              strokeWidth="3"
              fill="none"
            />
            {data.map((point, index) => (
              <Circle
                key={`last-${index}`}
                cx={getXPosition(index)}
                cy={getYPosition(point.lastWeek)}
                r="4"
                fill="#6B7FFF"
              />
            ))}

            {/* This Week Line */}
            <Path
              d={createPath('thisWeek')}
              stroke="#FFD700"
              strokeWidth="3"
              fill="none"
            />
            {data.map((point, index) => (
              <Circle
                key={`this-${index}`}
                cx={getXPosition(index)}
                cy={getYPosition(point.thisWeek)}
                r="4"
                fill="#FFD700"
              />
            ))}

            {/* X-axis labels */}
            {data.map((point, index) => (
              <SvgText
                key={`label-${index}`}
                x={getXPosition(index)}
                y={chartHeight - padding + 20}
                fontSize="10"
                fill="#666"
                textAnchor="middle">
                Club {point.club}
              </SvgText>
            ))}
          </Svg>
        </View>
      </ScrollView>
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 8,
  },
});
