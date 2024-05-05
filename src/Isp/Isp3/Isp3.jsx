import React, { useRef, useState, useEffect } from 'react';
import s from './Isp3.module.css';
import arrowsvg from '../../assets/arrow.svg';
import { Link } from 'react-router-dom';
import Vector from '../../assets/Vector.svg'
import darkgal from '../../assets/dark_gal.svg' 
import blackarr from '../../assets/black.svg'

function Isp3(props) {
  const skills = ['Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия', 'a', 'b', 'v'];
  const lang = ['Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия', 'a', 'b', 'v'];
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
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
  const [errorFields, setErrorFields] = useState({
    selectedCountries1: false,
    selectedCountries2: false
});
  const validateFields = () => {
    const errors = {
      selectedCountries1: selectedCountries1.length === 0,
      selectedCountries2: selectedCountries2.length === 0
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

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

  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(searchQuery1.toLowerCase()));
  const filteredLang = lang.filter((lang) => lang.toLowerCase().includes(searchQuery2.toLowerCase()));

  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>  
            <div className={s.greetings_wrapper}>
        <div className={s.reg}>

          <h1 className={s.greetings_text} style={props.colorB === 'light' ? { color: 'black' } : { color: 'white' }}>Осталось совсем немного</h1>
        </div>

        <div className={s.dropdown_container} ref={dropdownRef1}>
          <input
            className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
            type="text"
            value={searchQuery1}
            placeholder="Навыки"
            onClick={toggleDropdown1}
            onChange={(e) => setSearchQuery1(e.target.value)}
            
          />
          <div  className={`${s.dropdown_options} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen1 ? s.open : ''}`}>
            <div  className={s.scroll_container} ref={scrollContainerRef1} onScroll={handleScroll1}>
              {filteredSkills.map((country, index) => (
                <div key={index} className={`${s.dropdown_option} ${props.colorB === 'light' ? s.light : s.dark}`} >
                <label style={{ display: 'flex', alignItems: 'center' }}>
                     <input
                     type="checkbox"
                     className={`${s.inputCheck} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries1.includes(country)}
                     onChange={() => selectCountry1(country)}
                     style={{
                         width: 20,
                         height: 20,
                         
                         border: 'none',
                         cursor: 'pointer',
                         marginRight: 10,
                     }}
                     />
                     {selectedCountries1.includes(' ' + country) && <img className={s.checkbox_icon__1}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                    
                      <span style={{ marginLeft: 10 }}>{country}</span>
                 </label>
             </div>
              ))}
            </div>
            <div className={`${s.scrollbar_1} ${props.colorB === 'light' ? s.light : s.dark}`}  />
            <div className={`${s.scrollbar} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef1} style={{ height: `${scrollbarHeight1}%` }} />
          </div>
          { selectedCountries1.length === 0 && (errorFields.selectedCountries1 && <span className={s.error_message}>Пожалуйста, выберите навыки</span>)}

        </div>

        <div className={s.dropdown_container__1} ref={dropdownRef2}>
          <input
            className={`${s.password_field__1} ${props.colorB === 'light' ? s.light : s.dark}`}
            type="text"
            value={searchQuery2}
            placeholder="Языки"
            onClick={toggleDropdown2}
            onChange={(e) => setSearchQuery2(e.target.value)}

            
          />
          <div className={`${s.dropdown_options__1} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen2 ? s.open : ''}`}>
            <div className={s.scroll_container__1} ref={scrollContainerRef2} onScroll={handleScroll2}>
              {filteredLang.map((country, index) => (
                <div key={index} className={`${s.dropdown_option__1} ${props.colorB === 'light' ? s.light : s.dark}`} >
                   <label style={{ display: 'flex', alignItems: 'center' }}>
                   {props.colorB === 'light' ? <input
                     type="checkbox"
                     className={`${s.inputCheck} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2.includes(country)}
                     onChange={() => selectCountry2(country)}
                     style={{
                      width: 20,
                      height: 20,
                      backgroundColor: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: 10,
                    }}/>
                    :
                    <input
                     type="checkbox"
                     className={`${s.inputCheck} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2.includes(country)}
                     onChange={() => selectCountry2(country)}
                     style={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#232323',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: 10,
                    }}
      
                     />
                    
                    }
                     {selectedCountries2.includes(' ' + country) && <img className={s.checkbox_icon__1}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                       
                         <span style={{ marginLeft: 10 }}>{country}</span>
                    </label>
                </div>
              ))}
            </div>
            
            <div className={`${s.scrollbar_1__1} ${props.colorB === 'light' ? s.light : s.dark}`} />
            <div className={`${s.scrollbar__1} ${props.colorB === 'light' ? s.light : s.dark}`}  ref={scrollbarRef2} style={{ height: `${scrollbarHeight2}%` }} />
          </div>
          { selectedCountries2.length === 0 && (errorFields.selectedCountries2 && <span className={s.error_message}>Пожалуйста, выберите языки</span>)}

        </div>


        <Link to={selectedCountries1.length !== 0 || selectedCountries2.length !== 0 ? '/isp_reg_photo' : '/isp3_reg'}>
          <button onClick={() => {
            validateFields()
          }} className={s.greetings_btn}>Далее</button>
        </Link>
      </div>
    </div>
  );
}

export default Isp3;