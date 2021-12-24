import {getWeeklyWeather} from './services/Weather.js'
import { getLatLon } from './geolocation.js'
import {formatWeekList} from '../utils/format-data.js'

function configWeeklyWeather(){

}

export default async function weeklyWeather() {
  const { lat, lon, isError } = await getLatLon()
  if (isError) return console.log('Ha ocurrido un error ubicándote')
  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
  if (weeklyWeatherError) return console.log('oh! ha ocurrido un error obteniendo el pronóstico del clima')
  const weekList = formatWeekList(weather.list)
  debugger
  configWeeklyWeather(weekList)
}