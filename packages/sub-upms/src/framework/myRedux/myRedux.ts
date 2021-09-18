import { InitStateInterface, micFEenum } from './doRedux';

export function createStore(reducer: Function, initState?: InitStateInterface) {
  let state = initState;

  function dispatch(params: { type: micFEenum; payload?: any }) {
    state = reducer(state, params);
  }

  function getState() {
    return state;
  }

  dispatch({ type: micFEenum.INIT_STATE });

  return {
    dispatch,
    getState
  };
}
