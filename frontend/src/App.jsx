import React,{ useState } from 'react'
import './App.css'
import {Routes, Route, Navigate } from 'react-router-dom'
import Weather from './components/weather/weather'
import Signup from './components/signup/index'
import Login from './components/login/index'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path='/weather' element={<Weather/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App
