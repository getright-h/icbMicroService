import * as React from 'react';
import style from './role-menu.component.less';
import { Tree } from 'antd';
import { useRoleMenuStore } from './role-menu.component.store';
import { IRoleMenuProps } from './role-menu.interface';

function RoleMenuComponent(props: IRoleMenuProps) {
  const { state, onCheck } = useRoleMenuStore(props);
  const { checkedKeys } = props;
  const { treeData, expandedKeys } = state;
  return (
    <Tree
      checkable
      showLine
      checkStrictly
      selectable={false}
      onCheck={onCheck}
      treeData={treeData}
      checkedKeys={checkedKeys}
      expandedKeys={expandedKeys}
    />
  );
}
export default React.memo(RoleMenuComponent);
