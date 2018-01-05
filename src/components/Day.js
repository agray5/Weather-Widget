import React from 'react'
import PropTypes from 'prop-types'
import getStyle from '../logic/WeatherWidgetStyle'
import cloudy from '../img/cloudy.png'
import clear from '../img/sunny.png'
import rainy from '../img/rainy.png'
import snow from '../img/snow.png'
import thunderstorm from '../img/thunderstorm.png'

const Day = (props) => (
  <li
    onClick={props.onClick}
    className="day"
    id= {(props.selected ? "selectedDay" : undefined)}
    style={getStyle("Day", props)}
  >
    <ul className="dayEls">
      <li><span className="weekDay"> {props.day} </span></li>
      <li><img className="weatherSprite" src={weatherSprite[props.weatherType]} alt=" Weather Icon Not Avliable" /></li>
      <li>Low: <span className="low">{props.low}</span></li>
      <li>High: <span className="high">{props.high}</span></li>
    </ul>
  </li>
)

const weatherSprite = {
  'Clouds' : cloudy,
  'Clear' : clear,
  'Rain' : rainy,
  'Drizzle' : rainy,
  'Snow' : snow,
  'Thunderstorm': thunderstorm,
}

Day.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number.isRequired,
  weatherType: PropTypes.string.isRequired,
  low: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
}

export default Day
