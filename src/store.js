import { createContext, useReducer, useEffect } from 'react';
import { usePosition } from './utils/hooks';
import _ from 'lodash';
import axios from 'axios';

import { getMetOfficeData, locationAPI } from './utils/helpers';



// Toptal
// https://www.toptal.com/react/react-context-api

const initialState = {
  location: {}, // { lat: 51.0, lng: 0.0 },
  weather: {},
  error: false
};


const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const { location, weather } = store._currentValue;
  const { latitude, longitude, error } = usePosition();

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      // Samples
      case "sample action #1":
        const newState = {
          ...state,
          viewport: { ...state, someParameter: action.value }
        }; // do something with the action
        return newState;


      // Set user location  
      case 'set user location':
        return {...state, location: action.value };  

      // Update weather data  
      case 'update weather data':
        return {...state, weather: action.value };  

      case "refresh":
        return {
          ...state,
          refresh: action.value
        };



      // No action...
      default:
        console.warn("No dispatchEvent set!");
    }
  }, initialState);

  const getDefaultUserLocationData = () => {

    axios
    .get(locationAPI.GEOLOCDB)
    .then(res => {
      const response = res.data;

      // ToDo - to delete
      console.group("Initial user location");
        console.log("response from GEOLOCDB:", response); 
      console.groupEnd(); 

      dispatch({ type: 'set user location', value: { lat: response.latitude, lng: response.longitude } })

      //console.log("location:", location);
    })
    .catch(error => {
      // In case of error locating default posiotion use Greenwich as start location
      console.log(error)
      dispatch({ type: 'set user location', value: { lat: 51.0, lng: 0.0 } })
    });
  };

  // useEffect(() => {
  //   getDefaultUserLocationData();
  //   console.log(store._currentValue);
  // }, []);
  useEffect(() => {
    if (latitude && longitude) {
      dispatch({ type: 'set user location', value: { lat: latitude, lng: longitude } })
    }
    if (error) getDefaultUserLocationData();
    
  }, [latitude, longitude, error]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
