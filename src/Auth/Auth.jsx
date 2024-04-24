import React, { useState } from 'react';
import './Auth.css';
import { Route, Routes, Link, Router } from 'react-router-dom';
import eye from '../assets/eye-clos.svg'


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
        <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>        <div className="greetings_wrapper">
        <h1 className='greetings_text' style={props.colorB==='light' ? {color:'white'} : {color:'black'} }>Авторизация</h1>
          <div className="password-input">
            <input
                style={props.colorB==='light' ? {color:'black'} : {color:'white'} }
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                className="password-field"
                value={password}
                onChange={handleChange}
            />
                       
                <img className='toggle-password' onClick={handleTogglePassword} src={eye}></img>
        
        </div>
        <Link to={(password.length<8) || (password.length > 25) ? '/authorization' : '/'}>
        <button  style={props.colorB==='light' ? {color:'white'} : {color:'black'} } className='greetings_btn'>Далее</button>
        </Link>
        </div>
      
       
       

        </div>
    );
};

export default Auth;