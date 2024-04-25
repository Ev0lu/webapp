import React, { useState } from 'react';
import s from './Auth.module.css';
import { Route, Routes, Link, Router } from 'react-router-dom';
import eye from '../assets/eye-clos.svg'
import eyeLight from '../assets/eye-closed.svg'


const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>
        <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Авторизация</h1>
          <div className={s.password_input}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                className={s.password_field}
                value={password}
                onChange={handleChange}
            />
                       
                <img className={s.toggle_password} onClick={handleTogglePassword} src={props.colorB === 'dark' ? eye : eyeLight}></img>
        
        </div>
        <Link to={(password.length<8) || (password.length > 25) ? '/authorization' : '/'}>
        <button className={`${s.greetings_btn2} ${props.colorB==="light" ? s.authPassword1 : s.authPassword1}` }>Далее</button>
        </Link>
        </div>
      
       
       

        </div>
    );
};

export default Auth;