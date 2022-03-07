import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './theme/GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
