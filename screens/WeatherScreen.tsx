import React, { useState } from 'react';
import {
View,
Text,
TextInput,
Button,
StyleSheet,
ActivityIndicator,
Keyboard,
} from 'react-native';

export default function WeatherScreen() {
const [city, setCity] = useState('');
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const fetchWeather = async () => {
  Keyboard.dismiss();
  setWeather(null);
  setError('');
  setLoading(true);

  try {
    // Step 1: Get coordinates from Geocoding API
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found.');
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Fetch weather using coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    setWeather({
      ...weatherData.current_weather,
      location: `${name}, ${country}`,
    });
  } catch (e) {
    console.error('Error:', e);
    setError('Could not fetch weather. Check city name and try again.');
  } finally {
    setLoading(false);
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.heading}>Weather Lookup</Text>

    <TextInput
      style={styles.input}
      placeholder="Enter any city name"
      value={city}
      onChangeText={text => setCity(text)}
    />

    <Button title="Get Weather" onPress={fetchWeather} />

    {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}

    {error ? <Text style={styles.error}>{error}</Text> : null}

    {weather && (
      <View style={styles.result}>
        <Text style={styles.resultText}>Location: {weather.location}</Text>
        <Text style={styles.resultText}>Temp: {weather.temperature} °C</Text>
        <Text style={styles.resultText}>Wind: {weather.windspeed} km/h</Text>
        <Text style={styles.resultText}>Time: {weather.time}</Text>
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  marginTop: 30,
},
heading: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 15,
  textAlign: 'center',
},
input: {
  borderWidth: 1,
  borderColor: '#aaa',
  borderRadius: 6,
  padding: 10,
  marginBottom: 10,
},
error: {
  color: 'red',
  marginTop: 15,
  textAlign: 'center',
},
result: {
  marginTop: 20,
  padding: 15,
  backgroundColor: '#f0f8ff',
  borderRadius: 10,
},
resultText: {
  fontSize: 16,
  marginBottom: 5,
},
});