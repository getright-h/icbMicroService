import React, { useReducer } from 'react';
import { MainFenceReducer, mainFenceInitialState } from './hooks-redux/main-fence-reducer';

export const MainFenceManageContext = React.createContext({
  mainFenceManageState: mainFenceInitialState,
  dispatch: undefined
});

export const MainFenceManageProvider = (props: any) => {
  const [state, dispatch] = useReducer(MainFenceReducer, mainFenceInitialState);
  return (
    <MainFenceManageContext.Provider value={{ mainFenceManageState: state, dispatch }}>
      {props.children}
    </MainFenceManageContext.Provider>
  );
};

export const useMainFenceManageContext = () => {
  return { MainFenceManageContext, MainFenceManageProvider };
};
