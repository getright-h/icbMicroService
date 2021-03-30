import React from 'react';
export interface IBaseGlobalState {
  layoutLoading:boolean,
  myInfo: CurrentUserInfo,
  collapsed: boolean,
};

export interface IGlobalState {
  dispatch?: React.Dispatch<any>,
  gState: IBaseGlobalState
}

interface CurrentUserInfo{
  userId:string;
  typeId:string;
  systemId:string;
}