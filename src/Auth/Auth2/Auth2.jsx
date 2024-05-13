import { useEffect, useState } from "react";
import s from "./Auth2.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

function Auth2(props) {
    const [login, setLogin] = useState('');
    const [tele, setTele] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [check,setCheck] = useState('')
    const [checkPh,setCheckPh] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({

        mail: false,

        check: false,
    });

    const validateFields = () => {
        const errors = {

            mail: mail === '',

            check: check === '',
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
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




    const checking = () => {
        if ((pass !== pass2) || (login === '') || (tele === '') || (mail === '')) {
            console.log('error')
            setRlink('/zak_reg')
        } else {
            setRlink('/zak1_reg')
        }
    }
    useEffect(() => {

        setMail(sessionStorage.getItem('mail') !== null ? sessionStorage.getItem('mail') : '')


      }, [])

        
const postRequest = async () => {  
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

  } catch (error) {
    setCheck('exist')
  }
}
    
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>         
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to='/authorization'>
            <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
        </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
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
            {errorFields.check && <span className={s.error_message}>Почта не соответствует формату</span>}

             </div>


        <Link to={mail !== '' && check !== '' ? '/authorization_con' : '/authorization_mail'}>
            <button className={`${s.greetings_btn}`} onClick={() => {

                sessionStorage.setItem('mail', mail)

                if (mail !== '' && check !== '') {
                    postRequest()
                }
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
export default Auth2;
  
