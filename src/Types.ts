export interface DataType {
  res_x: number;
  res_y: number;
  data: number[];
}

export interface DataFormattedType {
  position: Float32Array;
  color: Float32Array;
  value: Float32Array;
  type: 'pointCloud' | 'mineral';
}

export interface MineralDataType {
  downSampledDataLevel1: DataType;
  downSampledDataLevel2: DataType;
  fullData: DataType;
}

export interface MineralDataTypeForRender {
  downSampledDataLevel1: DataFormattedType[];
  downSampledDataLevel2: DataFormattedType[];
  fullData: DataFormattedType[];
}

export interface BoxSettingsDataType {
  name: string;
  threshold: [number, number];
}

export interface MineralSettingsDataType {
  name: string;
  threshold: [number, number];
}

export interface StateDataType {
  clickedIndex: number;
  zoomLevel: number;
  greyScaleData: MineralDataType;
  greyScaleDataForRender: MineralDataTypeForRender;
  boxOneMineralDataForRender?: MineralDataTypeForRender;
  boxTwoMineralDataForRender?: MineralDataTypeForRender;
  boxThreeMineralDataForRender?: MineralDataTypeForRender;
  boxOneSettings: BoxSettingsDataType;
  boxTwoSettings: BoxSettingsDataType;
  boxThreeSettings: BoxSettingsDataType;
}

export interface CtxDataType extends StateDataType {
  updateZoomLevel: (_d: number) => void;
  updateClickedIndex: (_d: number) => void;
  updateGreyScaleData: (_d: MineralDataType) => void;
  updateGreyScaleDataForRender: (_d: MineralDataTypeForRender) => void;
  updateBoxOneMineralDataForRender: (_d: MineralDataTypeForRender) => void;
  updateBoxTwoMineralDataForRender: (_d: MineralDataTypeForRender) => void;
  updateBoxThreeMineralDataForRender: (_d: MineralDataTypeForRender) => void;
  updateBoxOneSettings: (_d: BoxSettingsDataType) => void;
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => void;
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => void;
}
