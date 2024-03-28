/* eslint-disable @typescript-eslint/no-explicit-any */
import DeckGL from '@deck.gl/react/typed';
import GL from '@luma.gl/constants';
import { BitmapLayer, TextLayer } from '@deck.gl/layers/typed';
import { OrthographicView } from '@deck.gl/core/typed';
import { useCallback, useContext } from 'react';
import flattenDeep from 'lodash.flattendeep';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/MultiBoxContext';
import { MULTI_BOX_MINERAL_OPTIONS } from '../../Constants';
import GlobalContext from '../../Context/GlobalContext';

export default function MainVisualization() {
  const { multiBoxProfile, maxWidth } = useContext(Context);
  const { elements, multiBoxViewState, updateMultiBoxViewState } =
    useContext(GlobalContext);

  const SPACING_BETWEEN_COLUMNS = 200;
  const navigate = useNavigate();
  const elementArr = [...elements];
  elementArr.unshift('profile');
  const elementLayer: any = flattenDeep(
    elementArr.map((el, i) =>
      multiBoxProfile.map(d =>
        el === 'profile'
          ? [
              new BitmapLayer({
                id: `BoxID_${d.id}_${el}_${i}`,
                image: `./imgs/Multibox/BoxID_${d.id}/profile.png`,
                opacity: 1,
                bounds: [
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) +
                    d.dimension[0] -
                    maxWidth / 2,
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
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) +
                    d.dimension[0] -
                    maxWidth / 2,
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
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
                  d.y_pos +
                    d.dimension[1] -
                    multiBoxProfile[0].dimension[1] / 2,
                  i * (maxWidth + SPACING_BETWEEN_COLUMNS) +
                    d.dimension[0] -
                    maxWidth / 2,
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
  const titleData = flattenDeep(
    elementArr.map((d, i) => {
      const topTick = multiBoxProfile.map(el => ({
        text: `${el.from}`,
        position: [
          i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
          el.y_pos - multiBoxProfile[0].dimension[1] / 2,
        ],
        color: [255, 255, 255],
        textAnchor: 'end',
        alignmentBaseline: 'top',
        pixelSize: 14,
      }));
      const bottomTick = multiBoxProfile.map(el => ({
        text: `${el.to}`,
        position: [
          i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
          el.y_pos - multiBoxProfile[0].dimension[1] / 2 + el.dimension[1],
        ],
        color: [255, 255, 255],
        textAnchor: 'end',
        alignmentBaseline: 'bottom',
        pixelSize: 14,
      }));
      return flattenDeep([
        topTick,
        bottomTick,
        {
          text:
            MULTI_BOX_MINERAL_OPTIONS.findIndex(el => el.value === d) === -1
              ? d
              : MULTI_BOX_MINERAL_OPTIONS[
                  MULTI_BOX_MINERAL_OPTIONS.findIndex(el => el.value === d)
                ].label,
          position: [
            i * (maxWidth + SPACING_BETWEEN_COLUMNS) - maxWidth / 2,
            0 - multiBoxProfile[0].dimension[1] / 2,
          ],
          color: [255, 255, 255],
          textAnchor: 'start',
          alignmentBaseline: 'bottom',
          pixelSize: 20,
        },
      ]);
    }),
  );
  elementLayer.push(
    new TextLayer({
      data: titleData,
      getText: d => d.text.toUpperCase(),
      getPosition: d => d.position,
      getColor: d => d.color,
      getTextAnchor: d => d.textAnchor,
      getAlignmentBaseline: d => d.alignmentBaseline,
      sizeScale: 1,
      getSize: d => d.pixelSize,
      visible: multiBoxViewState.zoom > -2.5,
    }),
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
  const onViewStateChange = useCallback((d: any) => {
    const { viewState } = d;
    updateMultiBoxViewState(viewState);
  }, []);
  return (
    <DeckGL
      views={views}
      initialViewState={multiBoxViewState}
      onViewStateChange={onViewStateChange}
      controller
      layers={elementLayer}
      useDevicePixels={false}
      id='multi-box-viz-container'
    />
  );
}
