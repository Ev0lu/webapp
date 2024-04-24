import React, { useRef, useState, useEffect } from 'react';
import './Isp3.css';
import arrowsvg from '../../assets/arrow.svg';
import { Link } from 'react-router-dom';
import Vector from '../../assets/Vector.svg'

function Isp3(props) {
  const countries = ['Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия', 'a', 'b', 'v'];
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [selectedCountries1, setSelectedCountries1] = useState([]);
  const [selectedCountries2, setSelectedCountries2] = useState([]);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollbarRef1 = useRef(null);
  const scrollbarRef2 = useRef(null);
  const [scrollbarHeight1, setScrollbarHeight1] = useState(0);
  const [scrollbarHeight2, setScrollbarHeight2] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((dropdownRef1.current && !dropdownRef1.current.contains(event.target)) && (dropdownRef2.current && !dropdownRef2.current.contains(event.target))) {
        setIsOpen1(false);
        setIsOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const calculateScrollbarHeight1 = () => {
      const scrollContainerHeight1 = scrollContainerRef1.current.offsetHeight;
      const contentHeight1 = scrollContainerRef1.current.scrollHeight;
      const scrollbarHeightPercentage1 = (scrollContainerHeight1 / contentHeight1) * 100;
      setScrollbarHeight1(scrollbarHeightPercentage1);
    };

    const calculateScrollbarHeight2 = () => {
      const scrollContainerHeight2 = scrollContainerRef2.current.offsetHeight;
      const contentHeight2 = scrollContainerRef2.current.scrollHeight;
      const scrollbarHeightPercentage2 = (scrollContainerHeight2 / contentHeight2) * 100;
      setScrollbarHeight2(scrollbarHeightPercentage2);
    };

    calculateScrollbarHeight1();
    calculateScrollbarHeight2();

    const handleResize = () => {
      calculateScrollbarHeight1();
      calculateScrollbarHeight2();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  const selectCountry1 = (country) => {
    const isSelected = selectedCountries1.includes(' ' + country);
    if (isSelected) {
      setSelectedCountries1(selectedCountries1.filter(c => c !== ' ' + country));
    } else {
      setSelectedCountries1([...selectedCountries1, ' ' + country]);
    }
  };

  const selectCountry2 = (country) => {
    const isSelected = selectedCountries2.includes(' ' + country);
    if (isSelected) {
      setSelectedCountries2(selectedCountries2.filter(c => c !== ' ' + country));
    } else {
      setSelectedCountries2([...selectedCountries2, ' ' + country]);
    }
  };
  const handleScroll1 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage1 = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight1(scrollbarHeightPercentage1);
    scrollbarRef1.current.style.height = `${(scrollbarHeightPercentage1) - 13}%`;
    scrollbarRef1.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };

  const handleScroll2 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage2 = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight2(scrollbarHeightPercentage2);
    scrollbarRef2.current.style.height = `${(scrollbarHeightPercentage2) - 13}%`;
    scrollbarRef2.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };
  const checkmarkSvg = (
    <img src={Vector}></img>
  );
  return (
    <div className="greetings" style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"232323"} }>      <div className="greetings_wrapper">
        <div className="reg">
          <Link to='/isp2_reg'>
            <img src={arrowsvg} className="reg_arrow"></img>
          </Link>
          <h1 className='greetings_text' style={props.color === 'light' ? { color: 'black' } : { color: 'white' }}>Регистрация</h1>
        </div>

        <div className="dropdown-container" ref={dropdownRef1}>
          <input
            className='password-field'
            type="text"
            value={selectedCountries1}
            placeholder="Select a country"
            onClick={toggleDropdown1}
            readOnly
          />
          <div className={`dropdown-options ${isOpen1 ? 'open' : ''}`}>
            <div className="scroll-container" ref={scrollContainerRef1} onScroll={handleScroll1}>
              {countries.map((country, index) => (
                <div key={index} className="dropdown-option" onClick={() => selectCountry1(country)}  >
                <label style={{ display: 'flex', alignItems: 'center' }}>
                     <input
                     type="checkbox"
                     className='inputCheck'
                     checked={selectedCountries1.includes(country)}
                     onChange={() => selectCountry1(country)}
                     style={{
                         width: 20,
                         height: 20,
                         backgroundColor: 'white',
                         border: 'none',
                         cursor: 'pointer',
                         marginRight: 10,
                     }}
                     />
                     {selectedCountries1.includes(' ' + country) && <img className="checkbox-icon--1" src={Vector} alt="checkmark"></img>}
                    
                      <span style={{ marginLeft: 10 }}>{country}</span>
                 </label>
             </div>
              ))}
            </div>
            <div className="scrollbar-1"  />
            <div className="scrollbar" ref={scrollbarRef1} style={{ height: `${scrollbarHeight1}%` }} />
          </div>
        </div>

        <div className="dropdown-container--1" ref={dropdownRef2}>
          <input
            className='password-field--1'
            type="text"
            value={selectedCountries2}
            placeholder="Select a country"
            onClick={toggleDropdown2}
            readOnly
          />
          <div onClick={() => selectCountry2(country)} className={`dropdown-options--1 ${isOpen2 ? 'open' : ''}`}>
            <div className="scroll-container--1" ref={scrollContainerRef2} onScroll={handleScroll2}>
              {countries.map((country, index) => (
                <div key={index} className="dropdown-option--1" >
                   <label style={{ display: 'flex', alignItems: 'center' }}>
                   <input
                        type="checkbox"
                        className='inputCheck'
                        checked={selectedCountries2.includes(country)}
                        onChange={() => selectCountry2(country)}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: 10,
                        }}
                        />
                        {selectedCountries2.includes(' ' + country) && <img className="checkbox-icon" src={Vector} alt="checkmark"></img>}
                       
                         <span style={{ marginLeft: 10 }}>{country}</span>
                    </label>
                </div>
              ))}
            </div>
            <div className="scrollbar-1--1" />
            <div className="scrollbar--1"  ref={scrollbarRef2} style={{ height: `${scrollbarHeight2}%` }} />
          </div>
        </div>

        <div className="password-input">
          <input
            type="text"
            placeholder="Город 1"
            value={city1}
            className='password-field'
            onChange={(e) => setCity1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Город 2"
            value={city2}
            className='password-field'
            onChange={(e) => setCity2(e.target.value)}
          />
        </div>
        <Link to='/isp_photo_reg'>
          <button className="greetings_btn">Далее</button>
        </Link>
      </div>
    </div>
  );
}

export default Isp3;