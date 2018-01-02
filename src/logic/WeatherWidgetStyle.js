const getStyle = (el, {height, width, margin}) => {
  let style ={}
  switch (el) {
    case "DayList" :
      let heighScale = height/170;
      let widthScale = width/1300;

      style["transform"] = "scale(" + (height ? (width ? Math.min(heighScale, widthScale) : heighScale) : widthScale) + ")"
      break;
    case "WeatherWidget" :
      if (height)
        style["height"] = height  + "px";
      if (width)
        style["width"] = width  + "px";
      break;
    case "Day" :
      if (margin)
        style["marginRight"] = margin + "px";
      break;
    default: break;
  }
  return style;
}

export default getStyle
