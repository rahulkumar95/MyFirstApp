import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
         <Text style={styles.text}>Welcome to Home Screen</Text>
         <Button title="Go to About" onPress={() => {console.log("Navigating to About"); navigation.navigate('About');}}/>
         <View style={{ height: 10 }} />
         <Button title="Go to Contact" onPress={() => {console.log("Navigating to Contact Page"); navigation.navigate('Contact'); }}/>
         <View style={{ height: 10 }} />
         <Button title="Go to Registration"onPress={() => {console.log("Navigating to Registration Page"); navigation.navigate('Register');}} />
         <View style={{ height: 10 }} />
         <Button title="Check Weather" onPress={() => {console.log("Navigating to Weather Page"); navigation.navigate('Weather');}} />
         <View style={{ height: 10 }} />
         <Button title="View Daily News" onPress={() => {console.log("Navigating to News Page"); navigation.navigate('News');}} />
         <View style={{ height: 10 }} />
         <Button title="Take a Photo"onPress={() => {console.log("Navigating to PhotoCapture Page"); navigation.navigate('PhotoCapture');}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;