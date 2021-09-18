import React from 'react';
export interface IBaseGlobalState {
  layoutLoading:boolean,
  collapsed: boolean,
};

export interface IGlobalState {
  dispatch?: React.Dispatch<any>,
  gState: IBaseGlobalState
}