import { Route, Routes, Link, Router } from 'react-router-dom';
function Reg(props) {

    return (
      <div className="greetings">
      <div className="greetings_wrapper">
      <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
          <Link to="/zak_reg">
          <button className='greetings_btn'>Я заказчик</button>
          </Link>
          <Link to="/isp_reg">

          <button className='greetings_btn'>Я исполнитель</button>
          </Link>

        </div>
      </div>
    )
  }
  
  export default Reg
  