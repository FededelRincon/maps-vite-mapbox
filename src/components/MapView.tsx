import { useContext, useEffect, useRef } from "react"
import { Map } from "mapbox-gl";

import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";



export const MapView = () => {

    const { isLoading, userLocation } = useContext(PlacesContext);
    const { setMap } = useContext(MapContext);

    const mapDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if( !isLoading ) {
            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/dark-v10', // style URL
                center: userLocation, 
                zoom: 15 // starting zoom
            });

            setMap( map );
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
