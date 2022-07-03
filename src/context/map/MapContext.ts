import { Map } from "mapbox-gl";
import { createContext } from "react";


interface MapContextProps {
    isMapReady: boolean;
    map?: Map;
    kms: number | null;
    minutes: number | null;

    // Methods
    setMap: (map: Map) => void;
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
    clearKmsAndMinutes: () => void;
}

export const MapContext = createContext({} as MapContextProps )