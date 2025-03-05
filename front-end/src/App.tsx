// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Sidebar from './components/sidebar';
import Homepage from './pages/homepage';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Homepage />
    </div>
  )
}
export default App
