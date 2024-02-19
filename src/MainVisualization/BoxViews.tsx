import DeckGL from '@deck.gl/react/typed';
import { GridCellLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useContext, useState } from 'react';
import Context from '../Context/Context';

export default function BoxViews() {
  const {
    boxOneMineralDataForRender,
    boxTwoMineralDataForRender,
    boxThreeMineralDataForRender,
    updateZoomLevel,
    updateClickedIndex,
  } = useContext(Context);
  const [viewStates, setViewStates] = useState({
    top: {
      target: [0, 0],
      zoom: 2,
    },
    middle: {
      target: [0, 0],
      zoom: 2,
    },
    bottom: {
      target: [0, 0],
      zoom: 2,
    },
  });
  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 2,
  };
  const layers = [
    new GridCellLayer({
      id: 'layer-for-top',
      data: boxOneMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.top.zoom > 5 && boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-middle',
      data: boxTwoMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.top.zoom > 5 && boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-bottom',
      data: boxThreeMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.top.zoom > 5 && boxThreeMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-top',
      data: boxOneMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.top.zoom <= 5 &&
        viewStates.top.zoom > 3.5 &&
        boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-middle',
      data: boxTwoMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.top.zoom <= 5 &&
        viewStates.top.zoom > 3.5 &&
        boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-bottom',
      data: boxThreeMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.top.zoom <= 5 &&
        viewStates.top.zoom > 3.5 &&
        boxThreeMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-top',
      data: boxOneMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.top.zoom <= 3.5 && boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-middle',
      data: boxTwoMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.top.zoom <= 3.5 && boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-bottom',
      data: boxThreeMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.top.zoom <= 3.5 &&
        boxThreeMineralDataForRender !== undefined,
    }),
  ];
  const views = [
    new OrthographicView({
      id: 'top',
      x: '0%',
      y: '0%',
      width: '100%',
      height: '33.33%',
      controller: true,
    }),
    new OrthographicView({
      id: 'middle',
      x: '0%',
      y: '33.33%',
      width: '100%',
      height: '33.33%',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottom',
      x: '0%',
      y: '66.66%',
      width: '100%',
      height: '33.37%',
      controller: true,
    }),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    updateZoomLevel(d.zoom);
    setViewStates({
      top: viewState,
      middle: viewState,
      bottom: viewState,
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
          layer.id === `down-sampled-level-2-layer-for-${viewport.id}` ||
          layer.id === `down-sampled-level-1-layer-for-${viewport.id}`
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
