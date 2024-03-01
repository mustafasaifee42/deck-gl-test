import { scaleLinear } from 'd3-scale';
import { DataType, DataFormattedType } from '../Types';
import { COLOR_10, SCALING_FACTOR } from '../Constants';

export const FormatData = (
  data: DataType,
  thresholdValue: [number, number],
  colors: [string, string],
  mineralIndex?: string[],
) => {
  const elementColorScale = scaleLinear<string, string>()
    .domain(thresholdValue)
    .range(colors);
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const formattedData: DataFormattedType[] = [];
  for (let i = 0; i < data.data.length; i += 2) {
    if (data.data[i + 1] > thresholdValue[0]) {
      const color = mineralIndex
        ? [
            parseInt(
              (COLOR_10[data.data[i + 1] % 10].match(regex) as string[])[1],
              10,
            ),
            parseInt(
              (COLOR_10[data.data[i + 1] % 10].match(regex) as string[])[2],
              10,
            ),
            parseInt(
              (COLOR_10[data.data[i + 1] % 10].match(regex) as string[])[3],
              10,
            ),
          ]
        : data.data[i + 1] > thresholdValue[1]
        ? [
            parseInt(
              (
                elementColorScale(thresholdValue[1]).match(regex) as string[]
              )[1],
              10,
            ),
            parseInt(
              (
                elementColorScale(thresholdValue[1]).match(regex) as string[]
              )[2],
              10,
            ),
            parseInt(
              (
                elementColorScale(thresholdValue[1]).match(regex) as string[]
              )[3],
              10,
            ),
          ]
        : [
            parseInt(
              (elementColorScale(data.data[i + 1]).match(regex) as string[])[1],
              10,
            ),
            parseInt(
              (elementColorScale(data.data[i + 1]).match(regex) as string[])[2],
              10,
            ),
            parseInt(
              (elementColorScale(data.data[i + 1]).match(regex) as string[])[3],
              10,
            ),
          ];

      formattedData.push({
        position: [
          ((data.data[i] % data.res_y) - data.res_y / 2) * SCALING_FACTOR,
          (Math.floor(data.data[i] / data.res_y) - data.res_x / 2) *
            SCALING_FACTOR,
        ],
        value: mineralIndex ? mineralIndex[data.data[i + 1]] : data.data[i + 1],
        color,
        arrayIndex: data.data[i],
      });
    }
  }

  return formattedData;
};
