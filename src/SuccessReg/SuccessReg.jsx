import { useState } from "react";
import s from "./Payment.module.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function Payment(props) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistered2, setIsRegistered2] = useState(false);
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"}}>   
        <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Оплата прошла успешно</h1>
            </div>
        </div>

    )
  }
  
  export default Payment
  
