import React, { Component } from 'react';
//import logo from './logo.svg';
import WeatherWidget from './components/WeatherWidget'
import './styles/WeatherApp.css';

class WeatherApp extends Component {
  render() {
    return (
      <div className="WeatherApp">
        <header className="WeatherApp-header">
        {/*<img src={logo} className="WeatherApp-logo" alt="logo" />*/}
          <h1 className="WeatherApp-title">Weather App</h1>
        </header>
        <div className="WeatherWidget">
          <WeatherWidget />
        </div>
        <a href='https://www.freepik.com/free-vector/weather-icons-collection_1044316.htm'>Icons: Designed by Freepik</a>
      </div>
    );
  }
}



export default WeatherApp;
