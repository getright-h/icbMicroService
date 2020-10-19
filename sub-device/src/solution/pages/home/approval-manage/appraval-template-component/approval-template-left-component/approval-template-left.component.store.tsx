import { IApprovalTemplateLeftState } from './approval-template-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { useContext, useEffect, Key } from 'react';
import * as React from 'react';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { dealWithTreeData, deleteTreeDataByKey, updateTreeData } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { TREE_MAP } from '../appraval-template.interface';
import { forkJoin } from 'rxjs';
import { EventDataNode } from 'antd/lib/tree';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ShowNotification } from '~/framework/util/common';
import confirm from 'antd/lib/modal/confirm';
import { setTreeSelectNode } from '../appraval-template-redux/appraval-template-action';
import { AppravalTemplateManageContext } from '../appraval-template.component';

export function useApprovalTemplateLeftStore() {
  const { dispatch } = useContext(AppravalTemplateManageContext);
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTemplateLeftState());
  const { gState }: IGlobalState = useContext(GlobalContext);

  const warehouseListService: WarehouseListService = new WarehouseListService();
  useEffect(() => {
    queryOrganizationTypeListByTypeId();
  }, []);

  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListByTypeId(id?: string) {
    warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
      const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false);
      setStateWrap({
        treeData
      });
    });
  }

  // 点击选择当前的组
  function onSelect(selectedKeys: Key[], e: { node: EventDataNode }) {
    setStateWrap({
      treeSelectedKeys: [e.node.key as string]
    });
    setTreeSelectNode(e.node, dispatch);
  }

  // 添加组，显示弹窗
  function addTemplateType() {
    setStateWrap({ addApprovalTypeVisible: true });
  }

  // 删除仓库的弹窗
  function deleteApprovalType(element: any) {
    // 获取当前仓位
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除组将清空所有信息，是否确认删除？',
      okText: '删除',
      onOk() {
        return new Promise(resolve => {
          confirmDeleteApprovalType(resolve, element);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmDeleteApprovalType(resolve: Function, element: any) {
    warehouseListService.deleteWarehouse({ storeId: element.id }).subscribe(() => {
      // 删除完毕后关闭弹窗，然后在当前的 treeData 上删除
      ShowNotification.success('删除成功！');
      resolve();
      deleteCurrentTreeData(element.id);
    });
  }

  // 在当前的tree上操作并显示相应的效果
  function deleteCurrentTreeData(id: string) {
    const treeData = deleteTreeDataByKey(getState().treeData, id);
    setStateWrap({
      treeData: treeData
    });
  }

  // 组的操作
  function approvalAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deleteApprovalType(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editApprovalType(element)} className="a-link">
          编辑
        </a>
      </div>
    );
  }

  function editApprovalType(element: any) {
    setStateWrap({
      addApprovalTypeVisible: true,
      isEditApprovalModal: true,
      editApprovalId: element.id
    });
  }

  // 点击展开加载数据
  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      queryStoreOrganizationListSub(treeNode.id, treeNode, resolve);
    });
  }

  /**
   *
   * 根据父级Id查询子级机构
   * @param {string} id 父级id
   */
  function queryStoreOrganizationListSub(parentId: string, treeNode: EventDataNode, resolve: Function) {
    forkJoin(
      warehouseListService.queryStoreOrganizationListSub({ parentId }),
      // 查询组的列表
      warehouseListService.queryStoreListByOrganizationId({ organizationId: parentId })
    ).subscribe((res: any) => {
      treeNode.children = [
        ...dealWithTreeData(res[1], TREE_MAP, true, approvalAction),
        ...dealWithTreeData(res[0], TREE_MAP, false)
      ];
      setStateWrap({
        treeData: updateTreeData(state.treeData, treeNode.key, treeNode.children)
      });
      resolve();
    });
  }

  // 搜索得到想要的key获取当前组
  function getCurrentSelectInfo<T>(value: T, key: string) {
    setStateWrap({
      loadStoreOrganizationParams: {
        ...state.loadStoreOrganizationParams,
        [key]: value
      }
    });
    // TODO:
    // searchCurrentSelectInfo(getState().loadStoreOrganizationParams);
  }

  function closeAddTemplateTypeModal(isRefresh: boolean, id: string) {
    setStateWrap({
      isEditApprovalModal: false,
      addApprovalTypeVisible: false,
      editApprovalId: ''
    });

    isRefresh && queryOrganizationTypeListByTypeId();
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  return { state, addTemplateType, onLoadData, getCurrentSelectInfo, onSelect, closeAddTemplateTypeModal, onExpand };
}
