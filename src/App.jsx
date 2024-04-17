import { useEffect, useState } from 'react'

import './App.css'
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
    works
    <button onClick={onClose}>Закрыть</button>
    </>
  )
}

export default App
