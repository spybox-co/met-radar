import { useEffect, useContext } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { store } from '../store.js';

const options = {
  enableHighAccuracy: false, 
  maximumAge:         15000, 
  timeout:            12000
};

// @Docs 
// https://www.npmjs.com/package/react-hook-geolocation


export const Geolocate = props => {

  const { state, dispatch } = useContext(store);

  // eslint-disable-next-line
  const { autoCenterMap, position, startLocate } = state;



  // eslint-disable-next-line
  const onGeolocationUpdate = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    console.log("Gełolokejszyn ejpijaj: executed")
    dispatch({ type: 'set user location', value: { lat: geolocation.latitude, lng: geolocation.longitude } })
  } 

  const setLocation = geolocation => {
    console.log('Here’s some new data from the Geolocation API: ', geolocation)
    console.log("Gełolokejszyn ejpijaj: executed")
    dispatch({ type: 'set user location', value: { lat: geolocation.latitude, lng: geolocation.longitude } })
  } 
  // eslint-disable-next-line
  //const geolocation =  useGeolocation(options, onGeolocationUpdate)
  const geolocation =  useGeolocation();

  const isGeolocationAvailable = !geolocation.error;

  useEffect(() => {
    setLocation(geolocation);
  }, [isGeolocationAvailable])





  // if error -> handle to store & context
  // return null;
  return !geolocation.error
    ? (
      <ul>
        <li>Latitude:          {geolocation.latitude}</li>
        <li>Longitude:         {geolocation.longitude}</li>
        <li>Location accuracy: {geolocation.accuracy}</li>
        <li>Altitude:          {geolocation.altitude}</li>
        <li>Altitude accuracy: {geolocation.altitudeAccuracy}</li>
        <li>Heading:           {geolocation.heading}</li>
        <li>Speed:             {geolocation.speed}</li>
        <li>Timestamp:         {geolocation.timestamp}</li>
      </ul>
    )
    : (
      <p>No geolocation, sorry.</p>
    )
};

