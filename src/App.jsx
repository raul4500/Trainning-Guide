//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router'
import  Trainning  from './pages/Trainning'
import  Home  from './pages/Home'
import './App.css'

function App() {

  return (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/start/:day" element={<Trainning />}></Route>
  </Routes>
  )
}

export default App
