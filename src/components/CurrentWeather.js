import React from 'react';
import './styles.css';
import moment from 'moment';

import droplet from '../img/droplet.svg';
import sunrise from '../img/sunrise.svg';
import sunset from '../img/sunset.svg';
import wind from '../img/wind.svg';
import barometer from '../img/barometer.svg';

export default function currentWeather({weatherData}) {

  let weatherIcon = null;

  switch(weatherData.weather[0].icon) {
    case "01d":   weatherIcon = '../img/clear-day.svg';      break;
    case "01n":   weatherIcon = '../img/clear-night.svg';    break;
    case "02d":   weatherIcon = '../img/cloud-day.svg';      break;
    case "02n":   weatherIcon = '../img/clear-night.svg';    break;
    case "03d":   weatherIcon = '../img/cloud.svg';      break;
    case "03n":   weatherIcon = '../img/cloud-night.svg';    break;
    case "04d":   weatherIcon = '../img/cloud.svg';      break;
    case "04n":   weatherIcon = '../img/cloud-night.svg';    break;
    case "09d":   weatherIcon = '../img/cloud-rain.svg';      break;
    case "09n":   weatherIcon = '../img/rain-night.svg';    break;
    case "10d":   weatherIcon = '../img/cloud-drizzle.svg';      break;
    case "10n":   weatherIcon = '../img/rain-night.svg';    break;
    case "11d":   weatherIcon = '../img/cloud-lightning.svg';      break;
    case "11n":   weatherIcon = '../img/cloud-lightning.svg';    break;
    case "13d":   weatherIcon = '../img/snow.svg';      break;
    case "13n":   weatherIcon = '../img/snow.svg';    break;
    case "50d":   weatherIcon = '../img/cloud-fog.svg';      break;
    case "50n":   weatherIcon = '../img/cloud-fog.svg';    break;
    default:      weatherIcon = '../img/clear-day.svg';
  }

  let weatherDescription = null; 

  if (weatherData.weather[0].description === "clear sky" && weatherData.weather[0].icon === '01n') {
    weatherDescription = 'Mostly Clear';
  } else if (weatherData.weather[0].description === "clear sky" && weatherData.weather[0].icon === '01d') {
    weatherDescription = 'Sunny';
  } else if (weatherData.weather[0].description === "few clouds" && weatherData.weather[0].icon === '02d') {
    weatherDescription = 'Mostly Sunny';
  } else if (weatherData.weather[0].description === "few clouds" && weatherData.weather[0].icon === '02n') {
    weatherDescription = 'Mostly Clear';
  } else if (weatherData.weather[0].description === "scattered clouds") {
    weatherDescription = 'Partly Cloudy';
  } else if (weatherData.weather[0].description === "broken clouds") {
    weatherDescription = 'Mostly Cloudy';
  } else if (weatherData.weather[0].description === "overcast clouds") {
    weatherDescription = 'Cloudy';
  } else if (weatherData.weather[0].description === "thunderstorm") {
    weatherDescription = 'Thunderstorms';
  } else if (weatherData.weather[0].description === "shower rain") {
    weatherDescription = 'Rain';
  } else if (weatherData.weather[0].description === "mist") {
    weatherDescription = 'Fog';
  } else {
    weatherDescription = weatherData.weather[0].description;
  }
  
  const getSunrise = weatherData.sys.sunrise;
  const getSunset = weatherData.sys.sunset;
  const pressure = (weatherData.main.pressure * 0.02953).toFixed(2);


  return (
  <>
    <div class="container mt-5">
      <div class="d-flex flex-row justify-content-center align-items-center">

        <div class="weather__card">
          <div class="d-flex flex-row justify-content-center align-items-center">
              <div class="p-3">
                <h2>{Math.round(weatherData.main.temp)}&deg;</h2>
              </div>
              <div class="p-3">
              <img src={weatherIcon} alt="" />
              </div>

              <div class="p-3">
                <h5>{moment().format('dddd, hh A')}</h5>
                <h3>{weatherData.name}</h3>
                <span class="weather__description">{weatherDescription}</span>
              </div>
              
            </div>

            <div class="weather__status d-flex flex-row justify-content-center align-items-center mt-5 py-2">
             
              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={sunrise} alt="" />
                <span>{moment(getSunrise * 1000).format('HH:mm')}</span>
              </div>

              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={droplet} alt="" />
                <span>{weatherData.main.humidity}%</span>
              </div>


              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={droplet} alt="" />
                <span>{weatherData.main.humidity}%</span>
              </div>

              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={barometer} alt="" />
                <span>{pressure} inHg</span>
              </div>

              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={wind} alt='' />
                <span>
                  {Math.round(weatherData.wind.speed)} km/h
                </span>
              </div>

              <div class="px-3 d-flex justify-content-center align-items-center">
                <img src={sunset} alt="" />
                <span>{moment(getSunset * 1000).format('HH:mm')}</span>
              </div>

          </div>
        </div>
      </div>
    </div>
  </>
  )
}