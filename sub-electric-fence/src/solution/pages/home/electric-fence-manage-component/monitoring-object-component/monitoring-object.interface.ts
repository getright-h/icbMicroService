import { PAGESIZE } from '~/solution/shared/constant/common.const';
import { Component } from 'react';

/**
 * @export state变量定义和初始化
 * @class IMonitoringObjectState
 */
export class IMonitoringObjectState {
  isLoading = false;
  searchForm = {
    index: 1,
    size: PAGESIZE
  };
  visibleModal = false;
  tableData: any[] = tableData;
  total = 0;
  confirmModalLoading = false;
  handleModalOk = false;
  modalTitle = '';
  modalContainer: JSX.Element = null;
}

export enum ModalType {
  BINDCAR,
  FENCETYPE
}

const tableData = [
  {
    fenceName: '成都围栏',
    outAttention: '开',
    inAttention: '关',
    startTime: '2019-9-9',
    endTime: '2019-9-9',
    bindCarFor4s: '西物吉利',
    vehicle: '川A1222',
    name: '符宇轩',
    id: '213'
  }
];
