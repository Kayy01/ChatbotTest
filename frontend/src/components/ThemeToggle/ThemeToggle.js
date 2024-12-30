import React, { useState } from 'react';
import './ThemeToggle.css';
import '../common/Button.module.css';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <button className={`darkModeButtonRoot ${darkMode ? 'active' : ''}`} onClick={toggleTheme}>
      <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle;