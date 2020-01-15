import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import App from './components/App/App';
import { AllowanceProvider } from './contexts/AllowanceContext'
import './index.css';


library.add(
  faSignInAlt,
  faUserPlus, 
  faPaperPlane
)


ReactDOM.render(
  <BrowserRouter>
    <AllowanceProvider>
      <App />
    </AllowanceProvider>
  </BrowserRouter>, document.getElementById('root'));