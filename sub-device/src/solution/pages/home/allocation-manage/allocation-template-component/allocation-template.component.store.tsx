import * as React from 'react';
import { IAllocationTemplateState, ModalType } from './allocation-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { useHistory } from 'react-router-dom';

export function useAllocationTemplateStore() {
  const { state, setStateWrap } = useStateStore(new IAllocationTemplateState());
  const allocationManageService: AllocationManageService = new AllocationManageService();
  const history = useHistory();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    // setStateWrap({ isLoading: true });
    // allocationTemplateService.__getTableData__(state.searchForm).subscribe(
    //   res => {
    //     setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
    //   },
    //   err => {
    //     setStateWrap({ isLoading: false });
    //     ShowNotification.error(err);
    //   }
    // );
    setStateWrap({
      tableData: [
        {
          id: '327',
          name: '退仓流程1',
          type: '仓库间流程',
          org: '品信总部',
          creater: '吴小白',
          createTime: '2020-08-26 00:00:00'
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
    searchForm.page = 1;
    setStateWrap({ searchForm });
    getTableData();
  }

  function callbackAction<T>(actionType: number, data?: T) {
    switch (actionType) {
      case ModalType.CREATE:
        history.push('/home/allocation/templateEdit');
        break;
      case ModalType.EDIT:
        history.push(`/home/allocation/templateDetail/${data.id}`);
        break;
      case ModalType.DELETE:
        break;
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

  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    onChange
  };
}
