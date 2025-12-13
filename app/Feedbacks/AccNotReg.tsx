import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';

const AccNotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>Account Not Found</Text>
      <Text style={styles.message}>
        Your account is not registered as a Leo member.
      </Text>
      
    </View>
  );
};

export default AccNotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#FF9500',
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#FF9500',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
