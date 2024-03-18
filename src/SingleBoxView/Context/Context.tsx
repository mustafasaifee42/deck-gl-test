import { createContext } from 'react';
import {
  BoxSettingsDataType,
  CtxDataType,
  MineralDataTypeForRender,
  MouseOverDataType,
} from '../../Types';

const Context = createContext<CtxDataType>({
  boxOneMineralData: undefined,
  boxTwoMineralData: undefined,
  boxThreeMineralData: undefined,
  boxFourMineralData: undefined,
  stripOpacity: 1,
  boxOpacity: 1,
  menuCollapsed: false,
  boxMetaData: {
    res_x: 0,
    res_y: 0,
    box_name: '',
    box_number: 0,
  },
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
  mouseOverData: undefined,
  zoomLevel: 1,
  layout: 4,
  updateMouseOverData: (_d?: MouseOverDataType) => {},
  updateZoomLevel: (_d: number) => {},
  updateStripOpacity: (_d: number) => {},
  updateBoxOpacity: (_d: number) => {},
  updateMenuCollapsed: (_d: boolean) => {},
  updateBoxOneMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxTwoMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxThreeMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxFourMineralData: (_d?: MineralDataTypeForRender) => {},
  updateBoxOneSettings: (_d: BoxSettingsDataType) => {},
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => {},
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => {},
  updateBoxFourSettings: (_d: BoxSettingsDataType) => {},
  updateLayout: (_d: number) => {},
});

export default Context;
