import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useState } from 'react';
import { DataFormattedType } from './Types';

interface Props {
  mineralData: [DataFormattedType[], DataFormattedType[], DataFormattedType[]];
}

export default function BoxView(props: Props) {
  const { mineralData } = props;

  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 2,
  };
  const layers = [
    new ScatterplotLayer({
      id: 'layer-for-top',
      data: mineralData[0],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: 'layer-for-middle',
      data: mineralData[1],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: 'layer-for-bottom',
      data: mineralData[2],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 0.05,
      pickable: true,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
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
