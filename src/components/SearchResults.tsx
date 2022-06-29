import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPlaces } from './';
import { Feature } from '../interfaces/places';



export const SearchResults = () => {

    const [activeId, setActiveId] = useState('')

    const { isLoadingPlaces, places } = useContext(PlacesContext)

    const { map } = useContext(MapContext)

    const onPlaceClicked = ( place: Feature ) => {
        setActiveId(place.id);
        const [ lng, lat] = place.center;
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    if (isLoadingPlaces) {
        return <LoadingPlaces />
    }

    if( places.length === 0 ){
        return <></>
    }

    return (
        <ul className="list-group mt-3">

            {
                places.map( (place) => (
                    <li
                        key={ place.id }
                        className={`list-group-item list-group-item-action pointer ${ activeId === place.id ? 'active' : '' }`}
                        onClick={ () => onPlaceClicked(place) }
                    >
                        <h6>{ place.text }</h6>
                        <p 
                            style={{ fontSize: '12px'}}
                        >
                            { place.place_name }
                        </p>

                        <button className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light' : 'btn-outline-info'} `}>
                            Direcciones
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}
