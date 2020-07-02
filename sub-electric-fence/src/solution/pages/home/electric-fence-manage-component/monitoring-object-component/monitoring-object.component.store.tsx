import { IMonitoringObjectState, ModalType } from './monitoring-object.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import CreateBindCarComponent from './create-bind-car-component/create-bind-car.component';
import * as React from 'react';
import FenceModalViewComponent from './fence-modal-view-component/fence-modal-view.component';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';

export function useMonitoringObjectStore() {
  const { state, setStateWrap } = useStateStore(new IMonitoringObjectState());
  function callbackAction(type: ACTION_TYPE, data: any) {
    switch (type) {
      case ACTION_TYPE.FENCEMODAL:
        setStateWrap({
          modalContainer: <FenceModalViewComponent />,
          modalTitle: '围栏模式',
          visibleModal: true
        });
        break;
      case ACTION_TYPE.EDIT:
        setStateWrap({
          modalContainer: <CreateBindCarComponent />,
          modalTitle: '编辑',
          visibleModal: true
        });
        break;
      case ACTION_TYPE.UNBIND:
        setStateWrap({
          modalContainer: <span>请再次确定所选车辆解绑电子围栏？</span>,
          modalTitle: '提示',
          visibleModal: true
        });
        break;
      case ACTION_TYPE.BATCH_EDIT:
        setStateWrap({
          modalContainer: <CreateBindCarComponent />,
          modalTitle: '批量修改',
          visibleModal: true
        });
        break;
      default:
        break;
    }
  }
  function changeTablePageIndex(index: number, pageSize: number) {
    console.log(2);
  }
  function searchClick() {}
  function getDateTimeInfo() {}
  function handleModalCancel() {
    setStateWrap({
      visibleModal: false
    });
  }
  function handleModalOk() {}
  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.BINDCAR:
        setStateWrap({
          modalContainer: <CreateBindCarComponent />,
          visibleModal: true,
          modalTitle: '绑定车辆'
        });
        break;
      case ModalType.FENCETYPE:
        setStateWrap({
          modalContainer: <FenceModalViewComponent />,
          visibleModal: true,
          modalTitle: '围栏模式'
        });
        break;
      default:
        break;
    }
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    getDateTimeInfo,
    handleModalOk,
    handleModalCancel,
    openModal
  };
}
