//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router'
import  Trainning  from './pages/Trainning'
import  Home  from './pages/Home'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/teste" element={<Trainning />}></Route>
  </Routes>
  )
}

export default App
