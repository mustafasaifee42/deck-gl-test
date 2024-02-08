import { useEffect, useState } from 'react';
import { Select, Slider, Spin } from 'antd';
import { scaleLinear } from 'd3-scale';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { Plus, X } from 'lucide-react';
import { DataFormattedType, DataType } from './Types';
import BoxView from './BoxView';

const FORMAT_DATA = (
  data: DataType,
  grayScaleData: DataType,
  thresholdValue: number,
  colors: [string, string],
) => {
  const grayScaleColorScale = scaleLinear().domain([0, 1]).range([20, 245]);
  const elementColorScale = scaleLinear<string, string>()
    .domain([0, thresholdValue])
    .range(colors);
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const formattedData: DataFormattedType[] = data.data.map((d, i) => ({
    position: new Float32Array([
      ((i % grayScaleData.res_y) - grayScaleData.res_x / 2) * 0.1,
      (Math.floor(i / grayScaleData.res_y) - grayScaleData.res_y / 2) * 0.1,
    ]),
    value: new Float32Array([d]),
    color:
      d === -1
        ? new Float32Array([
            grayScaleColorScale(grayScaleData.data[i]),
            grayScaleColorScale(grayScaleData.data[i]),
            grayScaleColorScale(grayScaleData.data[i]),
          ])
        : d > thresholdValue
        ? new Float32Array([
            parseInt(
              (
                elementColorScale(thresholdValue).match(regex) as string[]
              )[1] as string,
              10,
            ),
            parseInt(
              (
                elementColorScale(thresholdValue).match(regex) as string[]
              )[2] as string,
              10,
            ),
            parseInt(
              (
                elementColorScale(thresholdValue).match(regex) as string[]
              )[3] as string,
              10,
            ),
          ])
        : new Float32Array([
            parseInt(
              (elementColorScale(d).match(regex) as string[])[1] as string,
              10,
            ),
            parseInt(
              (elementColorScale(d).match(regex) as string[])[2] as string,
              10,
            ),
            parseInt(
              (elementColorScale(d).match(regex) as string[])[3] as string,
              10,
            ),
          ]),
    type: d === -1 ? 'pointCloud' : 'mineral',
  }));
  return formattedData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COLOR_SCALES: any = {
  Aluminum: ['#eff3ff', '#08519c'],
  Copper: ['#edf8e9', '#006d2c'],
  Iron: ['#feedde', '#a63603'],
};

export default function App() {
  const [openMenu, setOpenMenu] = useState(true);
  const [grayScaleData, setGrayScaleData] = useState<
    DataFormattedType[] | undefined
  >(undefined);
  const [grayScaleDataFromFile, setGrayScaleDataFromFile] = useState<
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
  const [mineral1Data, setMineral1Data] = useState<
    DataFormattedType[] | undefined
  >(undefined);
  const [mineral2Data, setMineral2Data] = useState<
    DataFormattedType[] | undefined
  >(undefined);
  const [mineral3Data, setMineral3Data] = useState<
    DataFormattedType[] | undefined
  >(undefined);
  const [mineral1Settings, setMineral1Settings] = useState({
    name: 'Aluminum',
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
      .defer(json, './data/Grayscale.json')
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
          setGrayScaleData(grayScaleDataFormatted);
          setGrayScaleDataFromFile(grayScale);
          setMineral1DataFromFile(mineral_1);
          setMineral2DataFromFile(mineral_2);
          setMineral3DataFromFile(mineral_3);
        },
      );
  }, []);

  useEffect(() => {
    if (mineral1DataFromFile && grayScaleDataFromFile) {
      setMineral1Data(
        FORMAT_DATA(
          mineral1DataFromFile,
          grayScaleDataFromFile,
          mineral1Settings.threshold,
          COLOR_SCALES[mineral1Settings.name],
        ),
      );
    }
  }, [mineral1Settings.threshold, mineral1DataFromFile]);

  useEffect(() => {
    if (mineral2DataFromFile && grayScaleDataFromFile) {
      setMineral2Data(
        FORMAT_DATA(
          mineral2DataFromFile,
          grayScaleDataFromFile,
          mineral2Settings.threshold,
          COLOR_SCALES[mineral2Settings.name],
        ),
      );
    }
  }, [mineral2Settings.threshold, mineral2DataFromFile]);

  useEffect(() => {
    if (mineral3DataFromFile && grayScaleDataFromFile) {
      setMineral3Data(
        FORMAT_DATA(
          mineral3DataFromFile,
          grayScaleDataFromFile,
          mineral3Settings.threshold,
          COLOR_SCALES[mineral3Settings.name],
        ),
      );
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
              maxHeight: '80vh',
              top: '24px',
              left: '24px',
              backgroundColor: 'rgba(255, 255, 2255, 0.95)',
              color: '#1D2223',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            <div style={{ padding: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '1.5rem',
                    margin: '0',
                  }}
                >
                  Settings
                </h4>
                {openMenu ? (
                  <X
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                  />
                ) : (
                  <Plus
                    strokeWidth={1}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  />
                )}
              </div>
              {openMenu ? (
                <>
                  <div style={{ margin: '1.5rem 0' }}>
                    <h5
                      style={{
                        fontWeight: '700',
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      Box 2
                    </h5>
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
                      style={{ width: '100%', marginBottom: '1.5rem' }}
                      defaultValue={mineral1Settings.name}
                      options={[
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral1Settings({ ...mineral1Settings, name: d });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
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
                      styles={{
                        track: {
                          background: 'transparent',
                        },
                        tracks: { background: '#2367DF' },
                      }}
                    />
                  </div>
                  <hr style={{ opacity: 0.25 }} />
                  <div style={{ margin: '1.5rem 0' }}>
                    <h5
                      style={{
                        fontWeight: '700',
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      Box 3
                    </h5>
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
                      style={{ width: '100%', marginBottom: '1.5rem' }}
                      defaultValue={mineral2Settings.name}
                      options={[
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral2Settings({ ...mineral2Settings, name: d });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
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
                      styles={{
                        track: {
                          background: 'transparent',
                        },
                        tracks: { background: '#2367DF' },
                      }}
                    />
                  </div>
                  <hr style={{ opacity: 0.25 }} />
                  <div style={{ marginTop: '1.5rem' }}>
                    <h5
                      style={{
                        fontWeight: '700',
                        fontSize: '1rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      Box 4
                    </h5>
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
                      style={{ width: '100%', marginBottom: '1.5rem' }}
                      defaultValue={mineral3Settings.name}
                      options={[
                        { value: 'Aluminum', label: 'Aluminum' },
                        { value: 'Copper', label: 'Copper' },
                        { value: 'Iron', label: 'Iron' },
                      ]}
                      onChange={d => {
                        setMineral3Settings({ ...mineral3Settings, name: d });
                      }}
                      dropdownStyle={{
                        borderRadius: 0,
                      }}
                    />
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
          <BoxView
            grayScaleData={grayScaleData}
            mineralData={[mineral1Data, mineral2Data, mineral3Data]}
          />
        </>
      ) : (
        <Spin tip='Loading' size='large' />
      )}
    </div>
  );
}
