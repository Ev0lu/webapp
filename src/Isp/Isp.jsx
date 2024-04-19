function Reg(props) {

    return (
        <div className="greetings" style={props.color==='light' ? {backgroundColor:'white'} : {backgroundColor:'#232323'} }>
        <div className="greetings_wrapper">
        <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Исполнитель</h1>
          <button className='greetings_btn'>Исполнитель</button>
          <button className='greetings_btn'>Исполнитель</button>
        </div>
      </div>
    )
  }
  
  export default Reg
  