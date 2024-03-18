import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { useParams } from 'react-router-dom';
import { BoxMetaDataType } from '../Types';
import Viz from './Viz';

export default function SingleBoxView() {
  const [boxMetaData, setBoxMetaData] = useState<undefined | BoxMetaDataType>(
    undefined,
  );
  const { id } = useParams();
  useEffect(() => {
    queue()
      .defer(json, `../data/BoxID_${id}/BoxMetaData.json`)
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
  }, [id]);
  return <div>{boxMetaData ? <Viz boxMetaData={boxMetaData} /> : null}</div>;
}
