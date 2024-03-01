import { useContext } from 'react';
import { BoxSettingsDataType, DataFormattedType } from '../Types';
import Context from '../Context/Context';

interface Props {
  boxSettings: BoxSettingsDataType;
  data: DataFormattedType[];
}

export default function RowEl(props: Props) {
  const { data, boxSettings } = props;
  const { mouseOverData } = useContext(Context);
  const value =
    data.findIndex(d => d.arrayIndex === mouseOverData?.index) === -1
      ? 0
      : data[data.findIndex(d => d.arrayIndex === mouseOverData?.index)].value;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px',
      }}
    >
      <div>{boxSettings.name}</div>
      <div style={{ fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}
