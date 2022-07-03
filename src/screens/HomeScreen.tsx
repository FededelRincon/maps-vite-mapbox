import { BtnMyLocation, MapView, FdrLogo, SearchBar, Info } from "../components"


export const HomeScreen = () => {
    return (
        <div>
            <MapView />

            <SearchBar />
            <BtnMyLocation />
            <FdrLogo />
            <Info />
        </div>
    )
}
