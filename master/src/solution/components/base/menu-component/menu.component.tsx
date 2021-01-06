import * as React from 'react';
import { IProps, IMenu, IconList } from './menu.interface';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
// import style from './menu.component.less';
import SubMenu from 'antd/lib/menu/SubMenu';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { StepBackwardOutlined } from '@ant-design/icons';

export default function MenuComponent(props: IProps) {
  const MenuItems = renderMenuItems(props.menuList);
  const { currentUrl, expandList } = props;
  const { gState }: IGlobalState = React.useContext(GlobalContext);
  function renderMenuItems(menuList: IMenu[]) {
    return menuList.map(menu => {
      const { title, path, icon } = menu;
      if (!title) return null;
      return menu.children ? (
        <SubMenu
          key={path}
          title={
            <span>
              {IconList[icon]}
              <span>{title}</span>
            </span>
          }
        >
          {renderMenuItems(menu.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={path}>
          <Link to={path}>
            {IconList[icon]}
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
