/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Select, Slider } from 'antd';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { BoxSettingsDataType } from '../Types';
import { MINERAL_OPTIONS } from '../Constants';

interface Props {
  title: string;
  boxSettings: BoxSettingsDataType;
  updateBoxSettings: (_d: BoxSettingsDataType) => void;
}

export default function BoxSettings(props: Props) {
  const { title, boxSettings, updateBoxSettings } = props;
  const [expand, updateExpand] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          updateExpand(!expand);
        }}
      >
        {expand ? (
          <ChevronDown
            color='#e6edf3'
            strokeWidth={2}
            style={{
              cursor: 'pointer',
            }}
            size={16}
          />
        ) : (
          <ChevronRight
            color='#e6edf3'
            strokeWidth={2}
            style={{
              cursor: 'pointer',
            }}
            size={16}
          />
        )}

        <div style={{ fontWeight: 'normal' }}>{title}</div>
      </div>
      {expand ? (
        <>
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                color: '#e6edf3',
                margin: '0 0 8px 0',
              }}
            >
              Select element or mineral
            </p>
            <Select
              style={{ width: '100%' }}
              defaultValue={
                boxSettings.name === 'GreyScale' ? undefined : boxSettings.name
              }
              placeholder='Select a element'
              allowClear
              options={MINERAL_OPTIONS}
              onChange={d => {
                updateBoxSettings({
                  name: d || 'GreyScale',
                  threshold: d ? boxSettings.threshold : [0, 1],
                });
              }}
              dropdownStyle={{
                borderRadius: 0,
              }}
            />
          </div>
          {boxSettings.name === 'GreyScale' ||
          boxSettings.name === 'MineralMap' ? null : (
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#e6edf3',
                  margin: '0 0 8px 0',
                }}
              >
                Color Threshold ({boxSettings.threshold[0]}-
                {boxSettings.threshold[1]})
              </p>
              <Slider
                min={0}
                max={1}
                defaultValue={[0, 1]}
                range
                step={0.01}
                onChangeComplete={d => {
                  updateBoxSettings({
                    ...boxSettings,
                    threshold: d as [number, number],
                  });
                }}
                disabled={boxSettings.name === 'GreyScale'}
                styles={{
                  track: {
                    background: 'transparent',
                  },
                  tracks: { background: '#2367DF' },
                }}
              />
            </div>
          )}
        </>
      ) : null}
      <div
        style={{
          height: '1px',
          width: '100%',
          backgroundColor: 'rgba(230, 237, 243, 0.25)',
        }}
      />
    </div>
  );
}
