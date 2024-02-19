import { useReducer, useMemo } from 'react';
import MainMenu from './MainMenu';
import MainVisualization from './MainVisualization';
import {
  BoxSettingsDataType,
  MineralDataType,
  MineralDataTypeForRender,
  StateDataType,
} from './Types';
import Context from './Context/Context';
import Reducer from './Context/Reducer';

interface Props {
  greyScaleData: MineralDataType;
  greyScaleDataForRender: MineralDataTypeForRender;
}

export default function Viz(props: Props) {
  const { greyScaleData, greyScaleDataForRender } = props;
  const initialState: StateDataType = {
    greyScaleData,
    greyScaleDataForRender,
    boxOneMineralDataForRender: undefined,
    boxTwoMineralDataForRender: undefined,
    boxThreeMineralDataForRender: undefined,
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
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGreyScaleData = (data?: MineralDataType) => {
    dispatch({
      type: 'UPDATE_GREY_SCALE_DATA',
      payload: data,
    });
  };

  const updateGreyScaleDataForRender = (data?: MineralDataTypeForRender) => {
    dispatch({
      type: 'UPDATE_GREY_SCALE_DATA',
      payload: data,
    });
  };

  const updateBoxOneMineralDataForRender = (
    data?: MineralDataTypeForRender,
  ) => {
    dispatch({
      type: 'UPDATE_BOX_ONE_MINERAL_DATA_FOR_RENDER',
      payload: data,
    });
  };

  const updateBoxTwoMineralDataForRender = (
    data?: MineralDataTypeForRender,
  ) => {
    dispatch({
      type: 'UPDATE_BOX_TWO_MINERAL_DATA_FOR_RENDER',
      payload: data,
    });
  };

  const updateBoxThreeMineralDataForRender = (
    data?: MineralDataTypeForRender,
  ) => {
    dispatch({
      type: 'UPDATE_BOX_THREE_MINERAL_DATA_FOR_RENDER',
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

  const contextValue = useMemo(
    () => ({
      ...state,
      updateBoxOneMineralDataForRender,
      updateBoxTwoMineralDataForRender,
      updateBoxThreeMineralDataForRender,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateGreyScaleData,
      updateGreyScaleDataForRender,
    }),
    [
      state,
      updateBoxOneMineralDataForRender,
      updateBoxTwoMineralDataForRender,
      updateBoxThreeMineralDataForRender,
      updateBoxOneSettings,
      updateBoxTwoSettings,
      updateBoxThreeSettings,
      updateGreyScaleData,
      updateGreyScaleDataForRender,
    ],
  );
  return (
    <Context.Provider value={contextValue}>
      <MainMenu />
      <MainVisualization />
    </Context.Provider>
  );
}
