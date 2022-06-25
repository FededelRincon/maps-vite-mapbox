import React from 'react'
import ReactDOM from 'react-dom/client'

import mapboxgl from 'mapbox-gl'; 

import { MapsApp } from './MapsApp'

import './index.css'

 
mapboxgl.accessToken = 'pk.eyJ1IjoicGFxdWV0aW5obyIsImEiOiJja2sycDc4YzAxM2kyMm9tZm8ybWg3emdrIn0.6XhGimBpY4H5p_zjExagpg';



if( !navigator.geolocation ) {
  alert('tu navegador no tiene opcion de Geolocalizacion')
  throw new Error('tu navegador no tiene opcion de Geolocalizacion')
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
