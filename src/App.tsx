import { useEffect, useState } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';
import { Spin } from 'antd';
import {
  DataFormattedType,
  DataType,
  MineralDataType,
  MineralDataTypeForRender,
} from './Types';
import { DownSampleData } from './Utils/DownSampleData';
import { FormatData } from './Utils/FormatData';
import Viz from './Viz';

export default function App() {
  const [greyScaleData, setGreyScaleData] = useState<
    MineralDataType | undefined
  >(undefined);
  const [greyScaleDataForRender, setGreyScaleDataForRender] = useState<
    MineralDataTypeForRender | undefined
  >(undefined);

  useEffect(() => {
    queue()
      .defer(json, './data/GreyScale.json')
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          greyScale: DataType,
        ) => {
          if (err) throw err;
          const greyScaleDataFormatted: DataFormattedType[] = FormatData(
            greyScale,
            [0, 1],
            ['#212121', '#f1f1f1'],
          ) as DataFormattedType[];
          const downSampledDataLevel1: DataType = {
            res_x: Math.floor(greyScale.res_x / 2),
            res_y: Math.floor(greyScale.res_y / 2),
            data: flatten(
              DownSampleData(chunk(greyScale.data, greyScale.res_y), 2),
            ),
          };
          const downSampledDataLevel1Formatted = FormatData(
            downSampledDataLevel1,
            [0, 1],
            ['#212121', '#f1f1f1'],
            0.2,
          ) as DataFormattedType[];
          const downSampledDataLevel2 = {
            res_x: Math.floor(greyScale.res_x / 3),
            res_y: Math.floor(greyScale.res_y / 3),
            data: flatten(
              DownSampleData(chunk(greyScale.data, greyScale.res_y), 3),
            ),
          };
          const downSampledDataLevel2Formatted = FormatData(
            downSampledDataLevel2,
            [0, 1],
            ['#212121', '#f1f1f1'],
            0.3,
          ) as DataFormattedType[];
          setGreyScaleData({
            downSampledDataLevel1,
            downSampledDataLevel2,
            fullData: greyScale,
          });
          setGreyScaleDataForRender({
            downSampledDataLevel1: downSampledDataLevel1Formatted,
            downSampledDataLevel2: downSampledDataLevel2Formatted,
            fullData: greyScaleDataFormatted,
          });
        },
      );
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#05050F',
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      {greyScaleData && greyScaleDataForRender ? (
        <Viz
          greyScaleData={greyScaleData}
          greyScaleDataForRender={greyScaleDataForRender}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Spin />
        </div>
      )}
    </div>
  );
}
