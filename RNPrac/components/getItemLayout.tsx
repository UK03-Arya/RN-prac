import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

// Simplest Way
const DATA = [...Array(10).keys()].map(i => ({
    id: String(i),
    title: `Item ${i + 1}`
}));

const ITEM_HEIGHT = 70; // Fix height define karein

const MyList = () => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    // getItemLayout implementation
    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,         // Item ki height
        offset: ITEM_HEIGHT * index, // Item ka distance top se
        index,                       // Item ka index
    });

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            getItemLayout={getItemLayout} // Performance booster
            initialNumToRender={10}
            windowSize={5}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default MyList;