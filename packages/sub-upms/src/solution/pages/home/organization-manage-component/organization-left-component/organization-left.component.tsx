import * as React from 'react';
import { Tree } from 'antd';
import { useOrganizationLeftStore } from './organization-left.component.store';
import { IOrganizationLeftProps } from './organization-left.interface';
function OrganizationLeftComponent(props: IOrganizationLeftProps) {
  const { onLoadData, state, onSelect } = useOrganizationLeftStore(props);
  const { treeData } = state;
  return <Tree loadData={onLoadData} showIcon onSelect={onSelect} treeData={treeData} />;
}

export default React.memo(OrganizationLeftComponent);
