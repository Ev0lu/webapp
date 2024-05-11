import React, { useState, useEffect } from 'react';
import s from './Auth.module.css';
import { Route, Routes, Link, Router } from 'react-router-dom';
import eyed from '../assets/eye-clos.svg'
import eyeLight from '../assets/eye-closed.svg'


const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [resp, setResp] = useState('')
    const [errorFields, setErrorFields] = useState({
        password: password,
        login: login,
        resp: resp
    });
    useEffect(() => {
        setTimeout(() => { setShowPassword(false)}, 1000)
    },[])
      const validateFields = () => {
        const errors = {
            password: password === '',
            login: login === '',
            resp: resp === 'Incorrect login or password'
            
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };
    const handleChange2 = (event) => {
        setLogin(event.target.value);
    };



    const postRequest = async () => {
  
  
  let user = {
    login: login,
    password: password
  };

  try {
    const response = await fetch('https://assista1.ru/auth/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const responseData = await response.json();
    console.log(responseData)
    setResp(responseData.detail)
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
useEffect(() => {
  if (postRequest) {
    postRequest().then(() => {
      setResp(responseData.detail); // update resp state here
    });
  }
}, [postRequest]);
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>
        <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Авторизация</h1>
        <div className={s.password_input}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }
                type={'text'}
                placeholder="Логин"
                className={s.password_field}
                value={login}
                onChange={handleChange2}
            />
                       
                { login === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

        </div>
            
          <div className={s.password_input}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                className={s.password_field}
                value={password}
                onChange={handleChange}
            />
                       
                <img className={s.toggle_password} onClick={handleTogglePassword} src={props.colorB === 'dark' ? eyed : eyeLight}></img>
                { password === '' && (errorFields.password && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}
                { resp === 'Incorrect login or password' && (errorFields.resp && <span className={s.error_message}>Неверный логин или пароль</span>)}

        </div>
        <Link to={(password.length<10) || (password.length > 25) || (resp === 'Incorrect login or password') || (resp === '') ? '/authorization' : '/'}>
        <button onClick={() => {
            postRequest()
            validateFields()}} className={`${s.greetings_btn2} ${props.colorB==="light" ? s.authPassword1 : s.authPassword1}` }>Далее</button>
        </Link>
        </div>
      
       
       

        </div>
    );
};

export default Auth;
