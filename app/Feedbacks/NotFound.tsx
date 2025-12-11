import React from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';

const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OOPS!</Text>
      <Text style={styles.message}>Page Not Found</Text>
      <Text style={styles.subMessage}>
        The page you are looking for does not exist.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/Feeds/NationalFeed')}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFC72C',
  },
  message: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
  },
  subMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFC72C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#040000ff',
    fontWeight: '600',
    fontSize: 16,
  },
});
