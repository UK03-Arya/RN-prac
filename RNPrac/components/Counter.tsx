import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Child Component: Isse React.memo mein wrap kiya gaya hai
// Taaki ye tabhi re-render ho jab iske props change hon
const MemoizedButton = React.memo(({ onPress, title }) => {
    console.log(`${title} Button Rendered`);
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
});

const ParentComponent = () => {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(false);

    // useCallback ka use: 
    // Ye function tab tak purana wala hi rahega jab tak 'count' change nahi hota
    const incrementCount = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []); // Dependency array empty hai matlab ye function sirf ek baar banega

    // test
    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Count: {count}</Text>

            {/* Ye button re-render nahi hoga jab 'otherState' change hoga */}
            <MemoizedButton title="Increment Count" onPress={incrementCount} />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'gray' }]}
                onPress={() => setOtherState(!otherState)}
            >
                <Text style={styles.text}>Toggle Other State</Text>
            </TouchableOpacity>

            <Text>Other State: {otherState.toString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    counterText: { fontSize: 24, marginBottom: 20 },
    button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginVertical: 10 },
    text: { color: 'white', fontWeight: 'bold' }
});

export default ParentComponent;