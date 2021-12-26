const defaultDateOptions = {
  day: 'numeric',
  weekday: 'long',
  month: 'long'
}

export function formatDate(date, config = defaultDateOptions) {
  return new Intl.DateTimeFormat('es', defaultDateOptions).format(date)
}

export function formatTemp(value) {
  return `${Math.floor(value)}°`
}

export function formatWeekList(rawData) {
  let dayList = []
  const weekList = []
  console.log(rawData)
  rawData.forEach((item, index) => {
    const hour = new Date((item.dt*1000)).getHours()
    dayList.push(item)
    if(index < rawData.length - 1) {
      const nextHour = new Date(((rawData[index + 1]).dt) * 1000).getHours()
      if(nextHour < 2) {
          weekList.push(dayList)
          dayList = []
      }
    }
  })
  return weekList
}