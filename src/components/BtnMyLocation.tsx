import { useContext } from 'react';

import { PlacesContext } from '../context';
import { MapContext } from '../context/map/MapContext';



export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const handleClick = () => {
        if( !isMapReady ) throw new Error ('Mapa no esta listo')
        if( !userLocation ) throw new Error ('No hay ubicacion de usuario')

        map?.flyTo({
            zoom: 15,
            center: userLocation
        })
    }
    

    return (
        <div 
            className="btn btn-info"
            onClick={ handleClick }
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '999'
            }}
        >
            Mi Ubicacion
        </div>
    )
}
