import { useState, useEffect } from 'react';

import { getMetOfficeData } from './utils/helpers';

import './App.scss';


console.log(process.env)


function App() {

  const [state, setState] = useState(null);
  const [position, setPosition] = useState({ lat: 54.5, lng: 18.5 });

  const getWeatherData = () => {
    getMetOfficeData(position)
      .then(data => setState({ features: data.features[Object.keys(data.features)[0]], parameters: data.parameters[Object.keys(data.parameters)[0]] }))
      .catch(error => console.log(error));
  }



  useEffect(() => {
    getWeatherData();
  }, [])

  useEffect(() => {
    console.log("STATE:", state);
  }, [state])


  return (
    <div className="App">
      <header className="App-header">

      </header>

      {state && (
        <>
          <p>{state.features.properties.location.name}</p>
          <code>{`${JSON.stringify(state.features)}`}</code>
        </>
      )}
    </div>
  );
}

export default App;
