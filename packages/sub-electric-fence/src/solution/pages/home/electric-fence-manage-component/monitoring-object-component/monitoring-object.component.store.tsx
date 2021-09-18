import { IMonitoringObjectState, ModalType } from './monitoring-object.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';
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
  const { $auth } = useAuthorityState();
  const { searchForm } = state;
  const formInfo = useRef(null);
  const currentModal = useRef(null);
  const monitorObjectServiceServiceSubscript: { current: Subscription } = useRef();
  useEffect(() => {
    getMonitorList();
    return () => {
      monitorObjectServiceServiceSubscript.current && monitorObjectServiceServiceSubscript.current.unsubscribe();
    };
  }, []);

  function getFormSearchInfo(key: string, option: any) {
    if (option == undefined) {
      option = JSON.stringify('');
    }
    const { info = undefined } = option;
    switch (key) {
      case 'fenceDdlBelong':
        searchForm['thingType'] = info?.type ? info?.type : 0;
        searchForm['thingId'] = info?.key ? info?.key : '';
        break;
      case 'vehicleId':
        searchForm['keyType'] = info?.type ? info?.type : 0;
        searchForm['keyId'] = info?.key ? info?.key : '';
        break;
      default:
        searchForm[key] = option.value;
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
    formInfo.current = null;
    switch (type) {
      case ACTION_TYPE.FENCEMODAL:
        currentModal.current = confirm({
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
        currentModal.current = confirm({
          title: '编辑',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfo} formInitValue={{ ...data, isEdit: true }} />,
          onOk(close) {
            handleModalOk(close, true, data.id);
          },
          onCancel() {}
        });
        break;
      case ACTION_TYPE.UNBIND:
        currentModal.current = confirm({
          title: '提示',
          width: 700,
          content: <span>请再次确定所选车辆解绑电子围栏？</span>,
          onOk() {
            return new Promise((resolve, reject) => {
              handleUnBind(resolve, reject, data.id);
            }).catch(error => console.log('Oops errors!', error));
          },
          onCancel() {}
        });
        break;
      case ACTION_TYPE.BATCH_EDIT:
        currentModal.current = confirm({
          title: '批量修改',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfo} formInitValue={{ ...data, isEdit: true }} />,
          onOk(close) {
            handleModalOk(close, false, data.id, true);
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

  async function handleModalOk(close: any, isEdit = false, id = '', isBatch = true) {
    currentModal.current.update({
      okButtonProps: { loading: true }
    });
    formInfo &&
      formInfo.current
        .validateFields()
        .then(() => {
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
              close();
              getMonitorList();
            },
            () => {
              currentModal.current.update({
                okButtonProps: { loading: false }
              });
            }
          );
        })
        .catch(() => {
          currentModal.current.update({
            okButtonProps: { loading: false }
          });
        });
  }

  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.BINDCAR:
        currentModal.current = confirm({
          title: '绑定车辆',
          width: 700,
          content: <CreateBindCarComponent onValuesChange={getFormInfoCallback}></CreateBindCarComponent>,
          onOk(close) {
            handleModalOk(close, false, '', false);
          },
          onCancel() {}
        });
        break;
      case ModalType.FENCETYPE:
        currentModal.current = confirm({
          title: '围栏模式',
          width: 700,
          content: <FenceModalViewComponent />,
          onOk() {
            console.log(1);
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
    $auth,
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
