
export const Loading = () => {
    return (
        <div className="loading-map d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h3>Espere por favor...</h3>
                <span>Localizando...</span>
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    )
}
