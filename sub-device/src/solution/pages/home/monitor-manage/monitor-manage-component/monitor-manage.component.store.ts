import { IMonitorManageState } from './monitor-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { ModalType } from '../monitor-manage.const';
import { Modal } from 'antd';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
const { confirm } = Modal;
export function useMonitorManageStore() {
  const { state, setStateWrap } = useStateStore(new IMonitorManageState());

  const monitorService = useService(MonitorService);
  let queryVehicleGroupPagedListSubscription: Subscription;
  const history = useHistory();
  useEffect(() => {
    getTableData();
    return () => {
      queryVehicleGroupPagedListSubscription && queryVehicleGroupPagedListSubscription.unsubscribe();
    };
  }, []);
  function getTableData() {
    setStateWrap({ isLoading: true });
    queryVehicleGroupPagedListSubscription = monitorService.queryVehicleGroupPagedList(state.searchForm).subscribe(
      (res: any) => {
        setStateWrap({ tableData: res.dataList, total: res.total, isLoading: false });
      },
      (error: any) => {
        setStateWrap({ isLoading: false });
        ShowNotification.error(error);
      }
    );
  }

  function delCarGroup(data: any) {
    const { id = '' } = data;
    if (!id) return;
    monitorService.vehicleGroup({ id }).subscribe(
      (res: any) => {
        ShowNotification.success('删除成功');
        getTableData();
      },
      (error: any) => {
        ShowNotification.warning('删除失败');
        console.log(error);
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
        setStateWrap({ transformModalVisible: true });
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
      onOk: () => {
        delCarGroup(data);
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
    setStateWrap({ addGroupModalVisible: false, addCarModalVisible: false, transformModalVisible: false });
  }
  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }
  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);
    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }
  return {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onChange,
    getTableData,
    onExpand,
    onCheck
  };
}
