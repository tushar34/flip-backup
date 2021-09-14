import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
// import Rootreducer from './store/reducers/Rootreducer';
// import Rootreducer from './store/reducers/Rootreducer';
// import rootReducer from "./store/reducers/Rootreducer"
import rootReducer from './store/reducers/Rootreducer';
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
const persistor = persistStore(store);



ReactDOM.render(
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
