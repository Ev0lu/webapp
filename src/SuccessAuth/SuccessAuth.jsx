import { useState } from "react";
import s from "./SuccessAuth.module.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function SuccessAuth(props) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistered2, setIsRegistered2] = useState(false);
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"}}>   
        <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Вы успешно авторизированы</h1>
            </div>
        </div>

    )
  }
  
  export default SuccessAuth
  
