import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItem
} from 'react-native';

// 1. Pehle Type define karo (TS ki pehchaan)
interface UserItem {
    id: string;
    name: string;
}

// 2. Constants bahar rakho (Clean Code)
const ITEM_HEIGHT = 70;

const UserListComponent = () => {

    // 3. Simple 'for' loop se data taiyaar karna
    const data: UserItem[] = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            id: i.toString(),
            name: `User ${i + 1}`,
        });
    }

    // 4. Render function (Har row kaise dikhegi)
    const renderItem: ListRenderItem<UserItem> = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    // 5. getItemLayout (Performance optimization)
    const getItemLayout = (_: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemLayout={getItemLayout} // Isse list ko pehle hi layout pata chal jayega
                // Extra optimization props
                initialNumToRender={10}
                windowSize={5}
            />
        </View>
    );
};

// 6. Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    itemContainer: {
        height: ITEM_HEIGHT, // getItemLayout ki 'length' se match hona chahiye
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});

export default UserListComponent;