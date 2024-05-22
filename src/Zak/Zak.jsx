import { useEffect, useState } from "react";
import s from "./Zak.module.css"
import { Link } from "react-router-dom";
import arrowsvg from '../assets/arrow.svg'
import blackarr from '../assets/black.svg'


function Zak(props) {
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('')
    const [fio, setFio] = useState('')
    const [isexist, setIsexist] = useState(null)
    const [telegramId, setTelegramId] = useState(sessionStorage.getItem('tgId'))
    const [rlink, setRlink] = useState('/zak1_reg')
    const [errorFields, setErrorFields] = useState({
        name: false,
        lname: false,
        gender: false
    });
  const [exist, setExist] = useState(sessionStorage.getItem('exist') === 'true');
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'));
    



    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleChange2 = (event) => {
        setLname(event.target.value);
    };
    const handleChange3 = (event) => {
        setFname(event.target.value);
    };


    const [gender, setGender] = useState('');


    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };
    const changeFio = () => {
        setFio(name + ' ' + lname + ' ' + fname)
    }

    useEffect(() => {
        changeFio()
    }, [name, lname, fname])




    const checking = () => {
        if ((gender === '') || (name === '') || (lname === '')) {
            setRlink('/zak_reg')
        } else {
            setRlink('/zak1_reg')
        }
    }

    const validateFields = () => {
        const errors = {
            name: name === '',
            lname: lname === '',
            gender: gender === ''

        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };


    /*useEffect(() => {
        const fetchQuestion = async () => {
            
          
           

          try {
            const initData = await props.tg.initDataUnsafe;
            setTelegramId(initData.user.id);
              
            const url = `http://localhost/users/check/worker?telegram_id=${telegramId}`;
            
            console.log(`Sending request to: ${url}`);
            const res = await fetch(url);
            console.log(`Response status: ${res.status}`);
            if (!res.ok) {
              throw new Error(`Error: ${res.status}`);
            }
            const data = await res.json();
            const e = data.exist
            setIsexist(data.exist);
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
        };
        fetchQuestion();


        //setTelegramId(props.tg.initDataUnsafe.user.id);
        fetch(`http://localhost/users/check/worker?telegram_id=${536036487}`)
        .then(response => response.json())
        .then(data =>{ setIsexist(JSON.stringify(data.exist))
        })
        .catch(console.error)
      }, []);*/


      useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await fetch(`https://assista1.ru/api/v1/users/check/client?telegram_id=${telegramId}`);
            const data = await response.json();
            const exist = await data.exist;
            setIsexist(JSON.stringify(exist))
          } catch (error) {
          }
        };
        fetchData();
      }, []);
      useEffect(() => {
        setLname(sessionStorage.getItem('lname') !== null ? sessionStorage.getItem('lname') : '')
        setFname(sessionStorage.getItem('fname') !== null ? sessionStorage.getItem('fname') : '')
        setName(sessionStorage.getItem('name') !== null ? sessionStorage.getItem('name') : '')
        setGender(sessionStorage.getItem('gender') !== null ? sessionStorage.getItem('gender') : '')

      }, [])
   /* const postRequest = async () => {
        let answersStr = answers.toString()
        let answersTextStr = answersText.toString()
        let user = {
          page_id: window.location.pathname,
          useragent: window.navigator.userAgent,
          ip_address: ip,
          question_id: id,
          answer_array: answersStr,
          answer_text: answersTextStr
        };
       
        await fetch('http://62.84.112.244/events/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        setAnswers([])
        setAnswersText([])
      }*/
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
      // Handle response data if needed

    } else {
     const responseData = await response.json();
      // Handle response data if needed
        const data = {
            "status": "unauthorized"
        }
        props.tg.sendData(JSON.stringify(data))
        props.tg.close()
    }
  } catch (error) {

  }
}


     const fetchInfo = async () => {



    

    try {
      const response = await fetch(`https://assista1.ru/api/v1/users/me`,{
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${accessToken}`,
        }
      });

        if(response.status !== 401) {
                  const data = await response.json();
            
                      setName(`${data.full_name.split(' ')[0]}`)
                      setLname(`${data.full_name.split(' ')[1]}`)
                      setFname(`${data.full_name.split(' ')[2]}`)
                      setGender(`${data.gender}`)
                      handleGenderChange(`${data.gender}`)
            
                      handleChange(`${data.full_name.split(' ')[0]}`)
                      handleChange2(`${data.full_name.split(' ')[1]}`)
                      handleChange3(`${data.full_name.split(' ')[2]}`)
            
                    
                      validateFields()
            
           } else{
                    refreshTok()
                }

      
    } catch (error) {

    }

  };

  useEffect(() => {
      if(exist === true){
    fetchInfo()

      }
  },[])


    
    return (
        <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }> 
        <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to={`/registration?telegram_id=${telegramId}&access_token=${accessToken}&exists=${exist}`}>
            <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
        </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className={`${s.password_input}`}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

                type={'text'}
                placeholder="Имя*"
                className={`${s.password_field} ${errorFields.name && s.error}`}
                value={name}
                disabled={Boolean(exist)}
                onChange={handleChange}
            />
            { name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите ваше имя</span>)}

        </div>
        <div className={`${s.password_input}`}>
            <input
            style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Фамилия*"
                className={`${s.password_field} ${errorFields.lname && s.error}`}
                value={lname}
                disabled={Boolean(exist)}
                onChange={handleChange2}
            />
            { lname === '' && (errorFields.lname && <span className={s.error_message}>Пожалуйста, введите фамилию</span>)}
        </div>
        <div className={s.password_input3}>
            <input
style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Отчество"
                className={s.password_field}
                value={fname}
                disabled={Boolean(exist)}
                onChange={handleChange3}
            />

        </div>
        <div className={`${s.radio_gender}`} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>
            <label htmlFor="gender" style={{ fontSize: '14px' }}>Ваш пол:</label>
            <div>
                <input disabled={Boolean(exist)} type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                <label htmlFor="male" className={s.genderlabel}>Мужской</label>
            </div>
            <div>
                <input disabled={Boolean(exist)} type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                <label htmlFor="female" className={s.genderlabel}>Женский</label>
            </div>
            {gender === '' && (errorFields.gender && <span className={s.error_message}>Выберите ваш пол</span>)}
            {isexist === true  && (<span className={s.error_message}>Такой пользователь уже существует</span>) }
            {isexist === undefined  && (<span className={s.error_message}>Пожалуйста, откройте приложение в телеграме</span>) }        </div>
            
        <Link to={gender === '' || name === '' || lname === '' || isexist === true || isexist === null ? '/zak_reg' : '/zak1_reg'}>
            <button className={s.greetings_btn} onClick={() => {
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('lname', lname)
                sessionStorage.setItem('fname', fname)
                sessionStorage.setItem('gender', gender)

                changeFio()
                validateFields()
            }}>Далее</button>
        </Link>
        </div>
      </div>
    )
  }
  
  export default Zak
