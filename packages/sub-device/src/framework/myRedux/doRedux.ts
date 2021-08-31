export function MicFEReducer(state: InitStateInterface = initState, action: { type: micFEenum; payload?: any }) {
  const { type, payload } = action;
  switch (type) {
    // case micFEenum.CHANGE_SHOW_TAB:
    //   return {
    //     ...state,
    //     showMutualAidTab: payload
    //   };
    default:
      return state;
  }
}

export function doMyReduxAction(dispatch: Function, data: any) {
  return {
    // changeShowTab() {
    //   dispatch({
    //     type: micFEenum.CHANGE_SHOW_TAB,
    //     payload: data
    //   });
    // }
  };
}

export enum micFEenum {
  INIT_STATE,
  CHANGE_SHOW_TAB
}

export const initState: InitStateInterface = {
  // showMutualAidTab: false
};

export interface InitStateInterface {
  // showMutualAidTab: boolean;
}
