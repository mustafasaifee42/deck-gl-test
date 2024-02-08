import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useState } from 'react';
import { DataFormattedType } from './Types';

interface Props {
  grayScaleData: DataFormattedType[];
  mineralData: [DataFormattedType[], DataFormattedType[], DataFormattedType[]];
}

export default function BoxView(props: Props) {
  const { grayScaleData, mineralData } = props;

  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 2,
  };
  const layers = [
    new ScatterplotLayer({
      id: 'layer-for-top-left',
      data: grayScaleData,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: 'layer-for-top-right',
      data: mineralData[0],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: 'layer-for-bottom-left',
      data: mineralData[1],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: 'layer-for-bottom-right',
      data: mineralData[2],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
  ];
  const views = [
    new OrthographicView({
      id: 'top-left',
      x: '0%',
      y: '0%',
      width: '50%',
      height: '50%',
      controller: true,
    }),
    new OrthographicView({
      id: 'top-right',
      x: '50%',
      y: '0%',
      width: '50%',
      height: '50%',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottom-left',
      x: '0%',
      y: '50%',
      width: '50%',
      height: '50%',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottom-right',
      x: '50%',
      y: '50%',
      width: '50%',
      height: '50%',
      controller: true,
    }),
  ];

  const [viewStates, setViewStates] = useState({
    'top-right': {
      target: [0, 0],
      zoom: 2,
    },
    'top-left': {
      target: [0, 0],
      zoom: 2,
    },
    'bottom-right': {
      target: [0, 0],
      zoom: 2,
    },
    'bottom-left': {
      target: [0, 0],
      zoom: 2,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    setViewStates({
      'top-right': viewState,
      'top-left': viewState,
      'bottom-right': viewState,
      'bottom-left': viewState,
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
        return layer.id === `layer-for-${viewport.id}`;
      }}
      onViewStateChange={onViewStateChange}
      getTooltip={({ object }) => {
        if (object?.type === 'mineral') return `${object.value[0].toFixed(2)}`;
        return null;
      }}
    />
  );
}
