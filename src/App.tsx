/** @jsx React.createElement */
import React from 'react';
import './App.css';
import { LayoutBlocks } from './components/LayoutBlocks-opt1.0';

const App: React.FC = () => {
  return (
    <div className="theme-light">
      <LayoutBlocks />
    </div>
  );
};

export default App;
