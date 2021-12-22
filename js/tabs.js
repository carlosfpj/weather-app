const $tabContainer = document.querySelector("#tabs")
const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekDay = today.getDay()

const week = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]

function nextDay(day) {

  if(day === 6){
    return 0
  }
  return day + 1
}

$tabList.forEach(($tab, index) => {
  if (index === 0) {
    $tab.textContent = 'Hoy'
    weekDay = nextDay(weekDay)
    return false
  }
  $tab.textContent = week[weekDay]
  weekDay = nextDay(weekDay)
})