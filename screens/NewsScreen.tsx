import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    setNews([]);
    try {
      // Replace "YOUR_API_KEY" with your actual key
      const res = await fetch(
        'https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=10&apikey=e30ae13b60bc04883e69cc00abcf00b7'
      );
      const data = await res.json();
      if (data.articles && data.articles.length > 0) {
        setNews(data.articles);
      } else {
        setError('No news found.');
      }
    } catch (e) {
      setError('Could not fetch news.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Top News</Text>
      <Button title="Fetch Headlines" onPress={fetchNews} />
      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={news}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>Source: {item.source.name}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
  newsItem: {
    marginBottom: 18,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  source: {
    fontSize: 13,
    color: '#666',
  },
});