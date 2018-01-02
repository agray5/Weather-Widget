import React from 'react'
import PropTypes from 'prop-types'
import getStyle from '../logic/WeatherWidgetStyle'
import cloudy from '../img/cloudy.png'
import sunny from '../img/sunny.png'
import rainy from '../img/rainy.png'

const Day = (props) => (
  <li
    onClick={props.onClick}
    className="day"
    id= {(props.selected ? "selectedDay" : undefined)}
    style={getStyle("Day", props)}
  >
    <ul className="dayEls">
      <li><span className="weekDay"> {idToWeekDay[props.id]} </span></li>
      <li><img className="weatherSprite" src={weatherSprite[props.weatherType]} alt=" Weather Icon " /></li>
      <li>Low: <span className="low">{props.low}</span></li>
      <li>High: <span className="high">{props.high}</span></li>
    </ul>
  </li>
)

const idToWeekDay = {
  0 : 'Sun',
  1 : 'Mon',
  2 : 'Tue',
  3 : 'Wed',
  4 : 'Thu',
  5 : 'Fri',
  6 : 'Sat',
}

const weatherSprite = {
  'cloudy' : cloudy,
  'sunny' : sunny,
  'rainy' : rainy,
  3 : 'Wed',
  4 : 'Thu',
  6 : 'Fri',
  7 : 'Sat',
}

Day.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number.isRequired,
  weatherType: PropTypes.string.isRequired,
  low: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
}

export default Day
