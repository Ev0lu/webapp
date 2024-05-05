import React, { useRef, useState, useEffect } from 'react';
import s from './Isp1.module.css';
import arrowsvg from '../../assets/arrow.svg';
import arrowsvg2 from '../../assets/angle-dark.svg';
import blackarr from '../../assets/black.svg'
import { Link } from 'react-router-dom';
function Isp1(props) {
  const [countries, setCountries] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Количество элементов, которые необходимо загрузить при каждом запросе

  const [city, setCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const [errorFields, setErrorFields] = useState({
    city: false,
    selectedCountry: false
});

  const validateFields = () => {
    const errors = {
      city: city === '',
      selectedCountry: selectedCountry === ''
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
};
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

  
  const fetchCountries = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('/items/country', {
        params: {
          offset,
          limit: 25,
        },
      });
      const newCountries = response.data;
      setCountries([...countries, ...newCountries]);
      setHasMore(newCountries.length === 25);
      setOffset(offset + 25);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight(scrollbarHeightPercentage);
    scrollbarRef.current.style.height = `${(scrollbarHeightPercentage)-13}%`;
    scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      fetchCountries();
    }
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
      
      {selectedCountry === '' && (errorFields.selectedCountry && <span className={s.error_message}>Выберите вашу страну</span>)}
    </div>
    
      <div className={s.password_input}>
        <input
          type="text"
          placeholder="Город"
          value={city}
          className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
          onChange={(e) => setCity(e.target.value)}
        />
        {city === '' && (errorFields.city && <span className={s.error_message}>Выберите ваш город</span>)}

      </div>
      <Link to={(city === '') || (selectedCountry == '') ? '/isp1_reg' : '/isp2_reg'}>
        <button onClick={() => {
          validateFields()
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Далее</button>
      </Link>
      </div>
    </div>
  );
}

export default Isp1
