import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class CustomerManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryOwnerPagedList(params: OwnerListRequestParam): Observable<OwnerListResponseResult>;
  abstract getOwnerDetail(id: string): Observable<OwnerDetailResponseResult>;
  abstract insertOwner(params: SetOwnerRequestParam): Observable<boolean>;
  abstract updateOwner(params: SetOwnerRequestParam): Observable<boolean>;
  abstract deleteOwner(id: string): Observable<boolean>;
  abstract queryVehiclePagedList(params: VehicleListRequestParam): Observable<VehicleListResponseResult>;
  abstract getVehicleDetail(id: string): Observable<VehicleDetailResponse>;
  abstract insertVehicle(params: SetVehicleRequestParam): Observable<boolean>;
  abstract updateVehicle(params: SetVehicleRequestParam): Observable<boolean>;
  abstract deleteVehicle(id: string): Observable<boolean>;
  abstract deviceUnbindToStore(params: DeviceUnbindRequestParam): Observable<boolean>;
  abstract deviceUnbind(params: DeviceUnbindRequestParam): Observable<boolean>;
}

export interface OwnerListRequestParam {
  index: number;
  size: number;
  name?: string;
  mobile?: string;
  certificateNo?: string;
  sex?: number;
  follow?: number;
  beginTime?: number;
  endTime?: number;
}

export interface OwnerListResponseResult {
  dataList: OwnerListItem[];
  total: number;
}

interface OwnerListItem {
  id: string;
  name: string;
  mobile: string;
  sexText: string;
  certificateNo: string;
  plateNo: string[];
  followText: string;
}

export interface OwnerDetailResponseResult {
  id: string;
  name: string;
  mobile: string;
  sex: number;
  sexText: string;
  certificateType: number;
  certificateTypeText: string;
  certificateNo: string;
  age: number;
  work: string;
  spareMobile: string;
  email: string;
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  areaCode: string;
  areaName: string;
  address: string;
  follow: number;
  followText: string;
  remark: string;
}

export interface SetOwnerRequestParam {
  id?: string;
  name: string;
  mobile: string;
  sex: number;
  state?: number;
  certificateType: number;
  certificateNo: string;
  age: number;
  work: number;
  spareMobile: string;
  email: string;
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  areaCode: string;
  areaName: string;
  address: string;
  follow: number;
  remark: string;
}

export interface VehicleListRequestParam {
  strValue?: string;
  device?: string;
  serverBeginTime?: number;
  serverEndTime?: number;
  distributorId?: string;
  financeId?: string;
  mobile?: string;
  index: number;
  size: number;
  beginTime?: number;
  endTime?: number;
  deviceNumber?: number;
}

export interface VehicleListResponseResult {
  dataList: VehicleListItem[];
  total: number;
}
interface VehicleListItem {
  id: string;
  vinNo: string;
  plateNo: string;
  brandName: string;
  versionName: string;
  buyTime: string;
  buyTimeStamp: number;
  distributorId: string;
  distributorName: string;
  financeId: string;
  financeName: string;
  serverBeginTime: string;
  serverEndTime: string;
  ownerName: string;
  ownerMobile: string;
  deviceCodeList: string[];
}

export interface VehicleDetailResponse {
  owner: OwnerInfo;
  vehicle: VehicleInfo;
  deviceList: string[];
}

interface VehicleInfo {
  id: string;
  vinNo: string;
  plateNo: string;
  engineNo: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  configId: string;
  configName: string;
  color: string;
  buyTime: string;
  distributorId: string;
  distributorName: string;
  financeId: string;
  financeName: string;
  image: string;
  imageList: string[];
  serverBeginTime: string;
  serverTime: number;
}

export interface OwnerInfo {
  id: string;
  ownerName?: string;
  ownerMobile?: string;
  sexText?: string;
  certificateTypeText?: string;
  certificateNo?: string;
}

export interface SetVehicleRequestParam {
  id?: string;
  ownerId?: string;
  owner?: OwnerEdit;
  vehicle: VehicleEdit;
  codeList?: string[];
}

interface OwnerEdit {
  id: string;
  name: string;
  mobile: string;
}

interface VehicleEdit {
  vinNo: string;
  plateNo: string;
  engineNo: string;
  brandId: string;
  brandName: string;
  factoryId: string;
  factoryName: string;
  versionId: string;
  versionName: string;
  configId: string;
  configName: string;
  color: string;
  buyTime: string | moment.Moment;
  distributorId: string;
  distributorName: string;
  financeId: string;
  financeName: string;
  imageList: string[];
  serverBeginTime: string | moment.Moment;
  serverTime: number;
}

export interface DeviceUnbindRequestParam {
  id: string;
  code: string;
  storeId?: string;
  storePositionId?: string;
}

export interface VehicleLayout {
  key: string;
  name: string;
  value: string;
  code: string;
}
