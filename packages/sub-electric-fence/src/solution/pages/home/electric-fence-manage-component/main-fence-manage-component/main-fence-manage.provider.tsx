import React from 'react';
import { mainFenceInitialState } from './hooks-redux/main-fence-reducer';

export const MainFenceManageContext = React.createContext({
  mainFenceManageState: mainFenceInitialState,
  dispatch: undefined
});

export const useMainFenceManageContext = () => {
  return { MainFenceManageContext };
};
