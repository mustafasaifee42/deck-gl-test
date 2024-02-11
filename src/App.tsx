import { useEffect, useState } from 'react';
import { Select, Slider, Spin } from 'antd';
import { scaleLinear } from 'd3-scale';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { Plus, X } from 'lucide-react';
import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';
import { DataFormattedType, DataType, MineralDataType } from './Types';
import BoxView from './BoxView';

const FORMAT_DATA = (
  data: DataType,
  grayScaleData: DataType,
  thresholdValue: number,
  colors: [string, string],
  gridSize?: number,
) => {
  const grayScaleColorScale = scaleLinear().domain([0, 1]).range([20, 245]);
  const elementColorScale = scaleLinear<string, string>()
    .domain([0, thresholdValue])
    .range(colors);
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const formattedData: DataFormattedType[] = [];

  const grayScaleColorScaleCache = grayScaleData.data.map(value =>
    grayScaleColorScale(value),
  );
  const thresholdColor = elementColorScale(thresholdValue);
  const thresholdColorMatches = thresholdColor.match(regex) as string[];

  data.data.forEach((d, i) => {
    const grayScaleValue = grayScaleColorScaleCache[i];
    const color =
      d === -1 || colors[0] === '#212121'
        ? [grayScaleValue, grayScaleValue, grayScaleValue]
        : d > thresholdValue
        ? [
            parseInt(thresholdColorMatches[1], 10),
            parseInt(thresholdColorMatches[2], 10),
            parseInt(thresholdColorMatches[3], 10),
          ]
        : [
            parseInt((elementColorScale(d).match(regex) as string[])[1], 10),
            parseInt((elementColorScale(d).match(regex) as string[])[2], 10),
            parseInt((elementColorScale(d).match(regex) as string[])[3], 10),
          ];

    formattedData.push({
      position: new Float32Array([
        ((i % data.res_y) - data.res_x / 2) * (gridSize || 0.1),
        (Math.floor(i / data.res_y) - data.res_x / 2) * (gridSize || 0.1),
      ]),
      value: new Float32Array([d]),
      color: new Float32Array(color),
      type: d === -1 ? 'pointCloud' : 'mineral',
    });
  });

  return formattedData;
};

const downsampleArray = (array2D: number[][], blockSize: number) => {
  const downsampledArray = [];
  const numRows = Math.floor(array2D.length / blockSize);
  const numCols = Math.floor(array2D[0].length / blockSize);

  for (let i = 0; i < numRows; i += 1) {
    const rowStart = i * blockSize;
    const rowEnd = rowStart + blockSize;

    for (let j = 0; j < numCols; j += 1) {
      const colStart = j * blockSize;
      const colEnd = colStart + blockSize;

      let sum = 0;
      for (let x = rowStart; x < rowEnd; x += 1) {
        for (let y = colStart; y < colEnd; y += 1) {
          sum += array2D[x][y];
        }
      }
      const average = sum / (blockSize * blockSize);
      downsampledArray.push(average);
    }
  }
  return chunk(downsampledArray, numCols);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COLOR_SCALES: any = {
  GrayScale: ['#212121', '#F1F1F1'],
  Aluminum: ['#eff3ff', '#08519c'],
  Copper: ['#edf8e9', '#006d2c'],
  Iron: ['#feedde', '#a63603'],
};

export default function App() {
  const [openMenu1, setOpenMenu1] = useState(true);
  const [openMenu2, setOpenMenu2] = useState(true);
  const [openMenu3, setOpenMenu3] = useState(true);
  const [grayScaleDataFromFile, setGrayScaleDataFromFile] = useState<
    DataType | undefined
  >(undefined);
  const [grayScaleDataDownSampled, setGrayScaleDataDownSampled] = useState<
    DataType | undefined
  >(undefined);
  const [mineral1DataFromFile, setMineral1DataFromFile] = useState<
    DataType | undefined
  >(undefined);
  const [mineral2DataFromFile, setMineral2DataFromFile] = useState<
    DataType | undefined
  >(undefined);
  const [mineral3DataFromFile, setMineral3DataFromFile] = useState<
    DataType | undefined
  >(undefined);
  const [grayScaleData, setGrayScaleData] = useState<
    MineralDataType | undefined
  >(undefined);
  const [mineral1Data, setMineral1Data] = useState<MineralDataType | undefined>(
    undefined,
  );
  const [mineral2Data, setMineral2Data] = useState<MineralDataType | undefined>(
    undefined,
  );
  const [mineral3Data, setMineral3Data] = useState<MineralDataType | undefined>(
    undefined,
  );
  const [mineral1Settings, setMineral1Settings] = useState({
    name: 'GrayScale',
    threshold: 1,
  });
  const [mineral2Settings, setMineral2Settings] = useState({
    name: 'Copper',
    threshold: 1,
  });
  const [mineral3Settings, setMineral3Settings] = useState({
    name: 'Iron',
    threshold: 1,
  });
  const grayScaleColorScale = scaleLinear().domain([0, 1]).range([20, 245]);
  useEffect(() => {
    queue()
      .defer(json, './data/GrayScale.json')
      .defer(json, `./data/${mineral1Settings.name}.json`)
      .defer(json, `./data/${mineral2Settings.name}.json`)
      .defer(json, `./data/${mineral3Settings.name}.json`)
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          grayScale: DataType,
          mineral_1: DataType,
          mineral_2: DataType,
          mineral_3: DataType,
        ) => {
          if (err) throw err;
          const grayScaleDataFormatted: DataFormattedType[] =
            grayScale.data.map((d, i) => ({
              position: new Float32Array([
                ((i % grayScale.res_y) - grayScale.res_x / 2) * 0.1,
                (Math.floor(i / grayScale.res_y) - grayScale.res_y / 2) * 0.1,
              ]),
              value: new Float32Array([d]),
              color: new Float32Array([
                grayScaleColorScale(d),
                grayScaleColorScale(d),
                grayScaleColorScale(d),
              ]),
              type: 'pointCloud',
            }));
          const downSampledData: DataType = {
            res_x: Math.floor(grayScale.res_x / 2),
            res_y: Math.floor(grayScale.res_y / 2),
            data: flatten(
              downsampleArray(chunk(grayScale.data, grayScale.res_y), 2),
            ),
          };
          const grayScaleDataDownSampledFormatted: DataFormattedType[] =
            downSampledData.data.map((d, i) => ({
              position: new Float32Array([
                ((i % downSampledData.res_y) - downSampledData.res_x / 2) * 0.1,
                (Math.floor(i / downSampledData.res_y) -
                  downSampledData.res_y / 2) *
                  0.1,
              ]),
              value: new Float32Array([d]),
              color: new Float32Array([
                grayScaleColorScale(d),
                grayScaleColorScale(d),
                grayScaleColorScale(d),
              ]),
              type: 'pointCloud',
            }));
          setGrayScaleData({
            downSampledData: grayScaleDataDownSampledFormatted,
            fullData: grayScaleDataFormatted,
          });
          setGrayScaleDataFromFile(grayScale);
          setGrayScaleDataDownSampled(downSampledData);
          setMineral1DataFromFile(mineral_1);
          setMineral2DataFromFile(mineral_2);
          setMineral3DataFromFile(mineral_3);
        },
      );
  }, []);

  useEffect(() => {
    if (
      mineral1DataFromFile &&
      grayScaleDataFromFile &&
      grayScaleDataDownSampled
    ) {
      const downSampledData: DataType = {
        res_x: Math.floor(mineral1DataFromFile.res_x / 2),
        res_y: Math.floor(mineral1DataFromFile.res_y / 2),
        data: flatten(
          downsampleArray(
            chunk(mineral1DataFromFile.data, mineral1DataFromFile.res_y),
            2,
          ),
        ),
      };
      setMineral1Data({
        downSampledData: FORMAT_DATA(
          downSampledData,
          grayScaleDataDownSampled,
          mineral1Settings.threshold,
          COLOR_SCALES[mineral1Settings.name],
          0.2,
        ),
        fullData: FORMAT_DATA(
          mineral1DataFromFile,
          grayScaleDataFromFile,
          mineral1Settings.threshold,
          COLOR_SCALES[mineral1Settings.name],
        ),
      });
    }
  }, [mineral1Settings.threshold, mineral1DataFromFile]);

  useEffect(() => {
    if (
      mineral2DataFromFile &&
      grayScaleDataFromFile &&
      grayScaleDataDownSampled
    ) {
      const downSampledData: DataType = {
        res_x: Math.floor(mineral2DataFromFile.res_x / 2),
        res_y: Math.floor(mineral2DataFromFile.res_y / 2),
        data: flatten(
          downsampleArray(
            chunk(mineral2DataFromFile.data, mineral2DataFromFile.res_y),
            2,
          ),
        ),
      };
      setMineral2Data({
        downSampledData: FORMAT_DATA(
          downSampledData,
          grayScaleDataDownSampled,
          mineral2Settings.threshold,
          COLOR_SCALES[mineral2Settings.name],
          0.2,
        ),
        fullData: FORMAT_DATA(
          mineral2DataFromFile,
          grayScaleDataFromFile,
          mineral2Settings.threshold,
          COLOR_SCALES[mineral2Settings.name],
        ),
      });
    }
  }, [mineral2Settings.threshold, mineral2DataFromFile]);

  useEffect(() => {
    if (
      mineral3DataFromFile &&
      grayScaleDataFromFile &&
      grayScaleDataDownSampled
    ) {
      const downSampledData: DataType = {
        res_x: Math.floor(mineral3DataFromFile.res_x / 2),
        res_y: Math.floor(mineral3DataFromFile.res_y / 2),
        data: flatten(
          downsampleArray(
            chunk(mineral3DataFromFile.data, mineral3DataFromFile.res_y),
            2,
          ),
        ),
      };
      setMineral3Data({
        downSampledData: FORMAT_DATA(
          downSampledData,
          grayScaleDataDownSampled,
          mineral3Settings.threshold,
          COLOR_SCALES[mineral3Settings.name],
          0.2,
        ),
        fullData: FORMAT_DATA(
          mineral3DataFromFile,
          grayScaleDataFromFile,
          mineral3Settings.threshold,
          COLOR_SCALES[mineral3Settings.name],
        ),
      });
    }
  }, [mineral3Settings.threshold, mineral3DataFromFile]);

  useEffect(() => {
    queue()
      .defer(json, `./data/${mineral1Settings.name}.json`)
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          mineral: DataType,
        ) => {
          if (err) throw err;
          setMineral1DataFromFile(mineral);
        },
      );
  }, [mineral1Settings.name]);

  useEffect(() => {
    queue()
      .defer(json, `./data/${mineral2Settings.name}.json`)
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          mineral: DataType,
        ) => {
          if (err) throw err;
          setMineral2DataFromFile(mineral);
        },
      );
  }, [mineral2Settings.name]);

  useEffect(() => {
    queue()
      .defer(json, `./data/${mineral3Settings.name}.json`)
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          mineral: DataType,
        ) => {
          if (err) throw err;
          setMineral3DataFromFile(mineral);
        },
      );
  }, [mineral3Settings.name]);

  return (
    <div
      style={{
        backgroundColor: '#1D2223',
        width: '100vw',
        height: '100vh',
      }}
    >
      {grayScaleData && mineral1Data && mineral2Data && mineral3Data ? (
        <>
          <div
            style={{
              position: 'fixed',
              zIndex: 10,
              width: '280px',
              maxHeight: 'calc(33.33vh - 48px)',
              top: '0',
              marginTop: '24px',
              left: '24px',
              backgroundColor: 'rgba(255, 255, 2255, 0.95)',
              color: '#1D2223',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h5
                  style={{
                    fontWeight: '700',
                    fontSize: '1rem',
                    margin: '0',
                  }}
                >
                  Settings
                </h5>
                {openMenu1 ? (
                  <X
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu1(false);
                    }}
                  />
                ) : (
                  <Plus
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu1(true);
                    }}
                  />
                )}
              </div>
              {openMenu1 ? (
                <>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Select element or mineral
                    </p>
                    <Select
                      style={{ width: '100%' }}
                      defaultValue={mineral1Settings.name}
                      options={[
                        { value: 'GrayScale', label: 'GrayScale' },
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral1Settings({
                          ...mineral1Settings,
                          name: d || 'GrayScale',
                        });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Color Threshold ({mineral1Settings.threshold})
                    </p>
                    <Slider
                      min={0}
                      max={1}
                      defaultValue={1}
                      step={0.01}
                      onChangeComplete={d => {
                        setMineral1Settings({
                          ...mineral1Settings,
                          threshold: d,
                        });
                      }}
                      disabled={mineral1Settings.name === 'GrayScale'}
                      styles={{
                        track: {
                          background: 'transparent',
                        },
                        tracks: { background: '#2367DF' },
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div
            style={{
              position: 'fixed',
              zIndex: 10,
              width: '280px',
              maxHeight: 'calc(33.33vh - 48px)',
              top: '33.33%',
              marginTop: '24px',
              left: '24px',
              backgroundColor: 'rgba(255, 255, 2255, 0.95)',
              color: '#1D2223',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h5
                  style={{
                    fontWeight: '700',
                    fontSize: '1rem',
                    margin: '0',
                  }}
                >
                  Settings
                </h5>
                {openMenu2 ? (
                  <X
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu2(false);
                    }}
                  />
                ) : (
                  <Plus
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu2(true);
                    }}
                  />
                )}
              </div>
              {openMenu2 ? (
                <>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Select element or mineral
                    </p>
                    <Select
                      style={{ width: '100%' }}
                      defaultValue={mineral2Settings.name}
                      options={[
                        { value: 'GrayScale', label: 'GrayScale' },
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral2Settings({
                          ...mineral2Settings,
                          name: d || 'GrayScale',
                        });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Color Threshold ({mineral2Settings.threshold})
                    </p>
                    <Slider
                      min={0}
                      max={1}
                      defaultValue={1}
                      step={0.01}
                      onChangeComplete={d => {
                        setMineral2Settings({
                          ...mineral2Settings,
                          threshold: d,
                        });
                      }}
                      disabled={mineral2Settings.name === 'GrayScale'}
                      styles={{
                        track: {
                          background: 'transparent',
                        },
                        tracks: { background: '#2367DF' },
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div
            style={{
              position: 'fixed',
              zIndex: 10,
              width: '280px',
              maxHeight: 'calc(33.33vh - 48px)',
              top: '66.66%',
              marginTop: '24px',
              left: '24px',
              backgroundColor: 'rgba(255, 255, 2255, 0.95)',
              color: '#1D2223',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h5
                  style={{
                    fontWeight: '700',
                    fontSize: '1rem',
                    margin: '0',
                  }}
                >
                  Settings
                </h5>
                {openMenu3 ? (
                  <X
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu3(false);
                    }}
                  />
                ) : (
                  <Plus
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu3(true);
                    }}
                  />
                )}
              </div>
              {openMenu3 ? (
                <>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Select element or mineral
                    </p>
                    <Select
                      style={{ width: '100%' }}
                      defaultValue={mineral3Settings.name}
                      options={[
                        { value: 'GrayScale', label: 'GrayScale' },
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral3Settings({
                          ...mineral3Settings,
                          name: d || 'GrayScale',
                        });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#1D2223',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Color Threshold ({mineral3Settings.threshold})
                    </p>
                    <Slider
                      min={0}
                      max={1}
                      defaultValue={1}
                      step={0.01}
                      onChangeComplete={d => {
                        setMineral3Settings({
                          ...mineral3Settings,
                          threshold: d,
                        });
                      }}
                      disabled={mineral3Settings.name === 'GrayScale'}
                      styles={{
                        track: {
                          background: 'transparent',
                        },
                        tracks: { background: '#2367DF' },
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '33.33%',
              top: 0,
              left: 0,
              position: 'fixed',
              backgroundColor: 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              width: '100%',
              height: '33.33%',
              bottom: 0,
              left: 0,
              position: 'fixed',
              backgroundColor: 'transparent',
              borderTop: '1px solid rgba(255,255,255,0.25)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
          <BoxView mineralData={[mineral1Data, mineral2Data, mineral3Data]} />
        </>
      ) : (
        <Spin tip='Loading' size='large' />
      )}
    </div>
  );
}
