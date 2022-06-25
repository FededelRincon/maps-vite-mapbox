import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'
import './index.css'

if( !navigator.geolocation ) {
  alert('tu navegador no tiene opcion de Geolocalizacion')
  throw new Error('tu navegador no tiene opcion de Geolocalizacion')
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
