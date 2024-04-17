import { useEffect, useState } from 'react'

import './App.css'
import Header from './Header/Header'
const tg = window.Telegram.WebApp
function App() {
  const [count, setCount] = useState(0)

  useEffect( ()=> {
    tg.ready()
  }, [])


  const onClose = () => {
    tg.close()
  }
  return (
    <div className="app">
      <Header />
      <div className="greetings">
        <div className="greetings_wrapper">
          <h1 className='greetings_text'>Добро пожаловать</h1>
          <button className='greetings_btn'>Зарегистироваться</button>
          <button className='greetings_btn'>У меня уже есть аккаунт</button>
        </div>
      </div>
    
      </div>
  )
}

export default App
