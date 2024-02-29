import { useReducer, useMemo } from 'react';
import MainMenu from './MainMenu';
import MainVisualization from './MainVisualization';
import {
  BoxSettingsDataType,
  MineralDataTypeForRender,
  StateDataType,
} from './Types';
import Context from './Context/Context';
import Reducer from './Context/Reducer';

export default function Viz() {
  const initialState: StateDataType = {
    clickedIndex: -1,
    zoomLevel: 2,
    boxOneMineralData: undefined,
    boxTwoMineralData: undefined,
    boxThreeMineralData: undefined,
    boxFourMineralData: undefined,
    boxOneSettings: {
      name: 'GreyScale',
      threshold: [0, 1],
    },
    boxTwoSettings: {
      name: 'Iron',
      threshold: [0, 1],
    },
    boxThreeSettings: {
      name: 'Copper',
      threshold: [0, 1],
    },
    boxFourSettings: {
      name: 'Aluminum',
      threshold: [0, 1],
    },
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateBoxOneMineralData = (data?: MineralDataTypeForRender) => {
    dispatch({
      type: 'UPDATE_BOX_ONE_MINERAL_DATA',
      payload: data,
    });
  };

  const updateBoxTwoMineralData = (data?: MineralDataTypeForRender) => {
    dispatch({
      type: 'UPDATE_BOX_TWO_MINERAL_DATA',
      payload: data,
    });
  };

  const updateBoxThreeMineralData = (data?: MineralDataTypeForRender) => {
    dispatch({
      type: 'UPDATE_BOX_THREE_MINERAL_DATA',
      payload: data,
    });
  };

  const updateBoxFourMineralData = (data?: MineralDataTypeForRender) => {
    dispatch({
      type: 'UPDATE_BOX_FOUR_MINERAL_DATA',
      payload: data,
    });
  };

  const updateBoxOneSettings = (data?: BoxSettingsDataType) => {
    dispatch({
      type: 'UPDATE_BOX_ONE_SETTINGS',
      payload: data,
    });
  };

  const updateBoxTwoSettings = (data?: BoxSettingsDataType) => {
    dispatch({
      type: 'UPDATE_BOX_TWO_SETTINGS',
      payload: data,
    });
  };

  const updateBoxThreeSettings = (data?: BoxSettingsDataType) => {
    dispatch({
      type: 'UPDATE_BOX_THREE_SETTINGS',
      payload: data,
    });
  };

  const updateBoxFourSettings = (data?: BoxSettingsDataType) => {
    dispatch({
      type: 'UPDATE_BOX_FOUR_SETTINGS',
      payload: data,
    });
  };

  const updateClickedIndex = (data?: number) => {
    dispatch({
      type: 'UPDATE_CLICKED_INDEX',
      payload: data,
    });
  };

  const updateZoomLevel = (data?: number) => {
    dispatch({
      type: 'UPDATE_ZOOM_LEVEL',
      payload: data,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      updateClickedIndex,
      updateBoxOneMineralData,
      updateBoxTwoMineralData,
      updateBoxThreeMineralData,
      updateBoxFourMineralData,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateBoxFourSettings,
      updateZoomLevel,
    }),
    [
      state,
      updateClickedIndex,
      updateBoxOneMineralData,
      updateBoxTwoMineralData,
      updateBoxThreeMineralData,
      updateBoxFourMineralData,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateBoxFourSettings,
      updateZoomLevel,
    ],
  );
  return (
    <Context.Provider value={contextValue}>
      <MainMenu />
      <MainVisualization />
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,1)',
          position: 'fixed',
          width: '100%',
          height: '2px',
          zIndex: '20',
          top: '50%',
          left: '0',
          margin: 0,
        }}
      />
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,1)',
          position: 'fixed',
          width: '2px',
          height: '100vh',
          zIndex: '20',
          left: '50%',
          top: '0',
          margin: 0,
        }}
      />
    </Context.Provider>
  );
}
