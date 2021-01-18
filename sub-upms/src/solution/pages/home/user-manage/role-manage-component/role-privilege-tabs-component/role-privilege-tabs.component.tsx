import * as React from 'react';
import style from './role-privilege-tabs.component.less';
import { Checkbox, Tooltip, Button, Empty, Tree, Card } from 'antd';
import { IRolePrivilegeTabsProps } from './role-privilege-tabs.interface';
import { useRolePrivilegeTabsStore } from './role-privilege-tabs.component.store';
import { useMemo } from 'react';

function RolePrivilegeTabsComponent(props: IRolePrivilegeTabsProps) {
  const {
    state,
    onCheckMenu,
    checkGroupAllPrivileges,
    checkPrivilege,
    submitMenuRelation,
    checkAllPrivileges,
    checkAllMenus
  } = useRolePrivilegeTabsStore(props);
  const { treeData, expandedKeys, checkedKeys, checkedNodes, isLoading, checkAll, checkAllMenu } = state;

  function RenderHeader() {
    return useMemo(() => {
      return (
        <React.Fragment>
          <h4>权限列表</h4>
          <Button type="primary" onClick={() => submitMenuRelation()} loading={isLoading} disabled={!props.roleId}>
            保存
          </Button>
        </React.Fragment>
      );
    }, [isLoading, props.roleId]);
  }

  function CheckAllMenu() {
    return treeData.length ? (
      <div className={style.checkAll}>
        <Checkbox defaultChecked={checkAllMenu} onChange={(e: any) => checkAllMenus(e)}>
          全选
        </Checkbox>
      </div>
    ) : null;
  }

  function RenderMenu() {
    return treeData.length ? (
      <Tree
        checkable
        showLine={{ showLeafIcon: false }}
        selectable={false}
        onCheck={onCheckMenu}
        treeData={treeData}
        defaultCheckedKeys={checkedKeys}
        defaultExpandedKeys={expandedKeys}
      />
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>请选择角色</span>} />
    );
  }

  function CheckAll() {
    return checkedNodes.length ? (
      <div className={style.checkAll}>
        <Checkbox defaultChecked={checkAll} onChange={(e: any) => checkAllPrivileges(e)}>
          全选
        </Checkbox>
      </div>
    ) : null;
  }

  function RenderPrivileges() {
    return checkedNodes.length ? (
      <React.Fragment>
        {checkedNodes.map(node =>
          node.isLeaf ? (
            <div key={node.key} className={style.privilegeNode}>
              <h3>{node.title}</h3>
              {node.privilegeGroupList.length ? (
                node.privilegeGroupList.map(group => (
                  <Card
                    size="small"
                    title={group.groupName}
                    key={group.groupId}
                    extra={
                      <Checkbox
                        defaultChecked={group.selectAll}
                        onChange={(e: any) => checkGroupAllPrivileges(e, group, node)}
                      >
                        全选
                      </Checkbox>
                    }
                  >
                    {group.privilegeList.map(p => (
                      <Tooltip placement="top" title={p.privilegeCode} key={p.privilegeId}>
                        <Checkbox
                          style={{ marginLeft: 0, marginRight: '8px' }}
                          defaultChecked={p.isSelected}
                          onChange={(e: any) => checkPrivilege(e, group, node, p.privilegeId)}
                        >
                          {p.privilegeName}
                        </Checkbox>
                      </Tooltip>
                    ))}
                  </Card>
                ))
              ) : (
                <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>未绑定权限组</p>
              )}
            </div>
          ) : null
        )}
      </React.Fragment>
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>请选择菜单项</span>} />
    );
  }

  return (
    <React.Fragment>
      <div className={style.header}>
        <RenderHeader />
      </div>
      <div className={style.main}>
        <div className={style.left}>
          <CheckAllMenu />
          <RenderMenu />
        </div>
        <div className={style.right}>
          <CheckAll />
          <RenderPrivileges />
        </div>
      </div>
    </React.Fragment>
  );
}
export default React.memo(RolePrivilegeTabsComponent);
