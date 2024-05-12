import React, { useRef, useState, useEffect } from 'react';
import s from './EditIsp.module.css';
import arrowsvg from '../assets/arrow.svg';
import arrowsvg2 from '../assets/angle-dark.svg';
import blackarr from '../assets/black.svg';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Vector from '../assets/Vector.svg'
import darkgal from '../assets/dark_gal.svg' 



function EditIsp(props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Количество элементов, которые необходимо загрузить при каждом запросе
  const [searchQuery, setSearchQuery] = useState(''); // Input value for country search
 const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [accessToken, setAccessToken] = useState(searchParams.get('access_token'));
  const [telegram_id, setTelegram_id] = useState(searchParams.get('telegram_id'));
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
  const [phone, setPhone] = useState('');

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
      const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('')
    const [fio, setFio] = useState('')
    const [isexist, setIsexist] = useState(null)
    const [telegramId, setTelegramId] = useState('')
    const [rlink, setRlink] = useState('/zak1_reg')

    const [checkPh,setCheckPh] = useState('')



    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleChange2 = (event) => {
        setLname(event.target.value);
    };
    const handleChange3 = (event) => {
        setFname(event.target.value);
    };
    const handleChange4 = (event) => {
        const isValidPhone = /^\+/.test(event.target.value)
        if (isValidPhone === true) {
            setCheckPh('exist')
        } else{
            setCheckPh('')
        }
        setPhone(event.target.value);
    };

    const [gender, setGender] = useState('');


    const handleGenderChange = (event) => {
      setGender(event.target.value);
    };
    const changeFio = () => {
        setFio(name + ' ' + lname + ' ' + fname)
    }

    useEffect(() => {
        changeFio()
    }, [name, lname, fname])

  
  const [errorFields, setErrorFields] = useState({
    selectedCountry2: false,
    selectedCountry: false,
    name: false,
    lname: false,
    gender: false,
    checkPh: false,
    phone: false
  });

  const validateFields = () => {
    const errors = {
            selectedCountry2: selectedCountry2 === '',
            selectedCountry: selectedCountry === '',
            phone: phone === '',
            checkPh: checkPh === '',
            name: name === '',
            lname: name === '',
            
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










  const [skills__2, setSkills__2] = useState([])
  const [lang__2, setLang__2] = useState([])
  const [searchQuery1__2, setSearchQuery1__2] = useState('');
  const [searchQuery2__2, setSearchQuery2__2] = useState('');
  const [city1__2, setCity1__2] = useState('');
  const [city2__2, setCity2__2] = useState('');
  const [loading__2, setLoading__2] = useState(false);
  const [isOpen1__2, setIsOpen1__2] = useState(false);
  const [isOpen2__2, setIsOpen2__2] = useState(false);
  const [selectedCountry1__2, setSelectedCountry1__2] = useState('');
  const [selectedCountry2__2, setSelectedCountry2__2] = useState('');
  const [selectedCountries1__2, setSelectedCountries1__2] = useState([]);
  const [selectedCountries2__2, setSelectedCountries2__2] = useState([]);
  const [selectedCountries1Id__2, setSelectedCountries1Id__2] = useState([]);
  const [selectedCountries2Id__2, setSelectedCountries2Id__2] = useState([]);
  const dropdownRef1__2 = useRef(null);
  const dropdownRef2__2 = useRef(null);
  const scrollContainerRef1__2 = useRef(null);
  const scrollContainerRef2__2 = useRef(null);
  const scrollbarRef1__2 = useRef(null);
  const scrollbarRef2__2 = useRef(null);
  const [offset__2, setOffset__2] = useState(0);
  const [offset2__2, setOffset2__2] = useState(0);

  const limit__2 = 25;
  const limit2__2 = 25;

  const [scrollbarHeight1__2, setScrollbarHeight1__2] = useState(0);
  const [scrollbarHeight2__2, setScrollbarHeight2__2] = useState(0);
  const [exitSkills, setExitSkills] = useState([])
  const [errorFields__2, setErrorFields__2] = useState({
    selectedCountries1__2: false,
    selectedCountries2__2: false
});
  const validateFields__2 = () => {
    const errors = {
      selectedCountries1__2: selectedCountries1__2.length === 0,
      selectedCountries2__2: selectedCountries2__2.length === 0
    };
    setErrorFields__2(errors);
    return !Object.values(errors).some(Boolean);
  };

  useEffect(() => {
    const handleClickOutside__2 = (event) => {
      if ((dropdownRef1__2.current && !dropdownRef1__2.current.contains(event.target)) && (dropdownRef2__2.current && !dropdownRef2__2.current.contains(event.target))) {
        setIsOpen1__2(false);
        setIsOpen2__2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside__2);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside__2);
    };
  }, []);

  useEffect(() => {
    const calculateScrollbarHeight1__2 = () => {
      const scrollContainerHeight1 = scrollContainerRef1__2.current.offsetHeight;
      const contentHeight1 = scrollContainerRef1__2.current.scrollHeight;
      const scrollbarHeightPercentage1 = (scrollContainerHeight1 / contentHeight1) * 100;
      setScrollbarHeight1__2(scrollbarHeightPercentage1);
    };

    const calculateScrollbarHeight2__2 = () => {
      const scrollContainerHeight2 = scrollContainerRef2.current.offsetHeight;
      const contentHeight2 = scrollContainerRef2.current.scrollHeight;
      const scrollbarHeightPercentage2 = (scrollContainerHeight2 / contentHeight2) * 100;
      setScrollbarHeight2__2(scrollbarHeightPercentage2);
    };

    calculateScrollbarHeight1__2();
    calculateScrollbarHeight2__2();

    const handleResize__2 = () => {
      calculateScrollbarHeight1__2();
      calculateScrollbarHeight2__2();
    };

    window.addEventListener('resize', handleResize__2);

    return () => {
      window.removeEventListener('resize', handleResize__2);
    };
  }, []);

  const toggleDropdown1__2 = () => {
    setIsOpen1__2(!isOpen1__2);
  };

  const toggleDropdown2__2 = () => {
    setIsOpen2__2(!isOpen2__2);
  };

  const selectCountry1__2 = (country) => {
    const isSelected = selectedCountries1__2.includes(country[0]);
    const isSelected2 = selectedCountries1Id__2.includes(country[1]);

    if (isSelected) {
      setSelectedCountries1__2(selectedCountries1__2.filter(c => c !== country[0]));
      setSelectedCountries1Id__2(selectedCountries1Id__2.filter(c => c !== country[1]));

    } else {

      setSelectedCountries1__2([...selectedCountries1__2, country[0]]);
      setSelectedCountries1Id__2([...selectedCountries1Id__2, country[1]]);

    }
  };

  const selectCountry2__2 = (country) => {
    const isSelected = selectedCountries2__2.includes(country[0]);
    const isSelected2 = selectedCountries2Id__2.includes(country[1]);

    if (isSelected) {
      
      setSelectedCountries2__2(selectedCountries2__2.filter(c => c !== country[0]));

      setSelectedCountries2Id__2(selectedCountries2Id__2.filter(c => c !== country[1]));
} else {
      setSelectedCountries2__2([...selectedCountries2__2, country[0]]);
      setSelectedCountries2Id__2([...selectedCountries2Id__2, country[1]]);

    }

  };
  const handleScroll1__2 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage1 = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight1__2(scrollbarHeightPercentage1);
    scrollbarRef1__2.current.style.height = `${(scrollbarHeightPercentage1) - 13}%`;
    scrollbarRef1__2.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };

  const handleScroll2__2 = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage2 = (clientHeight / scrollHeight) * 100;
    setScrollbarHeight2__2(scrollbarHeightPercentage2);
    scrollbarRef2__2.current.style.height = `${(scrollbarHeightPercentage2) - 13}%`;
    scrollbarRef2__2.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
  };


const fetchSkills = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/skills?offset=${offset__2}&limit=${limit__2}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setSkills__2(prevCountries => [...newCountries]); // Добавляем загруженные страны к списку
    } catch (error) {
      console.error('Error fetching skills:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchSkills(); // Call fetchCountries whenever searchQuery changes
  }, []);


  const fetchLang = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/language?startswith=${searchQuery2__2}&offset=${offset__2}&limit=${limit__2}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setLang__2(prevCountries => [...prevCountries, ...newCountries]); // Добавляем загруженные страны к списку
      setOffset2__2(prevOffset => prevOffset + limit2__2); // Увеличиваем offset для следующего запроса

    } catch (error) {
      console.error('Error fetching skills:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLang(); // Call fetchCountries whenever searchQuery changes
  }, []);
useEffect(() => {
  setOffset2__2(0); // Reset offset to 0 when searchQuery changes
  setLang__2([]); 
}, [searchQuery2__2]);
  
  const filteredSkills = skills__2.filter((skill) =>{

     return skill.label.toLowerCase().includes(searchQuery1__2.toLowerCase())});

  

     const fetchInfo = async () => {



    

    try {
      const response = await fetch(`https://assista1.ru/api/v1/users/me`,{
        method: 'GET',
        headers: {
           'Authorization': `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();
      console.log(data)
      console.log(data.worker.languages.map(lang => lang[0]), data.worker.skills.map(lang => lang[1]))

      setName(`${data.full_name.split(' ')[0]}`)
      setLname(`${data.full_name.split(' ')[1]}`)
      setFname(`${data.full_name.split(' ')[2]}`)
      setGender(`${data.gender}`)
      setPhone(`${data.phone}`)
      setSelectedCountries2Id__2(data.worker.languages.map(lang => lang[0]))
      setSelectedCountries2__2(data.worker.languages.map(lang => lang[1]))
      setSelectedCountries1__2(data.worker.skills.map(lang => lang[0]))
      setSelectedCountries1Id__2(data.worker.skills.map(lang => lang[1]))
      selectCountry([data.worker.location.country_title, ''])
      selectCountry2([data.worker.location.city_title, data.worker.location.city_id])



      
    } catch (error) {
      console.error('Error fetching:', error);
      //...selectedCountries2Id__2
    }

  };

  useEffect(() => {
    fetchInfo()
  },[])
const patchProfile = async () => {
    const requestBody = {

        "location": {
          "city_id": `000a11e2-78da-4c5a-b447-cb9233331e11`
        },    
        "languages": [...selectedCountries2Id__2],
        "skills": [...selectedCountries1Id__2],
        "profile": {
          "full_name": name + ' ' + lname + `${fname !== '' ? ' ' + fname : ''}`,
          "gender": `${gender}`,
          "phone": `${phone}`
        }
    };
    console.log(requestBody)
    try {

      const response = await fetch(`https://assista1.ru/api/v1/users/update/worker`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });
      console.log(requestBody)
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


  
  return (
    <div className={s.greetings} style={props.colorB==="light" ? {backgroundColor:"white"} : {backgroundColor:"#232323"} }>  
         <div className={s.greetings_wrapper}>
        <div className={s.reg}>
            <h1 className={s.greetings_text} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>Редактирование профиля</h1>
        </div>

        <div className={`${s.password_input}`}>
            <input
                style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }

                type={'text'}
                placeholder="Имя*"
                className={`${s.password_field} ${errorFields.name && s.error}`}
                value={name}
                onChange={handleChange}
            />
            { name === '' && (errorFields.name && <span className={s.error_message}>Пожалуйста, введите дату рождения</span>)}

        </div>
        <div className={`${s.password_input}`}>
            <input
            style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Фамилия*"
                className={`${s.password_field} ${errorFields.lname && s.error}`}
                value={lname}
                onChange={handleChange2}
            />
            { lname === '' && (errorFields.lname && <span className={s.error_message}>Пожалуйста, введите фамилию</span>)}
        </div>
        <div className={s.password_input3}>
            <input
style={props.colorB==='light' ? {backgroundColor:'white', color:'black'} : {backgroundColor:'#232323', color:'#C7C7C7'} }                type={'text'}
                placeholder="Отчество"
                className={s.password_field}
                value={fname}
                onChange={handleChange3}
            />

        </div>

          
        <div className={`${s.radio_gender}`} style={props.colorB==='light' ? {color:'black'} : {color:'white'} }>
            <label htmlFor="gender" style={{ fontSize: '14px' }}>Ваш пол:</label>
            <div>
                <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange} />
                <label htmlFor="male" className={s.genderlabel}>Мужской</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                <label htmlFor="female" className={s.genderlabel}>Женский</label>
            </div>
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
                        
                
        <div className={s.dropdown_container__2} ref={dropdownRef1__2}>
          <input
            className={`${s.password_field__2} ${props.colorB === 'light' ? s.light : s.dark}`}
            type="text"
            value={searchQuery1__2}

            placeholder="Навыки"
            onClick={toggleDropdown1__2}
            onChange={(e) => setSearchQuery1__2(e.target.value)}
            
          />
          <div  className={`${s.dropdown_options__2} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen1__2 ? s.open : ''}`}>
            <div  className={s.scroll_container__2} ref={scrollContainerRef1__2} onScroll={handleScroll1__2}>
              {filteredSkills.map((country, index) => (
                <div key={index} className={`${s.dropdown_option__2} ${props.colorB === 'light' ? s.light : s.dark}`} >
                <label style={{ display: 'flex', alignItems: 'center', width:'300px' }} onClick={() => selectCountry1__2([country.label, country.value])}>
                     <input
                     type="checkbox"
                     className={`${s.inputCheck__2} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2__2.includes(' ' + country.label)}

                     onChange={() => selectCountry1__2([country.label, country.value])}
                     style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: 10,
                     }}
                     />
                     {selectedCountries1__2.includes(country.label) && <img className={s.checkbox_icon__1__2}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                    
                      <span style={{ marginLeft: 10, width:'200px' }}>{country.label}</span>
                 </label>
             </div>
              ))}
            </div>
            <div className={`${s.scrollbar_1__2} ${props.colorB === 'light' ? s.light : s.dark}`}  />
            <div className={`${s.scrollbar__2} ${props.colorB === 'light' ? s.light : s.dark}`} ref={scrollbarRef1__2} style={{ height: `${scrollbarHeight1__2}%` }} />
          </div>
          { selectedCountries1__2.length === 0 && (errorFields.selectedCountries1__2 && <span className={s.error_message}>Пожалуйста, выберите навыки</span>)}

        </div>

        <div className={s.dropdown_container__1__2} ref={dropdownRef2__2}>
          <input
            className={`${s.password_field__1__2} ${props.colorB === 'light' ? s.light : s.dark}`}
            type="text"
            value={searchQuery2__2}
            placeholder="Языки"
            onClick={toggleDropdown2__2}
            onChange={(e) => setSearchQuery2__2(e.target.value)}

            
          />
          <div className={`${s.dropdown_options__1__2} ${props.colorB === 'light' ? s.light : s.dark} ${isOpen2__2 ? s.open : ''}`}>
            <div className={s.scroll_container__1__2} ref={scrollContainerRef2__2} onScroll={handleScroll2__2}>
              {lang__2.map((lang, index) => (
                <div key={index} className={`${s.dropdown_option__1__2} ${props.colorB === 'light' ? s.light : s.dark}`} >
                   <label style={{ display: 'flex', alignItems: 'center', width:'300px' }}>
                   {props.colorB === 'light' ? <input
                     type="checkbox"
                     className={`${s.inputCheck__2} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2__2.includes(' ' + lang.label)}
                     onChange={() => selectCountry2__2([lang.label, lang.value])}
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
                     className={`${s.inputCheck__2} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2__2.includes(' ' + lang.label)}
                     onChange={() => selectCountry2__2([lang.label, lang.value])}
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
                     {selectedCountries2__2.includes(lang.label) && <img className={s.checkbox_icon__1__2}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                       
                         <span style={{ marginLeft: 10, width:'200px' }}>{lang.label}</span>
                    </label>
                </div>
              ))}
            </div>
            
            <div className={`${s.scrollbar_1__1__2} ${props.colorB === 'light' ? s.light : s.dark}`} />
            <div className={`${s.scrollbar__1__2} ${props.colorB === 'light' ? s.light : s.dark}`}  ref={scrollbarRef2__2} style={{ height: `${scrollbarHeight2__2}%` }} />
          </div>
          { selectedCountries2__2.length === 0 && (errorFields.selectedCountries2__2 && <span className={s.error_message}>Пожалуйста, выберите языки</span>)}

        </div>



    


           
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/' : '/'}>
        <button onClick={() => {
          validateFields()
          patchProfile()

        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Применить</button>
      </Link>
      <Link to={(selectedCountry2 === '') || (selectedCountry == '') ? '/' : '/'}>
        <button onClick={() => {
            props.tg.close()
        }}className={`${s.greetings_btn} ${props.colorB === 'light' ? s.light : s.dark}`}>Отменить</button>
      </Link>
      </div>
    </div>
  );
}

export default EditIsp;
