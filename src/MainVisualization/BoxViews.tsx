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
    boxFourMineralDataForRender,
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
    new GridCellLayer({
      id: 'layer-for-topLeft',
      data: boxOneMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.topLeft.zoom > 5 && boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-topRight',
      data: boxTwoMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.topLeft.zoom > 5 && boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-bottomLeft',
      data: boxThreeMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.topLeft.zoom > 5 &&
        boxThreeMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'layer-for-bottomRight',
      data: boxFourMineralDataForRender?.fullData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.1,
      pickable: true,
      fp64: false,
      visible:
        viewStates.topLeft.zoom > 5 &&
        boxFourMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-topLeft',
      data: boxOneMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 5 &&
        viewStates.topLeft.zoom > 3.5 &&
        boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-topRight',
      data: boxTwoMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 5 &&
        viewStates.topLeft.zoom > 3.5 &&
        boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-bottomLeft',
      data: boxThreeMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 5 &&
        viewStates.topLeft.zoom > 3.5 &&
        boxThreeMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-1-layer-for-bottomRight',
      data: boxFourMineralDataForRender?.downSampledDataLevel1,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.2,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 5 &&
        viewStates.topLeft.zoom > 3.5 &&
        boxFourMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-topLeft',
      data: boxOneMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 3.5 &&
        boxOneMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-topRight',
      data: boxTwoMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 3.5 &&
        boxTwoMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-bottomLeft',
      data: boxThreeMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 3.5 &&
        boxThreeMineralDataForRender !== undefined,
    }),
    new GridCellLayer({
      id: 'down-sampled-level-2-layer-for-bottomRight',
      data: boxFourMineralDataForRender?.downSampledDataLevel2,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: 0.3,
      pickable: true,
      visible:
        viewStates.topLeft.zoom <= 3.5 &&
        boxFourMineralDataForRender !== undefined,
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
