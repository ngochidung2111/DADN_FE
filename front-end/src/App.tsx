// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Sidebar from './components/sidebar';
import Homepage from './pages/homepage';
import Statistic from './pages/statistic';
import Operations from './pages/operations';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Operations />
      {/* <Statistic /> */}
      {/* <Homepage /> */}
    </div>
  )
}
export default App
