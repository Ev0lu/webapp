import { useEffect, useState } from "react";
import s from "./Zak.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../assets/arrow.svg'
import blackarr from '../assets/black.svg'


function Zak(props) {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('')
    const [fio, setFio] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({
        name: false,
        lname: false,
        gender: false
    });




    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleChange2 = (event) => {
        setLname(event.target.value);
    };
    const handleChange3 = (event) => {
        setFname(event.target.value);
    };


    const [gender, setGender] = useState('');


    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };
    const changeFio = () => {
        setFio(name + ' ' + lname + ' ' + fname)
    }

    useEffect(() => {
        changeFio()
    }, [name, lname, fname])




    const checking = () => {
        if ((gender === '') || (name === '') || (lname === '')) {
            console.log('error')
            setRlink('/zak_reg')
        } else {
            setRlink('/zak1_reg')
        }
    }

    const validateFields = () => {
        const errors = {
            name: name === '',
            lname: lname === '',
            gender: gender === ''
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };

    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to='/registration'>
            <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
        </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className={`${s.password_input}`}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

                type={'text'}
                placeholder="Имя*"
                className={`${s.password_field} ${errorFields.name && s.error}`}
                value={name}
                onChange={handleChange}
            />
            { name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите дату рождения</span>)}

        </div>
        <div className={`${s.password_input}`}>
            <input
            style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Фамилия*"
                className={`${s.password_field} ${errorFields.lname && s.error}`}
                value={lname}
                onChange={handleChange2}
            />
            { lname === '' && (errorFields.lname && <span className={s.error_message}>Пожалуйста, введите фамилию</span>)}
        </div>
        <div className={s.password_input3}>
            <input
style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Отчество"
                className={s.password_field}
                value={fname}
                onChange={handleChange3}
            />

        </div>
        <div className={`${s.radio_gender}`} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>
            <label htmlFor="gender" style={{ fontSize: '14px' }}>Ваш пол:</label>
            <div>
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                <label htmlFor="male" className={s.genderlabel}>Мужской</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                <label htmlFor="female" className={s.genderlabel}>Женский</label>
            </div>
            {gender === '' && (errorFields.gender && <span className={s.error_message}>Выберите ваш пол</span>)}
        </div>
        <Link to={gender === '' || name === '' || lname === '' ? '/zak_reg' : '/zak1_reg'}>
            <button className={s.greetings_btn} onClick={() => {
                changeFio()
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
  export default Zak
  