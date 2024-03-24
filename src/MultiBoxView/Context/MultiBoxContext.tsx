import { createContext } from 'react';
import { MultiBoxCtxDataType } from '../../Types';

const MultiBoxContext = createContext<MultiBoxCtxDataType>({
  multiBoxProfile: [],
  menuCollapsed: false,
  maxWidth: 0,
  updateMenuCollapsed: (_d: boolean) => {},
});

export default MultiBoxContext;
