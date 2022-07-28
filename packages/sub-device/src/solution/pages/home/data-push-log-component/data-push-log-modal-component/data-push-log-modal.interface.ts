import { ContentList } from '~/solution/model/dto/customer-manage.dto';

/**
 * @export state变量定义和初始化
 * @class IDataPushLogModalState
 */
export class IDataPushLogModalState {
  isLoading: boolean;
}

export interface IDataPushLogModalProps {
  visible: boolean;
  close: () => void;
  currentData: ContentList;
}
const CarType = ['汽车', '摩托车', '货车', '电瓶车'];
const ControlType = ['添加', '追加', '更改', '拆除'];
export const LogDetail = [
  {
    title: '车辆信息',
    key: 'vehicleInput',
    children: [
      {
        title: '车架号',
        param: 'vinNo'
      },
      {
        title: '品牌名称',
        param: 'brandName'
      },
      {
        title: '服务开始时间',
        param: 'serverBeginTime'
      },
      {
        title: '车牌号',
        param: 'plateNo'
      },
      {
        title: '厂商名称',
        param: 'factoryName'
      },
      {
        title: '服务时长',
        param: 'serverTime'
      },
      {
        title: '发动机号',
        param: 'engineNo'
      },
      {
        title: '车辆类型',
        param: 'type',
        run: (type: number) => CarType[type + 1]
      },
      {
        title: '购买时间',
        param: 'buyTime'
      },
      {
        title: '配置名称',
        param: 'configName'
      },
      {
        title: '是否要编辑',
        param: 'isEdit',
        run: (isEdit: boolean) => (isEdit ? '是' : '否')
      },
      {
        title: '经销商名称',
        param: 'distributorName'
      },
      {
        title: '金融公司名称',
        param: 'financeName'
      },
      {
        title: '是否替换',
        param: 'isReplace'
      },
      {
        title: '车辆id',
        param: 'replaceId'
      },
      {
        title: '车辆图片',
        param: 'imageList',
        type: 'IMAGE'
      }
    ]
  },
  {
    title: '用户信息',
    key: 'ownerInput',
    children: [
      {
        title: '用户id',
        param: 'id'
      },
      {
        title: '用户名称',
        param: 'name'
      },
      {
        title: '用户电话',
        param: 'mobile'
      },
      {
        title: '性别',
        param: 'sex',
        run: (sex: number) => (sex ? '男' : '女')
      }
    ]
  },
  {
    title: '设备信息',
    key: 'deviceCodeList',
    children: [
      {
        title: '设备操作方式',
        param: 'operation',
        run: (type: number) => ControlType[type + 1]
      },
      {
        title: '设备号',
        param: 'deviceCode'
      },
      {
        title: '设备类型id',
        param: 'deviceTypeId'
      },
      {
        title: '设备sim卡号',
        param: 'deviceSim'
      },
      {
        title: '设备类型名称',
        param: 'deviceTypeName'
      },
      {
        title: '被替换的设备号',
        param: 'replacedDeviceCode'
      },
      {
        title: '被替换的设备类型',
        param: 'replacedDeviceTypeId'
      },
      {
        title: '被替换的设备SIM卡号',
        param: 'replacedDeviceSim'
      }
    ]
  }
];
