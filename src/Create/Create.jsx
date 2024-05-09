import React, { useRef, useState, useEffect } from 'react';
import s from './Create.module.css';
import arrowsvg from '../assets/arrow.svg';
import arrowsvg2 from '../assets/angle-dark.svg';
import blackarr from '../assets/black.svg';
import { Link } from 'react-router-dom';


function Create(props) {
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
  const [login, setLogin] = useState('');
  const [tele, setTele] = useState('');
  const [cities, setCities] = useState([])
  const [cities2, setCities2] = useState([
    [
      "Республика Конго",
      "e11abd2a-f367-4f98-9911-40782b5bbbaf"
    ],
    [
      "Республика Корея",
      "6df01761-e6c2-4cc4-9047-c857044674f9"
    ],
    [
      "Республика Южная Осетия",
      "4d10fb6d-3edc-4918-87fb-fef636b2dd9f"
    ],
    [
      "Реюньон",
      "d96f675e-754f-4572-a23a-e6be936ab36e"
    ],
    [
      "Россия",
      "6b4233c4-fb0d-4168-87ca-5ab2b294fc79"
    ],
    [
      "Руанда",
      "9fcbfb32-dac0-4a9d-9165-8bff6a8842da"
    ],
    [
      "Румыния",
      "0ca152b6-0ed7-425d-add3-c5d994f91b14"
    ]
  ]);
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
    fetchCities()
    setSearchQuery(country[0]); // Update searchQuery with selected country label
    setIsOpen(false);
  };
 const selectCountry2 = (country) => {
    setSelectedCountry2(country);
    setSearchQuery2(country[0]); // Update searchQuery with selected country label

    setIsOpen2(false);
  };



  const fetchCountries = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/items/country?startswith=${searchQuery}&offset=${offset}&limit=${limit}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setCountries(prevCountries => [...prevCountries, ...newCountries]); // Добавляем загруженные страны к списку
      setOffset(prevOffset => prevOffset + limit); // Увеличиваем offset для следующего запроса
    } catch (error) {
      console.error('Error fetching countries:', error);
    }

    setLoading(false);
  };
  const fetchCities = async () => {


    setLoading2(true);

    try {
      const response = await fetch(`https://assista1.ru/items/country/cities?country_id=${selectedCountry[1]}&startswith=${searchQuery2}&offset=${offset2}&limit=${limit2}`);
      const data = await response.json();
      const newCities = data.items.map(([citys, id]) => ({ label: citys, value: id }));

      setCities(prevCountries => [...prevCountries, ...newCities]); // Добавляем загруженные страны к списку
      setOffset2(prevOffset => prevOffset + limit2); // Увеличиваем offset для следующего запроса
    } catch (error) {
      console.error('Error fetching cities:', error);
    }

    setLoading2(false);
  };

useEffect(() => {
  setOffset(0); // Reset offset to 0 when searchQuery changes
  setCountries([]); // Reset countries list to empty when searchQuery changes
}, [searchQuery]);
useEffect(() => {
  setOffset2(0); // Reset offset to 0 when searchQuery changes
  setCities([]); // Reset countries list to empty when searchQuery changes
}, [searchQuery2]);


  useEffect(() => {
        setSelectedCountry2(sessionStorage.getItem('selectedCountry2') !== null ? sessionStorage.getItem('selectedCountry2') : '')
        setSelectedCountry(sessionStorage.getItem('selectedCountry') !== null ? sessionStorage.getItem('selectedCountry') : '')
      }, [])

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight(scrollbarHeightPercentage);
    scrollbarRef.current.style.height = `${(scrollbarHeightPercentage)-13}%`;
    scrollbarRef.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (
      scrollTop + clientHeight >= scrollHeight-30
    ) {
      if (!loading) {
        fetchCountries(); // Загружаем следующую порцию стран при достижении конца прокрутки
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
        fetchCities(); // Загружаем следующую порцию стран при достижении конца прокрутки
      }
    }
  };
  
useEffect(() => {
  fetchCountries(); // Call fetchCountries whenever searchQuery changes
}, [searchQuery]);
useEffect(() => {
  fetchCities(); // Call fetchCountries whenever searchQuery changes
}, [searchQuery2]);

const handleInputChange = (e) => {
  const newSearchQuery = e.target.value;
  setSearchQuery(newSearchQuery);
  setOffset(0); // Reset offset to 0 whenever searchQuery changes
};

const handleInputChange2 = (e) => {
  const newSearchQuery2 = e.target.value;
  setSearchQuery2(newSearchQuery2);
  setOffset2(0);
};





    const handleChange = (event) => {
        setLogin(event.target.value);
    };
    const handleChange2 = (event) => {
        setTele(event.target.value);
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

          <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Название"
                className={`${s.password_field} ${errorFields.login && s.error}`}
                value={login}
                onChange={handleChange}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
            {login === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

        </div>
        <div className={s.password_input2}>
            <input
                type={'text'}
                placeholder="Техническое задание"
                className={`${s.password_field2} ${errorFields.tele && s.error}`}
                value={tele}
                onChange={handleChange2}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

            />
        {tele === '' && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}

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
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/isp1_reg' : '/isp3_reg'}>
        <button onClick={() => {
          validateFields()
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Далее</button>
      </Link>
      </div>
    </div>
  );
}

export default Create;
