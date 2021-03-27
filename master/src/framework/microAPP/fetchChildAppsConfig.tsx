import { loader } from './loader';
export function fetchChildAppsConfig() {
  const MODULE_PATH = '/#/home';
  // 线上地址onLineURL
  return new Promise(resolve => {
    resolve([
      {
        name: 'sub-device',
        localURL: '//localhost:8081',
        onLineURL: '//fch.i-cbao.com/riskdevice/',
        onLineDevURL: '//192.168.2.251:2155',
        title: '设备管理模块',
        icon: 'anticon-mobile',
        tokenKey: '__icb_token',
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
                title: '设备管理',
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
                title: '出入库记录',
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
                componentUrl: 'approvalManage' //对应子应用的组件名
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
                path: 'approvalManageDetail/:id/:isDeal/:flowAuditId',
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
        onLineDevURL: '//192.168.2.251:2099',
        onLineURL: '//fch.i-cbao.com/msupms/',
        title: 'UPMS模块',
        icon: 'team',
        tokenKey: '__icb_token',
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
      },
      {
        name: 'sub-fence',
        localURL: '//localhost:8083',
        onLineDevURL: '//192.168.2.251:2110',
        onLineURL: '//fch.i-cbao.com/gpsefm/',
        title: '定位监控',
        icon: 'team',
        tokenKey: '__icb_token',
        loader,
        path: '/home/fence',
        children: [
          {
            path: 'parameter', // 菜单路径
            title: '参数管理', // 菜单名
            icon: 'inbox', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'alarmParameter' //对应子应用的组件名
          },
          {
            path: 'positionMonitor', // 菜单路径
            title: '车辆定位', // 菜单名
            icon: 'aim', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'positionMonitor' //对应子应用的组件名
          },
          {
            path: 'fence', // 菜单路径
            title: '电子围栏', // 菜单名
            icon: 'user', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'electricFenceManage', //对应子应用的组件名
            children: [
              {
                path: 'mainfence',
                title: '围栏管理',
                lazyload: true,
                exact: true,
                componentUrl: 'MainFenceManageComponent' //对应子应用的组件名
              },
              {
                path: 'monitoringObject',
                title: '监控对象',
                lazyload: true,
                exact: true,
                componentUrl: 'MonitoringObjectComponent' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'directive', // 菜单路径
            title: '指令中心', // 菜单名
            icon: 'user', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'directiveModule', //对应子应用的组件名
            children: [
              {
                path: 'directiveList',
                title: '指令中心',
                lazyload: true,
                exact: true,
                componentUrl: 'directiveListComponent' //对应子应用的组件名
              }
            ]
          },
          {
            path: 'report', // 菜单路径
            title: '报表', // 菜单名
            icon: 'table', // 图标
            defaultMountApp: false, // 是否默认启动当前第一个页面
            lazyload: true,
            exact: true,
            componentUrl: 'reportManageModule', //对应子应用的组件名
            children: [
              {
                path: 'statistical',
                title: '报警统计表',
                lazyload: true,
                exact: true,
                componentUrl: 'statisticalListComponent' //对应子应用的组件名
              },
              {
                path: 'statistical/detail/:deviceCode/:alarmType',
                lazyload: true,
                exact: true,
                componentUrl: 'statisticalDetailComponent' //对应子应用的组件名
              },
              {
                path: 'userActionReport',
                lazyload: true,
                title: '车辆行为报告',
                exact: true,
                componentUrl: 'userActionReport' //对应子应用的组件名
              },
              {
                path: 'record',
                title: '报警记录表',
                lazyload: true,
                exact: true,
                componentUrl: 'recordListComponent' //对应子应用的组件名
              },
              {
                path: 'follow',
                title: '报警跟进表',
                lazyload: true,
                exact: true,
                componentUrl: 'followComponent' //对应子应用的组件名
              },
              {
                path: 'monitor',
                title: '监控组报表',
                lazyload: true,
                exact: true,
                componentUrl: 'monitorComponent' //对应子应用的组件名
              },
              // {
              //   path: 'odometer',
              //   title: '行驶里程表',
              //   lazyload: true,
              //   exact: true,
              //   componentUrl: 'odometerListComponent' //对应子应用的组件名
              // },
              // {
              //   path: 'state',
              //   title: '设备状态统计表',
              //   lazyload: true,
              //   exact: true,
              //   componentUrl: 'stateListComponent' //对应子应用的组件名
              // },
              // {
              //   path: 'offline',
              //   title: '离线设备统计',
              //   lazyload: true,
              //   exact: true,
              //   componentUrl: 'offlineListComponent' //对应子应用的组件名
              // },
              // {
              //   path: 'dwell',
              //   title: '设备停留点统计',
              //   lazyload: true,
              //   exact: true,
              //   componentUrl: 'dwellListComponent' //对应子应用的组件名
              // },
              {
                path: 'permanent',
                title: '常驻点统计',
                lazyload: true,
                exact: true,
                componentUrl: 'permanentListComponent' //对应子应用的组件名
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
