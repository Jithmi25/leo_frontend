import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , StatusBar} from 'react-native';

const Success: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.message}>
        Action completed successfully!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Continue')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFEF',
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
    fontSize: 32,
    fontWeight: '700',
    color: '#28A745',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#28A745',
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
