import { Link } from 'react-router-dom';
import s from './IspPh.module.css';
import plusSvg from '../../assets/plus2.svg';
import pencilSvg from '../../assets/pencil.svg';
import loader from '../../assets/loading.svg';
import { useState, useEffect } from 'react';

function IspPh(props) {
  const [avatar, setAvatar] = useState(null);
  const [size, setSize] = useState(false);
  const [filepic, setFilepic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState({
    avatar: false,
    size: false
  });
  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {
      validateFields()
      setAccessToken(sessionStorage.getItem('access_token'));


  }, [avatar]);

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file.size > 500 * 1024) { // размер в байтах
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

  const validateFields = () => {
    const errors = {
      avatar: avatar === null,
      size: size === true
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append('photo', filepic);
    if (!filepic) {
      return;
    }

    setLoading(true)

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
      const data = {
        access_token: sessionStorage.getItem('access_token'),
        refresh_token: sessionStorage.getItem('refresh_token'),
        profile_id: sessionStorage.getItem('profile_id')
    };
    props.tg.sendData(JSON.stringify(data))
    setLoading(false)
    } else if (response.status === 401) {
      const responseData = await response.json();
      refreshTok()
    }
  } catch (error) {
  }
};


const refreshTok = async () => {  
  let user = {
    refresh_token: `${sessionStorage.getItem('refresh_token')}`,
  };

  try {
    const response = await fetch('https://assista1.ru/api/v1/auth/refreshToken', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      const responseData = await response.json();
      sessionStorage.setItem('accessToken', responseData.access_token)
      sessionStorage.setItem('refresh_token', responseData.refresh_token) 
      uploadPhoto()

    } else if (response.status === 401) {
     const responseData = await response.json();
      const data = {
          "status": "unauthorized"
      }
        props.tg.sendData(JSON.stringify(data))
        props.tg.close()
    }
  } catch (error) {

  }
}



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
            {size === true && (errorFields.size && <span className={s.error_message}>Размер изображения должен быть меньше 500Кб</span>)}
          </div>
        </div>
        <div>
            {loading && <img className={s.loader} src={loader}></img>}
          </div>
        { avatar !== null &&
        <Link to={avatar !== null ? '/success_r' : '/zak_reg_photo'}>
          <button onClick={() => {
          validateFields()
          uploadPhoto()
    
    
    
    }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
        </Link>}
        <Link to={'/success_r'}>
          <button onClick={() => {
                const data = {
                  access_token: sessionStorage.getItem('access_token'),
                  refresh_token: sessionStorage.getItem('refresh_token'),
                  profile_id: sessionStorage.getItem('profile_id')
              };
              props.tg.sendData(JSON.stringify(data))
          }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Пропустить</button>
        </Link>
      </div>
    </div>
  );
}

export default IspPh;
