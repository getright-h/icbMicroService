import { IMonitoringObjectState, ModalType } from './monitoring-object.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import CreateBindCarComponent from './create-bind-car-component/create-bind-car.component';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import FenceModalViewComponent from './fence-modal-view-component/fence-modal-view.component';
import { ACTION_TYPE } from '~/solution/shared/constant/action.const';
import { MonitorObjectServiceService } from '~/solution/model/services/monitor-object-service.service';
import { formatToUnix } from '~/solution/shared/util/common.util';
import { FormInstance } from 'antd/lib/form';
import { Subscription } from 'rxjs';
import Modal from 'antd/lib/modal';
const { confirm } = Modal;

export function useMonitoringObjectStore() {
  const { state, setStateWrap, getState } = useStateStore(new IMonitoringObjectState());
  const monitorObjectServiceService = new MonitorObjectServiceService();
  const { searchForm } = state;
  const formInfo = useRef(null);
  const monitorObjectServiceServiceSubscript: { current: Subscription } = useRef();
  useEffect(() => {
    getMonitorList();
    return () => {
      monitorObjectServiceServiceSubscript.current && monitorObjectServiceServiceSubscript.current.unsubscribe();
    };
  }, []);

  function getFormSearchInfo(key: string, value: any) {
    if (value == undefined) {
      value = JSON.stringify('');
    }

    const selectItem = Number.isInteger(value) ? value : JSON.parse(value);
    switch (key) {
      case 'fenceId':
        searchForm[key] = selectItem.id ? selectItem.id : '';
        break;
      case 'fenceDdlBelong':
        searchForm['thingType'] = selectItem.type ? selectItem.type : 0;
        searchForm['thingId'] = selectItem.key ? selectItem.key : '';
        break;
      case 'vehicleId':
        searchForm[key] = selectItem.key ? selectItem.key : '';
        break;
      default:
        searchForm[key] = value;
        break;
    }
  }

  function getMonitorList() {
    setStateWrap({
      isLoading: true
    });
    const searchForm = { ...getState().searchForm };
    searchForm.begin = formatToUnix(searchForm.begin);
    searchForm.end = formatToUnix(searchForm.end);
    monitorObjectServiceServiceSubscript.current = monitorObjectServiceService.vehicleList(searchForm).subscribe(
      res => {
        console.log(res);

        setStateWrap({
          tableData: res.data,
          total: res.total,
          isLoading: false
        });
      },
      () => {
        setStateWrap({
          isLoading: false
        });
      }
    );
  }

  function callbackAction(type: ACTION_TYPE, data: any) {
    switch (type) {
      case ACTION_TYPE.FENCEMODAL:
        confirm({
          title: '围栏模式',
          content: <FenceModalViewComponent />,
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {}
        });
        break;
      case ACTION_TYPE.EDIT:
        confirm({
          title: '编辑',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfo} formInitValue={{ ...data, isEdit: true }} />,
          onOk() {
            return new Promise((resolve, reject) => {
              handleModalOk(resolve, reject, true, data.id);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {}
        });
        break;
      case ACTION_TYPE.UNBIND:
        confirm({
          title: '提示',
          width: 700,
          content: <span>请再次确定所选车辆解绑电子围栏？</span>,
          onOk() {
            return new Promise((resolve, reject) => {
              handleUnBind(resolve, reject, data.id);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {}
        });
        break;
      case ACTION_TYPE.BATCH_EDIT:
        confirm({
          title: '批量解绑',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfo} formInitValue={{ ...data, isEdit: true }} />,
          onOk() {
            return new Promise((resolve, reject) => {
              handleModalOk(resolve, reject, false, data.id, true);
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel() {}
        });
        break;
      default:
        break;
    }
  }

  function handleUnBind(resolve: any, reject: any, id: string) {
    monitorObjectServiceServiceSubscript.current = monitorObjectServiceService.vehicleUnbind({ id }).subscribe(
      res => {
        resolve();
        getMonitorList();
      },
      () => {
        reject();
      }
    );
  }

  function changeTablePageIndex(index: number, pageSize?: number) {
    setStateWrap({ searchForm: { ...searchForm, index } });
    getMonitorList();
  }

  function searchClick() {
    getMonitorList();
  }

  function getDateTimeInfo($event: any) {
    searchForm.begin = $event[0] + ' 00:00:00';
    searchForm.end = $event[1] + ' 23:59:59';
  }

  function handleModalCancel() {
    setStateWrap({
      visibleModal: false
    });
  }

  const getFormInfoCallback = React.useCallback(getFormInfo, []);

  function getFormInfo(form: FormInstance) {
    formInfo.current = form;
  }

  function handleModalOk(resolve: any, reject: any, isEdit = false, id = '', isBatch = true) {
    console.log(formInfo.current.getFieldsValue());

    const values = { ...formInfo.current.getFieldsValue() };
    values.bindData =
      values.bindData &&
      values.bindData.map((value: { key: string; value: string }) => {
        const bindInfo = JSON.parse(value.value);
        return { thingId: bindInfo.key, thingType: bindInfo.type };
      });
    values.begin = formatToUnix(values.begin);
    values.end = formatToUnix(values.end);
    const url = !isEdit ? (isBatch ? 'vehicleEditBatch' : 'vehicleBind') : 'vehicleEdit';
    monitorObjectServiceServiceSubscript.current = monitorObjectServiceService[url]({ ...values, id }).subscribe(
      res => {
        resolve();
        getMonitorList();
        setStateWrap({
          visibleModal: false,
          confirmModalLoading: false
        });
      },
      () => {
        reject();
        setStateWrap({
          confirmModalLoading: false
        });
      }
    );
  }

  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.BINDCAR:
        confirm({
          title: '绑定车辆',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfoCallback}></CreateBindCarComponent>,
          onOk() {
            return new Promise((resolve, reject) => {
              handleModalOk(resolve, reject, false, '', false);
            }).catch(error => console.log('Oops errors!', error));
          },
          onCancel() {}
        });
        break;
      case ModalType.FENCETYPE:
        confirm({
          title: '围栏模式',
          width: 700,
          content: <FenceModalViewComponent />,
          onOk() {
            return new Promise((resolve, reject) => {
              handleModalOk(resolve, reject);
            }).catch(error => console.log('Oops errors!', error));
          },
          onCancel() {}
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
    openModal,
    getFormSearchInfo
  };
}
