import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = 
    | { type: 'setMap', payload: Map }
    | { type: 'setMarkers', payload: Marker[] }

    | { type: 'setKms', payload: Number | null }
    | { type: 'clearKms' }

    | { type: 'setMinutes', payload: Number | null }
    | { type: 'clearMinutes' }



export const mapReducer = ( state:MapState, action: MapAction ):MapState => {
    switch ( action.type ) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
    
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
    
        case 'setKms':
            return {
                ...state,
                kms: action.payload
            }

        case 'clearKms':
            return {
                ...state,
                kms: null
            }

        case 'setMinutes':
            return {
                ...state,
                minutes: action.payload
            }

        case 'clearMinutes':
            return {
                ...state,
                minutes: null
            }

    
        default:
            return state;
    }
}


