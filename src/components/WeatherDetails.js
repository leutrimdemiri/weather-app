import React from 'react';

import Icon_droplet from '../img/droplet.svg';
import Icon_thermometer from '../img/thermometer.svg';
import Icon_visibility from '../img/visibility.svg';
import Icon_compass from '../img/compass.svg';
import Icon_barometer from '../img/barometer.svg';
import Icon_wind from '../img/wind.svg';

export const WeatherDetails = (props) => {
  const { data } = props;
  const wIcon = data.weather[0].icon;
  let Icon = null;

  switch(wIcon) {
    case "01d":   Icon = '../img/clear-day.svg';      break;
    case "01n":    Icon = '../img/clear-night.svg';    break;
    case "02d":   Icon = '../img/cloud-day.svg';      break;
    case "02n":   Icon = '../img/clear-night.svg';    break;
    case "03d":   Icon = '../img/cloud.svg';      break;
    case "03n":   Icon = '../img/cloud-night.svg';    break;
    case "04d":   Icon = '../img/cloud.svg';      break;
    case "04n":   Icon = '../img/cloud-night.svg';    break;
    case "09d":   Icon = '../img/cloud-rain.svg';      break;
    case "09n":   Icon = '../img/rain-night.svg';    break;
    case "10d":   Icon = '../img/rain-day.svg';      break;
    case "10n":   Icon = '../img/rain-night.svg';    break;
    case "11d":   Icon = '../img/cloud-lightning.svg';      break;
    case "11n":   Icon = '../img/cloud-lightning.svg';    break;
    case "13d":   Icon = '../img/snow.svg';      break;
    case "13n":   Icon = '../img/snow.svg';    break;
    case "50d":   Icon = '../img/cloud-fog.svg';      break;
    case "50n":   Icon = '../img/cloud-fog.svg';    break;
    default:      Icon = '../img/clear-day.svg'; 
  }

  const feels_like = Math.round(data.main.feels_like);
  const current_temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const visibility = (data.visibility / 1000).toFixed(0);
  const wind = Math.round(data.wind.speed);
  const wind_deg = data.wind.deg;
  const pressure = (data.main.pressure * 0.02953).toFixed(2);

  let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
  const compassLetters = compassSector[(wind_deg / 22.5).toFixed(0)];
  
  let feels_like_description = null;
  
  if(feels_like === current_temp) {
    feels_like_description = 'Similar to the actual temperature.';
  } else {
    feels_like_description = 'Wind is making it feel colder.';
  }

  let visibility_description = null;

  if(visibility < 5 && wIcon === "50d" && wIcon === "50n") {
    visibility_description = 'light haze is affecting visibility';
  } else if (visibility < 5 && wIcon === "13d" && wIcon === "13n") {
    visibility_description = 'snow is affecting visibility';
  }  else if (visibility < 5) {
    visibility_description = "light haze is affecting visibility";
  }  else {
    visibility_description = "It's clear right now.";
  } 

  return (
    <div class="weather__details d-flex flex-row justify-content-center align-items-center mt-3">
      <div class="box d-flex flex-column justify-content-start align-items-start">
        <span className="d-flex justify-content-center align-items-center"><img src={Icon_thermometer} alt="" /> Feels like</span>
        <h3>{feels_like}&deg;</h3>
        <div className="d-flex justify-content-end align-items-end">
          <p>{feels_like_description}</p>
        </div>
      </div>

      <div class="box d-flex flex-column justify-content-start align-items-start">
        <span className="d-flex justify-content-center align-items-center"><img src={Icon_droplet} alt="" /> Humidity</span>
        <h3>{humidity}%</h3>
        <div className="d-flex justify-content-end align-items-end">
          <p>The dew point is 1&deg; right now.</p>
        </div>
      </div>

      <div class="box d-flex flex-column justify-content-start align-items-start">
        <span className="d-flex justify-content-center align-items-center">
          <img src={Icon_visibility} alt="" />
          Visibility
        </span>
        <h3>{visibility} <small>km</small></h3>
        <div className="d-flex d-inline-flex align-items-end mt-auto">
          <p>{visibility_description}</p>
        </div>
      </div>

      <div class="box d-flex flex-column justify-content-start ">
        <span className="d-flex justify-content-start align-items-center">
          <img src={Icon_wind} alt="" />
          Wind
        </span>
        <div className='pos-relative align-self-center'>
          <img 
          style={{width: "60px", height: "60px"}} 
          src={Icon_compass}
          alt="" />
          <div className='pos-absolute'>
            <img 
            src='../img/wind/compass-direction.svg' 
            style={{
              width:"20px",
              height:"20px",
              transform: `rotate(${wind_deg}deg)` 
            }}
            alt="" />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-auto">
          <p>{wind} km/h [{compassLetters}]</p>
        </div>
      </div>

      <div class="box d-flex flex-column justify-content-start align-items-start">
        <span className="d-flex justify-content-center align-items-center">
          <img src={Icon_barometer} alt="" />
          Pressure
        </span>
        <h5>{pressure} inHg</h5>
      </div>
    </div>
  );
};
