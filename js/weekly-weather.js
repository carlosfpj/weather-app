import {getWeeklyWeather} from './services/Weather.js'
import {getLatLon } from './geolocation.js'
import {formatWeekList, formatTemp} from '../utils/format-data.js'
import {createDOM} from '../utils/dom.js'
import {createPeriodTime} from './period-time.js'
import draggable from './draggable.js'

function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul class="dayWeather-list" id="dayWeather-list-${id}">
      </ul>
    </div>
  </div>
  `
}

function createTabPanel(id) {
  const $panel = createDOM(tabPanelTemplate(id))
  if(id > 0) {
    $panel.hidden = true
  }
  return $panel
}

function configWeeklyWeather(weekList){
  const $container = document.querySelector('.tabs')
  const extraData = []
  let extraIndex = 0

  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index)
    $container.append($panel)
    day.forEach((weather, indexWeather) => {
      extraData.push(weather)
      $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather, extraIndex))
      const dayList = document.querySelectorAll('.dayWeather-item')
      dayList.forEach((element) => {
        element.addEventListener("click", showExtraData)
      })
      extraIndex++;
    })
  })
  function showExtraData(event) {
    const dayList = document.querySelectorAll('.dayWeather-item')
    const {
      wind: {speed},
      main: {temp_max, temp_min, humidity},
    } = extraData[event.currentTarget.dataset.id]

    const $showExtra = document.querySelector('.weather-features')
    $showExtra.innerHTML = `
      <div>
        <p class="weather-max">Max: <strong>${formatTemp(temp_max)}</strong><p>
        <p class="weather-min">Min: <strong>${formatTemp(temp_min)}</strong></p>
      </div>
      <div>
        <p class="weather-wind">Viento: <strong>${speed} km/h</strong></p>
        <p class="weather-humidity">Humedad: <strong>${humidity}%</strong></p>
      </div>
    `
  }
}


export default async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote')
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('oh! ha ocurrido un error obteniendo el pronóstico del clima')
  const weekList = formatWeekList(weather.list)
  configWeeklyWeather(weekList)
  const $container = document.querySelector('.weeklyWeather')
  draggable($container)
  // const dayItemList = document.querySelectorAll('.dayWeather-item')
  // showExtraData(dayItemList, weekList)
}