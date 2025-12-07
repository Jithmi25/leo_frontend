import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, Clock, MapPin, Upload } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hostClub, setHostClub] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreate = () => {
    console.log({
      title,
      description,
      hostClub,
      date,
      startTime,
      endTime,
      location,
      registrationLimit,
      imageUrl,
    });
    router.push('/Webmaster/WMAConfirmationE');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ChevronLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter event title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter event description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Host Club */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Host Club</Text>
            <TextInput
              style={styles.input}
              placeholder="Select or enter host club"
              placeholderTextColor="#999"
              value={hostClub}
              onChangeText={setHostClub}
            />
          </View>

          {/* Date */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Calendar size={16} color="#FFD700" />
              <Text style={styles.label}>Event Date</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#999"
              value={date}
              onChangeText={setDate}
            />
          </View>

          {/* Time Row */}
          <View style={styles.rowContainer}>
            <View style={[styles.formGroup, styles.flex]}>
              <View style={styles.labelContainer}>
                <Clock size={16} color="#FFD700" />
                <Text style={styles.label}>Start Time</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="HH:MM AM"
                placeholderTextColor="#999"
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <View style={[styles.formGroup, styles.flex]}>
              <View style={styles.labelContainer}>
                <Clock size={16} color="#FFD700" />
                <Text style={styles.label}>End Time</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="HH:MM PM"
                placeholderTextColor="#999"
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <MapPin size={16} color="#FFD700" />
              <Text style={styles.label}>Location</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter event location"
              placeholderTextColor="#999"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Registration Limit */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Registration Limit</Text>
            <TextInput
              style={styles.input}
              placeholder="Maximum participants"
              placeholderTextColor="#999"
              value={registrationLimit}
              onChangeText={setRegistrationLimit}
              keyboardType="number-pad"
            />
          </View>

          {/* Image Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Image</Text>
            <TouchableOpacity style={styles.imageUploadButton}>
              <Upload color="#FFD700" size={24} />
              <Text style={styles.uploadText}>Tap to upload image</Text>
            </TouchableOpacity>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            ) : null}
          </View>

          {/* Create Button */}
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButton}>
              <TouchableOpacity onPress={handleCreate} style={styles.buttonInner}>
                <Text style={styles.buttonText}>Create Event</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFBF0',
  },
  uploadText: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 8,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonInner: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  bottomPadding: {
    height: 40,
  },
});
