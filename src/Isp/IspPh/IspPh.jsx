import { Route, Routes, Link, Router } from 'react-router-dom';
import s from './IspPh.module.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';
import { useEffect, useState } from 'react';
function IspPh(props) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isRegistered2, setIsRegistered2] = useState(false);

    const [avatar, setAvatar] = useState(null);
    const [showEditIcon, setShowEditIcon] = useState(false);
  
    const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatar(reader.result);
          setShowEditIcon(true);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleEditAvatar = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        handleAvatarChange(event);
      };
      input.click();
    };
    return (
      <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
                <div className={s.greetings_wrapper}>
      <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
      <div className={s.avatar_container}>
      <label htmlFor={s.avatar_input} className={s.avatar}>
        {avatar ? (
          <>
            <img
              src={avatar}
              alt="Avatar"
              className={s.avatar_img}

            />
            {showEditIcon && (
              <img
                src={pencilSvg}
                alt="Edit Avatar"
                className={s.edit_icon}
                onClick={handleEditAvatar}
              />
            )}
          </>
        ) : (
          <div className={s.avatar_placeholder} onClick={handleEditAvatar}>
            <img src={plusSvg} alt="Add Avatar" className={s.plus_svg} />
          </div>
        )}
      </label>
      <input
        id={s.avatar_input}
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className={s.avatar_input}
      />
    </div>
          <Link to="/">
          <button onClick={() => {
                    setIsRegistered(true)
                    setIsRegistered2(false)
                
                }} className={`${s.greetings_btn} ${isRegistered ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>Далее</button>
          </Link>
          <Link to="/">

          <button onClick={() => {
                    setIsRegistered2(true)
                    setIsRegistered(false)
                
                }} className={`${s.greetings_btn} ${isRegistered2 ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>пропустить</button>
          </Link>

        </div>
      </div>
    )
  }
  
  export default IspPh