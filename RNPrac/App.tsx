import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { useMemo, useState, useEffect } from 'react';

export default function App() {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(0);

  // Maan lo ye hamara heavy data hai
  const users = [
    { id: 1, name: 'Babita' },
    { id: 2, name: 'Arjun' },
    { id: 3, name: 'Nitin' },
    // ... hazaro users ho sakte hain
  ];

  // 1. Heavy Calculation (Optimization Point)
  const filteredUsers = useMemo(() => {
    console.log("Filtering users... (Heavy Task)");
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]); // Sirf tab chalega jab 'search' change hoga

  // 2. Timer (Jo har second re-render trigger karega)
  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Timer: {timer}s</Text>

      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  timer: { fontSize: 18, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 0.5 }
});