import { loader } from './loader';
export function fetchChildAppsConfig() {
  const MODULE_PATH = '/#/home';
  return new Promise(resolve => {
    resolve([
      {
        name: 'sub-device',
        localURL: '//localhost:8081',
        onLineURL: '//192.168.2.251:2155',
        title: '设备管理模块',
        icon: 'anticon-mobile',
        tokenKey: 'token',
        path: '/home/device',
        loader,
        children: [
          {
            path: 'stock', // 菜单路径
            title: '库存管理', // 菜单名
            icon: 'switcher', // 图标
            defaultMountApp: true, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/stock`, // 对应的子应用的路径
            componentUrl: 'stockManageModule', //对应子应用的组件名
            children: [
              {
                path: 'all',
                title: '全部设备管理',
                lazyload: true,
                exact: true,
                componentUrl: 'stockAll' //对应子应用的组件名
              },
              {
                path: 'purchase',
                title: '采购单管理',
                lazyload: true,
                exact: true,
                componentUrl: 'purchaseOrder' //对应子应用的组件名
              },
              {
                path: 'in-out',
                title: '出入库管理',
                lazyload: true,
                exact: true,
                componentUrl: 'stockInOut' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'allocation',
            title: '设备调拨',
            icon: 'reconciliation', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/allocation`, // 对应的子应用的路径
            componentUrl: 'allocationManageModule', //对应子应用的组件名
            children: [
              {
                path: 'manage',
                title: '调拨单',
                lazyload: true,
                exact: true,
                componentUrl: 'allocationManage' //对应子应用的组件名
              },
              {
                path: 'process',
                title: '调拨流程',
                lazyload: true,
                exact: true,
                componentUrl: 'allocationProcess' //对应子应用的组件名
              },
              {
                path: 'createAllocation',
                lazyload: true,
                exact: true,
                componentUrl: 'createAllocation' //对应子应用的组件名
              },
              {
                path: 'editAllocation',
                lazyload: true,
                exact: true,
                componentUrl: 'createAllocation' //对应子应用的组件名
              },
              {
                path: 'allocationDetail',
                lazyload: true,
                exact: true,
                componentUrl: 'allocationDetail' //对应子应用的组件名
              },
              {
                path: 'initDetail/:id',
                lazyload: true,
                exact: true,
                componentUrl: 'initDetail' //对应子应用的组件名
              },
              {
                path: 'receiveDetail/:id',
                lazyload: true,
                exact: true,
                componentUrl: 'receiveDetail' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'monitor',
            title: '监控组',
            icon: 'alert', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/monitor`, // 对应的子应用的路径
            componentUrl: 'monitorManagModule', //对应子应用的组件名
            children: [
              {
                path: 'monitorManage',
                title: '监控组管理',
                lazyload: true,
                exact: true,
                componentUrl: 'monitorManage' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'data',
            title: '数据报表',
            icon: 'project', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/data`, // 对应的子应用的路径
            componentUrl: 'dataManagModule', //对应子应用的组件名
            children: [
              // {
              //    path: 'deviceMonitor',
              //    title: '设备监控',
              //    lazyload: true,
              //    exact: true,
              //    componentUrl: "deviceMonitor",
              // },
              {
                path: 'deviceLine',
                title: '设备路线表',
                lazyload: true,
                exact: true,
                componentUrl: 'deviceLine' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'baseManage',
            title: '基础管理',
            icon: 'tool', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/baseManage`, // 对应的子应用的路径
            componentUrl: 'warehouseManage', //对应子应用的组件名
            children: [
              {
                path: 'warehouse',
                title: '仓库设置',
                lazyload: true,
                exact: true,
                componentUrl: 'warehouseList' //对应子应用的组件名
              },
              {
                path: 'addSupplier',
                lazyload: true,
                exact: true,
                componentUrl: 'addSupplier' //对应子应用的组件名
              },
              {
                path: 'supplierSetting',
                lazyload: true,
                exact: true,
                componentUrl: 'supplierSetting' //对应子应用的组件名
              },
              {
                path: 'addSupplier',
                lazyload: true,
                exact: true,
                componentUrl: 'addSupplier' //对应子应用的组件名
              },
              {
                path: 'deviceTypeSetting',
                title: '设备型号设置',
                lazyload: true,
                exact: true,
                componentUrl: 'deviceTypeSetting' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'approvalManage',
            title: '审批管理',
            icon: 'block', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/approvalManage`, // 对应的子应用的路径
            componentUrl: 'approvalManageModule', //对应子应用的组件名
            children: [
              {
                path: 'approvalManage',
                title: '审批管理',
                lazyload: true,
                exact: true,
                componentUrl: 'warehouseList' //对应子应用的组件名
              },
              {
                path: 'approvalTemplate',
                title: '审批模板',
                lazyload: true,
                exact: true,
                componentUrl: 'approvalTemplate' //对应子应用的组件名
              },
              {
                path: 'addTemplate/:id/:isEdit',
                lazyload: true,
                exact: true,
                componentUrl: 'addTemplate' //对应子应用的组件名
              },
              {
                path: 'approvalManageDetail/:id/:isDeal',
                lazyload: true,
                exact: true,
                componentUrl: 'approvalManageDetail' //对应子应用的组件名
              },
              {
                path: 'approvalTemplateFormModal/:id/:groupName/:groupId',
                lazyload: true,
                exact: true,
                componentUrl: 'approvalTemplateFormModal' //对应子应用的组件名
              },
              {
                path: 'approvalEditTemplateFormModal/:id/:isEdit',
                lazyload: true,
                exact: true,
                componentUrl: 'approvalTemplateFormModal' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'customer',
            title: '客户管理',
            icon: 'team', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/customer`, // 对应的子应用的路径
            componentUrl: 'customerManageModule', //对应子应用的组件名
            children: [
              {
                path: 'owner',
                title: '车主管理',
                lazyload: true,
                exact: true,
                componentUrl: 'ownerManageComponent' //对应子应用的组件名
              },
              {
                path: 'vehicle',
                title: '车辆管理',
                lazyload: true,
                exact: true,
                componentUrl: 'vehicleManageComponent' //对应子应用的组件名
              },
              {
                path: 'addVehicle',
                lazyload: true,
                exact: true,
                componentUrl: 'editVehicle' //对应子应用的组件名
              },
              {
                path: 'editVehicle/:id',
                lazyload: true,
                exact: true,
                componentUrl: 'editVehicle' //对应子应用的组件名
              },
              {
                path: 'vehicleDetail/:id',
                lazyload: true,
                exact: true,
                componentUrl: 'vehicleDetail' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'voucher/manage',
            title: '安装凭证管理',
            icon: 'key', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            activeRule: `${MODULE_PATH}/voucher/manage`, // 对应的子应用的路径
            componentUrl: 'voucherManage' //对应子应用的组件名
          }
        ]
      },
      {
        name: 'sub-upms',
        localURL: '//localhost:8082',
        onLineURL: '//192.168.2.251:2155',
        title: '设备管理模块',
        icon: 'team',
        tokenKey: 'token',
        loader,
        path: '/home/upms',
        children: [
          {
            path: 'organizationManage', // 菜单路径
            title: '机构管理', // 菜单名
            icon: 'inbox', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'organizationManage' //对应子应用的组件名
          },
          {
            path: 'userManage', // 菜单路径
            title: '用户管理', // 菜单名
            icon: 'user', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'userManageModule', //对应子应用的组件名
            children: [
              {
                path: 'main',
                title: '用户管理',
                lazyload: true,
                exact: true,
                componentUrl: 'userManage' //对应子应用的组件名
              },
              {
                path: 'roleManage',
                title: '角色管理',
                lazyload: true,
                exact: true,
                componentUrl: 'roleManage' //对应子应用的组件名
              },
              {
                path: 'departmentManage',
                title: '部门管理',
                lazyload: true,
                exact: true,
                componentUrl: 'departmentManage' //对应子应用的组件名
              },
              {
                path: 'stationManage',
                title: '岗位管理',
                lazyload: true,
                exact: true,
                componentUrl: 'stationManage' //对应子应用的组件名
              }
            ]
          }
        ]
      }
    ]);
  });
}

export interface AppConfig {
  name: string;
  props: any;
  devEntry: string;
  proEntry: string;
  activeRule: string;
  singular?: boolean;
  defaultMountApp: boolean;
  children?: Array<ChildrenObject>;
}

export interface ChildrenObject {
  path: string;
  title: string;
  icon: string;
  lazyload: boolean;
  exact: boolean;
  componentUrl: string;
}

export interface AppProps {
  tokenKey: string;
  loader: Function;
  name: string;
  props: any;
  singular?: boolean;
  entry: string;
  container: string;
  activeRule: string | ((location: string) => boolean);
  children?: Array<ChildrenObject>;
}
