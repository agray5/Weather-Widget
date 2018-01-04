const dayNames = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
function buildForcast (data) {
  console.log("Building forcast");
  console.log("Data:", data);
  let days = [];
  let currDay;
  let index;
  for(let hour in data){
    hour = data[hour];
    console.log("days", JSON.parse(JSON.stringify(days)));
    let date = new Date(hour["dt_txt"].slice(0, 10));
    let day = dayNames[date.getDay()];
    let time = hour["dt_txt"].slice(11, 16)
    let hourInfo = {
      temp: hour.main.temp,
      weatherType: hour.weather[0].main,
      weatherDesc: hour.weather[0].description
    }

    // Defualt day object
    if(day !== currDay){
      index = days.push({
        day: day,
        low: hourInfo.temp,
        high: hourInfo.temp,
        weatherType: hourInfo.weatherType,
        weatherDesc: hourInfo.weatherDesc
      }) - 1;
      currDay = day;
    }
    // Adjust days low and high
    if (hourInfo.temp > days[index].high)
      days[index].high = hourInfo.temp;
    else if (hourInfo.temp < days[index].low)
      days[index].low = hourInfo.temp;

    days[index][time] = hourInfo;
  }
  return days;
}

export default buildForcast
