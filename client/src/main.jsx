import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App';
import Router from './components/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
