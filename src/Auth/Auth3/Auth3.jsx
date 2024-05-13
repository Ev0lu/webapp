import { useEffect, useState } from "react";
import s from "./Auth3.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

function Auth3(props) {

    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [check,setCheck] = useState('')
    const [checkPh,setCheckPh] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({

        pass: false,
        pass2: false,
        check: false,
        checkPh: false
    });

    const validateFields = () => {
        const errors = {

            pass: pass === '',
            pass2: pass2 === '',
            check: check === '',
            checkPh: checkPh === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
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

        setPass(sessionStorage.getItem('pass') !== null ? sessionStorage.getItem('pass') : '')
        setPass2(sessionStorage.getItem('pass') !== null ? sessionStorage.getItem('pass') : '')

      }, [])

        
const postRequest2 = async () => {  
  let user = {
    email: mail,
    new_password: pass
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/users/forgotPassword/reset', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-SESSION-TOKEN': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)

    } else {
      const data = await response.json();
      console.log(data)
    }
  } catch (error) {
    setCheck('')
  }
}



    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>         
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>

            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Введите пароль</h1>
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
        { pass.length<10 && <span className={s.error_message}>Размер пароля должен составлять от 10 до 25 символов</span>}
        {pass.length > 24 && <span className={s.error_message}>Размер пароля должен составлять от 10 до 25 символов</span>}




        </div>

        <Link to={pass === pass2 && check !== '' && (pass.length>9) && (pass.length < 25) ? '/authorization_pass' : '/authorization'}>
            <button className={`${s.greetings_btn}`} onClick={() => {


                if (pass === pass2 && check !== ''  && (pass.length>9) && (pass.length < 25)) {
                    postRequest2()
                }
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
export default Auth3;
  
