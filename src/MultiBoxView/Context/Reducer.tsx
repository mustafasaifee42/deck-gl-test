import { MultiBoxStateDataType } from '../../Types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (state: MultiBoxStateDataType, action: any) => {
  switch (action.type) {
    case 'UPDATE_MENU_COLLAPSED':
      return { ...state, menuCollapsed: action.payload };
    default:
      return { ...state };
  }
};
