import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configStore from './config/configStore';
import {Provider} from 'react-redux';

const store = configStore();

const ele = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

store.subscribe( () => {
  ReactDOM.render(ele, document.getElementById('root'));
})

ReactDOM.render(ele, document.getElementById('root'));

serviceWorker.unregister();
