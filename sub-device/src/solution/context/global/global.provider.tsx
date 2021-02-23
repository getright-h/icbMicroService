import React, { useReducer } from 'react';
import { reducer, initialState } from './store/global.reducer';

export const GlobalContext = React.createContext({ dispatch: undefined, gState: initialState });

const GlobalProvider = (props: any) => {
  initialState.myInfo = !(props && props.userInfo)
    ? {
        userId: '',
        systemId: '938880216d89c68eb6ea08d69b143c52',
        typeId: 'c59c75eec2d3cc075cca08d84386bcb9'
      }
    : { ...props.userInfo, userId: props.userInfo.id, typeId: 'c59c75eec2d3cc075cca08d84386bcb9' };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GlobalContext.Provider value={{ gState: state, dispatch }}>{props.children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  return { GlobalContext, GlobalProvider };
};
