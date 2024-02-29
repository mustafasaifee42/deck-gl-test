import { useContext, useEffect } from 'react';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
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
  updateFunction: (_d: MineralDataTypeForRender) => void,
) => {
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
};

export default function MainMenu() {
  const {
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
    if (boxOneMineralData) {
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
    if (boxTwoMineralData) {
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
    if (boxThreeMineralData) {
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
    if (boxFourMineralData) {
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
          title='View 1'
          boxSettings={boxOneSettings}
          updateBoxSettings={updateBoxOneSettings}
        />
        <BoxSettings
          title='View 2'
          boxSettings={boxTwoSettings}
          updateBoxSettings={updateBoxTwoSettings}
        />
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
        <hr />
        <p
          style={{
            fontWeight: '700',
            fontSize: '12px',
            margin: '0',
            opacity: 0.8,
            fontStyle: 'italic',
          }}
        >
          Click on the box to see details or outside to hide the details
        </p>
      </div>
    </div>
  );
}
