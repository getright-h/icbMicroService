import { IMonitorManageState } from './monitor-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ModalType } from '../monitor-manage.const';
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

  function callbackAction<T>(actionType: number, data?: T) {
    setStateWrap({ currentData: { ...data } });
    switch (actionType) {
      case ModalType.ADD_GROUP:
        setStateWrap({ addGroupModalVisible: true });
        break;
      case ModalType.ADD_CAR:
        setStateWrap({ addCarModalVisible: true });
        break;
      case ModalType.DEL:
        renderDelMonitorModal(data);
        break;
      case ModalType.BATCH_TRANFROM:
        break;
    }
  }
  /**
   * 渲染删除监控组
   * @param data
   */
  function renderDelMonitorModal(data: any) {
    confirm({
      content: '是否确认删除',
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
    setStateWrap({ addGroupModalVisible: false, addCarModalVisible: false });
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
