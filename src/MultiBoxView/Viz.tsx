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
    elements: [],
    multiBoxProfile: boxMetaData,
    menuCollapsed: false,
    maxWidth: maxBy(boxMetaData, d => d.dimension[0])?.dimension[0] || 0,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateElements = (data?: string[]) => {
    dispatch({
      type: 'UPDATE_ELEMENTS',
      payload: data,
    });
  };

  const updateMenuCollapsed = (data: boolean) => {
    dispatch({
      type: 'UPDATE_MENU_COLLAPSED',
      payload: data,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      updateElements,
      updateMenuCollapsed,
    }),
    [state, updateElements, updateMenuCollapsed],
  );
  return (
    <MultiBoxContext.Provider value={contextValue}>
      <MainMenu />
      <MainVisualization />
    </MultiBoxContext.Provider>
  );
}
