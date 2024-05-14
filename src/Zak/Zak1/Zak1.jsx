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
      const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
      const [nowYear, setNowYear] = useState(new Date().getFullYear());
      const [err, setErr] = useState(null);
    const [dr, setDr] = useState('')

     useEffect(() => {
         setNowYear(nowYear-17)
         console.log(nowYear)
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
        setSelectedYear((prevYear) => prevYear + delta);
      };
    
      const handleDateClick = (day) => {
        setSelectedDate(new Date(selectedYear, selectedMonth, day));
        //setShowCalendar(!showCalendar);
      };      

      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

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

        value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : `${sessionStorage.getItem('birth_date')}` !== 'null' ? `${sessionStorage.getItem('birth_date').split('-').reverse().join('.')}` :
        ''}
        readOnly
      />


      </div>
      <div className={`${s.icon} ${errorFields.selectedDate && s.open}`} onClick={toggleCalendar}>
        {showCalendar ? <img src={props.colorB === 'light' ? lightplus : plus}></img>: <img src={props.colorB === 'dark' ? minus : lightminus}></img>}
      </div>
      {selectedDate === null && (errorFields.selectedDate && <span className={s.error_message}>Пожалуйста, введите дату</span>)}
      {errorFields.err && <span className={s.error_message}>Вы должны быть старше 18 лет</span>}
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
        </div>
      </div>
    )
  }
  
  export default Zak1
