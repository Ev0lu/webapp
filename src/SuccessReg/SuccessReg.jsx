import { useEffect, useState } from "react";
import s from "./SuccessReg.module.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function SuccessReg(props) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistered2, setIsRegistered2] = useState(false);
    useEffect(() => {
        setTimeout(() => { 
            const data = {
                "status": "unauthorized"
            }
              props.tg.sendData(JSON.stringify(data))
              props.tg.close()
       }, 3000)
    }, [])
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"}}>   
        <div className={s.greetings_wrapper}>
            <div className={s.reg}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Произошла ошибка. Повторите регистрацию</h1>
        </div>
            </div>
        </div>

    )
  }
  
  export default SuccessReg
  


