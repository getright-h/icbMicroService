import { IRolePrivilegeTabsState, IRolePrivilegeTabsProps } from './role-privilege-tabs.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ShowNotification } from '~/framework/util/common';
import { RoleManageService } from '~/solution/model/services/role-manage.service';
import _ from 'lodash';
import { MenuRelationItem, MenuTreeNode, PrivilegeGroup, PrivilegeItem } from '~/solution/model/dto/role-manage.dto';

export function useRolePrivilegeTabsStore(props: IRolePrivilegeTabsProps) {
  const { state, setStateWrap } = useStateStore(new IRolePrivilegeTabsState());
  const roleManageService: RoleManageService = useService(RoleManageService);
  const checkedNodesRef: MutableRefObject<MenuTreeNode[]> = useRef([]);
  const treeDataRef: MutableRefObject<MenuTreeNode[]> = useRef([]);

  // 所选角色变化时若系统id变化，获取新的权限组
  useEffect(() => {
    if (props.roleId && props.systemId) {
      checkedNodesRef.current = [];
      setStateWrap({
        treeData: [],
        expandedKeys: [],
        checkedKeys: [],
        checkedNodes: []
      });
      getTreeData();
    }
  }, [props.systemId, props.roleId]);

  // 获取菜单数据
  function getTreeData() {
    roleManageService
      .getMenuTree({
        systemId: props.systemId,
        roleId: props.roleId
      })
      .subscribe(
        (res: any) => {
          treeDataRef.current = res;
          formatTreeData(res);
        },
        (err: any) => {
          ShowNotification.error(err);
        }
      );
  }

  // 处理菜单数据
  function formatTreeData(treeData: MenuTreeNode[]) {
    const expandedKeys: string[] = [];
    const checkedKeys: string[] = [];
    let checkedNodes: MenuTreeNode[] = [];
    let menuLength = 0;
    function expandMethod(arr: MenuTreeNode[]) {
      arr.forEach((node: MenuTreeNode) => {
        menuLength++;
        expandedKeys.push(node.key);
        if (node.isMenuSelected) {
          checkedKeys.push(node.key);
          checkedNodes.push(node);
        }
        if (node.children.length) {
          expandMethod(node.children);
        } else {
          node.isLeaf = true;
        }
      });
    }
    expandMethod(treeData);
    checkedNodesRef.current = checkedNodes = formatSelectAll(checkedNodes);
    setStateWrap({
      treeData,
      expandedKeys,
      checkedKeys,
      checkedNodes,
      checkAllMenu: checkedKeys.length === menuLength
    });
  }

  // 全选菜单
  function checkAllMenus(e: any) {
    function expandMethod(arr: MenuTreeNode[], checkedKeys: string[], checkedNodes: MenuTreeNode[]) {
      arr.forEach((node: MenuTreeNode) => {
        checkedKeys.push(node.key);
        checkedNodes.push(node);
        if (node.children.length) {
          expandMethod(node.children, checkedKeys, checkedNodes);
        }
      });
      return { checkedKeys, checkedNodes };
    }
    if (e.target.checked) {
      const { checkedKeys, checkedNodes } = expandMethod(treeDataRef.current, [], []);
      setStateWrap({ checkedKeys, checkedNodes, checkAllMenu: e.target.checked });
    } else {
      setStateWrap({ checkedKeys: [], checkedNodes: [], checkAllMenu: e.target.checked });
    }
  }

  // 回显是否全选
  function formatSelectAll(checkedNodes: MenuTreeNode[]): MenuTreeNode[] {
    let l = 0;
    let length = 0;
    checkedNodes.map(node => {
      node.privilegeGroupList.length && length++;
      node.privilegeGroupList.map(group => {
        let i = 0;
        group.privilegeList.forEach(item => {
          item.isSelected && i++;
        });
        if (i === group.privilegeList.length) {
          group.selectAll = true;
          l++;
        }
      });
    });
    l === length && setStateWrap({ checkAll: true });
    return checkedNodes;
  }

  // 选中菜单项
  function onCheckMenu(checkedKeys: string[], info: any) {
    const checkedNodes: MenuTreeNode[] = [];
    if (info.checkedNodes.length) {
      info.checkedNodes.map((ele: MenuTreeNode) => {
        // if (ele.isLeaf) {
        const oldNode = checkedNodesRef.current.find(old => old.key === ele.key);
        checkedNodes.push(oldNode || ele);
        // }
      });
    }
    checkedNodesRef.current = checkedNodes;
    setStateWrap({ checkedKeys, checkedNodes, checkAllMenu: false });
  }

  // 各权限组全选处理
  function checkGroupAllPrivileges(e: any, curGroup: PrivilegeGroup, curNode: MenuTreeNode) {
    checkedNodesRef.current.map(node => {
      node.key === curNode.key &&
        node.privilegeGroupList.map(group => {
          if (group.groupId === curGroup.groupId) {
            group.selectAll = e.target.checked;
            group.privilegeList.map(p => (p.isSelected = e.target.checked));
          }
        });
    });
    setStateWrap({ checkedNodes: checkedNodesRef.current, checkAll: !e.target.checked ? false : state.checkAll });
  }

  // 全选处理
  function checkAllPrivileges(e: any) {
    checkedNodesRef.current.map(node => {
      node.privilegeGroupList.map(group => {
        group.selectAll = e.target.checked;
        group.privilegeList.map(p => (p.isSelected = e.target.checked));
      });
    });
    setStateWrap({ checkAll: e.target.checked, checkedNodes: checkedNodesRef.current });
  }

  // 单个权限选择处理
  function checkPrivilege(e: any, curGroup: PrivilegeGroup, curNode: MenuTreeNode, curId: string) {
    checkedNodesRef.current.map(node => {
      node.key === curNode.key &&
        node.privilegeGroupList.map(group => {
          if (group.groupId === curGroup.groupId) {
            !e.target.checked && (group.selectAll = false);
            group.privilegeList.map(p => p.privilegeId === curId && (p.isSelected = e.target.checked));
          }
        });
    });
    setStateWrap({ checkedNodes: checkedNodesRef.current, checkAll: !e.target.checked ? false : state.checkAll });
  }

  function submitMenuRelation() {
    setStateWrap({ isLoading: true });
    const { roleId, systemId } = props;
    const { checkedNodes } = state;
    const submitNodes: MenuRelationItem[] = [];
    checkedNodes.forEach(node => {
      const privilegeList: PrivilegeItem[] = [];
      node.privilegeGroupList.map(group => {
        group.privilegeList.map(p => p.isSelected && privilegeList.push(p));
      });
      const newNode = {
        menuId: node.key,
        menuName: node.title,
        privilegeList
      };
      submitNodes.push(newNode);
    });
    roleManageService.submitMenuRelation({ roleId, systemId, menuList: submitNodes }).subscribe(
      (res: any) => {
        ShowNotification.success('编辑权限成功！');
        setStateWrap({ isLoading: false });
      },
      (err: any) => {
        ShowNotification.error(err);
        setStateWrap({ isLoading: false });
      }
    );
  }

  return {
    state,
    onCheckMenu,
    checkGroupAllPrivileges,
    checkPrivilege,
    submitMenuRelation,
    checkAllPrivileges,
    checkAllMenus
  };
}
