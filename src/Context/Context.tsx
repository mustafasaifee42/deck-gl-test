import { createContext } from 'react';
import {
  BoxSettingsDataType,
  CtxDataType,
  MineralDataTypeForRender,
} from '../Types';

const Context = createContext<CtxDataType>({
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
  clickedIndex: -1,
  zoomLevel: 2,
  updateClickedIndex: (_d: number) => {},
  updateZoomLevel: (_d: number) => {},
  updateBoxOneMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxTwoMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxThreeMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxFourMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxOneSettings: (_d: BoxSettingsDataType) => {},
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => {},
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => {},
  updateBoxFourSettings: (_d: BoxSettingsDataType) => {},
});

export default Context;
