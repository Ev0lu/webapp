import React, { useEffect, useState } from 'react';
import s from './IspCon.module.css';
import { Link } from 'react-router-dom';
import dot from '../../assets/dot.svg'

const IspCon = (props) => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');
  const [code, setCode] = useState('');

  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [invalid, setInvalid] = useState(false)
  const [tries, setTries] = useState(0)
  const [mail, setMail] = useState()
  useEffect(() => {
        setMail(sessionStorage.getItem('mail') !== null ? sessionStorage.getItem('mail') : '')
      }, [])
  useEffect(() => {
    if (code.length === 4 && tries < 4) {
      handleSubmit();
    }
  }, [code]);
  const [token, setToken] = useState('')

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
    email_data: {
      email: mail
    },
    code: codeStr
    
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
      setInvalid(false)
      setToken(`${data.session_token}`)
      sessionStorage.setItem('session_token', `${data.session_token}`)
      //тут реквест выполнять
    } else {
      const data = await response.json();
      setCode('');

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
    const response = await fetch('https://assista1.ru/api/v1/auth/code/send', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const responseData = await response.json();
      // Handle response data if needed

    } else {
     const responseData = await response.json();
      // Handle response data if needed
    }
  } catch (error) {

  }
}
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    setCode(pasteData);
    
  };
  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
    <div className={s.greetings_wrapper}>
    <div className={s.reg}>
       <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Введите код, который был отправлен вам на почту</h1>
</div>
<div className={s.code_input}>
      <input
        type="password"
        value={code}
        onChange={handleChange}
        style={{ width: '260px', padding: '20px', maxWidth: '260px', textAlign: 'center', opacity: 0, position: 'absolute', zIndex: '123123123'}}
        className={s.single_code_input}
        maxLength={4}
      />
      <div className={s.dots_container}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={s.dotText} >
            {code[i] || <img src={dot} className={s.dot} alt="dot" />}
          </span>
        ))}
      </div>
    </div>
        {invalid === true && <span className={s.error_message}>Неправильный код. На почту был выслан новый код</span>}
        {tries > 3  && <span className={s.error_message}>Вы исчерпали количество попыток, начните регистрацию заново</span>}
    <Link to={code == '' || tries > 3 || isVerified === false ? '/isp_con' : '/isp_reg_pass'}>
        <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`} onClick={() => {

      }}>
          Подтвердить
        </button>
      </Link>

      </div>
    </div>
  );
};

export default IspCon;
