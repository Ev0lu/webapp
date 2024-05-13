import { useEffect, useState } from "react";
import s from "./Isp2.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

function Isp2(props) {
    const [loginerr, setLoginerr] = useState('');
    const [teleerr, setTeleerr] = useState('');
    const [login, setLogin] = useState('');
    const [tele, setTele] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [check,setCheck] = useState('')
    const [checkUnique,setCheckUnique] = useState('')
    const [checkPh,setCheckPh] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({
        login: false,
        tele: false,
        mail: false,
        pass: false,
        pass2: false,
        check: false,
        checkPh: false
    });
    const [linka,setLinka] = useState('/isp_con')
    const validateFields = () => {
        const errors = {
            login: login === '',
            tele: tele === '',
            mail: mail === '',
            pass: pass === '',
            pass2: pass2 === '',
            check: check === '',
            checkPh: checkPh === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };

      const [exist, setExist] = useState(sessionStorage.getItem('exist') === 'true');
      const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    const handleChange = (event) => {
        setLogin(event.target.value.replace(/[^A-Za-z0-9]/g, ''));
    };
    const handleChange2 = (event) => {
        const isValidPhone = /^\+/.test(event.target.value)
        if (isValidPhone === true) {
            setCheckPh('ex')
        } else{
            setCheckPh('')
        }
        setTele(event.target.value);
    };
    const handleChange3 = (event) => {
        setMail(event.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(event.target.value);
        if (isValidEmail === true) {
            setCheck('ex')
        } else{
            setCheck('')
        }
    };




    const checking = () => {
        if ((pass !== pass2) || (login === '') || (tele === '') || (mail === '')) {
            console.log('error')
            setRlink('/zak_reg')
        } else {
            setRlink('/zak1_reg')
        }
    }
    useEffect(() => {
        setLogin(sessionStorage.getItem('login') !== null ? sessionStorage.getItem('login') : '')
        setTele(sessionStorage.getItem('tele') !== null ? sessionStorage.getItem('tele') : '')
        setMail(sessionStorage.getItem('mail') !== null ? sessionStorage.getItem('mail') : '')


      }, [])

        
const postRequest = async () => {  
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
      console.log(responseData)
     if (responseData.sessionToken) {
                setLinka('/isp_pass');
        }
    } else {
     const responseData = await response.json();
      // Handle response data if needed
      console.log(responseData)
    }
  } catch (error) {
     console.log(error)
  }
}



const checkUniqueF = async () => {  
  let user = {
    login: login,
    phone: tele
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/auth/registration/checkUnique', {
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
      console.log(responseData)
      setCheckUnique('true')
      setTeleerr('')
      setLoginerr('')
    } else {
     const responseData = await response.json();
      // Handle response data if needed
      console.log(responseData)
    if (responseData.detail.includes("login")){
        setLoginerr('true')
    } else{
        setLoginerr('')
    }
    console.log(responseData.detail.includes("phone"))    
    if (responseData.detail.includes("phone")){
        setTeleerr('true')
    } else {
        setTeleerr('')
    }
  }} catch (error) {
     
      // Handle response data if needed
      console.log(error)
  }
}
 
    
    const handleInputBlur = () => {
    // Здесь можно выполнить проверку ввода, когда инпут теряет фокус
           
                        if (exist === true) {
                            
                        } else {
                            
                            if (login !== '' && tele !== '' && tele.split('').length > 6){
                                checkUniqueF()
                            }
                        }
            
          };


    
 const fetchInfo = async () => {



    

    try {
      const response = await fetch(`https://assista1.ru/api/v1/users/me`,{
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();


          setLogin(`${data.login}`)
          setTele(`${data.phone}`)
          setMail(`${data.email}`)





      
    } catch (error) {

    }

  };

  useEffect(() => {
      if(sessionStorage.getItem('exist') === true){
    fetchInfo()

      }
  },[])
    
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>         
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to='/isp1_reg'>
            <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
        </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className={s.password_input}>
            <input
                                disabled={Boolean(exist)}
                type={'text'}
                placeholder="Логин"
                className={`${s.password_field} ${errorFields.login && s.error}`}
                value={login}
                onChange={handleChange}
                onBlur={handleInputBlur}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {login === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}
            {loginerr === 'true' && <span className={s.error_message}>Логин уже существует</span>}
            {/^[A-Za-z0-9]+$/.test(login) === false && <span className={s.error_message}>Логин поддерживает только латинский алфавит</span>}

        </div>
        <div className={s.password_input}>
            <input
                                disabled={Boolean(exist)}
                type={'text'}
                placeholder="Номер телефона"
                className={`${s.password_field} ${(errorFields.tele || errorFields.checkPh) && s.error}`}
                value={tele}
                onChange={handleChange2}
                onBlur={handleInputBlur}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
        {tele === '' && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
        {tele.split('').length < 7 && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите правильный телефон</span>)}
        {teleerr === 'true' && <span className={s.error_message}>Почта уже существует</span> }
        {errorFields.checkPh && <span className={s.error_message}>Номер должен начинаться с кода страны(+...)</span>}


        </div>
        <div className={s.password_input}>
            <input
                                disabled={Boolean(exist)}
                type={'text'}
                placeholder="Почта"
                className={`${s.password_field} ${errorFields.mail && s.error}`}
                value={mail}
                onChange={handleChange3}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {mail === '' && (errorFields.mail && <span className={s.error_message}>Пожалуйста, введите почту</span>)}
            {errorFields.check && <span className={s.error_message}>Почта не соответствует формату</span>}
             </div>


        <Link to={(login !== '' && tele.split('').length > 6 && tele !== '' && mail !== '' && check !== '' && checkPh !== '' (exist === false && !!checkUnique))  ? linka : '/isp2_reg'}>
            <button className={`${s.greetings_btn}`} onClick={() => {
                sessionStorage.setItem('login', login)
                sessionStorage.setItem('tele', tele)
                sessionStorage.setItem('mail', mail)

                if (login !== '' && tele.split('').length > 6 && tele !== '' && mail !== '' && check !== '' && checkPh !== '') {
                    postRequest()
                }
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
export default Isp2;
  
