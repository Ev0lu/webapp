import { useState } from "react";
import "./Zak.css"
import { Link } from "react-router-dom";

function Zak(props) {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('')

    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

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

    return (
        <div className="greetings" style={props.color==='light' ? {backgroundColor:'white'} : {backgroundColor:'#232323'} }>
        <div className="greetings_wrapper">
        <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Имя*"
                className="password-field"
                value={name}
                onChange={handleChange}
            />

        </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Фамилия*"
                className="password-field"
                value={lname}
                onChange={handleChange2}
            />

        </div>
        <div className="password-input">
            <input
                type={'text'}
                placeholder="Отчество"
                className="password-field"
                value={fname}
                onChange={handleChange3}
            />

        </div>
        <div className="radio_gender">
            <label htmlFor="gender" style={{ fontSize: '14px' }}>Ваш пол:</label>
            <div>
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                <label htmlFor="male" className="genderlabel">Мужской</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                <label htmlFor="female" className="genderlabel">Женский</label>
            </div>
        </div>
        <Link to='/zak1_reg'>
            <button className='greetings_btn'>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
  export default Zak
  