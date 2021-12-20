//import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from '../utils/format-data.js'
import {weatherConditionCodes} from './constants.js'
import {getLatLon} from './geolocation.js'
import {getCurrentWeather} from './services/Weather.js'

  function setCurrentCity($el, city) {
    $el.textContent = city
  }

  function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
  }

  function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
  }

  function solarStatus(sunRiseTime, sunSetTime) {
    const currentHour = new Date().getHours()
    const sunRiseHour = sunRiseTime.getHours()
    const sunSetHour = sunSetTime.getHours()

    if(currentHour > sunRiseHour && currentHour < sunSetHour) {
      return 'morning'
    }
      return 'night'
  }

  function setBackground($el, conditionCode, solarStatus) {
    const condition = weatherConditionCodes[conditionCode]
    var size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${condition}${size}.jpg)`
  }

  function showCurrentWeather ($app, $loader) {
    $app.hidden = false
    $loader.hidden = true
  }

  function configCurrentWeather (weather) {
    //loeader
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')
    showCurrentWeather($app, $loading)
    //fecha actual
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    //temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)
    //background
    const sunRiseTime = new Date(weather.sys.sunrise * 1000)
    const sunSetTime = new Date(weather.sys.sunset * 1000)
    const conditionCode = String(weather.weather[0].id).charAt(0)
    setBackground($app, conditionCode, solarStatus(sunRiseTime, sunSetTime))
  }


export default async function currentWeather() {
  //cómo funciona esta app
  //pedimos geo a usuario //
  console.log('Esto ocurre ANTES de getCurrentPosition')
    const {lat, lon, isError} = await getLatLon()
    if(isError) return console.log('Ha ocurrido un error ubicándote')
    console.log (lat, lon)
  // getCurrentPosition().then((data) => {
  //   console.log(data)
  // }).catch((message) => {
  //   console.log(message)
  // })
  // console.log('Esto ocurre DESPUES de getCurrentPosition')
  // usamos datos de geo en API // pintamos datos de API en app
  const {isError: currentWeatherError, data: weather} = await getCurrentWeather(lat, lon)
  if(currentWeatherError) return console.log('oh! ha ocurrido un error obteniendo los datos del clima')
  configCurrentWeather(weather)
}