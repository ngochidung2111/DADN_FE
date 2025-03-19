import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimerPage from './pages/timer';
import Homepage from './pages/homepage';
import Statistic from './pages/statistic';
import Operations from './pages/operations';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/timerpage" element={<TimerPage />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;