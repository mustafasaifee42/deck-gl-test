export interface DataType {
  res_x: number;
  res_y: number;
  data: number[];
}

export interface DataFormattedType {
  position: Float32Array;
  color: Float32Array;
  value: Float32Array;
}

export interface MineralDataType {
  downSampledDataLevel1: DataType;
  downSampledDataLevel2: DataType;
  fullData: DataType;
}

export interface MineralDataTypeForRender {
  data: DataType;
  dataForRender: DataFormattedType[];
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
  boxOneMineralData?: MineralDataTypeForRender;
  boxTwoMineralData?: MineralDataTypeForRender;
  boxThreeMineralData?: MineralDataTypeForRender;
  boxFourMineralData?: MineralDataTypeForRender;
  boxOneSettings: BoxSettingsDataType;
  boxTwoSettings: BoxSettingsDataType;
  boxThreeSettings: BoxSettingsDataType;
  boxFourSettings: BoxSettingsDataType;
}

export interface CtxDataType extends StateDataType {
  updateZoomLevel: (_d: number) => void;
  updateClickedIndex: (_d: number) => void;
  updateBoxOneMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxTwoMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxThreeMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxFourMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxOneSettings: (_d: BoxSettingsDataType) => void;
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => void;
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => void;
  updateBoxFourSettings: (_d: BoxSettingsDataType) => void;
}
