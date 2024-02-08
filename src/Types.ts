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
