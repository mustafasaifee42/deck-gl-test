import { useContext } from 'react';
import Context from '../Context/Context';
import RowEl from './RowEl';

export default function InfoBox() {
  const {
    boxOneSettings,
    boxTwoSettings,
    boxThreeSettings,
    boxFourSettings,
    boxOneMineralData,
    boxTwoMineralData,
    boxThreeMineralData,
    boxFourMineralData,
    mouseOverData,
    layout,
  } = useContext(Context);
  return (
    <div>
      {mouseOverData ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 100,
            minWidth: '200px',
            top: `${mouseOverData.mouseY - 20}px`,
            margin: '0',
            left: `${mouseOverData.mouseX + 10}px`,
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            color: 'rgb(230, 237, 243)',
            borderRadius: '4px',
            fontFamily: 'Roboto, sans-serif',
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {boxOneSettings.name !== 'GreyScale' && boxOneMineralData ? (
              <RowEl
                boxSettings={boxOneSettings}
                data={boxOneMineralData.dataForRender}
              />
            ) : null}
            {boxTwoSettings.name !== 'GreyScale' &&
            boxTwoMineralData &&
            layout > 1 ? (
              <RowEl
                boxSettings={boxTwoSettings}
                data={boxTwoMineralData.dataForRender}
              />
            ) : null}
            {boxThreeSettings.name !== 'GreyScale' &&
            boxThreeMineralData &&
            layout === 4 ? (
              <RowEl
                boxSettings={boxThreeSettings}
                data={boxThreeMineralData.dataForRender}
              />
            ) : null}
            {boxFourSettings.name !== 'GreyScale' &&
            boxFourMineralData &&
            layout === 4 ? (
              <RowEl
                boxSettings={boxFourSettings}
                data={boxFourMineralData.dataForRender}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
