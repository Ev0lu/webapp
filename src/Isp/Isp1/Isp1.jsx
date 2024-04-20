import React, { useState } from 'react';
import './Isp1.css';
import arrowDownSvg from '../../assets/arrow.svg';

function Isp1() {
  const countries = ['Россия', 'Казахстан', 'Армения', 'Азербайджан', 'Грузия'];
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [city, setCity] = useState('');

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <div className="greetings">
        <div className="greetings_wrapper">


    <div className="country-selector">
      <div className="country-dropdown">
        <div
          className="selected-country"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>{selectedCountry || 'Страна'}</span>
          <img
            src={arrowDownSvg}
            alt="Arrow Down"
            className={`arrow-down ${showDropdown && 'rotated'}`}
          />
        </div>
        {showDropdown && (
          <div className="dropdown-list">
            {countries.map((country, index) => (
              <div
                key={index}
                className={`country ${selectedCountry === country && 'selected'}`}
                onClick={() => handleCountrySelect(country)}
              >
                {country}
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <div className="password-input">
        <input
          type="text"
          placeholder="Город"
          value={city}
          className='password-field'
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button className="greetings_btn">Далее</button>
      </div>
    </div>
  );
}

export default Isp1