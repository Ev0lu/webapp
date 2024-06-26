import { useEffect, useState } from "react";
import s from "./Isp2.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

function Isp2(props) {
    const [login, setLogin] = useState('');
    const [tele, setTele] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [check,setCheck] = useState('')
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


    const handleChange = (event) => {
        setLogin(event.target.value.replace(/[^A-Za-z0-9]/g, ''));
    };
    const handleChange2 = (event) => {
        const isValidPhone = /^\+/.test(event.target.value)
        if (isValidPhone === true) {
            setCheckPh('exist')
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
            setCheck('exist')
        } else{
            setCheck('')
        }
    };
    const handleChange4 = (event) => {
        setPass(event.target.value);
    };
    const handleChange5 = (event) => {
        setPass2(event.target.value);
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
        setPass(sessionStorage.getItem('pass') !== null ? sessionStorage.getItem('pass') : '')
        setPass2(sessionStorage.getItem('pass') !== null ? sessionStorage.getItem('pass') : '')

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

  } catch (error) {
    setCheck('exist')
  }
}
    
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
                type={'text'}
                placeholder="Логин"
                className={`${s.password_field} ${errorFields.login && s.error}`}
                value={login}
                onChange={handleChange}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {login === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}
            {/^[A-Za-z0-9]+$/.test(login) === false && <span className={s.error_message}>Логин поддерживает только латинский алфавит</span>}

        </div>
        <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Номер телефона"
                className={`${s.password_field} ${(errorFields.tele || errorFields.checkPh) && s.error}`}
                value={tele}
                onChange={handleChange2}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
        {tele === '' && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}
        {errorFields.checkPh && <span className={s.error_message}>Номер должен начинаться с кода страны(+...)</span>}


        </div>
        <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Почта"
                className={`${s.password_field} ${errorFields.mail && s.error}`}
                value={mail}
                onChange={handleChange3}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {mail === '' && (errorFields.mail && <span className={s.error_message}>Пожалуйста, введите почту</span>)}

             </div>
        <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Пароль"
                className={`${s.password_field} ${errorFields.pass && s.error}`}
                value={pass}
                onChange={handleChange4}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {pass === '' && (errorFields.pass && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}

             </div>
        <div className={s.password_input}>
             <input
                type={'text'}
                placeholder="Подтверждение пароля"
                className={`${s.password_field} ${errorFields.pass2 && s.error}`}
                value={pass2}
                onChange={handleChange5}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
        { pass === '' && (errorFields.pass2 && <span className={s.error_message}>Пожалуйста, подтвердите пароль</span>)}
        {pass!=pass2 && <span className={s.error_message}>Пароли должны совпадать</span>}
        {errorFields.check && <span className={s.error_message}>Почта не соответствует формату</span>}
        { pass.length<10 && <span className={s.error_message}>Размер пароля должен составлять от 10 до 25 символов</span>}
        {pass.length > 24 && <span className={s.error_message}>Размер пароля должен составлять от 10 до 25 символов</span>}




        </div>

        <Link to={pass === pass2 && login !== '' && tele !== '' && mail !== '' && check !== '' && checkPh !== '' && (pass.length>9) && (pass.length < 25) ? '/isp_con' : '/isp2_reg'}>
            <button className={`${s.greetings_btn}`} onClick={() => {
                sessionStorage.setItem('login', login)
                sessionStorage.setItem('tele', tele)
                sessionStorage.setItem('mail', mail)
                sessionStorage.setItem('pass', pass)
                if (pass === pass2 && login !== '' && tele !== '' && mail !== '' && check !== '' && checkPh !== '') {
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
  
