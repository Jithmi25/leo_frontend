import Constants from "expo-constants";
import { useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react-native';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  darkText: '#EAEAEA',
  greyText: '#A0A0A0',
};

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl!;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function UploadPhoto() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!imageUrl.trim()) {
      Alert.alert('Error', 'Please enter an image URL');
      return;
    }

    setIsUploading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();

      const { error } = await supabase.from('gallery_photos').insert({
        user_id: userData?.user?.id || null,
        user_name: userName,
        user_avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
        image_url: imageUrl,
        event_id: 'general',
      });

      if (error) {
        Alert.alert('Error', 'Failed to upload photo');
        console.error(error);
      } else {
        Alert.alert('Success', 'Photo uploaded successfully!');
        router.back();
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldAccent]}
      locations={[0.0, 0.35, 0.6]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={COLORS.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload Photo</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.whiteCard}>
          <View style={styles.uploadPreview}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderContainer}>
                <ImageIcon color={COLORS.greyText} size={48} />
                <Text style={styles.placeholderText}>Image Preview</Text>
              </View>
            )}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={COLORS.greyText}
              value={userName}
              onChangeText={setUserName}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Paste image URL from Pexels or other sources"
              placeholderTextColor={COLORS.greyText}
              value={imageUrl}
              onChangeText={setImageUrl}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.helperText}>
              Example: https://images.pexels.com/photos/...
            </Text>

            <TouchableOpacity
              style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
              onPress={handleUpload}
              disabled={isUploading}
            >
              <Upload color={COLORS.white} size={20} />
              <Text style={styles.uploadButtonText}>
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },

  whiteCard: {
    flex: 1,
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 100,
  },

  uploadPreview: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginBottom: 24,
    overflow: 'hidden',
  },

  previewImage: {
    width: '100%',
    height: '100%',
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    marginTop: 8,
    color: COLORS.greyText,
    fontSize: 14,
  },

  form: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 20,
    color: COLORS.black,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  helperText: {
    fontSize: 12,
    color: COLORS.greyText,
    marginTop: -12,
    marginBottom: 24,
  },

  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.goldAccent,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },

  uploadButtonDisabled: {
    opacity: 0.6,
  },

  uploadButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
