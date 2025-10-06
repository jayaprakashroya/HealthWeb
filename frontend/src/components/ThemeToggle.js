import React from 'react';

const ThemeToggle = ({ toggle }) => {
  return <button onClick={() => toggle(prev => !prev)}>Toggle Dark Mode</button>;
};

export default ThemeToggle;