import DeckGL from '@deck.gl/react/typed';
import { GridCellLayer, BitmapLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useContext, useState } from 'react';
import Context from '../Context/Context';

export default function BoxViews() {
  const {
    boxOneMineralData,
    boxTwoMineralData,
    boxThreeMineralData,
    boxFourMineralData,
    updateZoomLevel,
    updateClickedIndex,
  } = useContext(Context);
  const [viewStates, setViewStates] = useState({
    topLeft: {
      target: [0, 0],
      zoom: 2,
    },
    topRight: {
      target: [0, 0],
      zoom: 2,
    },
    bottomLeft: {
      target: [0, 0],
      zoom: 2,
    },
    bottomRight: {
      target: [0, 0],
      zoom: 2,
    },
  });
  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 2,
  };
  const layers = [
    new BitmapLayer({
      id: 'bg',
      image: './imgs/greyScale.bmp',
      opacity: 1,
      bounds: [-11997 / 2, 6282 / 2, 11997 / 2, -6282 / 2],
    }),
    new BitmapLayer({
      id: 'scanning-area-bg',
      image: './imgs/scanningArea.png',
      opacity: 0.2,
      bounds: [-11997 / 2, 6282 / 2, 11997 / 2, -6282 / 2],
    }),
    new GridCellLayer({
      id: 'layer-for-topLeft',
      data: boxOneMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 9,
      pickable: true,
      visible: boxOneMineralData !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-topRight',
      data: boxTwoMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 9,
      pickable: true,
      fp64: false,
      visible: boxTwoMineralData !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-bottomLeft',
      data: boxThreeMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 9,
      pickable: true,
      fp64: false,
      visible: boxThreeMineralData !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-bottomRight',
      data: boxFourMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 9,
      pickable: true,
      fp64: false,
      visible: boxFourMineralData !== undefined,
    }),
  ];
  const views = [
    new OrthographicView({
      id: 'topLeft',
      x: '0%',
      y: '0%',
      width: 'calc(50% - 0.5px)',
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
    new OrthographicView({
      id: 'topRight',
      y: '0%',
      x: 'calc(50% + 0.5px)',
      width: 'calc(50% - 0.5px)',
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottomLeft',
      x: '0%',
      y: 'calc(50% + 0.5px)',
      width: 'calc(50% - 0.5px)',
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottomRight',
      x: 'calc(50% + 0.5px)',
      y: 'calc(50% + 0.5px)',
      width: 'calc(50% - 0.5px)',
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    updateZoomLevel(d.zoom);
    setViewStates({
      topLeft: viewState,
      topRight: viewState,
      bottomLeft: viewState,
      bottomRight: viewState,
    });
  }, []);
  return (
    <DeckGL
      views={views}
      initialViewState={INITIAL_VIEW_STATE}
      viewState={viewStates}
      controller
      layers={layers}
      pickingRadius={10}
      layerFilter={({ layer, viewport }) => {
        return (
          layer.id === `layer-for-${viewport.id}` ||
          layer.id === 'bg' ||
          layer.id === 'scanning-area-bg'
        );
      }}
      onViewStateChange={onViewStateChange}
      getTooltip={({ object }) => {
        if (object?.type === 'mineral') return `${object.value[0].toFixed(2)}`;
        return null;
      }}
      useDevicePixels={false}
      onClick={info => {
        updateClickedIndex(info.index);
      }}
    />
  );
}
