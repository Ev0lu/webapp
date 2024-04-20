import { useEffect, useState } from 'react'
import { Route, Routes, Link, Router } from 'react-router-dom';
import './App.css'
import Header from './Header/Header'
import Reg from './Registration/Reg'
import Auth from './Auth/Auth'
import Greetings from './Greetings/Greetings';
import Isp from './Isp/Isp'
import Zak from './Zak/Zak'
import Zak1 from './Zak/Zak1/Zak1';
const tg = window.Telegram.WebApp
function App() {
  const [color, setColor] = useState('light')

  useEffect( ()=> {
    tg.ready()
    if (tg.colorSheme === 'light') {
      setColor('light')
    } else {
      setColor('dark')
    }
  }, [])


  const onClose = () => {
    tg.close()
  }
  return (

    <div className="app">
      <Header />
 

        <Routes>
          <Route path="/" element={<Greetings color={color}/>} />
          <Route path="/registration" element={<Reg color={color} />} />
          <Route path="/authorization" element={<Auth color={color} />} />
          <Route path="/isp_reg" element={<Isp  color={color}/>} />
          <Route path="/zak_reg" element={<Zak color={color} />} />
          <Route path="/zak1_reg" element={<Zak1 color={color} />} />
      </Routes> 

        </div>

  )
}

export default App
