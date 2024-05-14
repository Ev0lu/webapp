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
  const [accessToken, setAccessToken] = useState(null);
  const validateFields = () => {
    const errors = {
      avatar: avatar === null,
      size: size === true
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

  useEffect(() => {
      validateFields()
      setAccessToken(sessionStorage.getItem('access_token'));


  }, [filepic]);

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
    if (file.size > 50 * 1024) { // размер в байтах
      console.log(file.size)
      setSize(true)
      setAvatar(null);
      return; // прерываем выполнение функции
    }
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
       
          setSize(false)
          setAvatar(reader.result);
          
          setFilepic(file)
          
        
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
};



const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append('photo', filepic);
    if (!filepic) {
      console.error('File is not selected');
      return;
    }

    

  try {
    const response = await fetch('https://assista1.ru/api/v1/users/uploadPhoto', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
      },
      body: formData
    });

    if (response.ok) {
      const responseData = await response.json();
      // Handle response data if needed
      console.log(responseData)
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
            {size === true && (errorFields.size && <span className={s.error_message}>Изображение должно быть меньше 50Кб</span>)}
          </div>
        </div>
        <Link to={(avatar !== null  && size !== true) ? '/success_r' : '/zak_reg_photo'}>
          <button onClick={() => {
          validateFields()
          if (avatar !== null && size !== true){
              uploadPhoto()
               const data = {
    
                        access_token: sessionStorage.getItem('access_token'),
                        refresh_token: sessionStorage.getItem('refresh_token'),
                        profile_id: sessionStorage.getItem('profile_id')
                           
                      };
                   props.tg.sendData(JSON.stringify(data))
                  props.tg.close()
                    
          }
    
    
    }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
        </Link>
        <Link to={'/success_r'}>
          <button onClick={() => {
           const data = {

                    access_token: sessionStorage.getItem('access_token'),
                    refresh_token: sessionStorage.getItem('refresh_token'),
                    profile_id: sessionStorage.getItem('profile_id')
                       
                  };
                props.tg.sendData(JSON.stringify(data))
                props.tg.close()

                
          }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Пропустить</button>
        </Link>
      </div>
    </div>
  );
}

export default ZakPh;
