import React, { useState, useCallback, memo } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// 1. Optimized Item Component
const ListItem = memo(({ item, onEdit, onDelete }) => (
    <View style={styles.itemRow}>
        <Text style={{ flex: 1 }}>{item.text}</Text>
        <TouchableOpacity onPress={() => onEdit(item)}>
            <Text style={{ color: 'blue', marginRight: 15 }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>
    </View>
));

const CRUDApp = () => {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [editId, setEditId] = useState(null);

    // --- CRUD LOGIC ---

    // CREATE & UPDATE
    const handleSave = () => {
        if (!text.trim()) return;

        if (editId) {
            // Logic: Update existing item
            setList(list.map(item => item.id === editId ? { ...item, text } : item));
            setEditId(null);
        } else {
            // Logic: Add new item
            const newItem = { id: Date.now().toString(), text };
            setList([...list, newItem]);
        }
        setText('');
    };

    // DELETE
    const handleDelete = useCallback((id) => {
        setList(prev => prev.filter(item => item.id !== id));
    }, []);

    // EDIT SETUP
    const handleEdit = (item) => {
        setText(item.text);
        setEditId(item.id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CRUD Operations</Text>

            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type here..."
                    value={text}
                    onChangeText={setText} // Yahan galti thi, ab fixed hai
                />
                <TouchableOpacity onPress={handleSave} style={[styles.btn, { backgroundColor: editId ? '#ffa500' : '#4CAF50' }]}>
                    <Text style={{ color: 'white' }}>{editId ? 'Update' : 'Add'}</Text>
                </TouchableOpacity>
            </View>

            {/* List Section */}
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem item={item} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 40, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
    btn: { marginLeft: 10, padding: 10, borderRadius: 5, justifyContent: 'center' },
    itemRow: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' }
});

export default CRUDApp;