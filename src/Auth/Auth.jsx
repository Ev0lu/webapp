import React, { useState, useEffect } from 'react';
import s from './Auth.module.css';
import { Route, Routes, Link, Router } from 'react-router-dom';
import eyed from '../assets/eye-clos.svg'
import eyeLight from '../assets/eye-closed.svg'


const Auth = (props) => {
    const [showPassword, setShowPassword] = useState(true);
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [resp, setResp] = useState('')
    const [tokenAccess, setTokenAccess] = useState('');
    const [tokenRefresh, setTokenRefresh] = useState('')
    const [errorFields, setErrorFields] = useState({
      pass: pass,
        login: login,

    });
    useEffect(() => {
        setTimeout(() => { setShowPassword(false)}, 500)
    },[])
    useEffect(() => {

          setShowPassword(false)

      
          
  },[])
    useEffect(() => {
        if (pass == '') {
            setShowPassword(true)
        } else {
          setTimeout(() => setShowPassword(false), 200)


        }
            
    },[pass])
      const validateFields = () => {
        const errors = {
          pass: pass === '',
          login: login === '',
            
            
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
      setPass(event.target.value);
    };
    const handleChange2 = (event) => {
    setLogin(event.target.value.replace(/[^A-Za-z0-9!@#$%^&*()]/g, ''));
    };



    const postRequest = async () => {
  
  
  let user = {
    login: login,
    password: pass
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });



    if (response.ok) {
            const responseData = await response.json();
            console.log(responseData)
            setTokenRefresh(responseData.refresh_token)
            setTokenAccess(responseData.access_token)
            const data = {
                access_token: responseData.access_token,
                refresh_token: responseData.refresh_token
                   
              };
              if ((responseData.detail !== 'Incorrect login or password') || (responseData.detail !== '')) {
                props.tg.sendData(JSON.stringify(data))
                props.tg.close()
                
            }


    } else {
           const responseData = await response.json();

             setResp(responseData.detail)


            console.log(responseData)

              }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}


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
                value={pass}
                onChange={handleChange}
            />
               <img className={s.toggle_password} onClick={handleTogglePassword} src={props.colorB === 'dark' ? eyed : eyeLight}></img>
                { pass === '' && (errorFields.pass && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}
                {resp === 'Incorrect login or password'  &&  <span className={s.error_message}>Неверный логин или пароль</span>}
                <Link to='/authorization_mail'>
                <span className={s.spanForgot} style={props.colorB==='light' ? {color:'black'} : {color:'white'}}>Забыл пароль</span>
            </Link>
        </div>
      
        <Link to={(pass.length<10) || (pass.length > 25) || (resp === 'Incorrect login or password') || (resp === '') ? '/authorization' : '/success_a'}>
        <button onClick={ () => {
            validateFields()
           if ( login !== '' && pass !== ''){
              postRequest()
           }
            
        }
} className={`${s.greetings_btn2} ${props.colorB==="light" ? s.authPassword1 : s.authPassword1}` }>Далее</button>
        </Link>
        </div>
      
       
       

        </div>
    );
};

export default Auth;