import { createContext } from 'react';
import {
  BoxSettingsDataType,
  CtxDataType,
  MineralDataType,
  MineralDataTypeForRender,
} from '../Types';

const Context = createContext<CtxDataType>({
  greyScaleData: {
    downSampledDataLevel1: {
      res_x: 0,
      res_y: 0,
      data: [],
    },
    downSampledDataLevel2: {
      res_x: 0,
      res_y: 0,
      data: [],
    },
    fullData: {
      res_x: 0,
      res_y: 0,
      data: [],
    },
  },
  greyScaleDataForRender: {
    downSampledDataLevel1: [],
    downSampledDataLevel2: [],
    fullData: [],
  },
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
  clickedIndex: -1,
  zoomLevel: 2,
  updateClickedIndex: (_d: number) => {},
  updateZoomLevel: (_d: number) => {},
  updateGreyScaleData: (_d: MineralDataType) => {},
  updateGreyScaleDataForRender: (_d: MineralDataTypeForRender) => {},
  updateBoxOneMineralDataForRender: (_d: MineralDataTypeForRender) => {},
  updateBoxTwoMineralDataForRender: (_d: MineralDataTypeForRender) => {},
  updateBoxThreeMineralDataForRender: (_d: MineralDataTypeForRender) => {},
  updateBoxOneSettings: (_d: BoxSettingsDataType) => {},
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => {},
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => {},
});

export default Context;
