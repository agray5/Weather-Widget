export buildForcast = (data) => {

  return data.list.reduce((days = {}, hour) => {
    let date = new Date(hour["dt_txt"].slice(0, 10));
    let day = dayNames[date.getDay()];
    let time = hour["dt_txt"].slice(12, 18)
    let hourInfo = {
      temp: hour.main.temp,
      weatherType: hour.weather[0].main,
      weatherDesc: hour.weather[0].description
    }

    // Defualt day object
    if(!days[day]) days[day] = {
      id: date.getDay(),
      low: 0,
      high: 0,
      weatherType: hourInfo.weatherType,
      weatherDesc: hourInfo.weatherDesc
    };

    // Adjust days low and high
    if (hourInfo.temp > days[day].high)
      days[day].high = hourInfo.temp;
    else if (hourInfo.temp < days[day].low)
      days[day].low = hourInfo.temp;

    days[day][time] = hourInfo;

  })
}
