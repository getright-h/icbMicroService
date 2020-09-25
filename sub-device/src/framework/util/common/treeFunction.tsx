import { BankOutlined, GroupOutlined, ApartmentOutlined } from '@ant-design/icons';
import * as React from 'react';
import { OrganizationInfo } from '~/solution/model/dto/organization-tree.dto';
import { NewDataNode } from '~/solution/pages/home/stock-manage/stock-manage-component/stock-manage-left-component/stock-manage-left.interface';

export function dealWithTreeData(res: OrganizationInfo[] | any) {
  const treeData: NewDataNode[] = res.map((organization: any) => {
    const treeDataChild: NewDataNode = { ...organization, title: '', key: '' };
    treeDataChild.title = organization.name;
    treeDataChild.key = organization.id;
    treeDataChild.isLeaf = !organization.isHasChildren;
    return treeDataChild;
  });
  return treeData;
}
// 节点key匹配
export function updateTreeData(list: NewDataNode[], key: React.Key, children: NewDataNode[] | any): NewDataNode[] {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children
      };
    } else if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children as any, key, children)
      };
    }
    return node;
  });
}
