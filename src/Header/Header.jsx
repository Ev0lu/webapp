import logo from '../assets/logo-1.svg'
import '../Header/Header.css'
function Header() {

  return (
   <div className={'header'}>
    <div className="image">
        <img src={logo}></img>
    </div>
   </div>
  )
}

export default Header
