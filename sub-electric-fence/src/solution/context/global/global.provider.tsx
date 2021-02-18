import React, { useReducer } from 'react';
import { reducer, initialState } from './store/global.reducer';

export const GlobalContext = React.createContext({ dispatch: undefined, gState: initialState });

const GlobalProvider = (props: any) => {
  initialState.myInfo = !(props && props.userInfo)
    ? {
        userId: '',
        systemId: '',
        typeId: ''
      }
    : { ...props.userInfo, userId: props.userInfo.id };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GlobalContext.Provider value={{ gState: state, dispatch }}>{props.children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  return { GlobalContext, GlobalProvider };
};
