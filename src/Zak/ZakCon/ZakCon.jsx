import React, { useEffect, useState } from 'react';
import s from './ZakCon.module.css';
import { Link } from 'react-router-dom';

const ZakCon = (props) => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState('');
  const [invalid, setInvalid] = useState(true)
  const [tries, setTries] = useState(0)
  const [mail, setMail] = useState()
  useEffect(() => {
        setMail(sessionStorage.getItem('mail') !== null ? sessionStorage.getItem('mail') : '')
      }, [])
  useEffect(() => {
    handleSubmit()
  }, [code4])
  const handleCodeChange = (index, value) => {
    switch (index) {
      case 0:
        setCode1(value);
        break;
      case 1:
        setCode2(value);
        break;
      case 2:
        setCode3(value);
        break;
      case 3:
        setCode4(value);
        break;
      default:
        break;
    }
    if (value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
        document.getElementById(`code-box-${nextIndex}`).focus();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Backspace' && event.target.value === '') {
      const prevIndex = event.target.id.split('-')[2] - 1;
      if (prevIndex >= 0) {
        document.getElementById(`code-box-${prevIndex}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const code = `${code1}${code2}${code3}${code4}`;

    if (code.length !== 4) {
    } else {
      setIsVerified(true)
      postRequest()
      setTries(tries + 1)

      
    }
  };


const postRequest = async () => {  
  let user = {
    email_data: {
      email: mail
    },
    code: `${code1}${code2}${code3}${code4}`
    
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/auth/code/verify', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      setIsVerified(true);
      sessionStorage.setItem('sessionToken', data.session_token)
      
    } else {
      setCode1('')
      setCode2('')
      setCode3('')
      setCode4('')
    }

  } catch (error) {

  }
}
   
  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
    <div className={s.greetings_wrapper}>
    <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Подтверждение</h1>

        <div className={s.code_input}>
          <input
            id="code-box-0"
            type="text"
            value={code1}
            onChange={(e) => handleCodeChange(0, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyPress={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-1"
            type="text"
            value={code2}
            onChange={(e) => handleCodeChange(1, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyPress={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-2"
            type="text"
            value={code3}
            onChange={(e) => handleCodeChange(2, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyPress={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-3"
            type="text"
            value={code4}
            onChange={(e) => handleCodeChange(3, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyPress={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
        </div>
        {error && <div className={s.error_message}>Неправильный код</div>}
        {tries > 3  && <div className={s.error_message}>Вы исчерпали количество попыток, начните регистрацию заново</div>}
    <Link to={code1 == '' || code2 == '' || code3 == '' || code4 == '' || tries > 3 || isVerified === false ? '/zak_con' : '/zak_reg_photo'}>
        <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`} onClick={() => {
      handleSubmit()
      }}>
          Подтвердить
        </button>
      </Link>

      </div>
    </div>
  );
};

export default ZakCon;
