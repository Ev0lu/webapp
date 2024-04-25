import React, { useRef, useState, useEffect } from 'react';
import s from './Isp1.module.css';
import arrowsvg from '../../assets/angle-light.svg';
import arrowsvg2 from '../../assets/angle-dark.svg';
import blackarr from '../../assets/black.svg'
import { Link } from 'react-router-dom';
function Isp1(props) {
  const countries = ['Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия' , 'Грузия', 'Грузия', 'Грузия', 'Грузия', 'Грузия', 'Грузия', 'Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия' , 'Грузия', 'Грузия', 'Грузия', 'Грузия'];
  const [city, setCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const calculateScrollbarHeight = () => {
      const scrollContainerHeight = scrollContainerRef.current.offsetHeight;
      const contentHeight = scrollContainerRef.current.scrollHeight;
      const scrollbarHeightPercentage = (scrollContainerHeight / contentHeight) * 100;
      setScrollbarHeight(scrollbarHeightPercentage);
    };

    calculateScrollbarHeight();

    const handleResize = () => {
      calculateScrollbarHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight(scrollbarHeightPercentage);
    scrollbarRef.current.style.height = `${(scrollbarHeightPercentage)-13}%`;
    scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };

  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>  
         <div className={s.greetings_wrapper}>
        <div className={s.reg}>
        <Link to='/isp_reg'>
            <img src={props.colorB === 'light' ? blackarr : arrowsvg} className={s.reg_arrow}></img>
        </Link>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className={s.dropdown_container} ref={dropdownRef}>
      <input
      className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
        type="text"
        value={selectedCountry}
        placeholder="Страна"
        onClick={toggleDropdown}
        readOnly
      />
      <div className={`${s.dropdown_options} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen ? s.open : ''}`}>
        <div className={s.scroll_container} ref={scrollContainerRef} onScroll={handleScroll}>
          {countries.map((country, index) => (
            <div key={index} className={`${s.dropdown_option} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => selectCountry(country)}>
              {country}
            </div>
          ))}
        </div>
        <div className={`${s.scrollbar_1} ${props.colorB === 'light' ? s.light : s.dark}`} style={{ height: `90%`}} />
        <div className={`${s.scrollbar} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef} style={{ height: `${scrollbarHeight}%` }} />
        
      </div>
      
    </div>
      <div className={s.password_input}>
        <input
          type="text"
          placeholder="Город"
          value={city}
          className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <Link to='/isp2_reg'>
        <button className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Далее</button>
      </Link>
      </div>
    </div>
  );
}

export default Isp1