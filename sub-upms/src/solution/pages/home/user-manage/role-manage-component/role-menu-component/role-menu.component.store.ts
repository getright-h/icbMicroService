import { IRoleMenuState, IRoleMenuProps } from './role-menu.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useRef } from 'react';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { MenuTreeNode } from '~/solution/model/dto/role-manage.dto';

export function useRoleMenuStore(props: IRoleMenuProps) {
  const { state, setStateWrap } = useStateStore(new IRoleMenuState());
  const roleManageService: RoleManageService = useService(RoleManageService);

  // const expandedKeys = useRef([]);

  useEffect(() => {
    props.systemId && getTreeData();
  }, [props.systemId]);

  function getTreeData() {
    roleManageService.getMenuTree(props.systemId).subscribe(
      (res: any) => {
        setStateWrap({ treeData: res });
        onExpandAll(res);
        // console.log(expandedKeys);
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }
  function onExpandAll(treeData: MenuTreeNode[]) {
    const expandedKeys: string[] = [];
    function expandMethod(arr: MenuTreeNode[]) {
      arr.forEach((data: { key: string; children?: MenuTreeNode[] }) => {
        expandedKeys.push(data.key);
        if (data.children) {
          expandMethod(data.children);
        }
      });
    }
    expandMethod(treeData);
    setStateWrap({ expandedKeys });
  }
  function onCheck(checkedKeys: string[], e: any) {
    props.getCheckedNodes(checkedKeys, e);
  }

  return { state, onCheck };
}
