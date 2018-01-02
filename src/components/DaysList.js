import React from 'react'
import PropTypes from 'prop-types'
import Day from './Day'
import getStyle from '../logic/WeatherWidgetStyle'

class DaysList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDayId : 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.setState({selectedDayId: id})
  }

  render() {
    let daysList = [];
    for(var day in this.props.days) {
      daysList.push(
        <Day
          key={day.id}
          {...day}
          onClick={() => this.handleClick(day.id)}
          height={this.props.height ? this.props.height : undefined}
          width={this.props.width ? this.props.width : undefined}
          margin={this.props.margin ? this.props.margin : undefined}
          selected={(day.id === this.state.selectedDayId ? true : false)}
        />);
    }
    return(
      <ul style={getStyle("DayList", this.props)}>
        {daysList}
      </ul>
    )
  }

}

DaysList.propTypes = {
  days: PropTypes.shape({
    id: PropTypes.number.isRequired,
    weatherType: PropTypes.string.isRequired,
    low: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
  }).isRequired,
  clickHandler: PropTypes.func
}

export default DaysList
