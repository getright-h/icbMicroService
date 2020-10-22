export enum ADDRESS_TYPE {
  Province,
  City,
  Area
}

export const PAGE_SIZE = 10;

export const PAGES_MENU = {
  MENU: [
    {
      path: 'home/stock',
      title: '库存管理',
      children: [
        {
          path: 'all',
          title: '全部设备管理'
        },
        {
          path: 'purchase',
          title: '采购单管理'
        },
        {
          path: 'in-out',
          title: '出入库管理'
        }
      ]
    },
    {
      path: 'home/allocation',
      title: '设备调拨',
      children: [
        {
          path: 'manage',
          title: '调拨单'
        },
        {
          path: 'process',
          title: '调拨流程'
        }
      ]
    },
    {
      path: 'home/monitor',
      title: '监控组',
      children: [
        {
          path: 'monitorManage',
          title: '监控组管理'
        }
      ]
    },
    {
      path: 'home/data',
      title: '数据报表',
      children: [
        // {
        //   path: 'deviceMonitor',
        //   title: '设备监控'
        // },
        {
          path: 'deviceLine',
          title: '设备路线表'
        }
      ]
    },
    {
      path: 'home/baseManage',
      title: '基础管理',
      children: [
        {
          path: 'warehouse',
          title: '仓库设置'
        },
        // {
        //   path: 'carTypeSetting',
        //   title: '车型设置'
        // },
        // {
        //   path: 'supplierSetting',
        //   title: '供应商设置'
        // },
        {
          path: 'deviceTypeSetting',
          title: '设备型号设置'
        }
        // {
        //   path: 'allocationTemplate',
        //   title: '调拨模板管理'
        // }
      ]
    },
    {
      path: 'home/approvalManage',
      title: '审批管理',
      children: [
        {
          path: 'approvalManage',
          title: '审批管理'
        },
        {
          path: 'approveTemplate',
          title: '审批模板'
        }
      ]
    },
    {
      path: 'home/customer',
      title: '客户管理',
      children: [
        {
          path: 'owner',
          title: '车主管理'
        },
        {
          path: 'vehicle',
          title: '车辆管理'
        }
      ]
    },
    {
      path: 'home/voucher/manage',
      title: '安装凭证管理'
    }
  ]
};

/**************************************设备调拨************************************* */

/**
 * @description 设备调拨状态
 */
export const AllOT_STATE = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '已调拨',
    value: 1
  },
  {
    label: '未调拨',
    value: 0
  }
];

/**
 * @description 设备调拨状态枚举
 * @description NOT_ALLOT  未调拨
 * @description HAD_ALLOT  已调拨
 */

export enum AllOT_STATE_ENUM {
  NOT_ALLOT = 0,
  HAD_ALLOT = 1
}

/**
 * @description 审核状态
 * @description   APPROVAL_REJECT 审核拒绝
 * @description   APPROVAL_PASS   审核通过
 */
export enum AllOT_APPROVAL_STATE_ENUM {
  APPROVAL_REJECT = 0,
  APPROVAL_PASS = 1
}

/**
 * @description 调拨流程枚举
 * @description APPLY          待申请
 * @description Confirm        待确认
 * @description Inspection     待验货
 * @description Recall         已撤回
 * @description Reject         已驳回
 * @description Return         已退货
 * @description Returning      退货中
 * @description Identification 已收货
 * @description Move           已流转
 * @description Recallaudit    撤回审核
 * @description AuditProcessed 审核通过
 * @description AuditRefuse    审核驳回
 */

export enum ALLOW_FLOW_ENUM {
  Apply = 10,
  Confirm = 20,
  Inspection = 30,
  Recall = 40,
  Reject = 50,
  Return = 60,
  Returning = 70,
  Identification = 80,
  Move = 90,
  Recallaudit = 100,
  AuditProcessed = 101,
  AuditRefuse = 102
}

export const ALLOW_FLOW = [
  {
    title: '全部',
    value: -1
  },
  {
    title: '待申请',
    value: ALLOW_FLOW_ENUM.Apply
  },
  {
    title: '待确认',
    value: ALLOW_FLOW_ENUM.Confirm
  },
  {
    title: '待验货',
    value: ALLOW_FLOW_ENUM.Inspection
  },
  {
    title: '已撤回',
    value: ALLOW_FLOW_ENUM.Recall
  },
  {
    title: '已驳回',
    value: ALLOW_FLOW_ENUM.Reject
  },
  {
    title: '已退货',
    value: ALLOW_FLOW_ENUM.Return
  },
  {
    title: '退货中',
    value: ALLOW_FLOW_ENUM.Returning
  },
  {
    title: '已收货',
    value: ALLOW_FLOW_ENUM.Identification
  },
  {
    title: '已流转',
    value: ALLOW_FLOW_ENUM.Move
  },
  {
    title: '撤回审核',
    value: ALLOW_FLOW_ENUM.Recallaudit
  },
  {
    title: '审核通过',
    value: ALLOW_FLOW_ENUM.AuditProcessed
  },
  {
    title: '审核驳回',
    value: ALLOW_FLOW_ENUM.AuditRefuse
  }
];

/**
 * @description 调拨流程操作码
 * @description Apply             发起申请
 * @description ReCall            撤回
 * @description ReApply           重新申请
 * @description ReceiveApply      收到申请
 * @description ReturnReceived    收到退货
 * @description Receive           接收
 * @description Reject            驳回
 * @description Pass              验货通过
 * @description Return            退货
 * @description Move              流转
 * @description  RecallApply      申请撤回
 * @description RecallAuditPass   审核申请通过
 * @description RecallAuditReject 审核申请驳回
 */

export enum ALLOW_FLOW_KEYCODE_ENUM {
  Apply = 0,
  ReCall = 1,
  ReApply = 2,
  ReceiveApply = 3,
  ReturnReceived = 4,
  Receive = 5,
  Reject = 6,
  Pass = 7,
  Return = 8,
  Move = 9,
  RecallApply = 10,
  RecallAuditPass = 11,
  RecallAuditReject = 12
}

/**
 * 调拨 表单操作判断 码
 *  // 调拨单
 * @description SEE  查看调拨
 * @description ALLOCATE  去调拨
 * @description EDIT  修改调拨单
 * @description RECORD  调拨记录
 * @description DELETE  删除
 * // 发起
 * @description CREATE  发起申请
 * @description DETAIL  查看详情
 * @description CONFIRM  ''
 * @description REAPPLY  重新申请
 * @description REVOKE  撤销操作
 * @description ROLLBACK  收到申请
 * @description RETURN  收到退货
 * // 接收
 * @description LOOK  查看
 * @description REJECT  驳回
 * @description MOVE  流转
 * @description PASS  通过
 * @description SET_RETURN  退货
 * @description APPLY_REVOKE  申请撤销
 * // 返回
 * @description GO_BACK  退货
 *
 */
export enum ModalType {
  // 调拨单
  SEE,
  ALLOCATE,
  EDIT,
  RECORD,
  DELETE,
  // 发起
  CREATE,
  DETAIL,
  CONFIRM,
  REAPPLY,
  REVOKE,
  ROLLBACK,
  RETURN,
  // 接收
  LOOK,
  RECIVE,
  REJECT,
  MOVE,
  PASS,
  SET_RETURN,
  APPLY_REVOKE,
  // 返回
  GO_BACK
}
/**************************************数据报表************************************* */

//设备路线表 环节
export enum DEVICE_ROUTE_ENUM {
  UnKnow = -100,
  All = -1,
  InStore = 1,
  Loss = 2,
  Allot = 3,
  Bind = 4
}

export const DEVICE_ROUTE = [
  {
    title: '全部',
    value: DEVICE_ROUTE_ENUM.All
  },
  {
    title: '未知',
    value: DEVICE_ROUTE_ENUM.UnKnow
  },
  {
    title: '在库中',
    value: DEVICE_ROUTE_ENUM.InStore
  },
  {
    title: '已遗失',
    value: DEVICE_ROUTE_ENUM.Loss
  },
  {
    title: '调拨中',
    value: DEVICE_ROUTE_ENUM.Allot
  },
  {
    title: '已绑定',
    value: DEVICE_ROUTE_ENUM.Bind
  }
];

export enum SEX_ENUM {
  '女',
  '男'
}
