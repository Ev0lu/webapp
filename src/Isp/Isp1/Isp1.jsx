import React, { useRef, useState, useEffect } from 'react';
import s from './Isp1.module.css';
import arrowsvg from '../../assets/arrow.svg';
import arrowsvg2 from '../../assets/angle-dark.svg';
import blackarr from '../../assets/black.svg';

function Isp1(props) {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [offsetCountries, setOffsetCountries] = useState(0);
  const limitCountries = 25;

  const [searchQueryCountries, setSearchQueryCountries] = useState('');
  const [isOpenCountries, setIsOpenCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const dropdownRefCountries = useRef(null);
  const scrollContainerRefCountries = useRef(null);
  const scrollbarRefCountries = useRef(null);

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [offsetCities, setOffsetCities] = useState(0);
  const limitCities = 25;

  const [searchQueryCities, setSearchQueryCities] = useState('');
  const [isOpenCities, setIsOpenCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const dropdownRefCities = useRef(null);
  const scrollContainerRefCities = useRef(null);
  const scrollbarRefCities = useRef(null);

  const validateFields = () => {
    const errors = {
      city: selectedCity === '',
      country: selectedCountry === '',
    };
    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefCountries.current && !dropdownRefCountries.current.contains(event.target)) {
        setIsOpenCountries(false);
      }
      if (dropdownRefCities.current && !dropdownRefCities.current.contains(event.target)) {
        setIsOpenCities(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const calculateScrollbarHeight = () => {
      const scrollContainerHeight = scrollContainerRefCountries.current.offsetHeight;
      const contentHeight = scrollContainerRefCountries.current.scrollHeight;
      const scrollbarHeightPercentage = (scrollContainerHeight / contentHeight) * 100;
      setScrollbarHeightCountries(scrollbarHeightPercentage);
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

  useEffect(() => {
    const calculateScrollbarHeight = () => {
      const scrollContainerHeight = scrollContainerRefCities.current.offsetHeight;
      const contentHeight = scrollContainerRefCities.current.scrollHeight;
      const scrollbarHeightPercentage = (scrollContainerHeight / contentHeight) * 100;
      setScrollbarHeightCities(scrollbarHeightPercentage);
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

  const toggleDropdownCountries = () => {
    setIsOpenCountries(!isOpenCountries);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setSearchQueryCountries(country); // Update searchQuery with selected country label
    setIsOpenCountries(false);
  };

  const fetchCountries = async () => {
    setLoadingCountries(true);

    try {
      const response = await fetch(`https://assista1.ru/items/country?startswith=${searchQueryCountries}&offset=${offsetCountries}&limit=${limitCountries}`);
      const data = await response.json();
      const newCountries = data.items.map(([country, id]) => ({ label: country, value: id }));

      setCountries(prevCountries => [...prevCountries, ...newCountries]); // Добавляем загруженные страны к списку
      setOffsetCountries(prevOffset => prevOffset + limitCountries); // Увеличиваем offset для следующего запроса
    } catch (error) {
      console.error('Error fetching countries:', error);
    }

    setLoadingCountries(false);
  };

  useEffect(() => {
    setOffsetCountries(0); // Reset offset to 0 when searchQuery changes
    setCountries([]); // Reset countries list to empty when searchQuery changes
  }, [searchQueryCountries]);

  const handleScrollCountries = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeightCountries(scrollbarHeightPercentage);
    scrollbarRefCountries.current.style.height = `${scrollbarHeightPercentage - 13}%`;
    scrollbarRefCountries.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      if (!loadingCountries) {
        fetchCountries(); // Загружаем следующую порцию стран при достижении конца прокрутки
      }
    }
  };

  useEffect(() => {
    fetchCountries(); // Call fetchCountries whenever searchQuery changes
  }, [searchQueryCountries]);

  const handleInputChangeCountries = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQueryCountries(newSearchQuery);
    setOffsetCountries(0); // Reset offset to 0 whenever searchQuery changes
  };

  const toggleDropdownCities = () => {
    setIsOpenCities(!isOpenCities);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setSearchQueryCities(city); // Update searchQuery with selected city label
    setIsOpenCities(false);
  };

  const fetchCities = async () => {
    setLoadingCities(true);

    try {
      const response = await fetch(`https://assista1.ru/items/city?startswith=${searchQueryCities}&offset=${offsetCities}&limit=${limitCities}`);
      const data = await response.json();
      const newCities = data.items.map(([city, id]) => ({ label: city, value: id }));

      setCities(prevCities => [...prevCities, ...newCities]); // Добавляем загруженные города к списку
      setOffsetCities(prevOffset => prevOffset + limitCities); // Увеличиваем offset для следующего запроса
    } catch (error) {
      console.error('Error fetching cities:', error);
    }

    setLoadingCities(false);
  };

  useEffect(() => {
    setOffsetCities(0); // Reset offset to 0 when searchQuery changes
    setCities([]); // Reset cities list to empty when searchQuery changes
  }, [searchQueryCities]);

  const handleScrollCities = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollbarHeightPercentage = (clientHeight / scrollHeight) * 100;
    setScrollbarHeightCities(scrollbarHeightPercentage);
    scrollbarRefCities.current.style.height = `${scrollbarHeightPercentage - 13}%`;
    scrollbarRefCities.current.style.top = `${(scrollTop / scrollHeight) * 100}%`;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      if (!loadingCities) {
        fetchCities(); // Загружаем следующую порцию городов при достижении конца прокрутки
      }
    }
  };

  useEffect(() => {
    fetchCities(); // Call fetchCities whenever searchQuery changes
  }, [searchQueryCities]);

  const handleInputChangeCities = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQueryCities(newSearchQuery);
    setOffsetCities(0); // Reset offset to 0 whenever searchQuery changes
  };

  return (
    <div className={s.container}>
      <div className={s.countryContainer}>
        <input
          type="text"
          value={searchQueryCountries}
          onChange={handleInputChangeCountries}
          placeholder="Выберите страну"
          className={s.input}
        />
        <div className={s.dropdown} ref={dropdownRefCountries}>
          {isOpenCountries && (
            <div className={s.dropdownContent}>
              {countries.map((country) => (
                <div
                  key={country.value}
                  onClick={() => selectCountry(country.label)}
                  className={s.dropdownItem}
                >
                  {country.label}
                </div>
              ))}
              {loadingCountries && (
                <div className={s.loading}>Загрузка...</div>
              )}
            </div>
          )}
        </div>
        <img src={arrowsvg} alt="arrow" className={s.arrow} onClick={toggleDropdownCountries} />
      </div>
      <div className={s.cityContainer}>
        <input
          type="text"
          value={searchQueryCities}
          onChange={handleInputChangeCities}
          placeholder="Выберите город"
          className={s.input}
        />
        <div className={s.dropdown} ref={dropdownRefCities}>
          {isOpenCities && (
            <div className={s.dropdownContent}>
              {cities.map((city) => (
                <div
                  key={city.value}
                  onClick={() => selectCity(city.label)}
                  className={s.dropdownItem}
                >
                  {city.label}
                </div>
              ))}
              {loadingCities && (
                <div className={s.loading}>Загрузка...</div>
              )}
            </div>
          )}
        </div>
        <img src={arrowsvg} alt="arrow" className={s.arrow} onClick={toggleDropdownCities} />
      </div>
      <button className={s.nextButton} disabled={!validateFields()} onClick={() => console.log('Next button clicked')}>
        Далее
      </button>
    </div>
  );
}

export default Isp1;
