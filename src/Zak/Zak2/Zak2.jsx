import { useEffect, useState } from "react";
import "./Zak2.css"
import { Link } from "react-router-dom";
import arrowsvg from '../../assets/arrow.svg'
function Zak2(props) {
    const [login, setLogin] = useState('');
    const [tele, setTele] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')

    const [rlink, setRlink] = useState('/zak1_reg')



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
        <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>                <div className="greetings_wrapper">
        <div className="reg">
        <Link to='/zak1_reg'>
            <img src={arrowsvg} className="reg_arrow"></img>
        </Link>
            <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Логин"
                className="password-field"
                value={login}
                onChange={handleChange}
            />

        </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Номер телефона"
                className="password-field"
                value={tele}
                onChange={handleChange2}
            />

        </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Почта"
                className="password-field"
                value={mail}
                onChange={handleChange3}
            />
             </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Пароль"
                className="password-field"
                value={pass}
                onChange={handleChange4}
            />
             </div>
        <div className="password-input">
             <input
                type={'text'}
                placeholder="Подтверждение пароля"
                className="password-field"
                value={pass2}
                onChange={handleChange5}
            />
        </div>

        <Link to={(pass === pass2) || (login === '') || (tele === '') || (mail === '') ? '/zak_reg_photo' : '/zak2_reg'}>
            <button className='greetings_btn' onClick={() => {

            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
  export default Zak2
  