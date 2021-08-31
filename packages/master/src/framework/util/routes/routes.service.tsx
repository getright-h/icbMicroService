import * as React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { IRoute } from '~framework/interfaces/IRoute';
import NotFoundComponent from '~/solution/pages/public/not-found-component/not-found.component';
import { LazyloadLoadingComponent } from '~/solution/components/component.module';
import { message } from 'antd';
import { ShowNotification } from '~/framework/util/common';

export class RoutesService {
  // 渲染路由
  static renderRoutes(routes: IRoute[], StrategyType?: any, Redirect?: JSX.Element) {
    // 自动使用 404 路由（需做好适配）
    routes.push({
      path: '',
      component: NotFoundComponent
    });
    const RoutesArr = routes.map(route => {
      return (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          render={RoutesService.render(route, StrategyType)}
        />
      );
    });

    return (
      <Switch>
        {Redirect}
        {RoutesArr}
      </Switch>
    );
  }

  // 路由守卫
  static render(route: IRoute, StrategyType?: any) {
    return (props: RouteComponentProps) => {
      let canActive = true;
      if (!route.ignoreStrategy) {
        canActive = StrategyType ? new StrategyType().canActive() : true;
      }

      if (canActive === true) {
        let TargetComponent = route.component;
        if (route.lazyload) {
          TargetComponent = React.lazy(route.component);
          return (
            <React.Suspense fallback={<LazyloadLoadingComponent />}>
              <TargetComponent {...props} />
            </React.Suspense>
          );
        }
        return <TargetComponent {...props} />;
      } else if (canActive === false) {
        ShowNotification.warning('当前用户没有权限，请换账号登录');
        return <Redirect to="/login" {...props} />;
      } else {
        return <Redirect to={canActive} {...props} />;
      }
    };
  }
}
