import * as React from 'react';
import { IProps, IMenu } from './menu.interface';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
// import style from './menu.component.less';
import SubMenu from 'antd/lib/menu/SubMenu';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';

export default function MenuComponent(props: IProps) {
  const MenuItems = renderMenuItems(props.menuList);
  const { currentUrl, expandList } = props;
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  function renderMenuItems(menuList: IMenu[]) {
    return menuList.map(menu => {
      const { icon, title, paths } = menu;
      return menu.children ? (
        <SubMenu
          key={paths}
          title={
            <span>
              <Icon type={icon} />
              <span>{title}</span>
            </span>
          }
        >
          {renderMenuItems(menu.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={paths}>
          <Link to={paths}>
            <Icon type={icon} />
            <span>{title}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[currentUrl]}
      defaultOpenKeys={expandList}
      inlineCollapsed={gState.collapsed}
    >
      {MenuItems}
    </Menu>
  );
}
