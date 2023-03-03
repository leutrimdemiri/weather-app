import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CurrentWeather from './components/CurrentWeather';
import { ForecastCard } from './components/Forecast';
import { WeatherDetails } from './components/WeatherDetails';
import { getDate, getTime, hasGeolocationSupport } from "./helpers/helpers";

const PERMISSION_DENIED = "Permission denied. Can't show weather information.";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoAccess: null,
      forecasts: []
    };
    this.coords = null;
  }

  componentDidMount() {
    if (hasGeolocationSupport()) {
      this.fetchTodaysWeather();
      this.fetchForecastWeather();
    }
  }

  fetchTodaysWeather = () => {
    navigator.geolocation.getCurrentPosition((c) => {
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${c.coords.latitude}&lon=${c.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(weather => weather.json())
        .then(data => this.setState({ current: data, geoAccess: true }));
    }, () => alert(PERMISSION_DENIED))
  };

  fetchForecastWeather = () => {
    navigator.geolocation.getCurrentPosition((c) => {
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${c.coords.latitude}&lon=${c.coords.longitude}&exclude=current,hourly,minutely,alerts&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(weather => weather.json())
        .then(data => {
          const forecasts = data.daily.filter((_, index) => index => 8 == 0);
          this.setState({ ...data.daily, forecasts, geoAccess: true })
        });
    }, () => alert(PERMISSION_DENIED));
  };


  render() {
    const { geoAccess, current, forecasts, conditions} = this.state;
    if (geoAccess && current  && !!process.env.REACT_APP_API_KEY) {
      return (
      <>
            <CurrentWeather weatherData={current} />
            <WeatherDetails data={current} />
            {this.state.forecasts && (
            <div class="weather__forecast d-flex flex-row justify-content-center align-items-center mt-3">
              {forecasts.map((w, index) => (
                <ForecastCard
                  key={index}
                  date={getDate(w.dt)}
                  datai={w.dt}
                  mainWeather={w.weather[0].main}
                  maxTemp={w.temp.max}
                  minTemp={w.temp.min}
                  time={getTime(w.dt)}
                  wIcon={w.weather[0].icon}
                />
              ))}
            </div>
          )}
      </>
      );
    } else {
      return (
        <>
        <div class="container mt-5">
          <div class="d-flex justify-content-center align-items-center">
            <div class="weather__card d-flex justify-content-center align-items-center">
                <div class="spinner-border text-secondary" role="status">
                </div>
            </div>
          </div>
        </div>
      </>
      );
    }
  }
}

export default App;