import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DaysList from './DaysList'
import ZipCodeForm from './ZipCodeForm'
import getStyle from '../logic/WeatherWidgetStyle'
import buildForcast from '../logic/buildForcast'

class WeatherWidget extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        forcast: {}
      }
    }

    handleChange(event) {
      this.setState({zip: event.target.value});
    }

    handleSubmit(event) {
      console.log("Handle submit");
      this.setState({zipRecvd: true})
      event.preventDefault();
    }

    setForcast() {
      if(this.state.forcast) return;

      if((localStorage.getItem('forcast'))){
        let data = JSON.parse(localStorage.getItem('forcast'));
        let forcast =  buildForcast(data);
        this.setState(forcast: forcast);
      }

      else{
        fetch('api.openweathermap.org/data/2.5/forecast?zip='+this.state.zip+',us&units=imperial&APPID=7b2437181ff01cfc1fa064493e70fc25').then(
          results => {
            localStorage.setItem('forcast', results.json);
            return results.json();
      }).then(data => {
        let forcast =  buildForcast(data);
        this.setState(forcast: forcast);
      });

    }
  }

     render() {
       let child = undefined;

       if(!this.state.zipRecvd){
         child = (<ZipCodeForm zip={this.state.zip} onChange={this.handleChange} onSubmit={this.handleSubmit}/>)
       }
       else {
         this.setForcast();
         child = (
           <DaysList selectedDayId={this.state.selectedDayId} days={this.state.forcast} clickHandler={this.handleClick}
             height={this.props.height ? this.props.height : undefined}
             width={this.props.width ? this.props.width : undefined}
             margin={this.props.margin ? this.props.margin : undefined}
            />

          )
        }

        return(
          <div className="weatherContainer" style={getStyle('WeatherWidget', this.props)}>
            {child}
          </div>
        )
      }
}

WeatherWidget.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.number,
}

const weathersData = [
  {id: 0, weatherType: "cloudy", high: 90, low: 78},
  {id: 1, weatherType: "sunny", high: 86, low: 79},
  {id: 2, weatherType: "cloudy", high: 89, low: 76},
  {id: 3, weatherType: "sunny", high: 87, low: 73},
  {id: 4, weatherType: "cloudy", high: 85, low: 74},
  {id: 5, weatherType: "cloudy", high: 88, low: 76},
  {id: 6, weatherType: "rainy", high: 84, low: 72}
]



export default WeatherWidget
