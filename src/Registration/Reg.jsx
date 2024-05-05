import { Route, Routes, Link, Router } from 'react-router-dom';
import s from './registration.module.css'
import { useState } from 'react';
function Reg(props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistered2, setIsRegistered2] = useState(false);
    return (
      <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>    
      <div className={s.greetings_wrapper}>
      <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>

          <Link to="/zak_reg">
                <button onClick={() => {setIsRegistered(true)
                setIsRegistered2(false)}} className={`${s.greetings_btn} ${isRegistered ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>Я заказчик</button>
            </Link> 
            <Link to="/isp_reg">
                <button onClick={() => {
                    setIsRegistered2(true)
                    setIsRegistered(false)
                
                }} className={`${s.greetings_btn} ${isRegistered2 ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>Я исполнитель</button>
            </Link>
        </div>
      </div>
    )
  }
  
  export default Reg
  