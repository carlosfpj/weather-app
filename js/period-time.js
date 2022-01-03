import {createDOM} from '../utils/dom.js'
import {formatTemp, formatDate} from '../utils/format-data.js'


export function periodTimeTemplate({temp, date, icon, description, index}) {
  return `
  <div>
    <li class="dayWeather-item is-selected" data-id=${index}>
    <span class="dayWeather-time">${date}</span>
    <img class="dayWeather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
    <span class="dayWeather-temp">${temp}</span>
    </li>
  `
}

export function createPeriodTime(weather, index) {
  //temp
  //icon
  //date
  //description
  //temp max
  //temp min
  //vel viento
  //% de Humedad
  const dateOptions = {
    hour: 'numeric',
    hour12: true
  }

  const temp = formatTemp(weather.main.temp)
  const date = formatDate((new Date(weather.dt * 1000)), dateOptions)
  const maxTemp = weather.main.temp_max
  const minTemp = weather.main.temp_min
  const humidity = weather.main.humidity
  const windSpeed = weather.wind.speed

  const config = {
    temp,
    date,
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
    maxTemp, minTemp, humidity, windSpeed, index
  }
  return createDOM(periodTimeTemplate(config))
}