
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