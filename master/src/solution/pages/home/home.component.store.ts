import { IMenu } from '~components/base/menu-component/menu.interface';
import { MenuService } from '~/framework/util/menu/menu.service';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeProps } from './home.interface';
import { useEffect } from 'react';
import { setState } from '~/framework/microAPP/appStore';
import { fetchChildAppsConfig } from '~/framework/microAPP/fetchChildAppsConfig';
import registerMainApp from '~/framework/microAPP/appRegister';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Subscription } from 'rxjs';
import { HomeService } from '~/solution/model/services/home.service';
import { ShowNotification } from '~/framework/util/common';
export function useHomeStore() {
  const dispatch = useDispatch();
  const homeService = useService(HomeService);
  const { state, setStateWrap } = useStateStore(new IHomeProps());
  const history = useHistory();
  console.log('history =>>>', history);
  let currentUserIndoSubscription: Subscription;
  let getMenuListSubscription: Subscription;
  useEffect(() => {
    // 注册并启动微前端
    registerMainApp(callback);
  }, []);

  function callback(result: any) {
    // 如果当前的URL是Home那么就跳转到第一个页面
    // setStateWrap({ menuList: result, loading: false });
    getCurrentUserInfo();
    // if (history.location.pathname == '/home') {
    //   if (result[0]?.children?.length) {
    //     history.replace(result[0].children[0].path);
    //   } else {
    //     history.replace(result[0].path);
    //   }
    // }
  }

  // 获取登录用户信息
  function getCurrentUserInfo() {
    currentUserIndoSubscription = homeService.getMyInfo().subscribe(
      (res: any) => {
        // 获取用户数据作为补充信息, 向子应用传输数据
        setState({ userInfo: res });

        let roleIdList = [];
        roleIdList = res?.rolesCodeList.map((role: any) => role.key);
        console.log('roleIdList', roleIdList);

        if (!!roleIdList.length) {
          getMenuList(res.systemId, roleIdList);
        } else {
          ShowNotification.error('当前账号未绑定角色，无法访问！');
          history.replace('/login');
        }
      },
      (err: any) => {
        ShowNotification.error(err);
      }
    );
  }

  //获取菜单
  function getMenuList(systemId: string, roleIdList: Array<string>) {
    getMenuListSubscription = homeService
      .getMenuList({
        systemId,
        roleIdList
      })
      .subscribe(
        (res: any) => {
          setStateWrap({ menuList: res, loading: false });
          if (history.location.pathname == '/home') {
            if (res[0]?.children?.length) {
              history.replace(res[0].children[0].path);
            } else {
              history.replace(res[0].path);
            }
          }
        },
        (err: any) => {
          ShowNotification.error(err);
        }
      );
  }

  return { state };
}
