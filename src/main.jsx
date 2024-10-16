import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
axios.defaults.baseURL = 'https://siskart-back.onrender.com/api/v1/';


axios.defaults.withCredentials = true;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
