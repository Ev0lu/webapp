import { Route, Routes, Link, Router } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

import s from './IspPh.module.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';

function IspPh(props) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistered2, setIsRegistered2] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [errorFields, setErrorFields] = useState({
    avatar: false,
  });

  const fileInputRef = React.createRef();

  const validateFields = () => {
    const errors = {
      avatar: avatar === null,
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        const image = new Image();
        image.src = imageDataUrl;
        image.onload = () => {
          if (image.width > 200 || image.height > 200) {
            setErrorFields({ avatar: true });
            setAvatar(null);
            return;
          }
          setAvatar(imageDataUrl);
          setShowEditIcon(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAvatar = () => {
    fileInputRef.current.click();
  };

  const handleNext = () => {
    if (validateFields()) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      fetch('/api/register', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle response data
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }
  };

  return (
    <div className={s.greetings} style={props.colorB === "light" ? { backgroundColor: "white" } : { backgroundColor: "#232323" }}>
      <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB === 'light' ? { color: 'black' } : { color: 'white' }}>
          Регистрация
        </h1>
        <div className={s.avatar_container}>
<label htmlFor={s.avatar_input} className={s.avatar}>
  {avatar ? (
    <>
      <img src={avatar} alt="Avatar" className={s.avatar_img} />
      {showEditIcon && (
        <img
          src={pencilSvg}
          alt="Edit Avatar"
          className={s.edit_icon}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current.click();
          }}
        />
      )}
    </>
  ) : (
    <div className={s.avatar_placeholder} onClick={() => fileInputRef.current.click()}>
      <img src={plusSvg} alt="Add Avatar" className={s.plus_svg} />
    </div>
  )}
</label>
          <div className={s.avatar_flex}>
            <input
              id={s.avatar_input}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              className={s.avatar_input}
            />
            {avatar === null && (errorFields.avatar && <span className={s.error_message}>Пожалуйста, приложите изображение</span>)}
          </div>
        </div>
        <button onClick={handleNext} className={`${s.greetings_btn} ${isRegistered ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>
          Далее
        </button>
        <Link to={'/'}>
          <button onClick={() => {
            setIsRegistered2(true);
            setIsRegistered(false);
          }} className={`${s.greetings_btn} ${isRegistered2 ? s.lightMode1 : (props.colorB === 'light' ? s.lightMode : s.darkMode)}`}>
            пропустить
          </button>
        </Link>
      </div>
    </div>
  );
}

export default IspPh;
