import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class VoucherManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract getDispatchPagedList(params: DispatchListRequestParam): Observable<DispatchListResponse>;
  abstract getDispatchDetail(id: string): Observable<DispatchDetail>;
  abstract insertDispatch(params: SetDispatchParam): Observable<boolean>;
  abstract setDispatch(params: SetDispatchParam): Observable<boolean>;
  abstract deleteDispatch(id: string): Observable<boolean>;
}

export interface DispatchListRequestParam {
  vinNo: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface DispatchListResponse {
  dataList: DispatchDetail[];
  total: number;
  status: boolean;
}

export interface DispatchDetail {
  id: string;
  name: string;
  time: string;
  mobile: string;
  address: string;
  pictureList: string[];
  remark: string;
  createTime: string;
  createTimeStamp: number;
  creatorId: string;
  creatorName: string;
  deviceCodeList: DeviceItem[];
  vinNo: string;
}

interface DeviceItem {
  deviceCode: string;
  typeId: string;
  typeName: string;
}

export interface SetDispatchParam {
  id?: string;
  name: string;
  time: string;
  mobile: string;
  address: string;
  pictureList: string[];
  remark: string;
  deviceCodeList: DeviceItem[];
  vinNo: string;
}
