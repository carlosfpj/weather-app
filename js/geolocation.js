function geolocationSupport() {
  if("geolocation" in navigator) {
    return true
  } else {
    return false
  }
}

const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 100000,
}

export function getCurrentPosition(options = defaultOptions) {
  if(!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
      resolve(position)
    }, ()=>{
      reject("no hemos podido obtener tu ubicación")
    }, {options}),
    console.log("esto ES getCurrentPosition")
  })
}

export async function getLatLon (options = defaultOptions) {
  try {
    const {coords: {latitude: lat, longitude: lon}} = await getCurrentPosition(options)
    return {lat, lon, isError: false}
  }catch {
    return {lat: null, lon: null, isError: true}
  }
}