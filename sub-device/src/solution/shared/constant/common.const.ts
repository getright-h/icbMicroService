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
      path: 'home/baseManage',
      title: '基础管理',
      children: [
        {
          path: 'warehouse',
          title: '仓库设置'
        }
      ]
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
 * @description RecallAuditPass   审核申请驳回
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
