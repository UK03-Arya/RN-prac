import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';

import Counter from './components/Counter';
import TodoList from './components/TodoList';
import ApiFetch from './components/ApiFetch';
import UserSearch from './components/UserSearch';
import Debounce from './components/Debounce';

export default function App() {
  const [activeComponent, setActiveComponent] = useState('Menu');

  const components = [
    { name: 'Counter', component: <Counter /> },
    { name: 'TodoList', component: <TodoList /> },
    { name: 'ApiFetch', component: <ApiFetch /> },
    { name: 'UserSearch', component: <UserSearch /> },
    { name: 'Debounce', component: <Debounce /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Practice App</Text>
        {activeComponent !== 'Menu' && (
          <TouchableOpacity onPress={() => setActiveComponent('Menu')}>
            <Text style={styles.backButton}>Back to Menu</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        {activeComponent === 'Menu' ? (
          <ScrollView>
            {components.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => setActiveComponent(item.name)}
              >
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          components.find(c => c.name === activeComponent)?.component
        )}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40 },
  header: { padding: 20, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  backButton: { color: '#007AFF', fontSize: 16 },
  content: { flex: 1, padding: 15 },
  menuItem: { padding: 20, backgroundColor: '#fff', marginVertical: 8, borderRadius: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  menuItemText: { fontSize: 18, fontWeight: '600', color: '#333' }
});