import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';

export default function App() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);

    const addItem = () => {
        if (!text) return;

        // Logic: Copy existing list and add new object
        setList([...list, { id: Date.now().toString(), name: text }]);
        setText('');
    };

    return (
        <View style={{ padding: 50 }}>
            {/* Create Section */}
            <TextInput
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
                placeholder="Enter item..."
                value={text}
                onChangeText={setText}
            />
            <Button title="Add Item" onPress={addItem} />

            {/* List Section */}
            <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={{ padding: 10, borderBottomWidth: 0.5 }}>
                        {item.name}
                    </Text>
                )}
            />
        </View>
    );
}


// prac


// import React,{useState} from 'react'
// import {View,Text,TextInput,FlatList,Button} from 'react-native'


// const AssetExample=()=>{
// const [list,setList]=useState([])
// const[text,setText]=useState('')

// const addText=()=>{
//   if(!text) return
//   setList([...list,{id:Date.now().toString(),name:text}])
//   setText('')
// }
//   return(
// <View>
// <TextInput
// placeholder='add'
// value={text}
// onChangeText={setText}
// />
// <Button title='add data' onPress={addText}/>
// <FlatList
// data={list}
// keyExtractor={(item)=>item.id.toString()}
// renderItem={({item})=>(
//   <View>
//   <Text>{item.name}</Text>
//   </View>
// )}
// />
// </View>
//   )
// }

// export default AssetExample