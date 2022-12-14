import { IReceiveAllocationState } from './receive-allocation.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ALLOW_FLOW_KEYCODE_ENUM, ModalType } from '~shared/constant/common.const';
import { Modal } from 'antd';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';

const { confirm } = Modal;
export function useReceiveAllocationStore() {
  const { state, setStateWrap, getState } = useStateStore(new IReceiveAllocationState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let setAllotFlowSubscription: Subscription;
  const history = useHistory();
  useEffect(() => {
    getTableData();
    return () => {
      setAllotFlowSubscription && setAllotFlowSubscription.unsubscribe();
    };
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    setAllotFlowSubscription = allocationManageService.queryAllotRecipientPagedList(getState().searchForm).subscribe(
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
    setStateWrap({ currentId: data.id, currentData: { ...data, actionType }, currentActionType: actionType });
    switch (actionType) {
      case ModalType.LOOK:
        history.push(`./receiveDetail/${data.id}`);
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
        setStateWrap({
          importVisible: true
        });
        break;
      case ModalType.PASS:
        renderPassModal(data);
        break;
      case ModalType.SET_RETURN:
        setStateWrap({
          rejectVisibleModal: true
        });
        break;
      default:
        break;
    }
  }
  /**
   * ????????????Modal??????
   * @param data
   */
  function renderReciveModal(data: any) {
    confirm({
      content: '??????????????????',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Receive
        };
        const msg = '????????????';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getTableData();
            ShowNotification.success(msg);
          }
        });
      }
    });
  }

  /**
   * ????????????Modal??????
   * @param data
   */
  function renderMoveModal(data: any) {
    confirm({
      content: '??????????????????',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Move
        };
        const msg = '????????????';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getTableData();
            ShowNotification.success(msg);
          }
        });
      }
    });
  }

  /**
   * ????????????Modal??????
   * @param data
   */
  function renderPassModal(data: any) {
    confirm({
      content: '??????????????????',
      onOk: () => {
        const params = {
          operation: ALLOW_FLOW_KEYCODE_ENUM.Pass
        };
        const msg = '????????????';
        allocationOperate(data, params).then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            getTableData();
            ShowNotification.success(msg);
          }
        });
      }
    });
  }

  /**
   * ??????????????????
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
    setStateWrap({ visibleModal: false, rejectVisibleModal: false, importVisible: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      case ModalType.LOOK:
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
