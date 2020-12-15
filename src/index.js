import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './Redux/rootReducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'


 const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
 <Provider store = {store} >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
