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
import Zak2 from './Zak/Zak2/Zak2';
import ZakPh from './Zak/ZakPh/ZakPh';
import Isp1 from './Isp/Isp1/Isp1'
import Isp2 from './Isp/Isp2/Isp2'
import Isp3 from './Isp/Isp3/Isp3'

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
          <Route path="/zak2_reg" element={<Zak2 color={color} />} />
          <Route path="/zak_reg_photo" element={<ZakPh color={color} />} />
          <Route path="/isp1_reg" element={<Isp1 color={color} />} />
          <Route path="/isp2_reg" element={<Isp2 color={color} />} />
          <Route path="/isp3_reg" element={<Isp3 color={color} />} />
          
          
          
      </Routes> 
        </div>

  )
}

export default App
