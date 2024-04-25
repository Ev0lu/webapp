import { useState } from "react";
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
      <input
        type="text"
        className={s.password_field}
        style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

        value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : ''}
        readOnly
      />
      <div className={s.icon} onClick={toggleCalendar}>
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
    <Link to="/zak2_reg">
        <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.lightMode : s.darkMode}`}>Далее</button>
    </Link>
        </div>
      </div>
    )
  }
  
  export default Zak1
  