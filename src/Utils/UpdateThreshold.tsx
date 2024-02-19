import { scaleLinear } from 'd3-scale';
import { MineralDataTypeForRender } from '../Types';

export const UpdateThreshold: (
  data: MineralDataTypeForRender,
  greyScaleData: MineralDataTypeForRender,
  thresholdValue: [number, number],
  colors: [string, string],
) => MineralDataTypeForRender = (
  data: MineralDataTypeForRender,
  greyScaleData: MineralDataTypeForRender,
  thresholdValue: [number, number],
  colors: [string, string],
) => {
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const elementColorScale = scaleLinear<string, string>()
    .domain(thresholdValue)
    .range(colors);
  const fullData = data.fullData.map((d, i) => ({
    ...d,
    color:
      d.value[0] < thresholdValue[0]
        ? greyScaleData.fullData[i].color
        : d.value[0] > thresholdValue[1]
        ? new Float32Array([
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
          ])
        : new Float32Array([
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[1],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[2],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[3],
              10,
            ),
          ]),
  }));
  const downSampledDataLevel1 = data.downSampledDataLevel1.map((d, i) => ({
    ...d,
    color:
      d.value[0] < thresholdValue[0]
        ? greyScaleData.downSampledDataLevel1[i].color
        : d.value[0] > thresholdValue[1]
        ? new Float32Array([
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
          ])
        : new Float32Array([
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[1],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[2],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[3],
              10,
            ),
          ]),
  }));
  const downSampledDataLevel2 = data.downSampledDataLevel2.map((d, i) => ({
    ...d,
    color:
      d.value[0] < thresholdValue[0]
        ? greyScaleData.downSampledDataLevel2[i].color
        : d.value[0] > thresholdValue[1]
        ? new Float32Array([
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
          ])
        : new Float32Array([
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[1],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[2],
              10,
            ),
            parseInt(
              (elementColorScale(d.value[0]).match(regex) as string[])[3],
              10,
            ),
          ]),
  }));
  return {
    fullData,
    downSampledDataLevel1,
    downSampledDataLevel2,
  };
};
