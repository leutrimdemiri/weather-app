import React from 'react';
import moment from 'moment';

export const ForecastCard = (props) => {
  const { time, date, mainWeather, maxTemp, minTemp,  datai, wIcon} = props;
  const temperature = Math.round(maxTemp);

  let Icon = null;

  switch(wIcon) {
    case "01d":   Icon = '../img/clear-day.svg';      break;
    case "0n":    Icon = '../img/clear-night.svg';    break;
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
    default:      Icon = '../img/cloud.svg';
  }


  return (
      <div class="p-4 d-flex flex-column justify-content-center align-items-center">
          <span>{moment.unix(datai).format('ddd')}</span>
            <img src={Icon} alt='' />
          <span>{temperature}&deg;</span>
      </div>
  );
};
