import { useEffect, useState } from 'react'
import { Route, Routes, Link, Router } from 'react-router-dom';
import './App.css'
import Header from './Header/Header'
import Reg from './Registration/Reg'
import Auth from './Auth/Auth'
import Greetings from './Greetings/Greetings';
const tg = window.Telegram.WebApp
function App() {
  const [count, setCount] = useState(0)

  useEffect( ()=> {
    tg.ready()
  }, [])


  const onClose = () => {
    tg.close()
  }
  return (

    <div className="app">
      <Header />
 

        <Routes>
          <Route path="/" element={<Greetings />} />
          <Route path="/registration" element={<Reg />} />
          <Route path="/authorization" element={<Auth />} />
      </Routes> 

        </div>

  )
}

export default App
