import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TimerPage from './pages/timer';
import Homepage from './pages/homepage';
import Operations from './pages/operations';
import Login from './pages/login';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<Operations />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/timerpage" element={<TimerPage />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;