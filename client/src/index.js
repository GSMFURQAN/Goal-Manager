import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import CssBaseline from '@mui/material/CssBaseline';

      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
    <App />
    </Provider>
  </React.StrictMode>
);
