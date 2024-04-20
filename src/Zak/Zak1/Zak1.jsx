import { useState } from "react";
import './Zak1.css'

function Zak1(props) {

    return (
        <div className="greetings" style={props.color==='light' ? {backgroundColor:'white'} : {backgroundColor:'#232323'} }>
        <div className="greetings_wrapper">
        <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Календарь</h1>

        <button className='greetings_btn'>Далее</button>
        </div>
      </div>
    )
  }
  
  export default Zak1
  