import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { library } from '@fortawesome/fontawesome-svg-core';
import App from './components/App/App';
import { AllowanceProvider } from './contexts/AllowanceContext'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <AllowanceProvider>
      <App />
    </AllowanceProvider>
  </BrowserRouter>, document.getElementById('root'));