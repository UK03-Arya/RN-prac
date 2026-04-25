// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';

// const ListItem = React.memo(({ item }) => (
//     <View style={styles.card}>
//         <Text style={styles.title}>{item.id}. {item.title}</Text>
//     </View>
// ));

// export default function App() {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [inputText, setInputText] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     // Sabse important: Ye track karega ki user ne scroll start kiya hai ya nahi
//     const isScrolling = useRef(false);

//     const loadData = async (pageNum, query = '', isNewSearch = false) => {
//         if (loading) return;
//         setLoading(true);

//         try {
//             const url = `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=5&q=${query}`;
//             const response = await fetch(url);
//             const json = await response.json();

//             setData(prev => isNewSearch ? json : [...prev, ...json]);
//         } catch (e) {
//             console.error(e);
//         } finally {
//             setLoading(false);
//             isScrolling.current = false; // Fetch ke baad reset
//         }
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => setSearchQuery(inputText), 500);
//         return () => clearTimeout(timer);
//     }, [inputText]);

//     useEffect(() => {
//         setPage(1);
//         isScrolling.current = false;
//         loadData(1, searchQuery, true);
//     }, [searchQuery]);

//     const handleLoadMore = () => {
//         // SIRF tab load karo jab user ne khud ungli se scroll kiya ho (isScrolling.current)
//         if (!loading && isScrolling.current) {
//             const nextPage = page + 1;
//             setPage(nextPage);
//             loadData(nextPage, searchQuery, false);
//         }
//     };

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Search (Ab ek saath nahi aayega)..."
//                 onChangeText={setInputText}
//                 value={inputText}
//             />

//             <FlatList
//                 data={data}
//                 keyExtractor={(item, index) => `${item.id}-${index}`}
//                 renderItem={({ item }) => <ListItem item={item} />}

//                 // --- YE 3 PROPERTIES ISSUE FIX KARENGI ---
//                 onScrollBeginDrag={() => { isScrolling.current = true; }} // User ne scroll shuru kiya
//                 onEndReached={handleLoadMore}
//                 onEndReachedThreshold={0.01} // Ekdum bottom par hi trigger

//                 ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="red" /> : null}

//                 // Layout fixing
//                 contentContainerStyle={{ flexGrow: 1 }}
//                 initialNumToRender={5}
//                 maxToRenderPerBatch={5}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     input: { height: 50, borderWidth: 1, margin: 10, padding: 10, borderRadius: 8, borderColor: '#ccc' },
//     card: {
//         height: 60, // Height aur badha di taaki screen jaldi na bhare
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//         justifyContent: 'center',
//         backgroundColor: 'white'
//     },
//     title: { fontSize: 16, fontWeight: 'bold' }
// });





import React, { memo } from 'react';
import { View, Text, FlatList } from 'react-native';

// 1. RenderItem ko memoize karein
const ListItem = memo(({ item }) => {
    console.log("Rendering item:", item.id);
    return (
        <View style={{ padding: 20, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
        </View>
    );
});

const MyList = ({ data }) => {
    // 2. renderItem function ko component ke bahar ya useCallback mein rakhein
    const renderItem = ({ item }) => <ListItem item={item} />;

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};