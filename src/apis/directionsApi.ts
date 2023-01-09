import axios from "axios";


const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson', 
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: import.meta.env.VITE_MAPBOXAPP_API_KEY,
        // este import.meta.env., busca las variables de entorno. Si o si necesita de VITE_nombreVariable
    }
})

export default directionsApi;