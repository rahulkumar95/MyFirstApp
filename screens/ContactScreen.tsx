import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.info}>Email: contact@example.com</Text>
      <Text style={styles.info}>Phone: +91-12345-67890</Text>
      <Text style={styles.info}>We'd love to hear from you!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
});

export default ContactScreen;