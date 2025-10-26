import Papa from 'papaparse';


export async function getLocalTime(lat, lng) {
  const res = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=0KU02TSFI5TI&format=json&by=position&lat=${lat}&lng=${lng}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function getCapitalCoordinates(countryName, csvCountryPath) {
  const pars = Papa.parse(csvCountryPath, { header: true });

  for (var info of pars.data) {
    if (info.Country == countryName) {
      return {
          lat: info.Latitude,
          lng: info.Longitude
      }
    }
  }

  return { lat: null, lng: null };
}

export async function getSunraiseSunset(lat, lng, date) {
  const [datePart, timePart] = date.formatted.split(" ");
  const [year, month, day] = datePart.split("-");

  const res = await fetch(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${year}-${month}-${day}&time_format=24`);

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

