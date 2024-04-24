import { useState } from "react";
import './Zak1.css'
import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'
import arrowsvg from '../../assets/arrow.svg'
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
      <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"232323"} }>        <div className="greetings_wrapper">
        <div className="reg">
            <Link to='/zak_reg'>
                <img src={arrowsvg} className="reg_arrow"></img>
            </Link>
            <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Дата рождения</h1>
        </div>
     <div className="date-picker">
      <input
        type="text"
        className="password-field"
        value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : ''}
        readOnly
      />
      <div className="icon" onClick={toggleCalendar}>
        {showCalendar ? <img src={plus}></img>: <img src={minus}></img>}
      </div>
      {showCalendar && (
        <div className="calendar">
          <div className="nav">
            <div className="arrow" onClick={() => handleMonthChange(-1)}>
              {'<'}
            </div>
            <div>{months[selectedMonth]}</div>
            <div className="arrow" onClick={() => handleMonthChange(1)}>
              {'>'}
            </div>
            <div className="arrow" onClick={() => handleYearChange(-1)}>
              {'<'}
            </div>
            <div>{selectedYear}</div>
            <div className="arrow" onClick={() => handleYearChange(1)}>
              {'>'}
            </div>
          </div>
          <div className="days">
          {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => (
              <div
                key={day}
                className={selectedDate && selectedDate.getDate() === day ? 'selected' : ''}
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
        <button className='greetings_btn'>Далее</button>
    </Link>
        </div>
      </div>
    )
  }
  
  export default Zak1
  