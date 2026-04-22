
import React from 'react'
import { View, Text, FlatList } from 'react-native'

const ITEM_HEIGHT = 50

const MyList = () => {


    const DATA = Array.from({ length: 50 }).map((_, index) => ({
        id: String(index),
        title: `item ${index}`
    }))


    const getLay = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
    })
    return (
        <View>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (
                    <View style={{ height: ITEM_HEIGHT }}>
                        <Text>
                            {item.title}
                        </Text>
                    </View>
                )}
            />

            getItemLayout={getLay}
        </View>
    )
}


export default MyList