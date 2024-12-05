import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FCMProvider } from './context/FCMContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FCMProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FCMProvider>
    </BrowserRouter>
  </React.StrictMode>
);
