import "./Greetings.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function Greetings(props) {

    return (
        <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>                     <div className="greetings_wrapper">
        <h1 className='greetings_text'style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Добро пожаловать</h1>

            <Link to="/registration">

                <button style={props.colorB==='light' ? {color:'black'} : {color:'white'} } className='greetings_btn'>Зарегистироваться</button>
            </Link>
            <Link to="/authorization">
                <button style={props.colorB==='light' ? {color:'black'} : {color:'white'} } className='greetings_btn'>У меня уже есть аккаунт</button>
            </Link>
            </div>
        </div>

    )
  }
  
  export default Greetings
  