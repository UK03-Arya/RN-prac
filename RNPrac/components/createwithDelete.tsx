import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    const addItem = () => {
        if (!text.trim()) return;
        setList([...list, { id: Date.now().toString(), name: text }]);
        setText('');
    };

    // --- DELETE LOGIC (D) ---
    const deleteItem = (id) => {
        // filter un items ko rakhta hai jinki ID match nahi karti
        const filteredList = list.filter(item => item.id !== id);
        setList(filteredList);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter item..."
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Add" onPress={addItem} />
            </View>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text>{item.name}</Text>

                        {/* Delete Button */}
                        <TouchableOpacity onPress={() => deleteItem(item.id)}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { borderBottomWidth: 1, flex: 1, marginRight: 10 },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#eee',
        marginBottom: 10
    },
});