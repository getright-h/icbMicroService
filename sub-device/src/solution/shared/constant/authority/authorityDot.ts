 export interface IAuthorityCode { 
"/home/device/customer/owner": { 
    deleteOwner: string; //删除车主
    queryAllOwner: string; //查看所有车主
    addOwner: string; //新增车主
    editOwner: string; //修改车主
    batchExportOwner: string; //批量导出
    queryOwnerDetail: string; //查看车主详情
    queryParentOwner: string; //查看经销商下级车主
},
"/home/device/customer/vehicle": { 
    addVehicle: string; //新增车辆
    batchExportVehicle: string; //批量导出
    unBindingOperation: string; //解绑设备操作
    queryAllVehicle: string; //查看所有车辆
    editVehicle: string; //修改车辆
    deleteVehicle: string; //删除车辆
    detailVehicle: string; //查看车辆详情
    queryParentVehicle: string; //查看经销商下级车辆
},
"/home/device/voucher/manage": { 
    queryAllDispatch: string; //查看所有安装凭证
    detailDispatch: string; //查看凭证详情
    addDispatch: string; //新增安装凭证
    editDispatch: string; //编辑安装凭证
    deleteDispatch: string; //删除安装凭证
},
"/home/device/stock/purchase": { 
    addPurchase: string; //添加采购单
    deletePurchase: string; //删除采购单
    detailPurchase: string; //查看详情
    editPurchase: string; //修改采购单
    exportPurchase: string; //导出采购单
    queryAllPurchase: string; //查询所有采购单
},
"/home/device/stock/all": { 
    deleteMaterial: string; //删除设备
    removeDevice: string; //遗失设备
    renewMaterial: string; //恢复设备
    detailMaterial: string; //查看设备详情
    batchExportMaterial: string; //批量导出
    queryStock: string; //查看库存
    editMaterial: string; //编辑设备
    putInStorage: string; //设备入库
},
"/home/device/allocation/manage": { 
    deleteAllot: string; //删除调拨单
    operationAllot: string; //去调拨操作
    detailAllot: string; //查看调拨单详情
    queryAllotList: string; //查询所有调拨单列表
},
"/home/device/allocation/process": { 
    queryPromoter: string; //查看发起调拨
    queryAllAllot: string; //查看所有调拨流程列表
    applyAllot: string; //申请调拨单（作废）
    queryRecipient: string; //查看接受调拨
},
"/home/device/monitor/monitorManage": { 
    deleteVehicleGroup: string; //删除监控组
    addMonitoringVehicle: string; //添加监控车辆
    addVehicleGroup: string; //新增监控组
    editVehicleGroup: string; //修改监控组
    moveVehicleGroup: string; //转组
    deleteMonitoringVehicle: string; //删除监控车辆
    queryAllVehicleGroup: string; //查看所有监控组
    insertVehicleAcross: string; //跨机构添加车辆
},
"/home/device/approvalManage/approvalTemplate": { 
    queryApprovalGroup: string; //查看审批组/模板
    addApprovalGroup: string; //创建审批组
    editApprovalGroup: string; //修改审批组
    deleteApprovalGroup: string; //删除审批组
    addApprovalTemplate: string; //创建审批模板
    editApprovalTemplate: string; //修改审批模板
    deleteApprovalTemplate: string; //删除审批模板
    moveApprovalTemplate: string; //移动模板
},
"/home/device/approvalManage/approvalManage": { 
    queryAllApprovalApply: string; //查看所有审批申请
    queryAllApprovalHandle: string; //查看所有审批处理
    startApply: string; //发起申请
    recallApply: string; //撤回申请
    approveHandle: string; //审批处理
},
"/home/device/stock/in-out": { 
    queryInOutRecord: string; //查看出入库记录
},
"/home/device/data/deviceLine": { 
    queryDeviceLifeList: string; //查询所有设备路线列表
    detailLife: string; //查看流程节点详情
},
"/home/device/baseManage/warehouse": { 
    addStore: string; //添加仓库
    deletePosition: string; //删除仓位
    queryStoreAndPosition: string; //查看所有仓库/仓位
    editStore: string; //修改仓库
    deleteStore: string; //删除仓库
    addPosition: string; //添加仓位
    editPosition: string; //修改仓位
},
"/home/device/baseManage/deviceTypeSetting": { 
    queryDeviceType: string; //查看设备型号
    addDeviceType: string; //新增型号
    editDeviceType: string; //修改型号
    deleteDeviceType: string; //删除型号
},

 }
