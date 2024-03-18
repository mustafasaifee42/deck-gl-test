import { useReducer, useMemo } from 'react';
import MainMenu from './MainMenu';
import MainVisualization from './MainVisualization';
import {
  BoxMetaDataType,
  BoxSettingsDataType,
  MineralDataTypeForRender,
  MouseOverDataType,
  StateDataType,
} from '../Types';
import Context from './Context/Context';
import Reducer from './Context/Reducer';
import Overlay from './Overlay';
import InfoBox from './InfoBox';

interface Props {
  boxMetaData: BoxMetaDataType;
}

export default function Viz(props: Props) {
  const { boxMetaData } = props;
  const initialState: StateDataType = {
    mouseOverData: undefined,
    zoomLevel: 2,
    stripOpacity: 1,
    boxOpacity: 1,
    boxMetaData,
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
    menuCollapsed: false,
    layout: 4,
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

  const updateMouseOverData = (data?: MouseOverDataType) => {
    dispatch({
      type: 'UPDATE_MOUSE_OVER_DATA',
      payload: data,
    });
  };

  const updateZoomLevel = (data?: number) => {
    dispatch({
      type: 'UPDATE_ZOOM_LEVEL',
      payload: data,
    });
  };

  const updateStripOpacity = (data?: number) => {
    dispatch({
      type: 'UPDATE_STRIP_OPACITY',
      payload: data,
    });
  };

  const updateBoxOpacity = (data?: number) => {
    dispatch({
      type: 'UPDATE_BOX_OPACITY',
      payload: data,
    });
  };

  const updateLayout = (data: number) => {
    dispatch({
      type: 'UPDATE_LAYOUT',
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
      updateMouseOverData,
      updateBoxOneMineralData,
      updateBoxTwoMineralData,
      updateBoxThreeMineralData,
      updateBoxFourMineralData,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateBoxFourSettings,
      updateZoomLevel,
      updateStripOpacity,
      updateBoxOpacity,
      updateMenuCollapsed,
      updateLayout,
    }),
    [
      state,
      updateMouseOverData,
      updateBoxOneMineralData,
      updateBoxTwoMineralData,
      updateBoxThreeMineralData,
      updateBoxFourMineralData,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateBoxFourSettings,
      updateZoomLevel,
      updateBoxOpacity,
      updateStripOpacity,
      updateMenuCollapsed,
      updateLayout,
    ],
  );
  return (
    <Context.Provider value={contextValue}>
      <MainMenu />
      <MainVisualization />
      <Overlay />
      <InfoBox />
    </Context.Provider>
  );
}
