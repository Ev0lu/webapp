import { useState } from "react";
import s from "./Payment.module.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function Payment(props) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistered2, setIsRegistered2] = useState(false);
    setTimeout(() => props.tg.close(), 3000)
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"}}>   
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Оплата была успешно проведена. Деньги скоро поступят на ваш счет. Обычно это занимает 1-5 минут.</h1>
</div>
            </div>
        </div>

    )
  }
  
  export default Payment
  
