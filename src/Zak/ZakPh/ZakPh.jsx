import { Route, Routes, Link, Router } from 'react-router-dom';
import './ZakPh.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';
import { useEffect, useState } from 'react';
function ZakPh(props) {
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
      <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>           <div className="greetings_wrapper">
      <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
      <div className="avatar-container">
      <label htmlFor="avatar-input" className="avatar">
        {avatar ? (
          <>
            <img
              src={avatar}
              alt="Avatar"
              className="avatar-img"

            />
            {showEditIcon && (
              <img
                src={pencilSvg}
                alt="Edit Avatar"
                className="edit-icon"
                onClick={handleEditAvatar}
              />
            )}
          </>
        ) : (
          <div className="avatar-placeholder" onClick={handleEditAvatar}>
            <img src={plusSvg} alt="Add Avatar" className="plus-svg" />
          </div>
        )}
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="avatar-input"
      />
    </div>
          <Link to="/">
          <button className='greetings_btn'>Далее</button>
          </Link>
          <Link to="/">

          <button className='greetings_btn'>пропустить</button>
          </Link>

        </div>
      </div>
    )
  }
  
  export default ZakPh