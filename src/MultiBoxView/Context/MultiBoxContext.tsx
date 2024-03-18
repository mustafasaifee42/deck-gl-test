import { createContext } from 'react';
import { MultiBoxCtxDataType } from '../../Types';

const MultiBoxContext = createContext<MultiBoxCtxDataType>({
  elements: [],
  multiBoxProfile: [],
  menuCollapsed: false,
  maxWidth: 0,
  updateElements: (_d: string[]) => {},
  updateMenuCollapsed: (_d: boolean) => {},
});

export default MultiBoxContext;
