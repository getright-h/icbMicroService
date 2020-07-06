import { IUserLeftState, IUserLeftProps } from './user-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { OrganizationManageService } from '~/solution/model/services/organization-manage.service';
import React, { useEffect } from 'react';
import { EventDataNode } from 'rc-tree/lib/interface';
import { dealWithTreeData, updateTreeData } from '~/framework/util/common/treeFunction';

const SYSTEMID = process.env.SYSTEM_ID;

export function useUserLeftStore(props: IUserLeftProps) {
  const organizationManageService: OrganizationManageService = new OrganizationManageService();
  const { state, setStateWrap } = useStateStore(new IUserLeftState());
  useEffect(() => {
    queryOrganizationTypeListBySystemId(SYSTEMID);
  }, []);
  // 根据根据系统id查找机构类型
  function queryOrganizationTypeListBySystemId(systemId: string) {
    organizationManageService.queryOrganizationTypeListBySystemId(systemId).subscribe(res => {
      const treeData = dealWithTreeData(res);
      setStateWrap({
        treeData
      });
    });
  }

  /**
   *
   * 根据父级Id查询子级机构 和根据typeId查机构
   * @param {string} id 父级id
   * @param {number} hierarchyType 查询的类型
   */
  function queryOrganizationByTypeId(
    typeId: string,
    treeNode: EventDataNode,
    resolve: Function,
    hierarchyType: number
  ) {
    const isHierarchyType = Number.isInteger(hierarchyType);
    const url = isHierarchyType ? 'getOrganizationChild' : 'queryOrganizationByTypeId';
    organizationManageService[url]({ typeId, id: typeId, hierarchyType }).subscribe((res: any) => {
      treeNode.children = dealWithTreeData(res);
      setStateWrap({
        treeData: updateTreeData(state.treeData, treeNode.key, treeNode.children)
      });
      resolve();
    });
  }

  function onLoadData(treeNode: EventDataNode | any): Promise<void> {
    return new Promise(resolve => {
      queryOrganizationByTypeId(treeNode.id, treeNode, resolve, treeNode.hierarchyType);
    });
  }

  function onSelect(selectedKeys: React.Key[], e: { node: EventDataNode }) {
    props.getSelectTreeNode(e.node);
  }

  return { state, onLoadData, onSelect };
}
