import { StateDataType } from '../Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: StateDataType, action: any) => {
  switch (action.type) {
    case 'UPDATE_ZOOM_LEVEL':
      return { ...state, zoomLevel: action.payload };
    case 'UPDATE_GREY_SCALE_DATA':
      return { ...state, greyScaleData: action.payload };
    case 'UPDATE_GREY_SCALE_DATA_FOR_RENDER':
      return { ...state, greyScaleDataForRender: action.payload };
    case 'UPDATE_BOX_ONE_MINERAL_DATA_FOR_RENDER':
      return { ...state, boxOneMineralDataForRender: action.payload };
    case 'UPDATE_BOX_TWO_MINERAL_DATA_FOR_RENDER':
      return { ...state, boxTwoMineralDataForRender: action.payload };
    case 'UPDATE_BOX_THREE_MINERAL_DATA_FOR_RENDER':
      return { ...state, boxThreeMineralDataForRender: action.payload };
    case 'UPDATE_BOX_ONE_SETTINGS':
      return { ...state, boxOneSettings: action.payload };
    case 'UPDATE_BOX_TWO_SETTINGS':
      return { ...state, boxTwoSettings: action.payload };
    case 'UPDATE_BOX_THREE_SETTINGS':
      return { ...state, boxThreeSettings: action.payload };
    case 'UPDATE_CLICKED_INDEX':
      return { ...state, clickedIndex: action.payload };
    default:
      return { ...state };
  }
};
