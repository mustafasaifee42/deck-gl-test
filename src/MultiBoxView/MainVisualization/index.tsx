/* eslint-disable @typescript-eslint/no-explicit-any */
import DeckGL from '@deck.gl/react/typed';
import GL from '@luma.gl/constants';
import { BitmapLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useContext } from 'react';
import flattenDeep from 'lodash.flattendeep';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/MultiBoxContext';

export default function MainVisualization() {
  const { multiBoxProfile, elements, maxWidth } = useContext(Context);
  const INITIAL_VIEW_STATE = {
    target: [0, 0],
    zoom: 0.5,
    parent: document.getElementById('viz-container') as HTMLElement,
  };
  const navigate = useNavigate();
  const elementArr = [...elements];
  elementArr.unshift('profile');
  const elementLayer = flattenDeep(
    elementArr.map((el, i) =>
      multiBoxProfile.map(d =>
        el === 'profile'
          ? [
              new BitmapLayer({
                id: `BoxID_${d.id}_${el}_${i}`,
                image: `./imgs/Multibox/BoxID_${d.id}/profile.png`,
                opacity: 1,
                bounds: [
                  i * (maxWidth + 50) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + 50) + d.dimension[0] - maxWidth / 2,
                  d.y_pos - multiBoxProfile[0].dimension[1] / 2,
                ],
                textureParameters: {
                  [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
                  [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
                },
                pickable: true,
                onClick: () => {
                  navigate('/single-box/1');
                },
              }),
            ]
          : [
              new BitmapLayer({
                id: `BoxID_${d.id}_${el}_profile_${i}`,
                image: `./imgs/Multibox/BoxID_${d.id}/profile.png`,
                opacity: 1,
                bounds: [
                  i * (maxWidth + 50) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + 50) + d.dimension[0] - maxWidth / 2,
                  d.y_pos - multiBoxProfile[0].dimension[1] / 2,
                ],
                textureParameters: {
                  [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
                  [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
                },
                pickable: true,
                onClick: () => {
                  navigate('/single-box/1');
                },
              }),
              new BitmapLayer({
                id: `BoxID_${d.id}_${el}_${i}`,
                image: `./imgs/Multibox/BoxID_${d.id}/${el}.png`,
                opacity: 1,
                bounds: [
                  i * (maxWidth + 50) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + 50) + d.dimension[0] - maxWidth / 2,
                  d.y_pos - multiBoxProfile[0].dimension[1] / 2,
                ],
                textureParameters: {
                  [GL.TEXTURE_MIN_FILTER]: GL.NEAREST,
                  [GL.TEXTURE_MAG_FILTER]: GL.NEAREST,
                },
                pickable: true,
                onClick: () => {
                  navigate('/single-box/1');
                },
              }),
            ],
      ),
    ),
  );
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
  return (
    <DeckGL
      views={views}
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={elementLayer}
      useDevicePixels={false}
      id='multi-box-viz-container'
    />
  );
}
