import fdrLogo from '../fdrLogo.svg';
// import reactLogo from '../logo.svg';


export const ReactLogo = () => {
    return (
        <div>
            <img
                src={fdrLogo}
                alt="React Logo"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '20px',
                    width: '100px'
                }}
            />
        </div>
    )
}
