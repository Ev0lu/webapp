import React, { useRef, useState, useEffect } from 'react';
import s from './Create.module.css';
import arrowsvg from '../assets/arrow.svg';
import arrowsvg2 from '../assets/angle-dark.svg';
import blackarr from '../assets/black.svg';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';



function Create(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Количество элементов, которые необходимо загрузить при каждом запросе
  const [searchQuery, setSearchQuery] = useState(''); // Input value for country search
  const { order_id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [accessToken, setAccessToken] = useState(searchParams.get('access_token'););
  const [refreshToken, setRefreshToken] = useState(searchParams.get('refresh_token'));
  // Получение значений параметров access_token и refresh_token из URL


  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [skills, setSkills] = useState([]);

  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [city, setCity] = useState('');
  const [login, setLogin] = useState('');
  const [tele, setTele] = useState('');
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



   const [price, setPrice] = useState('')
   const [term, setTerm] = useState('')
   const [termScale, setTermScale] = useState(50)


    const handleChange = (event) => {
        setLogin(event.target.value);
    };
    const handleChange2 = (event) => {
        setTele(event.target.value);
    };
    const handleChange3 = (event) => {
        setPrice(event.target.value);
    };
    const handleChange4 = (event) => {
        setTerm(event.target.value);
    };

   const [place, setPlace] = useState('offline')

    const handleGenderChange = (event) => {
      setPlace(event.target.value);
    };



      useEffect(()=>{
        if(termScale == 0){
            setTerm('0дн')
        }else if(termScale == 25){
            setTerm('1нед')
        }else if(termScale == 50){
            setTerm('1мес')
        }else if(termScale == 75){
            setTerm('2мес')
        }
        else if(termScale == 100){
            setTerm('3мес')

        }
    },[termScale])


  
 const fetchOrders = async () => {



    

    try {
      const response = await fetch(`https://assista1.ru/order/?order_id=${order_id}`);
      const data = await response.json();
      setLogin(`${data.title}`)
      setTele(`${data.task}`)
      if (data.is_online === true) {
        setPlace('online')
      } else {
        setPlace('offline')
      }
      setPrice(`${data.price}`)
      setTerm(`${data.duration}`)
      setSkills([...data.skills])
      setCity(`${[data.location.city_title, data.location.city_id]}`)
      setSelectedCountry(`${data.location.country_title}`);
      setSearchQuery(`${data.location.country_title}`)
      setSearchQuery2(`${data.location.city_title}`)
    } catch (error) {
      console.error('Error fetching order:', error);
    }

  };
  useEffect(() => {
    fetchOrders()
  },[])

  const patchOrder = async () => {
    const requestBody = {
        "title": `${login}`,
        "skills": [...skills],
        "task": tele,
        "is_online": `${place === 'offline' ? 'offline' : 'online'}`,
        "price": price,
        "duration": 30,
        "location": {
          "city_id": ${selectedCountry[0]},
          "city_title": "string",
          "country_title": `${selectedCountry[0]}`
        }
    };
  
    try {
      const response = await fetch('https://assista1.ru/order/one', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const data = await response.json();
        // Обработка полученных данных
      } else {
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
};
  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>  
         <div className={s.greetings_wrapper}>
        <div className={s.reg}>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Создание заказа</h1>
        </div>

          <div className={s.password_input}>
            <input
                type={'text'}
                placeholder="Название"
                className={`${s.password_field} ${errorFields.login && s.error}`}
                value={login}
                onChange={handleChange}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#373737', color:'#C7C7C7'} }

            />
            {login === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

        </div>
        <div className={s.password_input2}>
            <textarea rows="10" cols="40" maxlength="350"
                type={'text'}
                placeholder="Техническое задание"
                className={`${s.password_field2} ${errorFields.tele && s.error}`}
                value={tele}
                onChange={handleChange2}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#373737', color:'#C7C7C7'} }

            />
        {tele === '' && (errorFields.tele && <span className={s.error_message}>Пожалуйста, введите телефон</span>)}

        </div>



        <div className={`${s.radio_gender}`} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>
            <div>
                <input type="radio" id="online" name="place" value="online" checked={place === 'online'} onChange={handleGenderChange} />
                <label htmlFor="online" className={s.genderlabel}>Онлайн</label>
            </div>
            <div>
                <input type="radio" id="offline" name="place" value="offline" checked={place === 'offline'} onChange={handleGenderChange} />
                <label htmlFor="offline" className={s.genderlabel}>Оффлайн</label>
            </div>
          </div>
           {place === 'offline' &&
           
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
                            }

                {place === 'offline' &&

                        <div className={s.dropdown_container2} ref={dropdownRef2}>
                          <input
                            type="text"
                            placeholder="Город"
                            value={searchQuery2}
                            className={`${s.password_field} ${props.colorB === 'light' ? s.light : s.dark}`}
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
                        
                }

            <div className={s.password_input3}>
              <div style={{display:'flex'}}>
                <h3 style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Цена</h3>
              </div>
            <div style={{display:'flex'}}>            <input
                type={'text'}
                placeholder=""
                className={`${s.password_field3} ${errorFields.login && s.error}`}
                value={price}
                onChange={handleChange3}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#373737', color:'#C7C7C7'} }

            />
              </div>

            {price === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

        </div>
            <div className={s.password_input3}>
              
                <h3                 style={props.colorB==='light' ? {color:'black'} : {color:'white'} }
>Срок</h3>
  
            <input
                type={'text'}
                placeholder=""
                className={`${s.password_field3} ${errorFields.login && s.error}`}
                value={term}
                onChange={handleChange4}
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#373737', color:'#C7C7C7'} }

            />
            {term === '' && (errorFields.login && <span className={s.error_message}>Пожалуйста, введите логин</span>)}

        </div>


          <div className={s.likert_scale}>
            <input className={s.heigh} type="range" min="0" max="100" step="25" value={termScale} onChange={(e)=> {
            setTermScale(e.target.value) 
              }}
             />

        </div>


           
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/isp1_reg' : '/isp3_reg'}>
        <button onClick={() => {
          validateFields()
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Создать заказ</button>
      </Link>
      </div>
    </div>
  );
}

export default Create;
