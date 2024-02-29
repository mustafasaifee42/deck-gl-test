import { StateDataType } from '../Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: StateDataType, action: any) => {
  switch (action.type) {
    case 'UPDATE_ZOOM_LEVEL':
      return { ...state, zoomLevel: action.payload };
    case 'UPDATE_BOX_ONE_MINERAL_DATA':
      return { ...state, boxOneMineralData: action.payload };
    case 'UPDATE_BOX_TWO_MINERAL_DATA':
      return { ...state, boxTwoMineralData: action.payload };
    case 'UPDATE_BOX_THREE_MINERAL_DATA':
      return { ...state, boxThreeMineralData: action.payload };
    case 'UPDATE_BOX_FOUR_MINERAL_DATA':
      return { ...state, boxFourMineralData: action.payload };
    case 'UPDATE_BOX_ONE_SETTINGS':
      return { ...state, boxOneSettings: action.payload };
    case 'UPDATE_BOX_TWO_SETTINGS':
      return { ...state, boxTwoSettings: action.payload };
    case 'UPDATE_BOX_THREE_SETTINGS':
      return { ...state, boxThreeSettings: action.payload };
    case 'UPDATE_BOX_FOUR_SETTINGS':
      return { ...state, boxFourSettings: action.payload };
    case 'UPDATE_CLICKED_INDEX':
      return { ...state, clickedIndex: action.payload };
    default:
      return { ...state };
  }
};
