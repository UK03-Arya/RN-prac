
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const PassValue = () => {
    const [pss, setPss] = useState()
    const [isHide, setIsHide] = useState(true)
    return (
        <View>
            <Text> Password
            </Text>

            <TextInput
                placeholder="write pass"
                value={pss}
                onChangeText={setPss}
                secureTextEntry={isHide}

            />
            <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                <Text>{isHide ? "show" : "hide"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default PassValue