import { IStockManageLeftProps, IStockManageLeftState } from './stock-manage-left.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import React, { useEffect } from 'react';
import { EventDataNode } from 'antd/lib/tree';
import { OrganizationTreeService } from '~/solution/model/services/organization-tree.service';
import { ShowNotification } from '~/framework/util/common';
import { dealWithTreeData, updateTreeData } from '~/framework/util/common/treeFunction';

export function useStockManageLeftStore(props: IStockManageLeftProps) {
  const { state, setStateWrap } = useStateStore(new IStockManageLeftState());
  const organizationTreeService: OrganizationTreeService = useService(OrganizationTreeService);

  useEffect(() => {
    queryOrganizationListByTypeId(process.env.TYPE_ID);
  }, []);

  function queryOrganizationListByTypeId(typeId: string) {
    organizationTreeService.queryStoreOrganization({ typeId }).subscribe(
      res => {
        const treeData = dealWithTreeData(res);
        setStateWrap({
          treeData
        });
      },
      err => {
        ShowNotification.error(err);
      }
    );
  }
  function querySubOrganizationByParentId(parentId: string, treeNode: EventDataNode, resolve: Function) {
    organizationTreeService.queryStoreOrganizationListSub(parentId).subscribe((res: any) => {
      treeNode.children = dealWithTreeData(res);
      setStateWrap({
        treeData: updateTreeData(state.treeData, treeNode.key, treeNode.children)
      });
      resolve();
    });
  }

  function onSelect(selectedKeys: React.Key[], e: { node: EventDataNode }) {
    props.getSelectTreeNode(e.node);
  }

  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      querySubOrganizationByParentId(treeNode.id, treeNode, resolve);
    });
  }

  return { state, onLoadData, onSelect };
}
