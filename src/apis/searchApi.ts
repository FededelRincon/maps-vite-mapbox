import axios from "axios";


const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 4,
        languaje: 'es', 
        access_token: 'pk.eyJ1IjoicGFxdWV0aW5obyIsImEiOiJja2sycDc4YzAxM2kyMm9tZm8ybWg3emdrIn0.6XhGimBpY4H5p_zjExagpg',
    }
})



export default searchApi;