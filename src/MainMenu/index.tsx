import { useContext, useEffect } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { ChevronsLeft, Settings } from 'lucide-react';
import { Radio, Slider } from 'antd';
import BoxSettings from './BoxSettings';
import Context from '../Context/Context';
import {
  DataType,
  DataFormattedType,
  MineralDataTypeForRender,
} from '../Types';
import { FormatData } from '../Utils/FormatData';
import { COLOR_SCALES } from '../Constants';
import { UpdateThreshold } from '../Utils/UpdateThreshold';

const UpdateBoxData = (
  name: string,
  threshold: [number, number],
  updateFunction: (_d?: MineralDataTypeForRender) => void,
) => {
  if (name !== 'GreyScale') {
    queue()
      .defer(json, `./data/${name}.json`)
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          data: DataType,
        ) => {
          if (err) throw err;
          const fullData = FormatData(
            data,
            threshold,
            COLOR_SCALES[COLOR_SCALES.findIndex(el => el.value === name)]
              .colors as [string, string],
          ) as DataFormattedType[];
          updateFunction({ data, dataForRender: fullData });
        },
      );
  } else {
    updateFunction(undefined);
  }
};

export default function MainMenu() {
  const {
    boxMetaData,
    boxOneSettings,
    boxTwoSettings,
    boxThreeSettings,
    boxFourSettings,
    updateBoxOneSettings,
    updateBoxTwoSettings,
    updateBoxThreeSettings,
    updateBoxFourSettings,
    boxOneMineralData,
    boxTwoMineralData,
    boxThreeMineralData,
    boxFourMineralData,
    updateBoxOneMineralData,
    updateBoxTwoMineralData,
    updateBoxThreeMineralData,
    updateBoxFourMineralData,
    updateBoxOpacity,
    updateStripOpacity,
    stripOpacity,
    boxOpacity,
    updateMenuCollapsed,
    menuCollapsed,
    updateLayout,
    layout,
  } = useContext(Context);

  useEffect(() => {
    UpdateBoxData(
      boxOneSettings.name,
      boxOneSettings.threshold,
      updateBoxOneMineralData,
    );
  }, [boxOneSettings.name]);

  useEffect(() => {
    UpdateBoxData(
      boxTwoSettings.name,
      boxTwoSettings.threshold,
      updateBoxTwoMineralData,
    );
  }, [boxTwoSettings.name]);

  useEffect(() => {
    UpdateBoxData(
      boxThreeSettings.name,
      boxThreeSettings.threshold,
      updateBoxThreeMineralData,
    );
  }, [boxThreeSettings.name]);

  useEffect(() => {
    UpdateBoxData(
      boxFourSettings.name,
      boxFourSettings.threshold,
      updateBoxFourMineralData,
    );
  }, [boxFourSettings.name]);

  useEffect(() => {
    if (boxOneMineralData && boxOneSettings.name !== 'GreyScale') {
      updateBoxOneMineralData(
        UpdateThreshold(
          boxOneMineralData,
          boxOneSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxOneSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxOneSettings.threshold]);

  useEffect(() => {
    if (boxTwoMineralData && boxTwoSettings.name !== 'GreyScale') {
      updateBoxTwoMineralData(
        UpdateThreshold(
          boxTwoMineralData,
          boxTwoSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxTwoSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxTwoSettings.threshold]);

  useEffect(() => {
    if (boxThreeMineralData && boxThreeSettings.name !== 'GreyScale') {
      updateBoxThreeMineralData(
        UpdateThreshold(
          boxThreeMineralData,
          boxThreeSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxThreeSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxThreeSettings.threshold]);

  useEffect(() => {
    if (boxFourMineralData && boxFourSettings.name !== 'GreyScale') {
      updateBoxFourMineralData(
        UpdateThreshold(
          boxFourMineralData,
          boxFourSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxFourSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxFourSettings.threshold]);
  return (
    <div>
      {!menuCollapsed ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 100,
            width: '280px',
            top: '12px',
            margin: '0',
            left: '12px',
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            color: 'rgb(230, 237, 243)',
            borderRadius: '8px',
            fontFamily: 'Roboto, sans-serif',
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <button
              type='button'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                border: 0,
                padding: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => {
                updateMenuCollapsed(true);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <Settings color='#e6edf3' strokeWidth={1.5} size={20} />
                <h5
                  style={{
                    fontWeight: 'normal',
                    fontSize: '1rem',
                    margin: '0',
                    textTransform: 'uppercase',
                    color: 'rgb(230, 237, 243)',
                  }}
                >
                  Settings
                </h5>
              </div>
              <ChevronsLeft
                color='#e6edf3'
                strokeWidth={1}
                style={{ cursor: 'pointer' }}
                size={20}
              />
            </button>
            <div
              style={{
                color: 'rgb(230, 237, 243)',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>Box name</div>
                <div style={{ fontWeight: 'bold' }}>{boxMetaData.box_name}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>Box no.</div>
                <div style={{ fontWeight: 'bold' }}>
                  {boxMetaData.box_number}
                </div>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#e6edf3',
                  margin: '0 0 8px 0',
                }}
              >
                No. of Views
              </p>
              <Radio.Group
                onChange={d => {
                  updateLayout(d.target.value);
                }}
                value={layout}
              >
                <Radio value={1} style={{ color: '#e6edf3' }}>
                  One
                </Radio>
                <Radio value={2} style={{ color: '#e6edf3' }}>
                  Two
                </Radio>
                <Radio value={4} style={{ color: '#e6edf3' }}>
                  Four
                </Radio>
              </Radio.Group>
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#e6edf3',
                  margin: '0 0 8px 0',
                }}
              >
                Box opacity ({boxOpacity})
              </p>
              <Slider
                min={0}
                max={1}
                defaultValue={1}
                step={0.01}
                onChangeComplete={d => {
                  updateBoxOpacity(d);
                }}
                styles={{
                  track: {
                    background: 'transparent',
                  },
                  tracks: { background: '#2367DF' },
                }}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#e6edf3',
                  margin: '0 0 8px 0',
                }}
              >
                Strip opacity ({stripOpacity})
              </p>
              <Slider
                min={0}
                max={1}
                defaultValue={1}
                step={0.01}
                onChangeComplete={d => {
                  updateStripOpacity(d);
                }}
                styles={{
                  track: {
                    background: 'transparent',
                  },
                  tracks: { background: '#2367DF' },
                }}
              />
            </div>
            <div
              style={{
                height: '1px',
                width: '100%',
                backgroundColor: 'rgba(230, 237, 243, 0.25)',
              }}
            />
            <BoxSettings
              title='View 1'
              boxSettings={boxOneSettings}
              updateBoxSettings={updateBoxOneSettings}
            />
            {layout > 1 ? (
              <BoxSettings
                title='View 2'
                boxSettings={boxTwoSettings}
                updateBoxSettings={updateBoxTwoSettings}
              />
            ) : null}
            {layout === 4 ? (
              <>
                <BoxSettings
                  title='View 3'
                  boxSettings={boxThreeSettings}
                  updateBoxSettings={updateBoxThreeSettings}
                />
                <BoxSettings
                  title='View 4'
                  boxSettings={boxFourSettings}
                  updateBoxSettings={updateBoxFourSettings}
                />
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type='button'
          style={{
            position: 'fixed',
            zIndex: 100,
            padding: 0,
            top: '12px',
            margin: '0',
            left: '12px',
            backgroundColor: 'rgba(22, 27, 34, 0.9)',
            color: 'rgb(230, 237, 243)',
            borderRadius: '8px',
            border: 0,
          }}
          onClick={() => {
            updateMenuCollapsed(false);
          }}
        >
          <div
            style={{
              padding: '1rem',
            }}
          >
            <Settings
              color='#e6edf3'
              strokeWidth={1.5}
              style={{ cursor: 'pointer' }}
              size={20}
            />
          </div>
        </button>
      )}
    </div>
  );
}
