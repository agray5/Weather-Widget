import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DaysList from './DaysList'
import ZipCodeForm from './ZipCodeForm'
import getStyle from '../logic/WeatherWidgetStyle'
import buildForcast from '../logic/buildForcast'
import handleErrors from '../logic/handleHTTPErrors'
import checkForTimeout from '../logic/timeout'

class WeatherWidget extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {

      };
    }

    handleChange(event) {
      this.setState({zip: event.target.value});
    }

    handleSubmit(event) {;
      this.setForcast();
      event.preventDefault();
    }

    setForcast() {
      let forcastJson = localStorage.getItem('forcast');
      let forcastInfo = JSON.parse(localStorage.getItem('forcast_info'));

      if(this.state.forcast !== undefined && Object.keys(this.state.forcast).length !== 0) {
          return;
      }
      //Timeout is set for 10 minutes
      if(forcastJson && forcastInfo && !checkForTimeout(forcastInfo.timeStamp, 600) && forcastInfo.zip === this.state.zip){
        let data = JSON.parse(forcastJson);
        let forcast =  buildForcast(data);
        this.setState({forcast: forcast});
      }

      else{
        fetch('http://api.openweathermap.org/data/2.5/forecast?zip='+this.state.zip+',us&units=imperial&APPID=7b2437181ff01cfc1fa064493e70fc25')
        .then(handleErrors)
        .then(data => {
          return data.json()
        })
        .then(result => {
          let list = result.list;
          localStorage.setItem('forcast', JSON.stringify(list));
          localStorage.setItem('forcast_info', JSON.stringify({zip: this.state.zip, timeStamp: (Math.round(new Date().getTime()/1000))}));

          let forcast =  buildForcast(list);
          this.setState({forcast: forcast});
        })
        .catch((err) => {console.log("Error: ", err)})
    }
  }

     render() {
       let child = undefined;
       if(this.state.forcast){
         child = (
           <DaysList selectedDayId={this.state.selectedDayId} days={this.state.forcast} clickHandler={this.handleClick}
             height={this.props.height ? this.props.height : undefined}
             width={this.props.width ? this.props.width : undefined}
             margin={this.props.margin ? this.props.margin : undefined}
            />
          )
        }
        else if(!this.state.zipRecvd){
          child = (<ZipCodeForm zip={this.state.zip} onChange={this.handleChange} onSubmit={this.handleSubmit}/>)
        }
        else{
          <div> Forcast loading...</div>
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

export default WeatherWidget
