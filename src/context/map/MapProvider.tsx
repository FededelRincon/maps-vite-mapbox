import { useReducer } from 'react';
import { Map } from "mapbox-gl";

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
