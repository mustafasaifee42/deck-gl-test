import { useContext } from 'react';
import Context from './Context/Context';

export default function Overlay() {
  const {
    boxOneSettings,
    boxTwoSettings,
    boxThreeSettings,
    boxFourSettings,
    layout,
  } = useContext(Context);
  return (
    <>
      <div
        style={{
          backgroundColor: 'rgba(230, 237, 243,0.5)',
          position: 'fixed',
          width: layout > 2 ? '50%' : '100%',
          zIndex: '20',
          left: 0,
          top: '0',
          margin: 0,
          textAlign: 'center',
          color: '#161b22',
          fontFamily: 'Roboto, sans-serif',
          padding: '0.5rem 0',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {boxOneSettings.name}
      </div>
      {layout > 1 ? (
        <div
          style={{
            backgroundColor: 'rgba(230, 237, 243,0.5)',
            position: 'fixed',
            width: layout === 2 ? '100%' : '50%',
            zIndex: '20',
            left: layout === 2 ? '0' : '50%',
            top: layout === 2 ? '50%' : '0',
            margin: 0,
            textAlign: 'center',
            color: '#161b22',
            fontFamily: 'Roboto, sans-serif',
            padding: '0.5rem 0',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {boxTwoSettings.name}
        </div>
      ) : null}
      {layout === 4 ? (
        <>
          <div
            style={{
              backgroundColor: 'rgba(230, 237, 243,0.5)',
              position: 'fixed',
              width: '50%',
              zIndex: '20',
              left: 0,
              top: '50%',
              margin: 0,
              textAlign: 'center',
              color: '#161b22',
              fontFamily: 'Roboto, sans-serif',
              padding: '0.5rem 0',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {boxThreeSettings.name}
          </div>
          <div
            style={{
              backgroundColor: 'rgba(230, 237, 243,0.5)',
              position: 'fixed',
              width: '50%',
              zIndex: '20',
              left: '50%',
              top: '50%',
              margin: 0,
              textAlign: 'center',
              color: '#161b22',
              fontFamily: 'Roboto, sans-serif',
              padding: '0.5rem 0',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {boxFourSettings.name}
          </div>
        </>
      ) : null}
      {layout > 1 ? (
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,1)',
            position: 'fixed',
            width: '100%',
            height: '2px',
            zIndex: '20',
            top: '50%',
            left: '0',
            margin: 0,
          }}
        />
      ) : null}
      {layout === 4 ? (
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,1)',
            position: 'fixed',
            width: '2px',
            height: '100vh',
            zIndex: '20',
            left: '50%',
            top: '0',
            margin: 0,
          }}
        />
      ) : null}
    </>
  );
}
