import { GlobalStateDataType } from '../Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: GlobalStateDataType, action: any) => {
  switch (action.type) {
    case 'UPDATE_ELEMENTS':
      return { ...state, elements: action.payload };
    case 'UPDATE_MULTI_BOX_VIEW_STATE':
      return { ...state, multiBoxViewState: action.payload };
    default:
      return { ...state };
  }
};
