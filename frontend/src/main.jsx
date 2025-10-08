import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import './styles.css'

function App(){
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/user' element={<UserDashboard/>} />
      <Route path='/admin' element={<AdminDashboard/>} />
    </Routes>
  </BrowserRouter>
}

createRoot(document.getElementById('root')).render(<App />)
