import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// --- Validation Logic Exported for Jest Tests ---
export function validateRegistration(name: string, email: string): string {
 if (!name || !email) return 'All fields are required!';
 if (!email.includes('@')) return 'Enter a valid email!';
 return '';
}

const RegistrationScreen = () => {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [error, setError] = useState('');

 const handleRegister = () => {
   const validationMsg = validateRegistration(name, email);
   if (validationMsg) {
     setError(validationMsg);
     return;
   }
   setError('');
   // Simulate registration (in real app, send to server here)
   alert('Registration successful!');
   setName('');
   setEmail('');
 };

 return (
   <View style={styles.container}>
     <Text style={styles.title}>User Registration</Text>
     {error ? <Text style={styles.error}>{error}</Text> : null}
     <TextInput
       style={styles.input}
       placeholder="Name"
       value={name}
       onChangeText={setName}
     />
     <TextInput
       style={styles.input}
       placeholder="Email"
       keyboardType="email-address"
       value={email}
       onChangeText={setEmail}
     />
     <Button title="Register" onPress={handleRegister} />
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
 input: {
   width: '100%',
   maxWidth: 300,
   padding: 10,
   marginBottom: 16,
   borderWidth: 1,
   borderColor: '#ccc',
   borderRadius: 6,
   fontSize: 16,
   backgroundColor: '#f9f9f9',
 },
 error: {
   color: 'red',
   marginBottom: 10,
 },
});

export default RegistrationScreen;