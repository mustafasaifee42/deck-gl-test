import { MineralDataTypeForRender } from '../Types';
import { FormatData } from './FormatData';

export const UpdateThreshold: (
  data: MineralDataTypeForRender,
  thresholdValue: [number, number],
  colors: [string, string],
) => MineralDataTypeForRender = (
  data: MineralDataTypeForRender,
  thresholdValue: [number, number],
  colors: [string, string],
) => {
  return {
    data: data.data,
    dataForRender: FormatData(
      data.data,
      thresholdValue,
      colors,
      data.data.mineral_class_index,
    ),
  };
};
