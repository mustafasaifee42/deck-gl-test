import { scaleLinear } from 'd3-scale';
import { DataType, DataFormattedType } from '../Types';

export const FormatData = (
  data: DataType,
  thresholdValue: [number, number],
  colors: [string, string],
) => {
  const elementColorScale = scaleLinear<string, string>()
    .domain(thresholdValue)
    .range(colors);
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const formattedData: DataFormattedType[] = [];

  for (let i = 0; i < data.data.length; i += 2) {
    if (data.data[i + 1] > thresholdValue[0]) {
      const color =
        data.data[i + 1] > thresholdValue[1]
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
                (
                  elementColorScale(data.data[i + 1]).match(regex) as string[]
                )[1],
                10,
              ),
              parseInt(
                (
                  elementColorScale(data.data[i + 1]).match(regex) as string[]
                )[2],
                10,
              ),
              parseInt(
                (
                  elementColorScale(data.data[i + 1]).match(regex) as string[]
                )[3],
                10,
              ),
            ];

      formattedData.push({
        position: new Float32Array([
          ((data.data[i] % data.res_y) - data.res_y / 2) * 9,
          (Math.floor(data.data[i] / data.res_y) - data.res_x / 2) * 9,
        ]),
        value: new Float32Array([data.data[i + 1]]),
        color: new Float32Array(color),
      });
    }
  }

  return formattedData;
};
