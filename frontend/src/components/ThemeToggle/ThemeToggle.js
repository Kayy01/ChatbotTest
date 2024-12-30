import React, { useState} from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);

    };

    return (
        <button onClick={toggleTheme}>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );

};

export default ThemeToggle;



import React, { useState } from 'react';
import TypingIndicator from '../../components/TypingIndicator/TypingIndicator';

const Chat = () => {
    const [isTyping, setIsTyping] = useState(false);

    // Simulate typing indicator for demonstration purposes
    const handleUserInput = () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false),2000); // Simulate a 2-second typing delay
    };

    return(
        <div>
            {isTyping && <TypingIndicator/>}
            <button onClick={handleUserInput}>Simulate User Input</button>

        </div>
    );
};

export default Chat;