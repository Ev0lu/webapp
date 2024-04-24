import React, { useRef, useState, useEffect } from 'react';
import './Isp1.css';
import arrowsvg from '../../assets/arrow.svg';

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
    <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>       <div className="greetings_wrapper">
        <div className="reg">
        <Link to='/isp_reg'>
            <img src={arrowsvg} className="reg_arrow"></img>
        </Link>
            <h1 className='greetings_text'style={props.color==='light' ? {color:'black'} : {color:'white'} }>Регистрация</h1>
        </div>
        <div className="dropdown-container" ref={dropdownRef}>
      <input
      className='password-field'
        type="text"
        value={selectedCountry}
        placeholder="Select a country"
        onClick={toggleDropdown}
        readOnly
      />
      <div className={`dropdown-options ${isOpen ? 'open' : ''}`}>
        <div className="scroll-container" ref={scrollContainerRef} onScroll={handleScroll}>
          {countries.map((country, index) => (
            <div key={index} className="dropdown-option" onClick={() => selectCountry(country)}>
              {country}
            </div>
          ))}
        </div>
        <div className="scrollbar-1" style={{ height: `90%`}} />
        <div className="scrollbar" ref={scrollbarRef} style={{ height: `${scrollbarHeight}%` }} />
        
      </div>
      
    </div>
      <div className="password-input">
        <input
          type="text"
          placeholder="Город"
          value={city}
          className='password-field'
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <Link to='/isp2_reg'>
        <button className="greetings_btn">Далее</button>
      </Link>
      </div>
    </div>
  );
}

export default Isp1