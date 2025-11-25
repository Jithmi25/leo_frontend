import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  beige: '#F5F1E8',
  darkGrey: '#4A4A4A',
  mediumGrey: '#6A6A6A',
  goldAccent: '#FFC80A',
  borderLight: '#E8E8E8',
};

export interface MyEventData {
  id: string;
  title: string;
  organization: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  status: 'completed' | 'registered';
  statusColor?: string;
}

interface MyEventCardProps {
  event: MyEventData;
}

const MyEventCard: React.FC<MyEventCardProps> = ({ event }) => {
  const getStatusStyle = () => {
    if (event.status === 'completed') {
      return {
        backgroundColor: event.statusColor || COLORS.goldAccent,
        text: 'Completed',
      };
    }
    return {
      backgroundColor: event.statusColor || COLORS.darkGrey,
      text: 'Registered',
    };
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.organization}>{event.organization}</Text>

          <View style={styles.infoRow}>
            <Calendar color={COLORS.mediumGrey} size={16} />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Clock color={COLORS.mediumGrey} size={16} />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <MapPin color={COLORS.mediumGrey} size={16} />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: statusStyle.backgroundColor }]}
          >
            <Text style={styles.statusText}>{statusStyle.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 0,
    backgroundColor: COLORS.beige,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'column',
  },
  textContent: {
    marginBottom: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  organization: {
    fontSize: 13,
    color: COLORS.mediumGrey,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.mediumGrey,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'flex-end',
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MyEventCard;
