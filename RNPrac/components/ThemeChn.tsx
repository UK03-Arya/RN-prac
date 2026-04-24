import React, { useContext, createContext, useState } from 'react';
import { View, Text, Button } from 'react-native';

const ThemeContext = createContext();

export default function App() { // 'A' capital hona chahiye
    const [isDark, setIsDark] = useState(false);

    const theme = {
        mode: isDark ? 'dark' : 'light',
        bg: isDark ? 'black' : 'white',
        text: isDark ? 'white' : 'black',
        toggle: () => setIsDark(!isDark)
    };

    return (
        // 'value' prop dena compulsory hai
        <ThemeContext.Provider value={theme}>
            <AssestExm />
        </ThemeContext.Provider>
    );
}

function AssestExm() {
    const { mode, bg, text, toggle } = useContext(ThemeContext);

    return (
        // Style mein background color use karo taaki change dikhe
        <View style={{ flex: 1, backgroundColor: bg, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: text }}>Current mode: {mode}</Text>
            <Button title="Change Theme" onPress={toggle} />
        </View>
    );
}