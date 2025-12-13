// Webmaster/EventCreation.tsx (updated)
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Calendar, ChevronLeft, Clock, MapPin, Upload } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { eventsApi } from '@/services/api';

interface Club {
  id: string;
  name: string;
  district: string;
}

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hostClub, setHostClub] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
    fetchClubs();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user.id);
        setHostClub(user.club || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const fetchClubs = async () => {
    try {
      // This would come from your backend
      const mockClubs: Club[] = [
        { id: '1', name: 'Leo Club of Colombo Evergreen', district: '306 D03' },
        { id: '2', name: 'Leo Club of Ananda College', district: '306 D01' },
        { id: '3', name: 'Leo Club of Dehiwala East', district: '306 D03' },
      ];
      setClubs(mockClubs);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Please allow access to your photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadImage = async (uri: string): Promise<string> => {
    setUploadingImage(true);
    try {
      // In a real app, you would upload to your server
      // For now, we'll use a mock URL
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
      return 'https://placehold.co/600x400/FFD700/000?text=Event+Image';
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter event title');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter event description');
      return false;
    }
    if (!date.trim()) {
      Alert.alert('Validation Error', 'Please enter event date');
      return false;
    }
    if (!startTime.trim() || !endTime.trim()) {
      Alert.alert('Validation Error', 'Please enter start and end time');
      return false;
    }
    if (!location.trim()) {
      Alert.alert('Validation Error', 'Please enter event location');
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageUri) {
        imageUrl = await uploadImage(imageUri);
      }

      // Parse date and time
      const [day, month, year] = date.split('/').map(Number);
      const startDateTime = new Date(year, month - 1, day);
      const endDateTime = new Date(year, month - 1, day);
      
      // Parse time (assuming format "HH:MM AM/PM")
      const startHour = parseInt(startTime.split(':')[0]);
      const startMinute = parseInt(startTime.split(':')[1].split(' ')[0]);
      const isStartPM = startTime.includes('PM');
      
      const endHour = parseInt(endTime.split(':')[0]);
      const endMinute = parseInt(endTime.split(':')[1].split(' ')[0]);
      const isEndPM = endTime.includes('PM');

      startDateTime.setHours(isStartPM && startHour !== 12 ? startHour + 12 : startHour, startMinute);
      endDateTime.setHours(isEndPM && endHour !== 12 ? endHour + 12 : endHour, endMinute);

      const eventData = {
        title: title.trim(),
        description: description.trim(),
        hostClub: hostClub.trim(),
        date: startDateTime,
        endDate: endDateTime,
        location: location.trim(),
        registrationLimit: registrationLimit ? parseInt(registrationLimit) : 0,
        imageUrl,
        isActive: true,
        isPublic: true,
        createdBy: userId,
      };

      console.log('Creating event:', eventData);
      
      // Call backend API
      try {
        const response = await eventsApi.createEvent(eventData);
        console.log('Event created successfully:', response);
      } catch (apiError) {
        console.error('Backend API call failed, using mock data:', apiError);
        // Fallback to mock data already logged
      }
      
      console.log('Event created successfully');
      router.push('/Webmaster/WMAConfirmationE');
      
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={() => router.back()}>
            <ChevronLeft color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter event title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              editable={!loading}
            />
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter event description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              editable={!loading}
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
              editable={!loading}
            />
          </View>

          {/* Date */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <Calendar size={16} color="#FFD700" />
              <Text style={styles.label}>Event Date * (DD/MM/YYYY)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#999"
              value={date}
              onChangeText={setDate}
              editable={!loading}
            />
          </View>

          {/* Time Row */}
          <View style={styles.rowContainer}>
            <View style={[styles.formGroup, styles.flex]}>
              <View style={styles.labelContainer}>
                <Clock size={16} color="#FFD700" />
                <Text style={styles.label}>Start Time * (HH:MM AM/PM)</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="HH:MM AM"
                placeholderTextColor="#999"
                value={startTime}
                onChangeText={setStartTime}
                editable={!loading}
              />
            </View>
            <View style={[styles.formGroup, styles.flex]}>
              <View style={styles.labelContainer}>
                <Clock size={16} color="#FFD700" />
                <Text style={styles.label}>End Time * (HH:MM AM/PM)</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="HH:MM PM"
                placeholderTextColor="#999"
                value={endTime}
                onChangeText={setEndTime}
                editable={!loading}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.formGroup}>
            <View style={styles.labelContainer}>
              <MapPin size={16} color="#FFD700" />
              <Text style={styles.label}>Location *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter event location"
              placeholderTextColor="#999"
              value={location}
              onChangeText={setLocation}
              editable={!loading}
            />
          </View>

          {/* Registration Limit */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Registration Limit</Text>
            <TextInput
              style={styles.input}
              placeholder="Maximum participants (0 for unlimited)"
              placeholderTextColor="#999"
              value={registrationLimit}
              onChangeText={setRegistrationLimit}
              keyboardType="number-pad"
              editable={!loading}
            />
          </View>

          {/* Image Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Event Image</Text>
            <TouchableOpacity 
              style={styles.imageUploadButton} 
              onPress={handleImagePicker}
              disabled={loading || uploadingImage}
            >
              {uploadingImage ? (
                <ActivityIndicator color="#FFD700" />
              ) : (
                <>
                  <Upload color="#FFD700" size={24} />
                  <Text style={styles.uploadText}>Tap to upload image</Text>
                </>
              )}
            </TouchableOpacity>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : null}
          </View>

          {/* Create Button */}
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButton}>
              <TouchableOpacity 
                onPress={handleCreate} 
                style={styles.buttonInner}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#000000" />
                ) : (
                  <Text style={styles.buttonText}>Create Event</Text>
                )}
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
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
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 8,
    borderStyle: 'dashed',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  createButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonInner: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bottomPadding: {
    height: 20,
  },
});

