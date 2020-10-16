import { IDetailState, IFlowNode } from './detail.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import { ModalType, ALLOW_FLOW_KEYCODE_ENUM } from '~shared/constant/common.const';
import { Modal } from 'antd';
import { ShowNotification } from '~/framework/util/common';

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
    allocationManageServiceSubscription = allocationManageService.queryAllPromoterDetail({ id }).subscribe(
      (res: any) => {
        setStateWrap({
          detail: { ...res, id }
        });
        setAlloactionTemplateFlowData(res.flowList);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // 节点流程数据重构
  function setAlloactionTemplateFlowData(flowListData: Array<IFlowNode>) {
    if (!Array.isArray(flowListData) || !flowListData.length) return;
    const flowList = [];
    // 根据获取所有的sort,并且去重来获取流程的节点长度
    const sort: Array<number> = flowListData.map(flow => flow.sort);
    const nodeLength = sort.length;
    // 数组去重未作处理！！！！
    for (let i = 1; i <= nodeLength; i++) {
      flowList.push(flowListData.filter((flow: IFlowNode) => flow.sort == i));
    }
    setStateWrap({ flowList });
  }

  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentData: { ...data, id } });
    switch (actionType) {
      case ModalType.CREATE:
      case ModalType.REAPPLY:
        setStateWrap({ importVisible: true });
        break;
      case ModalType.ROLLBACK:
        setStateWrap({ rollbackVisible: true });
        break;
      case ModalType.REVOKE:
        renderRevokeModal(data);
        break;
      case ModalType.RETURN:
        renderRecReturnModal(data);
        break;
      case ModalType.GO_BACK:
        history.push('/home/allocation/process?active=one');
        break;
    }
  }
  function renderRecReturnModal(data: any) {
    confirm({
      content: '是否确认收到退货?',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.ReturnReceived
        };
        const msg = '收货成功!';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            ShowNotification.success(msg);
            getAlloactionDetail(id);
          }
        });
      }
    });
  }
  /**
   * 渲染撤销数据提示框
   * @param data
   */
  function renderRevokeModal(data: any) {
    const { deviceTypeList = [] } = data;
    const totalNUmber = deviceTypeList
      .map((item: any) => item.number)
      .reduce((per: number, next: number) => per + next, 0);
    confirm({
      content: `撤销后设备将退回仓库,共${totalNUmber}个设备,是否确认撤销?`,
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.ReCall
        };
        const msg = '撤回成功!';
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
    setStateWrap({ currentData: {}, importVisible: false, rollbackVisible: false });
  }
  return { state, callbackAction, handleModalCancel, getAlloactionDetail };
}
