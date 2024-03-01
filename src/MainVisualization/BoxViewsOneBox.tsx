/* eslint-disable @typescript-eslint/no-explicit-any */
import DeckGL from '@deck.gl/react/typed';
import GL from '@luma.gl/constants';
import { GridCellLayer, BitmapLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useContext, useState } from 'react';
import Context from '../Context/Context';
import { SCALING_FACTOR } from '../Constants';

export default function BoxViewsFourBox() {
  const {
    boxMetaData,
    boxOneMineralData,
    updateZoomLevel,
    updateMouseOverData,
    boxOpacity,
    stripOpacity,
    menuCollapsed,
    mouseOverData,
  } = useContext(Context);
  const [viewStates, setViewStates] = useState({
    top: {
      target: [0, 0],
      zoom: 1,
    },
  });
  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 1,
    parent: document.getElementById('viz-container') as HTMLElement,
  };
  const layers = [
    new BitmapLayer({
      id: 'bg',
      image: './imgs/greyScale.png',
      opacity: boxOpacity,
      bounds: [
        -(boxMetaData.res_y * SCALING_FACTOR) / 2,
        (boxMetaData.res_x * SCALING_FACTOR) / 2,
        (boxMetaData.res_y * SCALING_FACTOR) / 2,
        -(boxMetaData.res_x * SCALING_FACTOR) / 2,
      ],
      textureParameters: {
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
      },
    }),
    new BitmapLayer({
      id: 'scanning-area-bg',
      image: './imgs/scanningArea.png',
      opacity: stripOpacity,
      bounds: [
        -(boxMetaData.res_y * SCALING_FACTOR) / 2,
        (boxMetaData.res_x * SCALING_FACTOR) / 2,
        (boxMetaData.res_y * SCALING_FACTOR) / 2,
        -(boxMetaData.res_x * SCALING_FACTOR) / 2,
      ],
      textureParameters: {
        [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
        [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
      },
    }),
    new GridCellLayer({
      id: 'layer-for-top',
      data: boxOneMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: SCALING_FACTOR,
      pickable: true,
      visible: boxOneMineralData !== undefined,
      onHover: (info, event: any) => {
        if (info.object) {
          updateMouseOverData({
            index: info.object.arrayIndex,
            position: info.object.position,
            mouseX: event.center.x,
            mouseY: event.center.y,
          });
        } else {
          updateMouseOverData(undefined);
        }
      },
    }),
    new GridCellLayer({
      id: 'mouseOver-Layer',
      data: [mouseOverData || { position: [0, 0] }],
      getPosition: d => d.position,
      getFillColor: _d => [255, 0, 0, 200],
      cellSize: SCALING_FACTOR,
      fp64: false,
      visible: mouseOverData !== undefined,
    }),
  ];
  const views = [
    new OrthographicView({
      id: 'top',
      x: '0%',
      y: '0%',
      width: '100%',
      height: '100%',
      controller: true,
    }),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    updateZoomLevel(d.zoom);
    setViewStates({
      top: viewState,
    });
  }, []);
  return (
    <DeckGL
      views={views}
      initialViewState={INITIAL_VIEW_STATE}
      viewState={viewStates}
      controller
      layers={layers}
      layerFilter={({ layer, viewport }) => {
        return (
          layer.id === `layer-for-${viewport.id}` ||
          layer.id === 'bg' ||
          layer.id === 'scanning-area-bg' ||
          layer.id === 'mouseOver-Layer'
        );
      }}
      onViewStateChange={onViewStateChange}
      useDevicePixels={false}
      id={menuCollapsed ? 'viz-container-expanded' : 'viz-container'}
    />
  );
}
