import React from 'react';
export interface IBaseGlobalState {
  layoutLoading:boolean,
  collapsed: boolean,
  myInfo: CurrentUserInfo
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