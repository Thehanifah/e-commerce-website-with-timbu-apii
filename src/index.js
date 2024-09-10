import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import CartProvider from './context/Cartcontext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     
   < CartProvider>
    <App />
    </CartProvider>

);

