export interface BoxMetaDataType {
  res_x: number;
  res_y: number;
  box_name: string;
  box_number: number;
}

export interface DataType {
  res_x: number;
  res_y: number;
  data: number[];
}

export interface DataFormattedType {
  position: [number, number];
  color: number[];
  value: number;
  arrayIndex: number;
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

export interface MouseOverDataType {
  index: number;
  position: [number, number];
  mouseX: number;
  mouseY: number;
}

export interface StateDataType {
  mouseOverData?: MouseOverDataType;
  zoomLevel: number;
  stripOpacity: number;
  boxOpacity: number;
  boxMetaData: BoxMetaDataType;
  boxOneMineralData?: MineralDataTypeForRender;
  boxTwoMineralData?: MineralDataTypeForRender;
  boxThreeMineralData?: MineralDataTypeForRender;
  boxFourMineralData?: MineralDataTypeForRender;
  boxOneSettings: BoxSettingsDataType;
  boxTwoSettings: BoxSettingsDataType;
  boxThreeSettings: BoxSettingsDataType;
  boxFourSettings: BoxSettingsDataType;
  menuCollapsed: boolean;
  layout: number;
}

export interface CtxDataType extends StateDataType {
  updateZoomLevel: (_d: number) => void;
  updateMouseOverData: (_d?: MouseOverDataType) => void;
  updateStripOpacity: (_d: number) => void;
  updateBoxOpacity: (_d: number) => void;
  updateLayout: (_d: number) => void;
  updateBoxOneMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxTwoMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxThreeMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxFourMineralData: (_d?: MineralDataTypeForRender) => void;
  updateBoxOneSettings: (_d: BoxSettingsDataType) => void;
  updateBoxTwoSettings: (_d: BoxSettingsDataType) => void;
  updateBoxThreeSettings: (_d: BoxSettingsDataType) => void;
  updateBoxFourSettings: (_d: BoxSettingsDataType) => void;
  updateMenuCollapsed: (_d: boolean) => void;
}
