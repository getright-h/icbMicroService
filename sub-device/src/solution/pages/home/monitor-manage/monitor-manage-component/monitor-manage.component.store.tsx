import { IMonitorManageState } from './monitor-manage.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { Key, useContext, useRef } from 'react';
import { EventDataNode } from 'antd/lib/tree';
import { ShowNotification } from '~/framework/util/common';
import { MonitorService } from '~/solution/model/services/monitor.service';
import { ModalType } from '../monitor-manage.const';
import { Modal } from 'antd';
import { Subscription } from 'rxjs';
import { useHistory } from 'react-router-dom';
import { DataNode } from 'rc-tree/lib/interface';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';

const { confirm } = Modal;
export function useMonitorManageStore() {
  const { state, setStateWrap } = useStateStore(new IMonitorManageState());
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();
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
    monitorService.groupRelation({ id }).subscribe(
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

  function callbackAction<T>(actionType: number, data?: T | any) {
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
      case ModalType.ALARM:
        setStateWrap({ alarmModalVisible: true });
        break;
      case ModalType.DETAIL:
        history.push(`/home/customer/vehicleDetail/${data.vehicleId}`);
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

  function handleModalCancel(isSucess = false) {
    setStateWrap({
      addGroupModalVisible: false,
      addCarModalVisible: false,
      transformModalVisible: false,
      alarmModalVisible: false
    });
    isSucess && getTableData();
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
  function onSelectChange(selectedRowKeys: string[], selectedObject: any) {
    const selected = selectedObject.map((select: any) => select.vehicleId);
    setStateWrap({ selectedRowKeys: selectedRowKeys, transformSelected: selected, transformDisable: !selected.length });
  }

  const queryChildInfo = (item: any) => {
    if (!item) return null;
    return monitorService.queryVehicleGroupList(item);
  };

  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    const { searchForm, currentMonitorGroup } = state;
    searchForm.groupId = e.node?.id;
    currentMonitorGroup.name = e.node?.name;
    currentMonitorGroup.id = e.node?.id;
    setStateWrap({
      treeSelectedKeys: [e.node.key as string],
      searchForm,
      currentMonitorGroup
    });
    getTableData();
    // setTreeSelectNode(e.node, dispatch);
  }
  function deletemonitorGroup(element: any) {
    // 获取当前仓位
    confirm({
      title: '删除',
      content: `是否确认删除监控组--【${element.name}】？`,
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteWarehouse(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }
  function editmonitorGroup(element: any) {
    console.log(element, 'element');
    callbackAction(ModalType.ADD_GROUP, element);
  }

  function confirmDeleteWarehouse(resolve: Function, element: any) {
    monitorService.vehicleGroup({ id: element.id }).subscribe(() => {
      // 删除完毕后关闭弹窗，然后在当前的 treeData 上删除
      ShowNotification.success('删除成功！');
      resolve();
      deleteCurrentTreeData(element.id);
    });
  }
  // 在当前的tree上操作并显示相应的效果
  function deleteCurrentTreeData(id: string) {
    organizationControllerRef.current.deleteCurrentTreeData(id);
  }

  //在当前的tree上操作并显示相应的效果
  function alertCurrentTreeData(id: string, title: string) {
    organizationControllerRef.current.alertCurrentTreeData(id, title);
  }

  //在当前的tree上操作并显示相应的效果
  function setSingleCheckTreeData(id: string) {
    organizationControllerRef.current.setSingleCheckTreeData(id);
  }
  function monitorGroupAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deletemonitorGroup(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editmonitorGroup(element)} className="a-link">
          修改
        </a>
      </div>
    );
  }

  //在当前的tree上操作并显示相应的效果
  function appendNewNodeToCurrentTreeData(data: object) {
    organizationControllerRef.current.appendNewNodeToCurrentTreeData(data);
  }

  return {
    state,
    organizationControllerRef,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    onChange,
    getTableData,
    onExpand,
    onCheck,
    queryChildInfo,
    onSelect,
    deletemonitorGroup,
    editmonitorGroup,
    onSelectChange,
    alertCurrentTreeData,
    setSingleCheckTreeData,
    monitorGroupAction,
    appendNewNodeToCurrentTreeData
  };
}
