import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function TodoList() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<{ id: string, text: string }[]>([]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: task }]);
            setTask('');
        }
    };

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todo List (Array State Practice)</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Task"
                    value={task}
                    onChangeText={setTask}
                />
                <Button title="Add" onPress={addTask} />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.text}</Text>
                        <TouchableOpacity onPress={() => removeTask(item.id)}>
                            <Text style={styles.removeBtn}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, padding: 10, borderRadius: 5 },
    taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderColor: '#eee' },
    removeBtn: { color: 'red', fontWeight: 'bold' }
});
