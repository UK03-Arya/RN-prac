import React, { useState, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

const ThrottleScroll = () => {
    const [data, setData] = useState([1, 2, 3, 4, 5]);
    const isThrottled = useRef(false); // Throttle status ko yaad rakhne ke liye

    const fetchData = () => {
        // 1. Agar throttle active hai, toh call mat hone do
        if (isThrottled.current) return;

        console.log("API Hit!");

        // 2. Throttle ON kar do
        isThrottled.current = true;

        // 3. 2 second ka gap set karo
        setTimeout(() => {
            setData(prev => [...prev, prev.length + 1]);
            isThrottled.current = false; // 4. Gap khatam, ab agla call allowed hai
        }, 2000);
    };

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) => <Text style={{ padding: 100 }}>Item {item}</Text>}
            onEndReached={fetchData}
            onEndReachedThreshold={0.1}
        />
    );
};

export default ThrottleScroll;