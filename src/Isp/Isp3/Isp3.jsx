import React, { useRef, useState, useEffect } from 'react';
import s from './Isp3.module.css';
import arrowsvg from '../../assets/arrow.svg';
import { Link } from 'react-router-dom';
import Vector from '../../assets/Vector.svg'
import darkgal from '../../assets/dark_gal.svg' 
import blackarr from '../../assets/black.svg'

function Isp3(props) {
  const [skills, setSkills] = useState([])
  const [lang, setLang] = useState([])
  const [searchQuery1, setSearchQuery1] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [selectedCountries1, setSelectedCountries1] = useState([]);
  const [selectedCountries2, setSelectedCountries2] = useState([]);
  const [selectedCountries1Id, setSelectedCountries1Id] = useState([]);
  const [selectedCountries2Id, setSelectedCountries2Id] = useState([]);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);
  const scrollbarRef1 = useRef(null);
  const scrollbarRef2 = useRef(null);
  const [offset, setOffset] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(sessionStorage.getItem('sessionToken'))
    console.log(token)
  }, [])
  const limit = 25;
  const limit2 = 25;

  const [scrollbarHeight1, setScrollbarHeight1] = useState(0);
  const [scrollbarHeight2, setScrollbarHeight2] = useState(0);
  const [exitSkills, setExitSkills] = useState([])
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
    const isSelected = selectedCountries1.includes(country[0]);
    const isSelected2 = selectedCountries1Id.includes(country[1]);

    if (isSelected) {
      setSelectedCountries1(selectedCountries1.filter(c => c !== country[0]));
      setSelectedCountries1Id(selectedCountries1Id.filter(c => c !== country[1]));

    } else {

      setSelectedCountries1([...selectedCountries1, country[0]]);
      setSelectedCountries1Id([...selectedCountries1Id, country[1]]);

    }
  };

  const selectCountry2 = (country) => {
    const isSelected = selectedCountries2.includes(country[0]);
    const isSelected2 = selectedCountries2Id.includes(country[1]);

    if (isSelected) {
      
      setSelectedCountries2(selectedCountries2.filter(c => c !== country[0]));

      setSelectedCountries2Id(selectedCountries2Id.filter(c => c !== country[1]));
} else {
      setSelectedCountries2([...selectedCountries2, country[0]]);
      setSelectedCountries2Id([...selectedCountries2Id, country[1]]);

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

const fetchSkills = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/skills?offset=${offset}&limit=${limit}`);
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


  const fetchLang = async () => {



    setLoading(true);

    try {
      const response = await fetch(`https://assista1.ru/api/v1/items/language?startswith=${searchQuery2}&offset=${offset}&limit=${limit}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setLang(prevCountries => [...prevCountries, ...newCountries]); // Добавляем загруженные страны к списку
      setOffset2(prevOffset => prevOffset + limit2); // Увеличиваем offset для следующего запроса

    } catch (error) {
      console.error('Error fetching skills:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLang(); // Call fetchCountries whenever searchQuery changes
  }, []);
useEffect(() => {
  setOffset2(0); // Reset offset to 0 when searchQuery changes
  setLang([]); 
}, [searchQuery2]);
  
  const filteredSkills = skills.filter((skill) =>{

     return skill.label.toLowerCase().includes(searchQuery1.toLowerCase())});




  
const reg = async () => {  
  let user = {
    profile: {
      telegram_id: props.tg.initDataUnsafe.user.id,
      login: sessionStorage.getItem('login'),
      email: sessionStorage.getItem('mail'),
      full_name: sessionStorage.getItem('name') + ' ' + sessionStorage.getItem('lname') + `${sessionStorage.getItem('fname') !== null ? ' ' + sessionStorage.getItem('fname') : ''}`,
      phone: sessionStorage.getItem('tele'),
      gender: sessionStorage.getItem('gender'),
      password: sessionStorage.getItem('pass'),
    },
    worker:{
      location: {
        city_id: sessionStorage.getItem('selectedCountry2').split(',')[1]
      },
      languages: [...selectedCountries2Id],
      skills: [...selectedCountries1Id]
      
    }
    
  };
  console.log(user)

  try {
    const response = await fetch(`https://assista1.ru/api/v1/auth/registration/worker`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'X-SESSION-TOKEN': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('access', data.access_token)

    } else {

    }

  } catch (error) {

  }
}

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
                <label style={{ display: 'flex', alignItems: 'center', width:'300px' }} onClick={() => selectCountry1([country.label, country.value])}>
                     <input
                     type="checkbox"
                     className={`${s.inputCheck} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2.includes(' ' + country.label)}

                     onChange={() => selectCountry1([country.label, country.value])}
                     style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: 10,
                     }}
                     />
                     {selectedCountries1.includes(country.label) && <img className={s.checkbox_icon__1}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                    
                      <span style={{ marginLeft: 10, width:'200px' }}>{country.label}</span>
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
              {lang.map((lang, index) => (
                <div key={index} className={`${s.dropdown_option__1} ${props.colorB === 'light' ? s.light : s.dark}`} >
                   <label style={{ display: 'flex', alignItems: 'center', width:'300px' }}>
                   {props.colorB === 'light' ? <input
                     type="checkbox"
                     className={`${s.inputCheck} ${props.colorB === 'light' ? s.light : s.dark}`}
                     checked={selectedCountries2.includes(' ' + lang.label)}
                     onChange={() => selectCountry2([lang.label, lang.value])}
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
                     checked={selectedCountries2.includes(' ' + lang.label)}
                     onChange={() => selectCountry2([lang.label, lang.value])}
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
                     {selectedCountries2.includes(lang.label) && <img className={s.checkbox_icon__1}  src={props.colorB === 'light' ? Vector : Vector} alt="checkmark"></img>}
                       
                         <span style={{ marginLeft: 10, width:'200px' }}>{lang.label}</span>
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

            sessionStorage.setItem('selectedLang', selectedCountries2)
            sessionStorage.setItem('selectedSkills', selectedCountries1)
            sessionStorage.setItem('selectedLangId', selectedCountries2Id)
            sessionStorage.setItem('selectedSkillsId', selectedCountries1Id)
            if ((selectedCountries1.length !== 0) || (selectedCountries2.length !== 0) || (sessionStorage.getItem('login') !== null) || (sessionStorage.getItem('pass') !== null) || (sessionStorage.getItem('gender') !== null)  || (sessionStorage.getItem('tele') !== null)   || (sessionStorage.getItem('name') !== null)) {
              reg()
            }

          }} className={s.greetings_btn}>Далее</button>
        </Link>
      </div>
    </div>
  );
}

export default Isp3;
