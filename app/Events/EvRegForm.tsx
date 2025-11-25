import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  darkBackground: '#1C1C1E',
  darkText: '#EAEAEA',
  greyText: '#A0A0A0',
  olive: '#6B6B47',
  lightGrey: '#F5F5F5',
  border: '#E0E0E0',
};

export default function EvRegForm() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const params = useLocalSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    leoClub: '',
    emergencyContact: '',
    dietaryRestrictions: '',
  });

  const backgroundColor = isDark ? COLORS.darkBackground : COLORS.white;
  const textColor = isDark ? COLORS.darkText : COLORS.black;
  const headerBg = isDark ? COLORS.black : COLORS.olive;
  const inputBg = isDark ? '#2C2C2E' : COLORS.lightGrey;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Registration Successful',
      'You have successfully registered for the event!',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={COLORS.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Registration</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eventTitle, { color: textColor }]}>
          {params.eventTitle || 'Event Registration'}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.greyText}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>
              Email Address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.greyText}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.greyText}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Leo Club</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Enter your Leo Club name"
              placeholderTextColor={COLORS.greyText}
              value={formData.leoClub}
              onChangeText={(value) => handleInputChange('leoClub', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>
              Emergency Contact
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Emergency contact number"
              placeholderTextColor={COLORS.greyText}
              keyboardType="phone-pad"
              value={formData.emergencyContact}
              onChangeText={(value) => handleInputChange('emergencyContact', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>
              Dietary Restrictions
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                { backgroundColor: inputBg, color: textColor },
              ]}
              placeholder="Any dietary restrictions or allergies?"
              placeholderTextColor={COLORS.greyText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={formData.dietaryRestrictions}
              onChangeText={(value) => handleInputChange('dietaryRestrictions', value)}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Register for Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  submitButton: {
    backgroundColor: COLORS.goldAccent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
