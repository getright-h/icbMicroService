import { NewDataNode } from '~/solution/pages/home/organization-manage-component/organization-left-component/organization-left.interface';
import { BankOutlined, GroupOutlined, ApartmentOutlined } from '@ant-design/icons';
import * as React from 'react';
import { OrganizationTypeResponse, Datum } from '~/solution/model/dto/organization-manage.dto';
export function dealWithTreeData(res: OrganizationTypeResponse[] | Datum[] | any) {
  const treeData: NewDataNode[] = res.map((organizationType: any) => {
    const treeDataChild: NewDataNode = { ...organizationType, title: '', key: '' };
    treeDataChild.title = organizationType.name;
    treeDataChild.key = organizationType.id;
    treeDataChild.isLeaf = !organizationType.isHasChildren;
    treeDataChild.icon = Number.isInteger(organizationType.hierarchyType) ? (
      organizationType.hierarchyType == 0 ? (
        <BankOutlined />
      ) : (
        <GroupOutlined />
      )
    ) : (
      <ApartmentOutlined />
    );
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
