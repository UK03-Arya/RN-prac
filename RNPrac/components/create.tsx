import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';

export default function App() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    const addItem = () => {
        if (!text) return;

        // Logic: Copy existing list and add new object
        setList([...list, { id: Date.now().toString(), name: text }]);
        setText('');
    };

    return (
        <View style={{ padding: 50 }}>
            {/* Create Section */}
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Enter item..."
                value={text}
                onChangeText={setText}
            />
            <Button title="Add Item" onPress={addItem} />

            {/* List Section */}
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={{ padding: 10, borderBottomWidth: 0.5 }}>
                        {item.name}
                    </Text>
                )}
            />
        </View>
    );
}