import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    // useEffect debounce logic sambhalega
    useEffect(() => {
        // 1. Timer set karein (e.g., 500ms)
        const handler = setTimeout(() => {
            setDebouncedValue(searchTerm);
        }, 500);

        // 2. Cleanup function: Agar user dubara type karega, 
        // toh pichla timer delete ho jayega.
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]); // Jab bhi searchTerm badlega, ye chalega

    // Jab debouncedValue change ho, tab API call karein
    useEffect(() => {
        if (debouncedValue) {
            console.log("API Call logic yahan likhein:", debouncedValue);
        }
    }, [debouncedValue]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={(text) => setSearchTerm(text)}
            />
            <Text style={styles.status}>
                {searchTerm !== debouncedValue ? 'Typing...' : 'Ready to search!'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingLeft: 15,
    },
    status: { marginTop: 10, color: 'gray' }
});

export default SearchScreen;