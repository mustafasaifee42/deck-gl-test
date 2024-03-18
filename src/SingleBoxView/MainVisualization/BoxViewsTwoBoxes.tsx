/* eslint-disable @typescript-eslint/no-explicit-any */
import DeckGL from '@deck.gl/react/typed';
import GL from '@luma.gl/constants';
import { GridCellLayer, BitmapLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../Context/Context';
import { SCALING_FACTOR } from '../../Constants';

export default function BoxViewsTwoBoxes() {
  const {
    boxMetaData,
    boxOneMineralData,
    boxThreeMineralData,
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
    bottom: {
      target: [0, 0],
      zoom: 1,
    },
  });
  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 1,
  };
  const { id } = useParams();
  const layers = [
    new BitmapLayer({
      id: 'bg',
      image: `../imgs/BoxID_${id}/greyScale.png`,
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
      image: `../imgs/BoxID_${id}/scanningArea.png`,
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
      id: 'layer-for-bottom',
      data: boxThreeMineralData?.dataForRender,
      getPosition: d => d.position,
      getFillColor: d => d.color,
      cellSize: SCALING_FACTOR,
      pickable: true,
      fp64: false,
      visible: boxThreeMineralData !== undefined,
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
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
    new OrthographicView({
      id: 'bottom',
      x: '0%',
      y: 'calc(50% + 0.5px)',
      width: '100%',
      height: 'calc(50% - 0.5px)',
      controller: true,
    }),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    updateZoomLevel(d.zoom);
    setViewStates({
      top: viewState,
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
