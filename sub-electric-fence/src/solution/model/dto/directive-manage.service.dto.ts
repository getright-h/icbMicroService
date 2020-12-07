import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export interface DirectiveManage {
    // 你的抽象方法，具体在 Service 中实现
    getCmdList(params: SearchParams): Observable<{ data: DirectiveListReturn[], total: number }>;
    deleteCmd(params: { id: string }): Observable<boolean>;
    getTypesList(params: { id: string }): Observable<{ data: ITypesReturn[], total: number }>;
    sendCmd(params: ICmdSendParam): Observable<boolean>;
}

export interface SearchParams {
    vehicleId: string// 车辆id ,
    deviceCode: string// 设备号 ,
    cmdCode: string// 指令码 ,
    vehicleGroupId: string// 监控组id ,
    index: number;
    size: number;
    beginTime: number;
    endTime: number;
}

export interface ITypesReturn {
    id: string;//
    cmdName: string;// 指令名称 ,
    cmdCode: string;// 指令码 ,
    sort: number;
    isVerify: boolean,
    hasSwitch: boolean
}

export interface ICmdSendParam {
    type: number;// 类型（1：设备号，2：监控组） ,
    codes: Array<string>//设备号 ,
    vehicleGroupId: string // 监控组id ,
    cmdCode: string // 指令码 ,
    cmdName: string // 指令名称 ,
    cmdValue: string // 指令内容 ,
    switch: boolean;
}

export interface DirectiveListReturn {
    id: string;// id ,
    deviceCode: string;// 设备号 ,
    tag: string;// 服务器标志位 ,
    cmdName: string;// 指令名称 ,
    cmdCode: string;// 指令码 ,
    cmdValue: string;// 指令参数内容 ,
    status: number; // 指令下发状态 GpsContract.Enum.ECmdStatus = ['1', '2', '3'],
    statusText: string;
    excuteTime: number; //
    response: string;//
    responseTime: number; // 响应时间 ,
    userId: string;// 指令下发人 ,
    userName: string;//
    time: number; // 创建时间 ,
    vehicleId: string;//
    vin: string;//
    plateNumber: string;//
    organizationId: string;//
    organizationName: string;//
}


