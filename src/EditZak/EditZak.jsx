import React, { useRef, useState, useEffect } from 'react';
import s from './EditZak.module.css';
import arrowsvg from '../assets/arrow.svg';
import arrowsvg2 from '../assets/angle-dark.svg';
import blackarr from '../assets/black.svg';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import lightplus from '../assets/lightplus.svg'
import lightminus from '../assets/lightminus.svg'


function EditZak(props) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [accessToken, setAccessToken] = useState(searchParams.get('access_token'));
  const [refreshToken, setRefreshToken] = useState(searchParams.get('refresh_token'));
  const [today, setToday] = useState(new Date())
  // Получение значений параметров access_token и refresh_token из URL


  




  const [scrollbarHeight, setScrollbarHeight] = useState(0);


  const [loading2, setLoading2] = useState(false);
  const [offset2, setOffset2] = useState(0);
  const limit2 = 25; // Количество элементов, которые необходимо загрузить при каждом запросе
  const [searchQuery2, setSearchQuery2] = useState(''); // Input value for country search
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const dropdownRef2 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollbarRef2 = useRef(null);
  const [scrollbarHeight2, setScrollbarHeight2] = useState(0);
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [fname, setFname] = useState('')
  const [fio, setFio] = useState('')
  const [phone, setPhone] = useState('')
  
  const [errorFields, setErrorFields] = useState({
    selectedCountry2: false,
    selectedCountry: false,
    name: false,
    lname: false,
    gender: false,
    selectedDate: false,
    err: false
  });

  const validateFields = () => {
    const errors = {
      selectedCountry2: selectedCountry2 === '',
      selectedCountry: selectedCountry === '',
      selectedDate: selectedDate === null,
      err: err === ''
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
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




    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleChange2 = (event) => {
        setLname(event.target.value);
    };
    const handleChange3 = (event) => {
        setFname(event.target.value);
    };
      const handleChange4 = (event) => {
        setPhone(event.target.value);
    };

    const months = [
        "январь", "февраль", "март", "апрель",
        "май", "июнь", "июль", "август",
        "сентябрь", "октябрь", "ноябрь", "декабрь"
      ];

      const years = Array.from({ length: 100 }, (_, index) => 2024 - index);
      const [showCalendar, setShowCalendar] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
      const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
      const [nowYear, setNowYear] = useState(new Date().getFullYear());
      const [err, setErr] = useState(null);

     useEffect(() => {
         setNowYear(nowYear-17)
     },[])
       useEffect(() => {
         if (selectedYear > nowYear) {
              setErr(false)
         } else {
             setErr(true)
         }
     },[selectedYear])


      const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
      };
    
      const handleMonthChange = (delta) => {
        setSelectedMonth((prevMonth) => {
          let newMonth = prevMonth + delta;
          if (newMonth < 0) newMonth = 11;
          if (newMonth > 11) newMonth = 0;
          return newMonth;
        });
      };
    
      const handleYearChange = (delta) => {
        setSelectedYear((prevYear) => prevYear + delta);
      };
    
      const handleDateClick = (day) => {
        setSelectedDate(new Date(selectedYear, selectedMonth, day));
        //setShowCalendar(!showCalendar);
      };      

      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

       const fetchInfo = async () => {



    

    try {
      const response = await fetch(`https://assista1.ru/api/v1/users/me`,{
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();
      console.log(data)

      setName(`${data.full_name.split(' ')[0]}`)
      setLname(`${data.full_name.split(' ')[1]}`)
      setFname(`${data.full_name.split(' ')[2]}`)
      setGender(`${data.gender}`)
      setPhone(`${data.phone}`)
      
      




      
    } catch (error) {

    }

  };

  useEffect(() => {
    fetchInfo()
  },[])
const patchProfile = async () => {
    const requestBody = {
    
       
      "birth_date": `${selectedYear}-${selectedMonth+1 < 10 ? '0' + `${selectedMonth+1}` : selectedMonth+1 }-${selectedDate.getDate() < 10 ? '0' + `${selectedDate.getDate()}` : selectedDate.getDate()  }`,
      "profile": {
          "full_name": name + ' ' + lname + `${fname !== '' ? ' ' + fname : ''}`,
          "gender": `${gender}`,
          "phone": `${phone}`
        }
      
    }

    try {
      const response = await fetch(`https://assista1.ru/api/v1/users/update/worker`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });


      if (response.ok) {
        const data = await response.json();
        console.log(data)

        // Обработка полученных данных
      } else {
        const data = await response.json();
        console.log(data)
      }
    } catch (error) {

    }
};

  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>  
         <div className={s.greetings_wrapper}>
        <div className={s.reg}>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Создание заказа</h1>
        </div>

 <div className={`${s.password_input}`}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

                type={'text'}
                placeholder="Имя*"
                className={`${s.password_field} ${errorFields.name && s.error}`}
                value={name}
                onChange={handleChange}
            />
            { name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите дату рождения</span>)}

        </div>
        <div className={`${s.password_input}`}>
            <input
            style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Фамилия*"
                className={`${s.password_field} ${errorFields.lname && s.error}`}
                value={lname}
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
                onChange={handleChange3}
            />

        </div>


        <div className={`${s.radio_gender}`} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>
            <label htmlFor="gender" style={{ fontSize: '14px' }}>Ваш пол:</label>
            <div>
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                <label htmlFor="male" className={s.genderlabel}>Мужской</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                <label htmlFor="female" className={s.genderlabel}>Женский</label>
            </div>
        </div>

 <div className={s.date_picker}>
      <div className={s.date_flex}>
      <input
        type="text"
        className={`${s.password_field} ${errorFields.selectedDate && s.error}`}
        style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

        value={selectedDate ?
        selectedDate.toLocaleDateString('ru-RU') 

            
        :
        ''}
        readOnly
      />
      {selectedDate === null && (errorFields.selectedDate && <span className={s.error_message}>Пожалуйста, введите дату</span>)}
      {errorFields.err && <span className={s.error_message}>Вы должны быть старше 18 лет</span>}

      </div>
      <div className={`${s.icon} ${errorFields.selectedDate && s.open}`} onClick={toggleCalendar}>
        {showCalendar ? <img src={props.colorB === 'light' ? lightplus : plus}></img>: <img src={props.colorB === 'dark' ? minus : lightminus}></img>}
      </div>
      {showCalendar && (
        <div className={`${s.calendar} ${props.colorB === 'light' ? s.light : s.dark}`}>
          <div className={s.nav}>
            <div className={`${s.arrow} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => handleMonthChange(-1)}>
              {'<'}
            </div>
            <div>{months[selectedMonth]}</div>
            <div className={`${s.arrow} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => handleMonthChange(1)}>
              {'>'}
            </div>
            <div className={`${s.arrow} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => handleYearChange(-1)}>
              {'<'}
            </div>
            <div>{selectedYear}</div>
            <div className={`${s.arrow} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => handleYearChange(1)}>
              {'>'}
            </div>
          </div>
          <div className={`${s.days} ${props.colorB === 'light' ? s.light : s.dark}`}>
          {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => (
              <div
                key={day}
                className={selectedDate && selectedDate.getDate() === day ? s.selected : {}}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
           
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/' : '/'}>
        <button onClick={() => {
          validateFields()
         
          patchProfile()
          
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Создать заказ</button>
      </Link>
      </div>
    </div>
  );
}

export default EditZak;
