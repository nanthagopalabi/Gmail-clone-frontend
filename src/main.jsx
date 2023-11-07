import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux' ;
import   configureStore   from './components/redux-container/slices/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './components/redux-container/persistant.js';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)