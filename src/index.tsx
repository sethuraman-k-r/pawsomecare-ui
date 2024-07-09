import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';

/* JS Import */
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

/* CSS Import */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

axios.defaults.baseURL = process.env.REACT_APP_ApiUrl

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename='/pawsomecare'>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
