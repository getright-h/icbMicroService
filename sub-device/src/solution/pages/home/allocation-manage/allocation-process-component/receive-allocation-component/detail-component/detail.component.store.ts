import { IDetailState, IFlowNode } from './detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import { ShowNotification } from '~/framework/util/common';

import { ALLOW_FLOW_KEYCODE_ENUM, ModalType } from '~shared/constant/common.const';
import { Modal } from 'antd';
const { confirm } = Modal;
export function useDetailStore() {
  const { state, setStateWrap } = useStateStore(new IDetailState());
  const { id } = useParams();
  const history = useHistory();
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let allocationManageServiceSubscription: Subscription;
  useEffect(() => {
    getAlloactionDetail(id);
    return () => {
      allocationManageServiceSubscription && allocationManageServiceSubscription.unsubscribe();
    };
  }, []);
  //获取调拨单详情
  function getAlloactionDetail(id: string) {
    if (!id) return;
    allocationManageServiceSubscription = allocationManageService.queryAllotRecipientDetail({ id }).subscribe(
      (res: any) => {
        setStateWrap({
          detail: { ...res, id }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentData: { ...data, id, actionType }, currentActionType: actionType });
    switch (actionType) {
      case ModalType.GO_BACK:
        history.push('/home/allocation/process?active=two');
        break;
      case ModalType.RECIVE:
        renderReciveModal(data);
        break;
      case ModalType.REJECT:
        setStateWrap({
          rejectVisibleModal: true
        });
        break;
      case ModalType.MOVE:
        renderMoveModal(data);
        break;
      case ModalType.PASS:
        renderPassModal(data);
        break;
      case ModalType.SET_RETURN:
        setStateWrap({
          rejectVisibleModal: true
        });
        break;
      case ModalType.APPLY_REVOKE:
        setStateWrap({
          rejectVisibleModal: true
        });
        break;
      default:
        break;
    }
  }
  /**
   * 渲染接收Modal操作
   * @param data
   */
  function renderReciveModal(data: any) {
    confirm({
      content: '是否确认接收',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Receive
        };
        const msg = '接收成功';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getAlloactionDetail(id);
            ShowNotification.success(msg);
          }
        });
      }
    });
  }
  /**
   * 渲染流转Modal操作
   * @param data
   */
  function renderMoveModal(data: any) {
    confirm({
      content: '是否确认流转',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Move
        };
        const msg = '流转成功';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getAlloactionDetail(id);
            ShowNotification.success(msg);
          }
        });
      }
    });
  }
  /**
   * 渲染通过Modal操作
   * @param data
   */
  function renderPassModal(data: any) {
    confirm({
      content: '是否确认收货',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Pass
        };
        const msg = '接收成功';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getAlloactionDetail(id);
            ShowNotification.success(msg);
          }
        });
      }
    });
  }

  /**
   * 操作数据请求
   * @param data
   */
  async function allocationOperate(data: any, params: any) {
    const { allotId, id } = data;
    if (!allotId || !id) return;
    const queryParams = {
      allotId,
      id,
      ...params
    };
    return new Promise((reslove, reject) => {
      allocationManageService.setAllotFlow(queryParams).subscribe(
        (res: any) => {
          reslove(res);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }
  function handleModalCancel() {
    setStateWrap({ rejectVisibleModal: false });
  }
  return { state, handleModalCancel, callbackAction, allocationOperate, getAlloactionDetail };
}
