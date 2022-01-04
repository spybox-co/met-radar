import { createContext, useReducer, useEffect } from "react";



// Toptal
// https://www.toptal.com/react/react-context-api

const initialState = {
  position: [],
  features: [],
  properties: []
};


const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      // Samples
      case "sample action #1":
        const newState = {
          ...state,
          viewport: { ...state, someParameter: action.value }
        }; // do something with the action
        return newState;


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

  useEffect(() => {

  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
