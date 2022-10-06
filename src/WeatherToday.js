import React, { useState } from "react";
import axios from "axios";

import "./WeatherToday.css";

export default function WeatherToday(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    console.log(response.data);
    console.log(response.data.main.temp);
    setWeatherData({
      ready: true,
      date: "Tuesday 27 September at 14:47",
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      cityName: response.data.name,
    });
  }

  if (weatherData.ready) {
    return (
      <div className="weather-today">
        <div className="row">
          <div className="weather-left col-xs-12 col-sm-6">
            <span className="city">{weatherData.cityName}</span>
            <ul>
              <li>
                <p>{weatherData.date}</p>
              </li>
              <li>
                <p>
                  Humidity:{" "}
                  <strong>
                    <span className="humidity">{weatherData.humidity}</span>%
                  </strong>
                  , Wind:{" "}
                  <strong>
                    <span className="wind-speed">{weatherData.wind}</span>
                    km/h
                  </strong>
                </p>
              </li>
            </ul>
          </div>

          <div className="weather-right col-xs-12 col-sm-6">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Weather icon"
              className="icon-today"
            />
            <span className="temperature">{weatherData.temperature}</span>
            <span className="unit">°C</span>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "f81d9102f55557fbaab58670b27ef077";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return <p>Loading...</p>;
  }
}
