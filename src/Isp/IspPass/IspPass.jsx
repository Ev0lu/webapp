import { useEffect, useState } from "react";
import s from "./IspPass.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'
import eyed from '../../assets/eye-clos.svg'
import eyeLight from '../../assets/eye-closed.svg'

function IspPass(props) {
    const [showPassword, setShowPassword] = useState(true);

    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [check,setCheck] = useState('')
    const [checkPh,setCheckPh] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')
    const [mail,setMail] = useState(sessionStorage.getItem('mail'))
    const [errorFields, setErrorFields] = useState({

        pass: false,
        pass2: false,
        check: false,
        checkPh: false
    });
    useEffect(() => {
        setTimeout(() => { setShowPassword(false)}, 500)
    },[])
    useEffect(() => {

          setShowPassword(false)

      
          
  },[])
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
};
    useEffect(() => {
        if (pass == '') {
            setShowPassword(true)
        } else {
          setTimeout(() => setShowPassword(false), 200)


        }
            
    },[pass, pass2])
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
            setRlink('/zak_reg')
        } else {
            setRlink('/zak1_reg')
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Придумайте пароль"
                className={`${s.password_field} ${errorFields.pass && s.error}`}
                value={pass}
                onChange={handleChange4}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
             <img className={s.toggle_password} onClick={handleTogglePassword} src={props.colorB === 'dark' ? eyed : eyeLight}></img>

            {pass === '' && (errorFields.pass && <span className={s.error_message}>Пожалуйста, введите пароль</span>)}

             </div>
        <div className={s.password_input}>
             <input
                type={showPassword ? 'text' : 'password'}
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

        <Link to={pass === pass2 && (pass.length>9) && (pass.length < 25) ? '/isp3_reg' : '/isp_reg_pass'}>
            <button className={`${s.greetings_btn}`} onClick={() => {
                

                if (pass === pass2  && (pass.length>9) && (pass.length < 25)) {
                    sessionStorage.setItem('pass', pass)
                }
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
export default IspPass;
  
