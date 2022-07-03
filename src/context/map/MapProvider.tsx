import { Map, Popup, Marker, LngLatBounds, AnySourceData } from 'mapbox-gl';
import { useReducer, useContext, useEffect } from 'react';

import { mapReducer } from "./mapReducer";
import { MapContext } from './MapContext';
import { PlacesContext } from "../index";
import { directionsApi } from '../../apis';

import { DirectionsReponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
    kms: Number | null;
    minutes: Number | null;
}

const INITIAL_STATE:MapState = {
    isMapReady: false,
    map: undefined, //lo defino asi para q aparezca en devTool asi
    markers: [],
    kms: null,
    minutes: null,
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

        const resp = await directionsApi.get<DirectionsReponse>(`/${ start.join(',') };${ end.join(',')}`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms = kms / 100;

        const minutes = Math.floor( duration / 60 )

        dispatch({ type: 'setKms', payload: kms });
        dispatch({ type: 'setMinutes', payload: minutes });

        const bounds = new LngLatBounds(
            start,
            start
        );
        for (const coord of coords) {
            const newCoord: [number, number] = [ coord[0], coord[1] ]
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 250,
        });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        //Limpiar la polyline
        if( state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }


        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#5bc0de',
                'line-width': 4
            }
        })
    }
    
    const clearKmsAndMinutes = () => {
        dispatch({ type: 'clearMinutes' });
        dispatch({ type: 'clearKms' });
    }

    return (
        <MapContext.Provider value={{
            ...state,

            //Methods
            setMap, 
            getRouteBetweenPoints,
            clearKmsAndMinutes,
        }}>
            { children }
        </MapContext.Provider>
    )
}
