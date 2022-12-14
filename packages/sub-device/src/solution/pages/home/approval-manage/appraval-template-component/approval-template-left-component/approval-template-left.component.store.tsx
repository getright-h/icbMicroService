import { IApprovalTemplateLeftState } from './approval-template-left.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useContext, Key, useRef, useEffect } from 'react';
import * as React from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { EventDataNode } from 'antd/lib/tree';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '~/framework/util/common';
import confirm from 'antd/lib/modal/confirm';
import { setTreeSelectNode } from '../appraval-template-redux/appraval-template-action';
import { AppravalTemplateManageContext } from '../appraval-template.component';
import { OrganizationExportFunction } from '~/solution/components/organization-controller-component/organization-controller.interface';
import {
  dealWithTreeData,
  updateTreeData,
  deleteTreeDataByKey,
  alterTreeDataByKey,
  addTreeDataByOrgId
} from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TREE_MAP } from '../appraval-template.interface';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { DataNode } from 'rc-tree/lib/interface';
import { useAuthorityState } from '~/framework/aop/hooks/use-authority-state';

export function useApprovalTemplateLeftStore() {
  const { dispatch } = useContext(AppravalTemplateManageContext);
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTemplateLeftState());
  const organizationControllerRef: { current: OrganizationExportFunction } = useRef();
  const warehouseListService: WarehouseListService = new WarehouseListService();
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const { gState }: IGlobalState = useContext(GlobalContext);
  const { $auth } = useAuthorityState();
  const formInfo = useRef({ index: 1, size: 10 });

  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, []);

  // ??????????????????id??????????????????
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService
      .queryStoreOrganization({ typeId: gState.myInfo.typeId, id, ...formInfo.current })
      .subscribe(res => {
        const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res.dataList, TREE_MAP, false, undefined);
        setStateWrap({
          treeData,
          organazationList: res.dataList
        });
      });
  }

  // ????????????????????????
  function onLoadData(treeNode: EventDataNode | any) {
    //?????? ??????????????????
    return new Promise<void>(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  function onChooseAll() {
    setTreeSelectNode(
      {
        isAll: true
      },
      dispatch
    );
    setStateWrap({
      treeSelectedKeys: []
    });
  }

  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode | any, resolve: Function) {
    approvalManageService.queryApprovalGroupList({ organizationId: parentId }).subscribe(res => {
      const queryChildInfoData: DataNode[] = dealWithTreeData(
        res,
        {
          title: 'name',
          key: 'id'
        },
        true,
        groupAction
      );

      treeNode.children = queryChildInfoData;
      const treeData = updateTreeData(state.treeData, treeNode.key, treeNode.children);

      setStateWrap({
        treeData
      });
      resolve();
    });
  }

  // ????????????
  function groupAction(element: any) {
    return (
      <div className="actions">
        <a
          className={`${$auth['deleteApprovalGroup'] ? 'a-link' : 'a-link no-auth-link'}`}
          onClick={() => deleteGroup(element)}
        >
          ??????
        </a>
        <p></p>
        <a
          className={`${$auth['editApprovalGroup'] ? 'a-link' : 'a-link no-auth-link'}`}
          onClick={() => editGroup(element)}
        >
          ??????
        </a>
      </div>
    );
  }

  function deleteGroup(element: any) {
    // ??????????????????
    confirm({
      title: '??????',
      icon: <ExclamationCircleOutlined />,
      content: '?????????????????????',
      okText: '??????',
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

  function confirmDeleteWarehouse(resolve: Function, element: any) {
    approvalManageService.deleteApprovalGroup({ id: element.id }).subscribe(() => {
      ShowNotification.success('????????????');
      console.log(getState().treeData);
      const treeData = deleteTreeDataByKey(getState().treeData, element.id);

      setStateWrap({
        treeData: treeData
      });
      resolve();
    });
  }

  // ????????????????????????
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode({ isAll: false, node: e.node }, dispatch);
  }

  // ????????????????????????
  function addTemplateType() {
    setStateWrap({ addApprovalTypeVisible: true });
  }

  function editGroup(element: any) {
    setStateWrap({
      addApprovalTypeVisible: true,
      isEditApprovalModal: true,
      groupId: element.id
    });
  }

  function closeAddTemplateTypeModal(isRefresh: boolean, data: any, isEdit?: boolean) {
    const { treeData } = state;

    let newTreeData: DataNode[] = treeData;
    if (isRefresh) {
      console.log(organizationControllerRef.current);
      // queryOrganizationTypeListByTypeId();
      isEdit
        ? (newTreeData = alterTreeDataByKey(treeData, data.id, data.name))
        : (newTreeData = addTreeDataByOrgId(treeData, data));
    }
    setStateWrap({
      isEditApprovalModal: false,
      addApprovalTypeVisible: false,
      groupId: '',
      treeData: newTreeData
      // expandedKeys: []
    });
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  const queryChildInfo = (item: any) => approvalManageService.queryApprovalGroupList(item);

  return {
    state,
    $auth,
    addTemplateType,
    onSelect,
    closeAddTemplateTypeModal,
    organizationControllerRef,
    onExpand,
    onChooseAll,
    onLoadData,
    groupAction,
    queryChildInfo
  };
}
