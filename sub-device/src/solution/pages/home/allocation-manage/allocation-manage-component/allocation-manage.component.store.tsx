import { IAllocationManageState } from './allocation-manage.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

import { ModalType } from '~shared/constant/common.const';
import { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';

const { confirm } = Modal;
export function useAllocationManageStore() {
  const { state, setStateWrap, getState } = useStateStore(new IAllocationManageState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  let allocationManageServiceSubscribable: Subscription;
  let deleteAllotSubscribable: Subscription;
  const { $auth } = useAuthorityState();
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    getTableData();
    return () => {
      allocationManageServiceSubscribable && allocationManageServiceSubscribable.unsubscribe();
      deleteAllotSubscribable && deleteAllotSubscribable.unsubscribe();
    };
  }, []);

  function getTableData() {
    const { searchForm } = getState();
    setStateWrap({ isLoading: true });
    allocationManageServiceSubscribable = allocationManageService.queryAllotPagedList(searchForm).subscribe(
      res => {
        console.log(res);
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
  function searchClean() {
    const initParams = {
      index: 1,
      size: 10,
      state: -1,
      code: ''
    };
    form.resetFields();

    setStateWrap({
      searchForm: initParams
    });
    // const setState = new Promise((reslove, reject) => {
    //   setStateWrap({
    //     searchForm: initParams
    //   });
    //   reslove();
    // });
    // setState.then((res: any) => {
    //   getTableData();
    // });
    getTableData();
  }
  function callbackAction<T>(actionType: number, data?: any) {
    setStateWrap({ currentId: data ? data.allotId : '' });
    switch (actionType) {
      case ModalType.ALLOCATE:
        history.push(`./process?id=${data.inventoryCode}`);
        break;
      case ModalType.SEE:
        history.push(`./allocationDetail?id=${data.allotId}`);
        break;
      case ModalType.CREATE:
        history.push('./createAllocation');
        break;
      case ModalType.EDIT:
        history.push(`./editAllocation?id=${data.allotId}`);
        break;
      case ModalType.DELETE:
        deleteAlloaction(data.allotId);
        break;
      case ModalType.RECORD:
        setStateWrap({ visibleModal: true });
      default:
        break;
    }
  }

  function deleteAlloaction(allotId: string) {
    if (!allotId) return;
    confirm({
      content: '确认删除此调拨',
      onOk() {
        deleteAllotSubscribable = allocationManageService.deleteAllot({ id: allotId }).subscribe(
          (res: any) => {
            ShowNotification.success('删除成功');
            console.log(res);
            getTableData();
          },
          (error: any) => {
            console.log(error);
          }
        );
      },
      onCancel() {
        console.log('Cancel');
      }
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
    form,
    $auth,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    onChange,
    searchClean
  };
}
