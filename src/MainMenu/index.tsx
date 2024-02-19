import { useContext, useEffect } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import chunk from 'lodash.chunk';
import flatten from 'lodash.flatten';
import BoxSettings from './BoxSettings';
import Context from '../Context/Context';
import {
  DataType,
  DataFormattedType,
  MineralDataType,
  MineralDataTypeForRender,
} from '../Types';
import { DownSampleData } from '../Utils/DownSampleData';
import { FormatData } from '../Utils/FormatData';
import { COLOR_SCALES } from '../Constants';
import { UpdateThreshold } from '../Utils/UpdateThreshold';

const UpdateBoxData = (
  name: string,
  threshold: [number, number],
  greyScaleData: MineralDataType,
  greyScaleDataForRender: MineralDataTypeForRender,
  updateFunction: (_d: MineralDataTypeForRender) => void,
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
            greyScaleData.fullData,
            threshold,
            COLOR_SCALES[COLOR_SCALES.findIndex(el => el.value === name)]
              .colors as [string, string],
            0.1,
            data,
          ) as DataFormattedType[];
          let downSampledData: DataType = {
            res_x: Math.floor(data.res_x / 2),
            res_y: Math.floor(data.res_y / 2),
            data: flatten(DownSampleData(chunk(data.data, data.res_y), 2)),
          };
          const downSampledDataLevel1 = FormatData(
            greyScaleData.downSampledDataLevel1,
            threshold,
            COLOR_SCALES[COLOR_SCALES.findIndex(el => el.value === name)]
              .colors as [string, string],
            0.2,
            downSampledData,
          ) as DataFormattedType[];
          downSampledData = {
            res_x: Math.floor(data.res_x / 3),
            res_y: Math.floor(data.res_y / 3),
            data: flatten(DownSampleData(chunk(data.data, data.res_y), 3)),
          };
          const downSampledDataLevel2 = FormatData(
            greyScaleData.downSampledDataLevel2,
            threshold,
            COLOR_SCALES[COLOR_SCALES.findIndex(el => el.value === name)]
              .colors as [string, string],
            0.3,
            downSampledData,
          ) as DataFormattedType[];
          updateFunction({
            downSampledDataLevel1,
            downSampledDataLevel2,
            fullData,
          });
        },
      );
  } else {
    updateFunction(greyScaleDataForRender);
  }
};

export default function MainMenu() {
  const {
    greyScaleData,
    greyScaleDataForRender,
    boxOneSettings,
    boxTwoSettings,
    boxThreeSettings,
    updateBoxOneSettings,
    updateBoxTwoSettings,
    updateBoxThreeSettings,
    boxOneMineralDataForRender,
    boxTwoMineralDataForRender,
    boxThreeMineralDataForRender,
    updateBoxOneMineralDataForRender,
    updateBoxTwoMineralDataForRender,
    updateBoxThreeMineralDataForRender,
  } = useContext(Context);

  useEffect(() => {
    UpdateBoxData(
      boxOneSettings.name,
      boxOneSettings.threshold,
      greyScaleData,
      greyScaleDataForRender,
      updateBoxOneMineralDataForRender,
    );
  }, [boxOneSettings.name]);

  useEffect(() => {
    UpdateBoxData(
      boxTwoSettings.name,
      boxTwoSettings.threshold,
      greyScaleData,
      greyScaleDataForRender,
      updateBoxTwoMineralDataForRender,
    );
  }, [boxTwoSettings.name]);

  useEffect(() => {
    UpdateBoxData(
      boxThreeSettings.name,
      boxThreeSettings.threshold,
      greyScaleData,
      greyScaleDataForRender,
      updateBoxThreeMineralDataForRender,
    );
  }, [boxThreeSettings.name]);

  useEffect(() => {
    if (boxOneMineralDataForRender) {
      updateBoxOneMineralDataForRender(
        UpdateThreshold(
          boxOneMineralDataForRender,
          greyScaleDataForRender,
          boxOneSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxOneSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxOneSettings.threshold]);

  useEffect(() => {
    if (boxTwoMineralDataForRender) {
      updateBoxTwoMineralDataForRender(
        UpdateThreshold(
          boxTwoMineralDataForRender,
          greyScaleDataForRender,
          boxTwoSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxTwoSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxTwoSettings.threshold]);

  useEffect(() => {
    if (boxThreeMineralDataForRender) {
      updateBoxThreeMineralDataForRender(
        UpdateThreshold(
          boxThreeMineralDataForRender,
          greyScaleDataForRender,
          boxThreeSettings.threshold,
          COLOR_SCALES[
            COLOR_SCALES.findIndex(el => el.value === boxThreeSettings.name)
          ].colors as [string, string],
        ),
      );
    }
  }, [boxThreeSettings.threshold]);
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 10,
        width: '280px',
        top: '1rem',
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
        <h5
          style={{
            fontWeight: '700',
            fontSize: '1.25rem',
            margin: '0',
          }}
        >
          Settings
        </h5>
        <BoxSettings
          title='Box 1'
          boxSettings={boxOneSettings}
          updateBoxSettings={updateBoxOneSettings}
        />
        <BoxSettings
          title='Box 2'
          boxSettings={boxTwoSettings}
          updateBoxSettings={updateBoxTwoSettings}
        />
        <BoxSettings
          title='Box 3'
          boxSettings={boxThreeSettings}
          updateBoxSettings={updateBoxThreeSettings}
        />
      </div>
    </div>
  );
}
