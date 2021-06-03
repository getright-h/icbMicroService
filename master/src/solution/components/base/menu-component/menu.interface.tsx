import {
  AimOutlined,
  AreaChartOutlined,
  BgColorsOutlined,
  BoxPlotOutlined,
  CodepenOutlined,
  PartitionOutlined,
  AlertOutlined,
  ProfileOutlined,
  RadarChartOutlined,
  TableOutlined,
  TeamOutlined,
  UserOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import * as React from 'react';
export interface IMenu {
  icon?: string;
  title: string;
  path: string;
  paths: string;
  children?: IMenu[];
}

export interface IProps {
  // 菜单列表
  menuList: IMenu[];
  expandList?: string[];
  currentUrl: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}

export const IconList = {
  switcher: <RadarChartOutlined />,
  reconciliation: <BgColorsOutlined />,
  alert: <AlertOutlined />,
  project: <AreaChartOutlined />,
  tool: <BoxPlotOutlined />,
  block: <CodepenOutlined />,
  team: <TeamOutlined />,
  key: <ProfileOutlined />,
  inbox: <PartitionOutlined />,
  user: <UserOutlined />,
  table: <TableOutlined />,
  aim: <AimOutlined />,
  pie: <PieChartOutlined />
};
