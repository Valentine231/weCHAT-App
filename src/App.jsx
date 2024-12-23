import React from 'react'
import Home from './Components/Login'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
      <Outlet />
      </main>
      
    </div>
  )
}

export default App