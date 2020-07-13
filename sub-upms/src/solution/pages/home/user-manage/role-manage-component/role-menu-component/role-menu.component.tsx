import * as React from 'react';
import style from './role-menu.component.less';
import { Tree, Empty } from 'antd';
import { useRoleMenuStore } from './role-menu.component.store';
import { IRoleMenuProps } from './role-menu.interface';

function RoleMenuComponent(props: IRoleMenuProps) {
  const { state, onCheck } = useRoleMenuStore(props);
  const { checkedKeys } = props;
  const { treeData, expandedKeys } = state;
  return treeData.length ? (
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
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>请选择角色</span>} />
  );
}
export default React.memo(RoleMenuComponent);
