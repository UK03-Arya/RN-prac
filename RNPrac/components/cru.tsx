import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null); // Track kar raha hai kaunsa item edit ho raha hai

    const handleAction = () => {
        if (!text.trim()) return;

        if (editId) {
            // --- UPDATE LOGIC (U) ---
            const updatedList = list.map(item =>
                item.id === editId ? { ...item, name: text } : item
            );
            setList(updatedList);
            setEditId(null); // Reset edit mode
        } else {
            // ADD LOGIC
            setList([...list, { id: Date.now().toString(), name: text }]);
        }
        setText('');
    };

    const startEdit = (item) => {
        setText(item.name); // Textbox mein purana naam bhar do
        setEditId(item.id); // Current ID ko save kar lo
    };

    const deleteItem = (id) => {
        const filteredList = list.filter(item => item.id !== id);
        setList(filteredList);
        if (editId === id) { // Agar edit karte waqt delete kar diya toh reset kar do
            setEditId(null);
            setText('');
        }
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
                {/* Button ka text condition ke basis par change hoga */}
                <Button
                    title={editId ? "Update" : "Add"}
                    onPress={handleAction}
                    color={editId ? "orange" : "#2196F3"}
                />
            </View>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, editId === item.id && styles.editingItem]}>
                        <Text>{item.name}</Text>

                        <View style={{ flexDirection: 'row' }}>
                            {/* Edit Button */}
                            <TouchableOpacity onPress={() => startEdit(item)} style={{ marginRight: 15 }}>
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>Edit</Text>
                            </TouchableOpacity>

                            {/* Delete Button */}
                            <TouchableOpacity onPress={() => deleteItem(item.id)}>
                                <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
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
        marginBottom: 10,
        borderRadius: 5
    },
    editingItem: {
        borderColor: 'orange',
        borderWidth: 1,
        backgroundColor: '#fffbe6'
    }
});