import { IAllocationManageState, ModalType } from './allocation-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { useHistory } from 'react-router-dom';

export function useAllocationManageStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationManageState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const history = useHistory();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setStateWrap({ isLoading: true });
    allocationManageService.queryAllotPagedList(state.searchForm).subscribe(
      res => {
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      err => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(err);
      }
    );
    setStateWrap({
      tableData: [
        {
          id: '827',
          orderNum: '10001548654',
          name: 'A-B-C发货流程',
          detail: 'SII25，10个',
          total: 100,
          org: '品信总部',
          createTime: '2020-08-28',
          creater: '孙杜昂',
          status: '未调拨'
        }
      ]
    });
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
    setStateWrap({ currentId: data ? data.id : '' });
    switch (actionType) {
      case ModalType.DETAIL:
        history.push(`/home/allocation/allocationDetail/${data.id}`);
        break;
      case ModalType.CREATE:
        history.push('/home/allocation/createAllocation');
        break;
      case ModalType.EDIT:
        history.push(`/home/allocation/editAllocation/${data.id}`);
        break;
      case ModalType.RECORD:
        setStateWrap({ visibleModal: true });
      default:
        break;
    }
  }

  function changeTablePageIndex(index: number, pageSize: number) {
    const { searchForm } = state;
    searchForm.page = index;
    searchForm.size = pageSize;
    setStateWrap({ searchForm });
    getTableData();
  }

  function handleModalCancel() {
    setStateWrap({ visibleModal: false });
  }
  function openModal(type: ModalType) {
    switch (type) {
      default:
        break;
    }
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange
  };
}
