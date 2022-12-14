import { IInitAllocationState } from './init-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { ALLOW_FLOW_KEYCODE_ENUM, ModalType } from '~shared/constant/common.const';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';
import { Modal, Form } from 'antd';
import { Subscription } from 'rxjs';
import { getQueryParams } from '~/framework/util/common';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';
/**
 * moda需要返回一个 promise 来实现异步关闭
 */
const { confirm } = Modal;

export function useInitAllocationStore() {
  const { state, setStateWrap, getState } = useStateStore(new IInitAllocationState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const history = useHistory();
  const [form] = Form.useForm();
  const { $auth } = useAuthorityState();
  let allotCode = '';
  let setAllotFlowSubscription: Subscription;
  let queryAllotPromoterPagedListSubscription: Subscription;
  useEffect(() => {
    getDefaultParams();
    getTableData(allotCode);
    return () => {
      setAllotFlowSubscription && setAllotFlowSubscription.unsubscribe();
      queryAllotPromoterPagedListSubscription && queryAllotPromoterPagedListSubscription.unsubscribe();
    };
  }, []);

  // 获取默认路由参数
  function getDefaultParams() {
    const { id = '' } = getQueryParams();
    const { searchForm } = state;
    allotCode = id;
    form.setFieldsValue({ allotCode: allotCode });

    setStateWrap({
      searchForm: {
        ...searchForm,
        allotCode
      }
    });
  }

  function getTableData(allotCode?: string) {
    setStateWrap({ isLoading: true });
    const { searchForm } = getState();
    queryAllotPromoterPagedListSubscription = allocationManageService
      .queryAllotPromoterPagedList(allotCode ? { allotCode: allotCode, ...searchForm } : searchForm)
      .subscribe(
        res => {
          setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
        },
        err => {
          setStateWrap({ isLoading: false });
          ShowNotification.error(err);
        }
      );
  }

  function onChange(value: any, valueType: string) {
    const { searchForm } = state;
    if (valueType == 'time') {
      value[0] ? (searchForm.beginTime = Date.parse(value[0] + ' 00:00:00')) : (searchForm.beginTime = 0);
      value[1] ? (searchForm.endTime = Date.parse(value[1] + ' 23:59:59')) : (searchForm.endTime = 0);
      setStateWrap({
        searchForm: { ...searchForm }
      });
      return;
    }
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
  }
  function searchClick() {
    const { searchForm } = state;
    searchForm.index = 1;
    setStateWrap({ searchForm });
    getTableData();
  }

  function callbackAction<T>(actionType: number, data: T) {
    setStateWrap({ currentId: data.id, currentData: data });
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
      case ModalType.DETAIL:
        history.push(`./initDetail/${data.id}`);
      default:
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
        return new Promise((reslove: any, reject: any) => {
          allocationOperate(data, params).then(
            (res: any) => {
              const { isSuccess } = res;
              if (isSuccess) {
                getTableData();
                ShowNotification.success(msg);
              }
              reslove();
            },
            () => {
              reslove();
            }
          );
        });
      }
    });
  }
  /**
   * 渲染撤销数据提示框
   * @param data
   *
   */
  function renderRevokeModal(data: any) {
    const { totalNumber } = data;
    confirm({
      content: `撤销后设备将退回仓库,共${totalNumber}个设备,是否确认撤销?`,
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.ReCall
        };
        const msg = '撤回成功!';
        return new Promise((reslove: any, reject: any) => {
          allocationOperate(data, params).then(
            (res: any) => {
              const { isSuccess } = res;
              if (isSuccess) {
                getTableData();
                ShowNotification.success(msg);
              }
              reslove();
            },
            () => {
              reslove();
            }
          );
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

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.index = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ currentData: {}, importVisible: false, rollbackVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.CREATE:
        break;
      default:
        break;
    }
  }
  function searchClean() {
    const initSearchForm = {
      beginTime: 0,
      endTime: 0,
      index: 1,
      size: 10,
      state: -1
    };
    setStateWrap({
      searchForm: initSearchForm
    });
    getTableData();
  }
  return {
    state,
    form,
    $auth,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange,
    getTableData,
    allocationOperate,
    searchClean
  };
}
