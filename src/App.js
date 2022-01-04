import { useEffect, useContext } from 'react';
import { store } from './store.js';
import _ from 'lodash';

import { usePosition } from './utils/hooks';

import { getMetOfficeData, openWeatherData } from './utils/helpers';
import { Geolocate } from './components/Geolocate';

import './App.scss';


const UsePositionDemo = () => {
  const {latitude, longitude, error} = usePosition();

  const { dispatch } = useContext(store);
  return (
    <>
      <h4>Geolocation</h4>
      <code className="small-code">
        {!error ? (
          <p>latitude: {latitude}<br/> longitude: {longitude}</p>
        ) : (<p>error: {error}</p>)}
      </code>
    </>
  );
};

const ChangePosition = () => {
  const {latitude, longitude, error} = usePosition();

  const { dispatch } = useContext(store);
  useEffect(()=> {
    console.log("Set Position:", latitude, longitude)
    dispatch({ type: 'set user location', value: { lat: latitude, lng: longitude } })
  }, [latitude, longitude])
  return null;
};

function App() {
  const { state, dispatch } = useContext(store);

  const { location, weather } = state;


  const isLocation = !_.isEmpty(location);
  const isWeather = !_.isEmpty(weather);

  const currentData = {
    //locationName: weather.features.properties.location.name,
    coordinates: `N: ${location.lat}, E: ${location.lng}`,
  }

  const getWeatherData = () => {
    const location = { lat: 54.49, lng: 18.54 };
    getMetOfficeData(location)
      .then(data => { 
        const weatherData = { features: data.features[Object.keys(data.features)[0]], parameters: data.parameters[Object.keys(data.parameters)[0]] }
        dispatch({ type: 'update weather data', value: weatherData })
      }) 
      .catch(error => {
        console.log(error);
        // getWeatherDataFromOpenWeatherInstead();
      });
  }
  const getWeatherDataFromOpenWeatherInstead = () => {
    openWeatherData(location)
      .then(data => { 
        const weatherData = { features: data, parameters: data }
        dispatch({ type: 'update weather data', value: weatherData })
      }) 
      .catch(error => {
        console.log(error);
      });
  }

  const updateUserLocation = () => {
    dispatch({ type: 'set user location', value: { lat: 51.0, lng: 0.0 } })
  }


  // useEffect(() => {
  //   getWeatherData(); // getWeatherDataFromOpenWeatherInstead();
  // }, [location])

  useEffect(() => {
    console.log(isLocation, isLocation ? location : "lokalizacji nie ma");
  }, [isLocation])

  useEffect(() => {
    console.log(isWeather, isWeather ? "pogoda jest" : "pogody nie ma", isWeather ? weather : null);
  }, [isWeather])

  return (
    <div className="App">
      <header className="App-header">
        {/* {isWeather && <p>{weather.features.properties.location.name}</p>} */}
        <span>{currentData.coordinates}</span>
        <button onClick={updateUserLocation} disabled>update location</button>
        
      </header>
      <main>
        {/* <Geolocate /> */}
        <UsePositionDemo />
        {/* <ChangePosition /> */}
        {weather && (
          <>
            <h4>Weather response</h4>
            <button onClick={getWeatherData}>update weather</button>
            <code className="small-code"><span>{`${JSON.stringify(state.weather.features)}`}</span></code>
          </>
        )}
      </main>
    </div>
  );
}

export default App;


export const sampleTry = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "coordinates": [
          "woevwut",
          "jecwugwo",
          "kurr"
        ],
        "type": "Point"
      },
      "properties": {
        "name": "St Thomas, Devon, South West England, England, GB",
        "requestPointDistance": 45.47665247,
        "modelRunDate": "2019-01-31T12:00Z",
        "timeSeries": [
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 6992061356048384
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 6479465427238912
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 104236828327936
            }
          }
        ]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "coordinates": [
          "faore",
          "hawza",
          "bipudfud"
        ],
        "type": "Point"
      },
      "properties": {
        "name": "St Thomas, Devon, South West England, England, GB",
        "requestPointDistance": 92.55152245,
        "modelRunDate": "2019-01-31T12:00Z",
        "timeSeries": [
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 4570996231110656
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 5749489155440640
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 7500221701423104
            }
          }
        ]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "coordinates": [
          "vovijed",
          "namdep",
          "fiped"
        ],
        "type": "Point"
      },
      "properties": {
        "name": "St Thomas, Devon, South West England, England, GB",
        "requestPointDistance": 41.93620172,
        "modelRunDate": "2019-01-31T12:00Z",
        "timeSeries": [
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 563133852680192
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 6726114837790720
            }
          },
          {
            "time": "2019-01-31T12:00Z",
            "data": {
              "id": 6000180576911360
            }
          }
        ]
      }
    }
  ],
  "parameters": [
    {
      "id": 221995992088576
    },
    {
      "id": 3932323032596480
    },
    {
      "id": 3548073330475008
    }
  ]
}