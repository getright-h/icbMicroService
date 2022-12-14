import { IAuthorityCode } from './authorityDot';
export const DEVICE_AUTHORITY_CODE: IAuthorityCode = {
  '/home/device/customer/owner': {
    deleteOwner: 'deleteOwner',
    queryAllOwner: 'queryAllOwner',
    addOwner: 'addOwner',
    editOwner: 'editOwner',
    batchExportOwner: 'batchExportOwner',
    queryOwnerDetail: 'queryOwnerDetail',
    queryParentOwner: 'queryParentOwner'
  },
  '/home/device/customer/vehicle': {
    addVehicle: 'addVehicle',
    batchExportVehicle: 'batchExportVehicle',
    unBindingOperation: 'unBindingOperation',
    queryAllVehicle: 'queryAllVehicle',
    editVehicle: 'editVehicle',
    deleteVehicle: 'deleteVehicle',
    detailVehicle: 'detailVehicle',
    queryParentVehicle: 'queryParentVehicle'
  },
  '/home/device/voucher/manage': {
    queryAllDispatch: 'queryAllDispatch',
    detailDispatch: 'detailDispatch',
    addDispatch: 'addDispatch',
    editDispatch: 'editDispatch',
    deleteDispatch: 'deleteDispatch'
  },
  '/home/device/stock/purchase': {
    addPurchase: 'addPurchase',
    deletePurchase: 'deletePurchase',
    detailPurchase: 'detailPurchase',
    editPurchase: 'editPurchase',
    exportPurchase: 'exportPurchase',
    queryAllPurchase: 'queryAllPurchase'
  },
  '/home/device/stock/all': {
    deleteMaterial: 'deleteMaterial',
    removeDevice: 'removeDevice',
    renewMaterial: 'renewMaterial',
    detailMaterial: 'detailMaterial',
    batchExportMaterial: 'batchExportMaterial',
    queryStock: 'queryStock',
    editMaterial: 'editMaterial',
    putInStorage: 'putInStorage'
  },
  '/home/device/allocation/manage': {
    deleteAllot: 'deleteAllot',
    operationAllot: 'operationAllot',
    detailAllot: 'detailAllot',
    queryAllotList: 'queryAllotList'
  },
  '/home/device/allocation/process': {
    queryPromoter: 'queryPromoter',
    queryAllAllot: 'queryAllAllot',
    applyAllot: 'applyAllot',
    queryRecipient: 'queryRecipient'
  },
  '/home/device/monitor/monitorManage': {
    deleteVehicleGroup: 'deleteVehicleGroup',
    addMonitoringVehicle: 'addMonitoringVehicle',
    addVehicleGroup: 'addVehicleGroup',
    editVehicleGroup: 'editVehicleGroup',
    moveVehicleGroup: 'moveVehicleGroup',
    deleteMonitoringVehicle: 'deleteMonitoringVehicle',
    queryAllVehicleGroup: 'queryAllVehicleGroup',
    insertVehicleAcross: 'insertVehicleAcross',
    alarmNotification: 'alarmNotification',
    batchMoveVehicleGroup: 'batchMoveVehicleGroup'
  },
  '/home/device/approvalManage/approvalTemplate': {
    queryApprovalGroup: 'queryApprovalGroup',
    addApprovalGroup: 'addApprovalGroup',
    editApprovalGroup: 'editApprovalGroup',
    deleteApprovalGroup: 'deleteApprovalGroup',
    addApprovalTemplate: 'addApprovalTemplate',
    editApprovalTemplate: 'editApprovalTemplate',
    deleteApprovalTemplate: 'deleteApprovalTemplate',
    moveApprovalTemplate: 'moveApprovalTemplate'
  },
  '/home/device/approvalManage/approvalManage': {
    queryAllApprovalApply: 'queryAllApprovalApply',
    queryAllApprovalHandle: 'queryAllApprovalHandle',
    startApply: 'startApply',
    recallApply: 'recallApply',
    approveHandle: 'approveHandle',
    editApply: 'editApply'
  },
  '/home/device/stock/in-out': {
    queryInOutRecord: 'queryInOutRecord'
  },
  '/home/device/data/deviceLine': {
    queryDeviceLifeList: 'queryDeviceLifeList',
    detailLife: 'detailLife'
  },
  '/home/device/baseManage/warehouse': {
    addStore: 'addStore',
    deletePosition: 'deletePosition',
    queryStoreAndPosition: 'queryStoreAndPosition',
    editStore: 'editStore',
    deleteStore: 'deleteStore',
    addPosition: 'addPosition',
    editPosition: 'editPosition'
  },
  '/home/device/baseManage/deviceTypeSetting': {
    queryDeviceType: 'queryDeviceType',
    addDeviceType: 'addDeviceType',
    editDeviceType: 'editDeviceType',
    deleteDeviceType: 'deleteDeviceType'
  }
};
