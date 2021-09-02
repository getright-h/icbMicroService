import { IMenu } from '@fch/fch-shop-web/dist/src/IMenu/menu.interface';
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
import React from 'react';
export class IHomeProps {
  loading = true;
  menuList: IMenu[] = [];
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
