import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// --- UTILS (Debounce & Throttle) ---
const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

const throttle = (fn, limit) => {
    let lastRan;
    return (...args) => {
        if (!lastRan || (Date.now() - lastRan >= limit)) {
            fn(...args);
            lastRan = Date.now();
        }
    };
};

export default function App() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]); // Initial empty list
    const [filteredList, setFilteredList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- 1. FETCH DATA FROM API ---
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map(item => ({ id: item.id.toString(), title: item.title }));
                setList(formattedData);
                setFilteredList(formattedData);
                setLoading(false);
            });
    }, []);

    // --- 2. SAVE (Create/Update + Throttle) ---
    const saveTask = () => {
        if (!text) return;
        let updated;
        if (editId) {
            updated = list.map(item => item.id === editId ? { ...item, title: text } : item);
            setEditId(null);
        } else {
            updated = [{ id: Date.now().toString(), title: text }, ...list];
        }
        setList(updated);
        setFilteredList(updated);
        setText('');
    };
    const throttledSave = useCallback(throttle(saveTask, 2000), [text, list, editId]);

    // --- 3. SEARCH (Debounce) ---
    const handleSearch = (val) => {
        const res = list.filter(item => item.title.toLowerCase().includes(val.toLowerCase()));
        setFilteredList(res);
    };
    const debouncedSearch = useCallback(debounce(handleSearch, 500), [list]);

    // --- 4. DELETE ---
    const remove = (id) => {
        const updated = list.filter(item => item.id !== id);
        setList(updated);
        setFilteredList(updated);
    };

    if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;

    return (
        <View style={{ padding: 40 }}>
            {/* SEARCH */}
            <TextInput
                placeholder="Search (Debounce)..."
                onChangeText={debouncedSearch}
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />

            {/* INPUT & SAVE */}
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="New Task..."
                style={{ borderBottomWidth: 1 }}
            />
            <Button title={editId ? "Update" : "Add"} onPress={throttledSave} />

            {/* LIST */}
            <FlatList
                data={filteredList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ width: '60%' }}>{item.title}</Text>
                        <TouchableOpacity onPress={() => { setText(item.title); setEditId(item.id); }}>
                            <Text style={{ color: 'blue' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => remove(item.id)}>
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}