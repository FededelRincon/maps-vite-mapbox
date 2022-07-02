import { Map, Popup, Marker } from 'mapbox-gl';
import { useReducer, useContext, useEffect } from 'react';

import { mapReducer } from "./mapReducer";
import { MapContext } from './MapContext';
import { PlacesContext } from "../index";


export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE:MapState = {
    isMapReady: false,
    map: undefined, //lo defino asi para q aparezca en devTool asi
    markers: [],
}


interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }:Props) => {

    const [ state, dispatch ] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext)


    useEffect(() => {
        state.markers.forEach( marker => marker.remove() ); 
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text }</h6>
                    <p>${ place.place_name }</p>
                `);
            
            const newMarker = new Marker()
                .setPopup( popup)
                .setLngLat([ lng, lat ])
                .addTo( state.map! )

            newMarkers.push( newMarker )
        }
        dispatch({type: 'setMarkers', payload: newMarkers })
        
    }, [ places ])
    

    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup()
            .setHTML(`
                <h5>Ud esta aqui</h5>
                <p>Su ubicacion actual</p>
                `)


        new Marker({
            color: '#61DAFB'
        }) //agrego el marcador, le pongo las coordenadas y lo agrego al mapa, y lo dispatch
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );

        dispatch({type: 'setMap', payload: map})
    }



    const getRouteBetweenPoints = async(start:[number, number], end: [number, number]) => {

    }

    return (
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap, 
            getRouteBetweenPoints,
        }}>
            { children }
        </MapContext.Provider>
    )
}
