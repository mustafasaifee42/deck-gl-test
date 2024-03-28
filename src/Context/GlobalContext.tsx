import { createContext } from 'react';
import { DeckGLStateDataType, GlobalCtxDataType } from '../Types';

const GlobalContext = createContext<GlobalCtxDataType>({
  elements: [],
  multiBoxViewState: {
    target: [0, 0],
    zoom: -1,
  },
  updateElements: (_d: string[]) => {},
  updateMultiBoxViewState: (_d: DeckGLStateDataType) => {},
});

export default GlobalContext;
