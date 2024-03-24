import { createContext } from 'react';
import { GlobalCtxDataType } from '../Types';

const GlobalContext = createContext<GlobalCtxDataType>({
  elements: [],
  updateElements: (_d: string[]) => {},
});

export default GlobalContext;
