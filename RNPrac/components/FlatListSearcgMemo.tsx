import React, { useState, useEffect, memo } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';

const ListItem = memo(({ title }) => (
    <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text>{title}</Text>
    </View>
));

const SearchAndInitialLoad = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch data (Dono cases ke liye: Initial aur Search)
    const fetchData = async (query = '') => {
        setLoading(true);
        try {
            // Agar query hai toh search URL, warna default top items URL
            const url = query
                ? `https://jsonplaceholder.typicode.com/posts?q=${query}`
                : `https://jsonplaceholder.typicode.com/posts`;

            const response = await fetch(url);
            const data = await response.json();

            // Hamesha top 5 items hi dikhane hain
            setResults(data.slice(0, 5));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 1. Initial Load: Pehli baar app khulne par
    useEffect(() => {
        fetchData();
    }, []);

    // 2. Search Debounce: Typing ke waqt
    useEffect(() => {
        if (search.trim() === '') {
            // Agar search box khali ho jaye toh wapis initial 5 items load karo
            fetchData();
            return;
        }

        const timer = setTimeout(() => {
            fetchData(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
            <TextInput
                placeholder="Search here..."
                style={{ height: 45, borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 }}
                onChangeText={setSearch}
                value={search}
            />

            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                {search ? "Search Results (Top 5):" : "Recommended for You:"}
            </Text>

            {loading && <ActivityIndicator color="blue" />}

            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ListItem title={item.title} />}
            />
        </View>
    );
};

export default SearchAndInitialLoad;