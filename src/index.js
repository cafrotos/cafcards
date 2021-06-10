import "services/initd";
import 'index.less';

import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Screens from 'screens';
import reportWebVitals from 'reportWebVitals';
import firebase from "firebase/app"

export const AppContext = createContext();

export const App = () => {
  const [store, setStore] = useState({
    logined: false
  });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setStore((_store) => ({
          ..._store,
          logined: true
        }))
      }
      else {
        setStore((_store) => ({
          ..._store,
          logined: false
        }))
      }
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...store,
        setStore
      }}
    >
      <Screens />
    </AppContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
