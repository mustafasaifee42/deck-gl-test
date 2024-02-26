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

const FormatNumber = (number?: number) => {
  const formattedNumber =
    number === undefined || number === -1 ? 'NA' : number.toFixed(2);
  return formattedNumber;
};

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
    boxFourSettings,
    updateBoxOneSettings,
    updateBoxTwoSettings,
    updateBoxThreeSettings,
    updateBoxFourSettings,
    boxOneMineralDataForRender,
    boxTwoMineralDataForRender,
    boxThreeMineralDataForRender,
    boxFourMineralDataForRender,
    updateBoxOneMineralDataForRender,
    updateBoxTwoMineralDataForRender,
    updateBoxThreeMineralDataForRender,
    updateBoxFourMineralDataForRender,
    clickedIndex,
    zoomLevel,
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
    UpdateBoxData(
      boxFourSettings.name,
      boxFourSettings.threshold,
      greyScaleData,
      greyScaleDataForRender,
      updateBoxThreeMineralDataForRender,
    );
  }, [boxFourSettings.name]);

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

  useEffect(() => {
    if (boxFourMineralDataForRender) {
      updateBoxFourMineralDataForRender(
        UpdateThreshold(
          boxFourMineralDataForRender,
          greyScaleDataForRender,
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
        {clickedIndex === -1 ? null : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '14px',
                padding: '8px',
                backgroundColor: '#e1e1e1',
              }}
            >
              <div>{boxOneSettings.name}</div>
              <div>
                {zoomLevel <= 3.5
                  ? FormatNumber(
                      boxOneMineralDataForRender?.downSampledDataLevel2[
                        clickedIndex
                      ].value[0],
                    )
                  : zoomLevel <= 5
                  ? FormatNumber(
                      boxOneMineralDataForRender?.downSampledDataLevel1[
                        clickedIndex
                      ].value[0],
                    )
                  : FormatNumber(
                      boxOneMineralDataForRender?.fullData[clickedIndex]
                        .value[0],
                    )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '14px',
                padding: '8px',
              }}
            >
              <div>{boxTwoSettings.name}</div>
              <div>
                {zoomLevel <= 3.5
                  ? FormatNumber(
                      boxTwoMineralDataForRender?.downSampledDataLevel2[
                        clickedIndex
                      ].value[0],
                    )
                  : zoomLevel <= 5
                  ? FormatNumber(
                      boxTwoMineralDataForRender?.downSampledDataLevel1[
                        clickedIndex
                      ].value[0],
                    )
                  : FormatNumber(
                      boxTwoMineralDataForRender?.fullData[clickedIndex]
                        .value[0],
                    )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '14px',
                padding: '8px',
                backgroundColor: '#e1e1e1',
              }}
            >
              <div>{boxThreeSettings.name}</div>
              <div>
                {zoomLevel <= 3.5
                  ? FormatNumber(
                      boxThreeMineralDataForRender?.downSampledDataLevel2[
                        clickedIndex
                      ].value[0],
                    )
                  : zoomLevel <= 5
                  ? FormatNumber(
                      boxThreeMineralDataForRender?.downSampledDataLevel1[
                        clickedIndex
                      ].value[0],
                    )
                  : FormatNumber(
                      boxThreeMineralDataForRender?.fullData[clickedIndex]
                        .value[0],
                    )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: '14px',
                padding: '8px',
                backgroundColor: '#e1e1e1',
              }}
            >
              <div>{boxFourSettings.name}</div>
              <div>
                {zoomLevel <= 3.5
                  ? FormatNumber(
                      boxFourMineralDataForRender?.downSampledDataLevel2[
                        clickedIndex
                      ].value[0],
                    )
                  : zoomLevel <= 5
                  ? FormatNumber(
                      boxFourMineralDataForRender?.downSampledDataLevel1[
                        clickedIndex
                      ].value[0],
                    )
                  : FormatNumber(
                      boxFourMineralDataForRender?.fullData[clickedIndex]
                        .value[0],
                    )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
