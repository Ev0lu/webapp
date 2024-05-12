import React, { useRef, useState, useEffect } from 'react';
import s from './Edit.module.css';
import arrowsvg from '../assets/arrow.svg';
import arrowsvg2 from '../assets/angle-dark.svg';
import blackarr from '../assets/black.svg';
import Vector from '../assets/Vector.svg'
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';



function Edit(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Количество элементов, которые необходимо загрузить при каждом запросе
  const [searchQuery, setSearchQuery] = useState(''); // Input value for country search
  const { order_id } = useParams();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [accessToken, setAccessToken] = useState(searchParams.get('access_token'));
  const [refreshToken, setRefreshToken] = useState(searchParams.get('refresh_token'));
  const [today, setToday] = useState(new Date())
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
    selectedCountry: false,
    selectedCountries1__1: false
  });

  const validateFields = () => {
    const errors = {
      selectedCountry2: selectedCountry2 === '',
      selectedCountry: selectedCountry === '',
      selectedCountries1__1: selectedCountries1__1.length === 0
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
      const response = await fetch(`https://assista1.ru/api/v1/items/country?startswith=${searchQuery}&offset=${offset}&limit=${limit}`);
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
      const response = await fetch(`https://assista1.ru/api/v1/items/country/cities?country_id=${selectedCountry[1]}&startswith=${searchQuery2}&offset=${offset2}&limit=${limit2}`);
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



   const [price, setPrice] = useState(0)
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
    const [termH, setTermH] = useState(0)

    const handleGenderChange = (event) => {
      setPlace(event.target.value);
    };



      useEffect(()=>{
        if(termScale == 0){
            setTerm('0дн')
            setTermH(0)
        }else if(termScale == 20){
            setTerm('1нед')
            setTermH(7)
        }else if(termScale == 40){
            setTerm('1мес')
            setTermH(30)
        }else if(termScale == 60){
            setTerm('2мес')
            setTermH(60)
        }
        else if(termScale == 80){
            setTerm('3мес')
            setTermH(90)

        }
        else if(termScale == 100){
            setTerm('>3мес')
            setTermH(100)
        }
    },[termScale])
  const [scrollbarHeight1__1, setScrollbarHeight1__1] = useState(0);
    const [isOpen1__1, setIsOpen1__1] = useState(false);
    const [searchQuery1__1, setSearchQuery1__1] = useState('');
  const [selectedCountries1__1, setSelectedCountries1__1] = useState([]);
  const [selectedCountries1Id__1, setSelectedCountries1Id__1] = useState([]);
 const limit__1 = 25;
  const [offset__1, setOffset__1] = useState(0);


    const dropdownRef1__1 = useRef(null);

  const scrollContainerRef1__1 = useRef(null);

  const scrollbarRef1__1 = useRef(null);

  useEffect(() => {
    const handleClickOutside__1 = (event) => {
      if ((dropdownRef1__1.current && !dropdownRef1__1.current.contains(event.target)) ) {
        setIsOpen1__1(false);

      }
    };

    document.addEventListener('mousedown', handleClickOutside__1);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside__1);
    };
  }, []);



  
useEffect(() => {
    const calculateScrollbarHeight1__1 = () => {
      const scrollContainerHeight1 = scrollContainerRef1__1.current.offsetHeight;
      const contentHeight1 = scrollContainerRef1__1.current.scrollHeight;
      const scrollbarHeightPercentage1 = (scrollContainerHeight1 / contentHeight1) * 100;
      setScrollbarHeight1__1(scrollbarHeightPercentage1);
    };



    calculateScrollbarHeight1__1();


    const handleResize__1 = () => {
      calculateScrollbarHeight1__1();

    };

    window.addEventListener('resize', handleResize__1);

    return () => {
      window.removeEventListener('resize', handleResize__1);
    };
  }, []);
  
  
  const toggleDropdown1__1 = () => {
    setIsOpen1__1(!isOpen1__1);
  };
  
  const selectCountry1__1 = (country) => {
    const isSelected = selectedCountries1__1.includes(country[0]);
    const isSelected2 = selectedCountries1Id__1.includes(country[1]);

    if (isSelected) {
      setSelectedCountries1__1(selectedCountries1__1.filter(c => c !== country[0]));
      setSelectedCountries1Id__1(selectedCountries1Id__1.filter(c => c !== country[1]));

    } else {

      setSelectedCountries1__1([...selectedCountries1__1, country[0]]);
      setSelectedCountries1Id__1([...selectedCountries1Id__1, country[1]]);

    }
  };

  
  const handleScroll1__1 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage1 = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight1__1(scrollbarHeightPercentage1);
    scrollbarRef1__1.current.style.height = `${(scrollbarHeightPercentage1) - 13}%`;
    scrollbarRef1__1.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };


  
const fetchSkills = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/skills?offset=${offset__1}&limit=${limit__1}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setSkills(prevCountries => [...newCountries]); // Добавляем загруженные страны к списку
    } catch (error) {
      console.error('Error fetching skills:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSkills(); // Call fetchCountries whenever searchQuery changes
  }, []);
  


  const patchOrder = async () => {
    const requestBody = {

        "title": `${login}`,
        "skills": [...selectedCountries1Id__1],
        "task": `${tele}`,
        "is_online": place === 'offline' ? false : true,
        "price": Number(price),
        "duration": `${termH}`,
        "location": place === 'offline' ? { "city_id":  `${selectedCountry2[1]}` } : null

    };
    
    try {

      const response = await fetch(`https://assista1.ru/api/v1/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Обработка полученных данных
      } else {
        const data = await response.json();
        console.log(data)
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
};



  const filteredSkills = skills.filter((skill) =>{

     return skill.label.toLowerCase().includes(searchQuery1__1.toLowerCase())});


   const fetchOrders = async () => {



    

        try {
          const response = await fetch(`https://assista1.ru/api/v1/order/${order_id}`);
          const data = await response.json();
          setLogin(`${data.order.title}`)
          setTele(`${data.order.task}`)
          if (data.order.is_online === true) {
            setPlace('online')
          } else {
            setPlace('offline')
          }
          setPrice(`${data.order.price}`)
          setTerm(`${data.order.duration}`)
          setSelectedCountries1Id__1([data.order.skills])
          setCity(`${[data.order.location.city_title, data.order.location.city_id]}`)
          setSelectedCountry(`${data.order.location.country_title}`);
          setSearchQuery(`${data.order.location.country_title}`)
          setSearchQuery2(`${data.order.location.city_title}`)
          
        } catch (error) {
          console.error('Error fetching order:', error);
        }

  };
  useEffect(() => {
    fetchOrders()
  },[])



  
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



          <div className={s.dropdown_container__1} ref={dropdownRef1__1}>
          <input
            className={`${s.password_field__1} ${props.colorB === 'light' ? s.light : s.dark}`}
            type="text"
            value={searchQuery1__1}

            placeholder="Навыки"
            onClick={toggleDropdown1__1}
            onChange={(e) => setSearchQuery1__1(e.target.value)}
            
          />
          <div  className={`${s.dropdown_options__1} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen1__1 ? s.open : ''}`}>
            <div  className={s.scroll_container__1} ref={scrollContainerRef1__1} onScroll={handleScroll1__1}>
              {filteredSkills.map((country, index) => (
                <div key={index} className={`${s.dropdown_option__1} ${props.colorB === 'light' ? s.light : s.dark}`} >
                <label style={{ display: 'flex', alignItems: 'center', width:'300px' }} onClick={() => selectCountry1__1([country.label, country.value])}>
                     <input
                     type="checkbox"
                     className={`${s.inputCheck__1} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries1__1.includes(' ' + country.label)}

                     onChange={() => selectCountry1__1([country.label, country.value])}
                     style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: 10,
                     }}
                     />
                     {selectedCountries1__1.includes(country.label) && <img className={s.checkbox_icon__1__1}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                    
                      <span style={{ marginLeft: 10, width:'200px' }}>{country.label}</span>
                 </label>
             </div>
              ))}
            </div>
            <div className={`${s.scrollbar_1__1} ${props.colorB === 'light' ? s.light : s.dark}`}  />
            <div className={`${s.scrollbar__1} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef1__1} style={{ height: `${scrollbarHeight1__1}%` }} />
          </div>
          { selectedCountries1__1.length === 0 && (errorFields.selectedCountries1__1 && <span className={s.error_message}>Пожалуйста, выберите навыки</span>)}

        </div>




           
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
                readOnly

            />
            {term === '' && (errorFields.term && <span className={s.error_message}>Пожалуйста, укажите срок</span>)}

        </div>


          <div className={s.likert_scale}>
            <input className={s.heigh} type="range" min="0" max="100" step="25" value={termScale} onChange={(e)=> {
            setTermScale(e.target.value) 
              }}
             />

        </div>


           
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') || selectedCountries1Id__1.length !== 0 || term !== '' ? '/create' : '/create'}>
        <button onClick={() => {
          validateFields()
          if (login !== ''  && selectedCountries1Id__1.length !== 0 && term !== ''  && price !== '') {
            patchOrder()
            props.tg.close()
          }
          
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Создать заказ</button>
      </Link>
      </div>
    </div>
  );
}

export default Edit;
