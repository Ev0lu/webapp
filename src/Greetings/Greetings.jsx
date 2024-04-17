import "./Greetings.css"
import { Route, Routes, Link, Router } from 'react-router-dom';
function Greetings() {

    return (
        <div className="greetings">
        <div className="greetings_wrapper">
        <h1 className='greetings_text'>Добро пожаловать</h1>

            <Link to="/registration">

                <button className='greetings_btn'>Зарегистироваться</button>
            </Link>
            <Link to="/authorization">
                <button className='greetings_btn'>У меня уже есть аккаунт</button>
            </Link>
            </div>
        </div>

    )
  }
  
  export default Greetings
  