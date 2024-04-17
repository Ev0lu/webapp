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
    <>
      <Header />
    works
    <button onClick={onClose}>Закрыть</button>
    </>
  )
}

export default App
