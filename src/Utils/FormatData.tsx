import { scaleLinear } from 'd3-scale';
import { DataType, DataFormattedType } from '../Types';

export const FormatData = (
  greyScaleData: DataType,
  thresholdValue: [number, number],
  colors: [string, string],
  gridSize?: number,
  data?: DataType,
) => {
  const greyScaleColorScale = scaleLinear().domain([0, 1]).range([20, 245]);
  const dataToBeUsed = data || greyScaleData;
  if (!data)
    return greyScaleData.data.map((d, i) => ({
      position: new Float32Array([
        ((i % dataToBeUsed.res_y) - dataToBeUsed.res_x / 2) * (gridSize || 0.1),
        (Math.floor(i / dataToBeUsed.res_y) - dataToBeUsed.res_x / 2) *
          (gridSize || 0.1),
      ]),
      value: new Float32Array([d]),
      color: new Float32Array([
        greyScaleColorScale(d),
        greyScaleColorScale(d),
        greyScaleColorScale(d),
      ]),
      type: 'pointCloud',
    }));
  const elementColorScale = scaleLinear<string, string>()
    .domain(thresholdValue)
    .range(colors);
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const formattedData: DataFormattedType[] = [];

  const greyScaleColorScaleCache = greyScaleData.data.map(value =>
    greyScaleColorScale(value),
  );

  dataToBeUsed.data.forEach((d, i) => {
    const greyScaleValue = greyScaleColorScaleCache[i];
    const color =
      d < thresholdValue[0]
        ? [greyScaleValue, greyScaleValue, greyScaleValue]
        : d > thresholdValue[1]
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
            parseInt((elementColorScale(d).match(regex) as string[])[1], 10),
            parseInt((elementColorScale(d).match(regex) as string[])[2], 10),
            parseInt((elementColorScale(d).match(regex) as string[])[3], 10),
          ];

    formattedData.push({
      position: new Float32Array([
        ((i % dataToBeUsed.res_y) - dataToBeUsed.res_x / 2) * (gridSize || 0.1),
        (Math.floor(i / dataToBeUsed.res_y) - dataToBeUsed.res_x / 2) *
          (gridSize || 0.1),
      ]),
      value: new Float32Array([d]),
      color: new Float32Array(color),
      type: d === -1 ? 'pointCloud' : 'mineral',
    });
  });

  return formattedData;
};
