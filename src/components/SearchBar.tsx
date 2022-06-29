import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';


export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext(PlacesContext)
    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChange = ( event: ChangeEvent<HTMLInputElement> ) => {

        if ( debounceRef.current ) {
            clearTimeout( debounceRef.current );
        }
        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm( event.target.value )
        }, 350);
    }


    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar un lugar..."
                onChange={ onQueryChange }
            />
        </div>
    )
}
