 export interface IAuthorityCode { 
"/home/fence/positionMonitor": { 
    queryAllOrganization: string; //查询所有机构
    realTimeTracking: string; //查询实时追踪
    IssueInstructions: string; //下发指令
    historyTrajectory: string; //查询历史轨迹
    unprocessedAlarmInfo: string; //查询未处理的报警信息
    areaInspectionVehicle: string; //区域查车
},
"/home/fence/fence/mainfence": { 
    addFence: string; //新增围栏
    editFence: string; //编辑围栏
    queryAllFence: string; //查询所有电子围栏
    deleteFence: string; //删除围栏
},
"/home/fence/fence/monitoringObject": { 
    fenceBindVehicle: string; //绑定车辆
    editBindVehicle: string; //编辑绑定车辆
    fenceUnbindVehicle: string; //解绑绑定车辆
    editBindVehicleTime: string; //编辑车辆绑定有效期
},
"/home/fence/directive/directiveList": { 
    addInstruct: string; //新增下发指令
    deleteInstruct: string; //删除下发指令
    queryInstructAll: string; //查询所有机构下发指令
},
"/home/fence/parameter": { 
    queryDeviceAlarmType: string; //查看设备下发方式报警类型
    queryPlatformAlarmTyp: string; //查看平台下发方式报警类型
    parmOperationCustom: string; //参数自定义操作
    addParamTemplate: string; //新增参数类型模板
    editParamTemplate: string; //编辑报警类型参数模板
    deleteParamTemplate: string; //删除报警类型参数模板
    queryParamTemplateList: string; //查询报警类型模板参数列表
},
"/home/fence/report/userActionReport": { 
},
"/home/fence/report/statistical": { 
},
"/home/fence/report/permanent": { 
},
"/home/fence/report/record": { 
},
"/home/fence/report/monitor": { 
},
"/home/fence/report/follow": { 
},

 }
