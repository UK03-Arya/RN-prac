import React, { createContext, useState, useContext } from 'react';

// 1. Theme colors define karein
const themes = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        primary: '#6200EE',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        primary: '#BB86FC',
    }
};

// 2. Context create karein
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const theme = isDarkMode ? themes.dark : themes.light;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom Hook use karne ke liye
export const useTheme = () => useContext(ThemeContext);