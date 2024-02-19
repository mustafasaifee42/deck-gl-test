import { Select, Slider } from 'antd';
import { BoxSettingsDataType } from '../Types';
import { MINERAL_OPTIONS } from '../Constants';

interface Props {
  title: string;
  boxSettings: BoxSettingsDataType;
  updateBoxSettings: (_d: BoxSettingsDataType) => void;
}

export default function BoxSettings(props: Props) {
  const { title, boxSettings, updateBoxSettings } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{title}</div>
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
          defaultValue={boxSettings.name}
          options={MINERAL_OPTIONS}
          onChange={d => {
            updateBoxSettings({
              ...boxSettings,
              name: d || 'GreyScale',
            });
          }}
          dropdownStyle={{
            borderRadius: 0,
          }}
        />
      </div>
      {boxSettings.name === 'GreyScale' ? null : (
        <div>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#1D2223',
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
    </div>
  );
}
