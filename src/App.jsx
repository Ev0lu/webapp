import { useEffect, useState } from 'react'
import { Route, Routes, Link, Router, Navigate } from 'react-router-dom';
import './App.css'
import Header from './Header/Header'
import Reg from './Registration/Reg'
import Auth from './Auth/Auth'
import Greetings from './Greetings/Greetings';
import Payment from './Payment/Payment';
import SuccessAuth from './SuccessAuth/SuccessAuth';
import SuccessReg from './SuccessReg/SuccessReg';
import SuccessEdit from './SuccessEdit/SuccessEdit';



import Edit from './Edit/Edit';
import EditIsp from './EditIsp/EditIsp';
import EditZak from './EditZak/EditZak';

import Create from './Create/Create';

import Isp from './Isp/Isp'
import Zak from './Zak/Zak'
import Zak1 from './Zak/Zak1/Zak1';
import Zak2 from './Zak/Zak2/Zak2';
import ZakPh from './Zak/ZakPh/ZakPh';
import Isp1 from './Isp/Isp1/Isp1'
import Isp2 from './Isp/Isp2/Isp2'
import Isp3 from './Isp/Isp3/Isp3'
import IspPh from './Isp/IspPh/IspPh'
import IspCon from './Isp/IspCon/IspCon';

import AuthCon from './Auth/AuthCon/AuthCon';
import Auth2 from './Auth/Auth2/Auth2'
import Auth3 from './Auth/Auth3/Auth3'

import ZakCon from './Zak/ZakCon/ZakCon';
import IspPass from './Isp/IspPass/IspPass';
import ZakPass from './Zak/ZakPass/ZakPass';

const tg = window.Telegram.WebApp
function App() {
  const [colorB, setColorB] = useState("light")
  const updateColor = () => {
    tg.ready()
    if (window.Telegram.WebApp.colorScheme === "light") {
      setColorB("light")
    } else {
      setColorB("dark")
    }
  }
  useEffect( () => {

    updateColor()
  }, [])



  const onClose = () => {
    tg.close()
  }

  return (

    <div className="app">
      <Header />
 
     
        <Routes>
          <Route path="/" element={<Greetings colorB={colorB}/>} />
          <Route path="/create" element={<Create tg={tg} colorB={colorB}/>} />
          <Route path="/update/:order_id" element={<Edit tg={tg} colorB={colorB}/>} />
          <Route path="/registration" element={<Reg tg={tg} colorB={colorB} />} />
          <Route path="/authorization" element={<Auth  tg={tg} colorB={colorB} />} />
          <Route path="/isp_reg" element={<Isp tg={tg} colorB={colorB}/>} />
          <Route path="/zak_reg" element={<Zak tg={tg} colorB={colorB} />} />
          <Route path="/zak1_reg" element={<Zak1 colorB={colorB} />} />
          <Route path="/zak2_reg" element={<Zak2 colorB={colorB} />} />
          <Route path="/zak_reg_photo" element={<ZakPh  tg={tg} colorB={colorB} />} />
          <Route path="/isp1_reg" element={<Isp1 colorB={colorB} />} />
          <Route path="/isp2_reg" element={<Isp2 tg={tg} colorB={colorB} />} />
          <Route path="/isp3_reg" element={<Isp3 tg={tg} colorB={colorB} />} />
          <Route path="/isp_reg_photo" element={<IspPh  tg={tg} colorB={colorB} />} />
          <Route path="/isp_con" element={<IspCon tg={tg} colorB={colorB} />} />
          <Route path="/zak_con" element={<ZakCon tg={tg} colorB={colorB} />} />
          <Route path="/payment" element={<Payment tg={tg} colorB={colorB} />} />
          <Route path="/update/worker" element={<EditIsp tg={tg} colorB={colorB} />} />
          <Route path="/update/client" element={<EditZak tg={tg} colorB={colorB} />} />

          <Route path="/success_a" element={<SuccessAuth tg={tg} colorB={colorB} />} />
          <Route path="/success_r" element={<SuccessReg tg={tg} colorB={colorB} />} />
          <Route path="/authorization_verify" element={<AuthCon tg={tg} colorB={colorB} />} />
          <Route path="/authorization_mail" element={<Auth2 tg={tg} colorB={colorB} />} />
          <Route path="/authorization_pass" element={<Auth3 tg={tg} colorB={colorB} />} />
          <Route path="/isp_reg_pass" element={<IspPass tg={tg} colorB={colorB} />} />
          <Route path="/zak_reg_pass" element={<ZakPass tg={tg} colorB={colorB} />} />
          <Route path="/failure_edit" element={<SuccessEdit tg={tg} colorB={colorB} />} />


          
          
          
      </Routes> 



        
        </div>

  )
}

export default App
