import * as React from 'react';
import { IProps, IMenu } from './menu.interface';
import { Menu } from 'antd';
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
      const { title, path } = menu;
      return menu.children ? (
        <SubMenu
          key={path}
          title={
            <span>
              {/* <Icon type={icon} /> */}
              <span>{title}</span>
            </span>
          }
        >
          {renderMenuItems(menu.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={path}>
          <Link to={path}>
            {/* <Icon type={icon} /> */}
            <span>{title}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  return (
    <Menu mode="inline" selectedKeys={[currentUrl]} defaultOpenKeys={expandList} inlineCollapsed={gState.collapsed}>
      {MenuItems}
    </Menu>
  );
}
