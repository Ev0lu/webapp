import React, { useState } from 'react';
import './Auth.css';

import eye from '../assets/eye-clos.svg'


const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className="greetings">
        <div className="greetings_wrapper">
          <h1 className='greetings_text'>Авторизация</h1>
          <div className="password-input">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                className="password-field"
                value={password}
                onChange={handleChange}
            />
            <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? (
                    <img className='eye' src={eye} width="24" height="24">
                        </img>
                ) : (
                    <img className='eye' src={eye} width="24" height="24">

                   </img>
                )}
            </span>
        </div>
        <button className='greetings_btn'>Далее</button>
        </div>
      
       
       

        </div>
    );
};

export default Auth;