import { IMenu } from '~components/base/menu-component/menu.interface';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { setState } from '~/framework/microAPP/appStore';
import { fetchChildAppsConfig } from '~/framework/microAPP/fetchChildAppsConfig';
import registerMainApp from '~/framework/microAPP/appRegister';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Subscription } from 'rxjs';
import { HomeService } from '~/solution/model/services/home.service';
import { ShowNotification } from '~/framework/util/common';
export function useHomeStore() {
  const dispatch = useDispatch();
  const homeService = useService(HomeService);
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
  }, [pathname]);
  function callback() {
    return getCurrentUserInfo();
  }

  // 获取登录用户信息
  async function getCurrentUserInfo() {
    try {
      const res = await homeService.getMyInfo().toPromise();
      if (res) {
        let roleIdList = [];
        roleIdList = res?.rolesCodeList.map((role: any) => role.key);

        if (!!roleIdList.length) {
          return getMenuList(res, roleIdList);
        } else {
          ShowNotification.error('当前账号未绑定角色，无法访问！');
          history.replace('/login');
        }
      }
    } catch (error) {
      ShowNotification.error(error);
    }
  }

  //获取菜单
  async function getMenuList(userInfo: any, roleIdList: Array<string>) {
    try {
      const res = await homeService
        .getMenuList({
          systemId: userInfo.systemId,
          roleIdList
        })
        .toPromise();
      if (res) {
        setStateWrap({ menuList: res, loading: false });
        if (history.location.pathname == '/home') {
          parseFirstLeafPath(res);
        }
      }
      return { ...userInfo, auth: parsePrivilegeJSON(res) };
    } catch (error) {
      ShowNotification.error(error);
    }
    return userInfo;
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
