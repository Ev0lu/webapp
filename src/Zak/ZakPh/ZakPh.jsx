import { Link } from 'react-router-dom';
import s from './ZakPh.module.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';
import { useState, useEffect } from 'react';

function ZakPh(props) {
  const [avatar, setAvatar] = useState(null);
  const [size, setSize] = useState(false);
  const [filepic, setFilepic] = useState(null);
  const [errorFields, setErrorFields] = useState({
    avatar: false,
    size: false
  });
  const [access, setAccess] = useState('');


  useEffect(() => {
    setAccess(sessionStorage.getItem('access_token'))
    console.log(access)
  },[])
const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 500 || img.height > 500) {
          setErrorFields({ size: true });
          setAvatar(null);
        } else {
          setErrorFields({ size: false });
          setAvatar(reader.result);
          
          setFilepic(file)
          
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

  const validateFields = () => {
    const errors = {
      avatar: avatar === null,
      size: size === false
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

const uploadPhoto = async () => {
  

  try {
    const response = await fetch('https://assista1.ru/api/v1/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
      },

    });
    console.log(access)
    console.log(`access ${access}`)
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // Handle response data if needed
    } else {
      console.error('Failed to upload photo');
      const responseData = await response.json();
      console.log(responseData)
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
  }
};

  return (
    <div className={s.greetings} style={props.colorB === "light" ? {backgroundColor: "white"} : {backgroundColor: "#232323"} }>
      <div className={s.greetings_wrapper}>
        <h1 className={s.greetings_text} style={props.colorB === 'light' ? {color: 'black'} : {color: 'white'} }>Регистрация</h1>
        <div className={s.avatar_container}>
          <label htmlFor="avatar_input" className={s.avatar}>
            {avatar ? (
              <>
                <img
                  src={avatar}
                  alt="Avatar"
                  className={s.avatar_img}
                />
                <img
                  src={pencilSvg}
                  alt="Edit Avatar"
                  className={s.edit_icon}
                />
              </>
            ) : (
              <div className={s.avatar_placeholder}>
                <img src={plusSvg} alt="Add Avatar" className={s.plus_svg} />
              </div>
            )}
          </label>
          <div className={s.avatar_flex}>
            <input
              id="avatar_input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={s.avatar_input}
            />
            {avatar === null && (errorFields.avatar && <span className={s.error_message}>Пожалуйста, приложите изображение</span>)}
            {size === true && (errorFields.size && <span className={s.error_message}>Изображение не должно быть размером больше чем 200x200</span>)}
          </div>
        </div>
        <Link to={avatar !== null ? '/' : '/zak_reg_photo'}>
          <button onClick={() => {
          validateFields()
          uploadPhoto()}} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
        </Link>
        <Link to={'/create'}>
          <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>пропустить</button>
        </Link>
      </div>
    </div>
  );
}

export default ZakPh;
