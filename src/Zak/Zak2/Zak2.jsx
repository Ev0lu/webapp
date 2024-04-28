import { useEffect, useState } from "react";
import s from "./Zak2.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

function Zak2(props) {
    const [login, setLogin] = useState('');
    const [tele, setTele] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')

    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({
        login: false,
        tele: false,
        mail: false,
        pass: false,
        pass2: false
    });

    const validateFields = () => {
        const errors = {
            login: login === '',
            tele: tele === '',
            mail: mail === '',
            pass: pass === '',
            pass2: pass2 === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };


    const handleChange = (event) => {
        setLogin(event.target.value);
    };
    const handleChange2 = (event) => {
        setTele(event.target.value);
    };
    const handleChange3 = (event) => {
        setMail(event.target.value);
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



    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>         
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to='/zak1_reg'>
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

        </div>
        <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Номер телефона"
                className={`${s.password_field} ${errorFields.tele && s.error}`}
                value={tele}
                onChange={handleChange2}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
        {tele === '' && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}

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


        </div>

        <Link to={pass === pass2 && login !== '' && tele !== '' && mail !== '' ? '/zak_con' : '/zak2_reg'}>
            <button className={`${s.greetings_btn}`} onClick={() => {
                validateFields()
                localStorage.setItem('login', JSON.stringify(login));
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
  export default Zak2
  