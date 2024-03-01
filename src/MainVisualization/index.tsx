/* eslint-disable react/jsx-no-useless-fragment */
import { useContext } from 'react';
import BoxViewsFourBoxes from './BoxViewsFourBoxes';
import Context from '../Context/Context';
import BoxViewsTwoBoxes from './BoxViewsTwoBoxes';
import BoxViewsOneBox from './BoxViewsOneBox';

export default function MainVisualization() {
  const { layout } = useContext(Context);
  return (
    <>
      {layout === 4 ? (
        <BoxViewsFourBoxes />
      ) : layout === 2 ? (
        <BoxViewsTwoBoxes />
      ) : (
        <BoxViewsOneBox />
      )}
    </>
  );
}
