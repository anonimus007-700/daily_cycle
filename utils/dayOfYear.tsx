function isLeapYear (year) {
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    return true;
  } else {
    return false;
  }
}

function dayOfYear (month, date) {
  const isLeap = leap ? 29 : 28;
