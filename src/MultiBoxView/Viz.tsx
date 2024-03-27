import { useReducer, useMemo } from 'react';
import maxBy from 'lodash.maxby';
import MainMenu from './MainMenu';
import { MultiBoxMetaData, MultiBoxStateDataType } from '../Types';
import Reducer from './Context/Reducer';
import MultiBoxContext from './Context/MultiBoxContext';
import MainVisualization from './MainVisualization';

interface Props {
  boxMetaData: MultiBoxMetaData[];
}

export default function Viz(props: Props) {
  const { boxMetaData } = props;

  const initialState: MultiBoxStateDataType = {
    multiBoxProfile: boxMetaData,
    menuCollapsed: false,
    maxWidth: maxBy(boxMetaData, d => d.dimension[0])?.dimension[0] || 0,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateMenuCollapsed = (data: boolean) => {
    dispatch({
      type: 'UPDATE_MENU_COLLAPSED',
      payload: data,
    });
  };
  const contextValue = useMemo(
    () => ({
      ...state,
      updateMenuCollapsed,
    }),
    [state, updateMenuCollapsed],
  );
  return (
    <MultiBoxContext.Provider value={contextValue}>
      <MainMenu />
      <MainVisualization />
    </MultiBoxContext.Provider>
  );
}
