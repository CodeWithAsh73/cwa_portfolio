import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import './style.css'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  const user = localStorage.getItem('token')
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {<Route path="/" exact element={<Home />} />}
          <Route path="/signup" exact element={<Signup />} />
         {!user && <Route path="/login" exact element={<Login />} />}
          <Route path="/about" exact element={<Login />} />
          <Route path="/projects" exact element={<Login />} />
          {user && <Route path="/admin" exact element={<AdminDashboard />} />}
          <Route path="/admin" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Navigate replace to="/admin" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App