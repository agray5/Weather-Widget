//checkForTimeout uses seconds not milliseconds
function checkForTimeout(timeStamp, timeoutSecs) {
  let currentTimeInSecs = Math.round(new Date().getTime()/1000);
  if(currentTimeInSecs - timeStamp < timeoutSecs )
    return false;
  else
    return true;
}

export default checkForTimeout
