import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LevelSelect from './pages/LevelSelect';
import GamePage from './pages/GamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/levels" element={<LevelSelect />} />
        <Route path="/game/:level" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;