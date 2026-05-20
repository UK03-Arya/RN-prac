import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

const LIMIT = 15;

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAllLoaded, setAllLoaded] = useState(false);

  const fetchData = async (pageNumber) => {
    if (loading || isAllLoaded) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.example.com/products?page=${pageNumber}&limit=${LIMIT}`
      );
      const json = await response.json();
      
      if (json.length > 0) {
        setData((prevData) => [...prevData, ...json]);
        setPage(pageNumber + 1);
      } else {
        setAllLoaded(true);
      }
    } catch (err) {
      console.log("Data fetch error:", err); // ✅ 'errr' ko 'err' kar diya
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1); // ✅ Shuruat mein page 1 bhejna zaroori tha
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text>{item.id}. {item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading && !isAllLoaded) {
      fetchData(page);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        initialNumToRender={LIMIT}
      />
    </SafeAreaView>
  );
}


// Infinite Scroll List: API se data fetch karke FlatList mein dikhana aur bottom par naya page load karna.