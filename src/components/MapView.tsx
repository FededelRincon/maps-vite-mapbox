import { useContext, useEffect, useRef } from "react"
import { Map } from "mapbox-gl";

import { PlacesContext } from '../context/places/PlacesContext';

import { Loading } from "./";



export const MapView = () => {

    const { isLoading, userLocation } = useContext(PlacesContext);
    const mapDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if( !isLoading ) {
            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, 
                zoom: 15 // starting zoom
            });
        }
    }, [isLoading])

    if( isLoading ) {
        return (
            <Loading />
        )
    }

    return (
        <div 
            ref={ mapDiv }
            style={{
                height: '100vh',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw',
            }}
        >
            { userLocation?.join(', ') }
        </div>
    )
}
