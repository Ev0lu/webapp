import React, { useEffect, useState } from 'react';
import s from './AuthCon.module.css';
import { Link } from 'react-router-dom';

const AuthCon = (props) => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState('');
  const [invalid, setInvalid] = useState(false)
  const [tries, setTries] = useState(0)
  const [mail, setMail] = useState()
  const [timer, setTimer] = useState(60);
  const [requestingCode, setRequestingCode] = useState(false);


  useEffect(() => {
        setMail(sessionStorage.getItem('mail') !== null ? sessionStorage.getItem('mail') : '')
      }, [])
  useEffect(() => {
    if (code1 != '' && code2 != '' && code3 != '' && code4 != '' && tries < 4){
      handleSubmit()
    }
  }, [code4])
  const handleCodeChange = (index, value) => {
    switch (index) {
      case 0:
        setCode1(value.toUpperCase());
        break;
      case 1:
        setCode2(value.toUpperCase());
        break;
      case 2:
        setCode3(value.toUpperCase());
        break;
      case 3:
        setCode4(value.toUpperCase());
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
   
    email: mail,
    
    code: `${code1}${code2}${code3}${code4}`
    
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/users/forgotPassword/code/verify', {
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
      setInvalid(false)
      setToken(`${data.session_token}`)
      sessionStorage.setItem('session_token', `${data.session_token}`)
      //тут реквест выполнять
    } else {
      const data = await response.json();
      setCode1('')
      setCode2('')
      setCode3('')
      setCode4('')
  if (tries < 4) {
    postRequest2()
}
      setInvalid(true)
    }

  } catch (error) {

  }
}


  const postRequest2 = async () => {  
  let user = {
    email: mail,
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/users/forgotPassword/code', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const responseData = await response.json();

    } else {
     const responseData = await response.json();
    }
  } catch (error) {

  }
} 
  

const handleRequestCodeAgain = () => {
  setRequestingCode(true);
  setTimer(60); 

};
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
    <div className={s.greetings_wrapper}>
    <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Подтверждение</h1>

        <div className={s.code_input}>
          <input
            id="code-box-0"
            autoComplete="off"
            value={code1}
            onChange={(e) => handleCodeChange(0, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyDown={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-1"
            autoComplete="off"

            value={code2}
            onChange={(e) => handleCodeChange(1, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyDown={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-2"

            value={code3}
            onChange={(e) => handleCodeChange(2, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyDown={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
          <input
            id="code-box-3"

            value={code4}
            onChange={(e) => handleCodeChange(3, e.target.value)}
            className={s.code_box}
            onFocus={(e) => e.target.select()}
            onKeyDown={handleKeyPress}
            maxLength={1}
            style={{ width: 'auto', padding: '10px', maxWidth: 40 }} // Add this line
          />
        </div>
        {invalid === true && <span className={s.error_message}>Неправильный код. На почту был выслан новый код</span>}
        {tries > 3  && <span className={s.error_message}>Вы исчерпали количество попыток, начните регистрацию заново</span>}
    <Link to={code1 == '' || code2 == '' || code3 == '' || code4 == '' || tries > 3 || isVerified === false ? '/authorization_verify' : '/authorization_pass'}>
        <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`} onClick={() => {

      }}>
          Подтвердить
        </button>
      </Link>

      </div>
    </div>
  );
};

export default AuthCon;