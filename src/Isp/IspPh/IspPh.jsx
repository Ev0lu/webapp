import { Link } from 'react-router-dom';
import s from './IspPh.module.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';
import { useState } from 'react';

function IspPh(props) {
  const [avatar, setAvatar] = useState(null);
  const [size, setSize] = useState(null);
  const [errorFields, setErrorFields] = useState({
    avatar: false,
    size: false
  });

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 200 || img.height > 200) {
          setErrorFields({ size: true });
          setAvatar(null);
        } else {
          setErrorFields({ size: false });
          setAvatar(reader.result);
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
      size: size === null
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
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
            {size === null && (errorFields.size && <span className={s.error_message}>Изображение не должно быть размером больше чем 200x200</span>)}
          </div>
        </div>
        <Link to={avatar !== null ? '/create' : '/isp_reg_photo'}>
          <button onClick={validateFields} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
        </Link>
        <Link to={'/'}>
          <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>пропустить</button>
        </Link>
      </div>
    </div>
  );
}

export default IspPh;

