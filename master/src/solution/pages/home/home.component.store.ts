import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import registerMainApp from '~/framework/microAPP/appRegister';
import { useHistory, useLocation } from 'react-router-dom';
import { ShowNotification } from '~/framework/util/common';
import { MenuListService } from '~/framework/aop/strategy/MenuListService';
export function useHomeStore() {
  const menuListService = useService(MenuListService);
  const { state, setStateWrap } = useStateStore(new IHomeProps());
  const history = useHistory();
  const { pathname } = useLocation();

  console.log('history =>>>', history);
  useEffect(() => {
    // 注册并启动微前端
    registerMainApp(callback);
  }, []);
  // 监听路由变化，设置首页状态
  useEffect(() => {
    setStateWrap({ isIndex: pathname.includes('home/index') });
    getMenuList();
  }, [pathname]);
  function callback() {
    return getMenuList();
  }

  // 获取登录用户信息
  // async function getCurrentUserInfo() {
  //   try {
  //     const res = await menuListService.getMenuList().toPromise();
  //     if (res) {
  //       let roleIdList = [];
  //       roleIdList = res?.rolesCodeList.map((role: any) => role.key);

  //       if (!!roleIdList.length) {
  //         return getMenuList(res, roleIdList);
  //       } else {
  //         ShowNotification.error('当前账号未绑定角色，无法访问！');
  //         history.replace('/login');
  //       }
  //     }
  //   } catch (error) {
  //     ShowNotification.error(error);
  //   }
  // }

  //获取菜单
  async function getMenuList() {
    try {
      const res = await menuListService.getMenuList().toPromise();
      console.log('menuListService =>>>>>>>>>>>>>>>>>>>>>>>>', menuListService);

      const menuList = res?.menuList;
      if (menuList) {
        setStateWrap({ menuList, loading: false });
        if (history.location.pathname == '/home') {
          parseFirstLeafPath(menuList);
        } else if (history.location.pathname !== '/home/index') {
          const canActive = judgeInMenu(menuList, history.location.pathname);
          !canActive && history.replace('/home/index');
        }
      }
      return { ...res.userInfo, auth: parsePrivilegeJSON(menuList) };
    } catch (error) {
      ShowNotification.error(error);
    }
  }

  // 默认跳转菜单中第一个页面
  function judgeInMenu(arr: any[], urlPath: string) {
    let isValidPath = false;
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!isValidPath) {
          if (!node.children.length) {
            if (urlPath == node.path) {
              isValidPath = true;
            }
          } else {
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    return isValidPath;
  }

  // 默认跳转菜单中第一个页面
  function parseFirstLeafPath(arr: any[]) {
    let isValidPath = false;
    let path = '';
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!isValidPath) {
          if (!node.children.length) {
            path = node.path;
            isValidPath = true;
          } else {
            expand(node.children);
          }
        }
      });
    }
    expand(arr);
    !!path && history.replace(path);
  }

  function parsePrivilegeJSON(arr: any[]) {
    const jsonText = {};
    function expand(arr: any[]) {
      arr.map((node: any) => {
        if (!node.children.length) {
          const jsonItem = {};
          node.privilegeGroupList.map((group: { privilegeList: any[] }) => {
            group.privilegeList.map((p: { privilegeCode: string; isSelected: boolean }) => {
              const code = p.privilegeCode.split('-')[1];
              jsonItem[code] = p.isSelected;
            });
          });
          Object.assign(jsonText, { [node.path]: jsonItem });
        } else {
          expand(node.children);
        }
      });
    }
    expand(arr);
    return jsonText;
  }

  return { state };
}
