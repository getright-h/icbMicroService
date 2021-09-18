import * as React from 'react';
import style from './user-left.component.less';
import { IUserLeftProps } from './user-left.interface';
import { Tree } from 'antd';
import { useUserLeftStore } from './user-left.component.store';

function UserLeftComponent(props: IUserLeftProps) {
  const { onLoadData, state, onSelect } = useUserLeftStore(props);
  const { treeData } = state;
  return <Tree loadData={onLoadData} showIcon onSelect={onSelect} treeData={treeData} />;
}
export default React.memo(UserLeftComponent);
