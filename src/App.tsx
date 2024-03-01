import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { BoxMetaDataType } from './Types';
import Viz from './Viz';

export default function App() {
  const [boxMetaData, setBoxMetaData] = useState<undefined | BoxMetaDataType>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(json, './data/BoxMetaData.json')
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          data: BoxMetaDataType,
        ) => {
          if (err) throw err;
          setBoxMetaData(data);
        },
      );
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#191933',
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      {boxMetaData ? <Viz boxMetaData={boxMetaData} /> : null}
    </div>
  );
}
