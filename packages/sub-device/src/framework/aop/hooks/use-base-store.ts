import React, { useState, useMemo, useRef, useReducer } from 'react';
import { emptyFunction } from '~/framework/util/common';
import { IAction } from '~/solution/shared/interfaces/common.interface';
type Partial<T> = {
  [P in keyof T]?: T[P];
};
export function useStateStore<T>(initialState?: T) {
  const [state, setState] = useState(initialState);
  const newState = useRef(state);
  const setStateWrap = (value: Partial<T>, callback?: Function) => {
    setState(state => {
      newState.current = { ...state, ...value };
      callback && callback(newState.current);
      return newState.current;
    });
    return newState;
  };

  const getState = () => newState.current;

  return {
    state,
    setStateWrap,
    getState
  };
}

export class ReducerStore<T> {
  state: T;
  dispatch: React.Dispatch<IAction<any>> = emptyFunction;
  constructor(readonly props: any) {}

  useReducer<K extends T>(reducer: any, initialState: T) {
    const [state, dispatch] = useReducer(reducer, initialState);
    this.dispatch = dispatch;
    this.state = state as K;
    return {
      state: state as K,
      dispatch
    };
  }
}

export function useStore<T>(constructor: any, props: T) {
  const store = useMemo(() => {
    return new constructor(props);
  }, []);
  return store;
}

export function useService<T>(constructor: any, props?: T) {
  const service = useMemo(() => {
    return new constructor(props);
  }, []);
  return service;
}
