import { Route, Routes } from 'react-router-dom';
import { useMemo, useReducer } from 'react';
import SingleBoxView from './SingleBoxView';
import MultiBoxView from './MultiBoxView';
import Reducer from './Context/Reducer';
import { DeckGLStateDataType, GlobalStateDataType } from './Types';
import GlobalContext from './Context/GlobalContext';

export default function App() {
  const initialState: GlobalStateDataType = {
    elements: [],
    multiBoxViewState: {
      target: [0, 0],
      zoom: -1,
    },
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateElements = (data: string[]) => {
    dispatch({
      type: 'UPDATE_ELEMENTS',
      payload: data,
    });
  };

  const updateMultiBoxViewState = (data: DeckGLStateDataType) => {
    dispatch({
      type: 'UPDATE_MULTI_BOX_VIEW_STATE',
      payload: data,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      updateElements,
      updateMultiBoxViewState,
    }),
    [state, updateElements, updateMultiBoxViewState],
  );
  return (
    <div
      style={{
        backgroundColor: '#191933',
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      <GlobalContext.Provider value={contextValue}>
        <Routes>
          <Route path='/' element={<MultiBoxView />} />
          <Route path='/multi-box' element={<MultiBoxView />} />
          <Route path='/single-box/:id' element={<SingleBoxView />} />
        </Routes>
      </GlobalContext.Provider>
    </div>
  );
}
