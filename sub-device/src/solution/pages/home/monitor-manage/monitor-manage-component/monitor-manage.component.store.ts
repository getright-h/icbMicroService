import { IMonitorManageState } from './monitor-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ModalType } from '~shared/constant/common.const';
import { Modal } from 'antd';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
const { confirm } = Modal;
export function useMonitorManageStore() {
  const { state, setStateWrap } = useStateStore(new IMonitorManageState());

  const allocationManageService: AllocationManageService = new AllocationManageService();
  let setAllotFlowSubscription: Subscription;
  const history = useHistory();
  useEffect(() => {
    return () => {
      setAllotFlowSubscription && setAllotFlowSubscription.unsubscribe();
    };
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    allocationManageService.queryAllotRecipientPagedList(state.searchForm).subscribe(
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
    setStateWrap({
      searchForm: {
        ...state.searchForm,
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
        history.push(`/home/allocation/receiveDetail/${data.id}`);
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
        break;
      case ModalType.PASS:
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
   * 渲染接收Modal操作
   * @param data
   */
  function renderReciveModal(data: any) {
    confirm({
      content: '是否确认接收',
      onOk: () => {}
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
    setStateWrap({ visibleModal: false, rejectVisibleModal: false });
  }

  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onChange,
    getTableData
  };
}
