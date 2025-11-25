import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, Share2, CalendarCheck, UserCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  beige: '#F5F1E8',
  darkGrey: '#4A4A4A',
  mediumGrey: '#6A6A6A',
  goldAccent: '#FFC80A',
  borderLight: '#E8E8E8',
};

export interface UpcomingEventData {
  id: string;
  title: string;
  organization: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  badge?: string;
}

interface UpcomingEventCardProps {
  event: UpcomingEventData;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
  const router = useRouter();

  const handleAttendPress = () => {
    router.push({
      pathname: '/app/Events/EvRegForm' as any, // Cast to any to bypass strict typing
      params: { eventId: event.id, eventTitle: event.title }
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {event.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{event.badge}</Text>
          </View>
        )}
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

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAttendPress}>
            <UserCheck color={COLORS.mediumGrey} size={20} />
            <Text style={styles.actionText}>Attend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share2 color={COLORS.mediumGrey} size={20} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <CalendarCheck color={COLORS.mediumGrey} size={20} />
            <Text style={styles.actionText}>Reminder</Text>
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
  badge: {
    position: 'absolute',
    left: 12,
    bottom: 8,
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textContent: {
    marginBottom: 12,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.mediumGrey,
    marginLeft: 6,
    fontWeight: '500',
  },
});

export default UpcomingEventCard;