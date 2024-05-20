import React, { useRef, useState, useEffect } from 'react';
import s from './Isp1.module.css';
import arrowsvg from '../../assets/arrow.svg';
import arrowsvg2 from '../../assets/angle-dark.svg';
import blackarr from '../../assets/black.svg';
import { Link } from 'react-router-dom';

function Isp1(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Количество элементов, которые необходимо загрузить при каждом запросе
  const [searchQuery, setSearchQuery] = useState(''); // Input value for country search

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [city, setCity] = useState('');
   const [cities, setCities] = useState([])

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
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Таймаут для задержки запроса

  
  const [errorFields, setErrorFields] = useState({
    selectedCountry2: false,
    selectedCountry: false
  });

  const validateFields = () => {
    const errors = {
      selectedCountry2: selectedCountry2 === '',
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
    const handleClickOutside2 = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
        setIsOpen2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    document.addEventListener('mousedown', handleClickOutside2);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside2);

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
    fetchCities()
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

 const selectCountry = (country) => {
    setSelectedCountry(country);
    if (searchQuery2 !== ''){

       fetchCities()
    }
    setSearchQuery(country[0]); // Update searchQuery with selected country label
    setIsOpen(false);
  };
 const selectCountry2 = (country) => {
    setSelectedCountry2(country);
    setSearchQuery2(country[0]); // Update searchQuery with selected country label

    setIsOpen2(false);
  };

  const [isCancelled, setIsCancelled] = useState(false); // Флаг отмены запроса


  const fetchCountries = async () => {
    if (isCancelled) return;


    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/country?startswith=${searchQuery}&offset=${offset}&limit=${limit}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setCountries(prevCountries => [...prevCountries, ...newCountries]); // Добавляем загруженные страны к списку
      setOffset(prevOffset => prevOffset + limit); // Увеличиваем offset для следующего запроса
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    
  };
  const fetchCities = async () => {
    if (isCancelled) return;
    if (selectedCountry[1] === '' || selectedCountry[1] === undefined) {
      return;
    }


    setLoading2(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/country/cities?country_id=${selectedCountry[1]}&startswith=${searchQuery2}&offset=${offset2}&limit=${limit2}`);
      const data = await response.json();
      const newCities = data.items.map(([citys, id]) => ({ label: citys, value: id }));

      setCities(prevCountries => [...prevCountries, ...newCities]); // Добавляем загруженные страны к списку
      setOffset2(prevOffset => prevOffset + limit2); // Увеличиваем offset для следующего запроса
    } catch (error) {
    }

    setLoading2(false);
  };

useEffect(() => {
  setOffset(0); // Reset offset to 0 when searchQuery changes
  setCountries([]); // Reset countries list to empty when searchQuery changes
    if (searchQuery === ''){
    setSelectedCountry([])
  }
}, [searchQuery]);
useEffect(() => {
  if (searchQuery2 === ''){
    setSelectedCountry2('')
  }
  setOffset2(0); // Reset offset to 0 when searchQuery changes
  setCities([]); // Reset countries list to empty when searchQuery changes
}, [searchQuery2]);


  useEffect(() => {
        setSelectedCountry2(sessionStorage.getItem('selectedCountry2') !== null ? sessionStorage.getItem('selectedCountry2') : '')
        setSearchQuery(sessionStorage.getItem('selectedCountry') !== null ? sessionStorage.getItem('selectedCountry').split(',')[0] : '')
        setSearchQuery2(sessionStorage.getItem('selectedCountry2') !== null ? sessionStorage.getItem('selectedCountry2').split(',')[0] : '')
        setSelectedCountry(sessionStorage.getItem('selectedCountry') !== null ? sessionStorage.getItem('selectedCountry') : '')
      }, [])

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight(scrollbarHeightPercentage);
    scrollbarRef.current.style.height = `${(scrollbarHeightPercentage-13)}%`;
    scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (
      scrollTop + clientHeight >= scrollHeight - (0.10 *scrollTop + 0.10 *clientHeight)
    ) {
      if (!loading) {
        setIsCancelled(false); 
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
        if (searchQuery !== ''){

        const timeout = setTimeout(() => {
          fetchCountries();
        }, 300); // Задержка выполнения запроса на 300 миллисекунд после последнего изменения поискового запроса
      
        setDebounceTimeout(timeout);
      }
        return () => {
          setIsCancelled(true); // Установка флага отмены перед размонтированием компонента
        }; // Загружаем следующую порцию стран при достижении конца прокрутки
      }
    }
  };

    const handleScroll2 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight2(scrollbarHeightPercentage);
    scrollbarRef2.current.style.height = `${(scrollbarHeightPercentage)-13}%`;
    scrollbarRef2.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (
      scrollTop + clientHeight >= scrollHeight-30
    ) {
      
      if (!loading2) {
        setIsCancelled(false);
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
        if (searchQuery2 !== ''){
        const timeout = setTimeout(() => {
          fetchCities();
        }, 300); // Задержка выполнения запроса на 300 миллисекунд после последнего изменения поискового запроса
      }
        setDebounceTimeout(timeout);
        return () => {
          setIsCancelled(true); // Установка флага отмены перед размонтированием компонента
        }; // Загружаем следующую порцию стран при достижении конца прокрутки
      }
    }
  };
  
useEffect(() => {
  if (searchQuery !== ''){
    setIsCancelled(false);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    if (searchQuery !== ''){

    const timeout = setTimeout(() => {
      fetchCountries();
    }, 300); // Задержка выполнения запроса на 300 миллисекунд после последнего изменения поискового запроса

    setDebounceTimeout(timeout);
  }
    return () => {
      setIsCancelled(true); // Установка флага отмены перед размонтированием компонента
    }; // Call fetchCountries whenever searchQuery changes
  }
}, [searchQuery]);
useEffect(() => {
  setIsCancelled(false);
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  if (searchQuery2 !== ''){

  const timeout = setTimeout(() => {
    fetchCities();
  }, 300); // Задержка выполнения запроса на 300 миллисекунд после последнего изменения поискового запроса

  setDebounceTimeout(timeout);
}
  return () => {
    setIsCancelled(true); // Установка флага отмены перед размонтированием компонента
  };// Call fetchCountries whenever searchQuery changes
}, [searchQuery2]);

const handleInputChange = (e) => {
  const newSearchQuery = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);


  setSearchQuery(newSearchQuery);
  setOffset(0); // Reset offset to 0 whenever searchQuery changes
};

const handleInputChange2 = (e) => {
  const newSearchQuery2 =   e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
  setSearchQuery2(newSearchQuery2);
  setOffset2(0);
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
        type="text"
        value={searchQuery}
        placeholder="Страна"
        onChange={(e) => {handleInputChange(e)}}
        onClick={toggleDropdown}

        className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
      />
      <div className={`${s.dropdown_options} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen ? s.open : ''}`}>
        <div className={s.scroll_container} ref={scrollContainerRef} onScroll={handleScroll}>
          {countries.map((country, index) => (
            <div key={index} className={`${s.dropdown_option} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => selectCountry([country.label, country.value])}>
              {country.label}
            </div>
          ))}
        </div>
        <div className={`${s.scrollbar_1} ${props.colorB === 'light' ? s.light : s.dark}`} style={{ height: `90%`}} />
        <div className={`${s.scrollbar} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef} style={{ height: `${scrollbarHeight}%` }} />
        
      </div>
      
      {selectedCountry === '' && (errorFields.selectedCountry && <span className={s.error_message}>Выберите вашу страну</span>)}
    </div>
    
      <div className={s.dropdown_container2} ref={dropdownRef2}>
        <input
          type="text"
          placeholder="Город"
          value={searchQuery2}
          className={`${s.password_field2} ${props.colorB === 'light' ? s.light : s.dark}`}
          onChange={(e) => {handleInputChange2(e)}}
          onClick={toggleDropdown2}
        />
        <div className={`${s.dropdown_options2} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen2 ? s.open : ''}`}>
          <div className={s.scroll_container2} ref={scrollContainerRef2} onScroll={handleScroll2}>
          {cities.map((citymap, index) => (
            <div key={index} className={`${s.dropdown_option2} ${props.colorB === 'light' ? s.light : s.dark}`} onClick={() => selectCountry2([citymap.label, citymap.value])}>
              {citymap.label}
            </div>
          ))}
        </div>
        <div className={`${s.scrollbar_12} ${props.colorB === 'light' ? s.light : s.dark}`} style={{ height: `90%`}} />
        <div className={`${s.scrollbar2} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef2} style={{ height: `${scrollbarHeight2}%` }} />
        
      </div>
        {selectedCountry2 === '' && (errorFields.selectedCountry2 && <span className={s.error_message}>Выберите ваш город</span>)}

      </div>
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/isp1_reg' : '/isp2_reg'}>
        <button onClick={() => {
          validateFields()
          sessionStorage.setItem('selectedCountry2', selectedCountry2)
          sessionStorage.setItem('selectedCountry', selectedCountry)
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Далее</button>
      </Link>
      </div>
    </div>
  );
}

export default Isp1;
