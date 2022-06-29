import { Map, Marker, Popup } from "mapbox-gl";
import { useReducer } from 'react';

import { mapReducer } from "./mapReducer";
import { MapContext } from './MapContext';


export interface MapState {
    isMapReady: boolean;
    map?: Map;
}

const INITIAL_STATE:MapState = {
    isMapReady: false,
    map: undefined, //lo defino asi para q aparezca en devTool asi
}


interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }:Props) => {

    const [ state, dispatch ] = useReducer(mapReducer, INITIAL_STATE);


    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Ud esta aqui</h4>
                `)
                // <p>En algun lugar del mundo</p>


        new Marker({
            color: '#61DAFB'
        }) //agrego el marcador, le pongo las coordenadas y lo agrego al mapa, y lo dispatch
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );

        dispatch({type: 'setMap', payload: map})
    }





  return (
    <MapContext.Provider value={{
        ...state,

        //Methods
        setMap, 
    }}>
        { children }
    </MapContext.Provider>
  )
}
