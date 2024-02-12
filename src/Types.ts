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
  downSampledDataLevel1: DataFormattedType[];
  downSampledDataLevel2: DataFormattedType[];
  fullData: DataFormattedType[];
}

export interface MineralSettingsDataType {
  name: string;
  threshold: [number, number];
}
