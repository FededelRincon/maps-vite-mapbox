import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';



export const Info = () => {

    const { kms, minutes } = useContext(MapContext)


    if( !kms && !minutes ){
        return <></>
    }

    return (
        <div className='smooth'>
            <div className="info card">
                <div className="card-body">
                    <h4 className="card-title mb-3">Informacion estimada :</h4>

                    <div className='d-flex'>
                        <span className='me-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 bi bi-arrow-right-square" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </span>
                        <p>
                            Kilometros: <span>{ kms ? kms.toString() : '0'}</span> km
                        </p>
                    </div>
                    <div className='d-flex'>
                        <span className='me-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                            </svg>
                        </span>
                        {
                            (minutes! < 60 )
                                ? <p>{ minutes } minutos</p> 
                                : <p>{ (minutes! / 60).toFixed() } horas y { minutes! % 60 } minutos</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
