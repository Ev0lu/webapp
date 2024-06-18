import React, { useEffect, useState } from 'react';
import s from './AuthCon.module.css';
import { Link } from 'react-router-dom';
import dot from '../../assets/dot.svg'

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
    if (code.length === 4 && tries < 4) {
      handleSubmit();
    }
  }, [code4])
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (value.length <= 4) {
      setCode(value);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Backspace' && code.length > 0) {
      setCode(code.slice(0, -1));
    }
  };

  const handleSubmit = () => {

    if (code.length !== 4) {
    } else {
      setIsVerified(true)
      postRequest(code)
      setTries(tries + 1)

      
    }
  };



  
const postRequest = async (codeStr) => {  
  let user = {
   
    email: mail,
    
    code: codeStr
    
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
      sessionStorage.setItem('session_token', `${data.session_token}`)
      setIsVerified(true);
      setInvalid(false)

    } else {
      const data = await response.json();
      setCode('')

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



  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setCode(pasteData);
    
  };
  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
    <div className={s.greetings_wrapper}>
    <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Подтверждение</h1>

       <div className={s.code_input}>
          <input
            value={code}
            onChange={handleChange}
            style={{ width: '160px', padding: '10px', maxWidth: '160px', textAlign: code.length == 4 ? 'center' : 'start', paddingLeft: '20px',paddingRight: code.length === 4 ? '20px' : '', overflow: 'hidden', letterSpacing: code.length == 4 ? 'normal' : code[2] === 'I' ? '2.15em' : '2em' }}

            className={s.single_code_input}
            /*onKeyDown={handleKeyPress} letterSpacing: '2em' ,*/
            onPaste={handlePaste}
            maxLength={4}
          />
          { code.length !== 4 ? <>
          <img className={s.dot} src={dot}></img>
          <img className={s.dot1} src={dot}></img>
          <img className={s.dot2} src={dot}></img>
           </> : ''
          }

        </div>
        {invalid === true && <span className={s.error_message}>Неправильный код. На почту был выслан новый код</span>}
        {tries > 3  && <span className={s.error_message}>Вы исчерпали количество попыток, начните регистрацию заново</span>}
    <Link to={code == '' || tries > 3 || isVerified === false ? '/authorization_verify' : '/authorization_pass'}>
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
