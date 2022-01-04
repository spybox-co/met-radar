const OWAPIKEY =  process.env.REACT_APP_OPEN_WEATHER_APIKEY;

const MetOfficeAPI = {
  api_key: process.env.REACT_APP_MET_OFFICE_APIKEY,
  client_id: process.env.REACT_APP_X_IBM_CLIENT_ID,
  client_secret: process.env.REACT_APP_X_IBM_CLIENT_SECRET
}


const request = {
  url: 'https://rgw.5878-e94b1c46.eu-gb.apiconnect.appdomain.cloud/metoffice/production/v0/forecasts/point/three-hourly',
  options: {
    method: 'GET',
    headers: {
      'X-IBM-Client-Id': MetOfficeAPI.client_id,
      'X-IBM-Client-Secret': MetOfficeAPI.client_secret,
      accept: 'application/json',
    }
  }

}

/*
GET https://rgw.5878-e94b1c46.eu-gb.apiconnect.appdomain.cloud/metoffice/production/v0/forecasts/point/three-hourly?latitude=51&longitude=0
Nagłówki:
Accept: application/json
X-IBM-Client-Id: **********
X-IBM-Client-Secret: *********
*/


// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
// https://metoffice.apiconnect.ibmcloud.com/metoffice/production/




export const openWeatherData = (position) => {
  const lat = position.lat || 51;
  const lng = position.lat || 0;

  const coordinates = `lat=${lat}&lon=${lng}`;

  return fetch(`https://api.openweathermap.org/data/2.5/forecast?${coordinates}&appid=${OWAPIKEY}&units=metric`)
          .then(res => res.json())
          .then(data => {
            const result = data.list;
            // console.log('RESPONSE:', result);
            return result;
          })
          .catch(error => console.log('ERROR:', error));
}

export const getMetOfficeData = (position) => {

  const lat = position.lat || 51;
  const lng = position.lng || 0;

  const coordinates = position ? `&latitude=${lat}&longitude=${lng}` : '';

  return fetch(`${request.url}?includeLocationName=true${coordinates}`, request.options)
          .then(res => res.json())
          .then(data => data)
          .catch(error => console.log('ERROR:', error));

};

export const locationAPI = {
  GEOLOCDB: `https://www.geolocation-db.com/json/`
}

export const toCelsiusTemp = (value) => {
  return value - 273;
};