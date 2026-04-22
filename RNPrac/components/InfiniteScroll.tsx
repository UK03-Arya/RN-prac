import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const SimpleInfiniteScroll = () => {
    // Shuruat mein 20 items
    const [data, setData] = useState(Array.from({ length: 20 }).map((_, i) => i));
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        if (loading) return; // Agar pehle se load ho raha hai toh ruko

        setLoading(true);

        // 1 second ka wait (API ki tarah)
        setTimeout(() => {
            const moreData = Array.from({ length: 20 }).map((_, i) => data.length + i);
            setData([...data, ...moreData]); // Purane data mein naya data jodo
            setLoading(false);
        }, 1000);
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
                <View style={{ height: 100, borderBottomWidth: 1, justifyContent: 'center' }}>
                    <Text>Item Number {item}</Text>
                </View>
            )}
            // Main Logic Yahan Hai:
            onEndReached={loadMore}
            onEndReachedThreshold={0.1} // Jab 90% scroll ho jaye tab function chalao

            // Niche loading spinner dikhane ke liye
            ListFooterComponent={() => loading ? <ActivityIndicator size="large" /> : null}
        />
    );
};

export default SimpleInfiniteScroll;