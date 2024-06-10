import { useState, useEffect } from "react";
import s from './Zak1.module.css'
import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'
import lightplus from '../../assets/lightplus.svg'
import lightminus from '../../assets/lightminus.svg'
import arrowsvg from '../../assets/arrow.svg'
import blackarr from '../../assets/black.svg'

import { Link } from "react-router-dom";
function Zak1(props) {
    const months = [
        "январь", "февраль", "март", "апрель",
        "май", "июнь", "июль", "август",
        "сентябрь", "октябрь", "ноябрь", "декабрь"
      ];

      const years = Array.from({ length: 100 }, (_, index) => 2024 - index);
      const [showCalendar, setShowCalendar] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
      const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()-17);
      const [nowYear, setNowYear] = useState(new Date().getFullYear());
      const [err, setErr] = useState(null);
    const [dr, setDr] = useState('')

     useEffect(() => {
         setNowYear(nowYear-17)
     },[])
    useEffect(() => {
        setDr(`${sessionStorage.getItem('birth_date')}`)
    },[])
    
    useEffect(() => {
        if (selectedYear > (new Date().getFullYear())-17 || selectedYear < (new Date().getFullYear()) - 100) {
            setErr(true);
        } else {
            setErr(false);
        }
    }, [selectedYear,selectedDate]);

    
      const [errorFields, setErrorFields] = useState({
        selectedDate: false,
        err: false
    });
      const validateFields = () => {
        const errors = {
          selectedDate: selectedDate === null,
          err: err === true
        };
        setErrorFields(errors);
        return !Object.values(errors).some(Boolean);
    };
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
        if (selectedYear >= (new Date().getFullYear())-17){
          setSelectedYear((prevYear) => (prevYear + delta) <= new Date().getFullYear()-17 ? (prevYear + delta) : prevYear );
        } else {
            setSelectedYear((prevYear) => prevYear + delta);
        }
      };
    
      const handleDateClick = (day) => {
        setSelectedDate(new Date(selectedYear, selectedMonth, day));
        setSelectedDateStr(`${day < 10 ? '0' : ''}${day}.${selectedMonth - 1 < 8 ? '0' : ''}${selectedMonth + 1}.${selectedYear}`);

        setShowCalendar(!showCalendar);

      };      

      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    useEffect(() => {
         if (`${sessionStorage.getItem('birth_date')}` !== 'null') {
             setSelectedDate(new Date(Number(sessionStorage.getItem('birth_date').split('-').reverse()[2]), Number(sessionStorage.getItem('birth_date').split('-').reverse()[1])-1, Number(sessionStorage.getItem('birth_date').split('-').reverse()[0])));
             setSelectedYear(Number(sessionStorage.getItem('birth_date').split('-').reverse()[2]))
             setSelectedMonth(Number(sessionStorage.getItem('birth_date').split('-').reverse()[1])-1)
             setSelectedDateStr(new Date(Number(sessionStorage.getItem('birth_date').split('-').reverse()[2]), Number(sessionStorage.getItem('birth_date').split('-').reverse()[1])-1, Number(sessionStorage.getItem('birth_date').split('-').reverse()[0])).toLocaleDateString('ru-RU'));

         }
    }, [])



    function BirthDateInput(props) {
      const [selectedDate, setSelectedDate] = useState('');
      const [errorFields, setErrorFields] = useState({ selectedDate: false });
    }
    const isValidDate = (day, month, year) => {
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const handleDateChange = (e) => {
      let input = e.target.value.replace(/\D/g, ''); // Удаляем все нечисловые символы
      if (input.length > 8) input = input.slice(0, 8); // Ограничиваем длину строки

      let formattedDate = '';
      if (input.length > 4) {
          formattedDate = input.slice(0, 2) + '.' + input.slice(2, 4) + '.' + input.slice(4, 8);
      } else if (input.length > 2) {
          formattedDate = input.slice(0, 2) + '.' + input.slice(2, 4);
      } else {
          formattedDate = input;
      }

      setSelectedDateStr(formattedDate);

      if (input.length === 8) {
          const day = parseInt(formattedDate.slice(0, 2), 10);
          const month = parseInt(formattedDate.slice(3, 5), 10);
          const year = parseInt(formattedDate.slice(6, 10), 10);

          if (isValidDate(day, month, year)) {
              const formattedDay = day < 10 ? '0' + day : day;
              const formattedMonth = month < 10 ? '0' + month : month;

              sessionStorage.setItem('birth_date', `${formattedDay}-${formattedMonth}-${year}`);

              const birthDate = new Date(year, month - 1, day);

              setSelectedDate(birthDate);
              setSelectedYear(year);
              setSelectedMonth(month - 1);
          } else {
              setSelectedDate(null);
          }
      }
  };


  const [selectedDateStr, setSelectedDateStr] = useState('');

    return (
      <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>             
       <div className={s.greetings_wrapper}>
        <div className={s.reg}>
            <Link to='/zak_reg'>
                <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
            </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Дата рождения</h1>
        </div>
     <div className={s.date_picker}>
      <div className={s.date_flex}>
      <input
        type="text"
        className={`${s.password_field} ${errorFields.selectedDate && s.error}`}
        style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

        value={selectedDateStr}
        onChange={handleDateChange}

      />


      </div>
      <div className={`${s.icon} `} onClick={toggleCalendar}>
        {showCalendar ? <img src={props.colorB === 'light' ? lightplus : plus}></img>: <img src={props.colorB === 'dark' ? minus : lightminus}></img>}
      </div>
      {selectedDate === null && (errorFields.selectedDate && <span className={s.error_message}>Пожалуйста, введите дату</span>)}
      {errorFields.err && <span className={s.error_message1}>Вы должны быть старше 16 лет</span>}
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
    <Link to={selectedDate !== null && err !== true ? "/zak2_reg" : "/zak1_reg"}>
        <button onClick={() => {
          validateFields()
          if (selectedDate !== null && err !== true){
              sessionStorage.setItem('birth_date', `${selectedYear}-${selectedMonth+1 < 10 ? '0' + `${selectedMonth+1}` : selectedMonth+1 }-${selectedDate.getDate() < 10 ? '0' + `${selectedDate.getDate()}` : selectedDate.getDate()  }`)
          }

      }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
    </Link>
    <Link to={"/zak2_reg"}>
        <button onClick={() => {

      }} className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Пропустить</button>
    </Link>
        </div>
      </div>
    )
  }
  
  export default Zak1
