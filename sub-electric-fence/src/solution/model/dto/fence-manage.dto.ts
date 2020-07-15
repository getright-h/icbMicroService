import { Observable } from 'rxjs';

export interface FenceManageListReturnModal {
  id: string;
  name: string;
  description: string;
  fenceType: number;
  circle: Circle;
  polyline: Polyline[];
  district: District;
  alarmIn: boolean;
  alarmOut: boolean;
  authorId: string;
  status: number;
  statusText: string;
  createTime: string;
}

export interface FenceManageEditParamsModal {
  id: string;
  name: string;
  description: string;
  districtAdcode: string;
  alarmIn: boolean;
  alarmOut: boolean;
  circle: Circle;
  polyline: Polyline[];
}

export interface FenceManageCreateParamsModal {
  name: string;
  description: string;
  fenceType: number;
  districtAdcode: string;
  alarmIn: boolean;
  alarmOut: boolean;
  circle: Circle;
  polyline: Polyline[];
}
// 行政区域
export interface FenceManageDistrictReturnModal {
  id: string;
  name: string;
  adcode: string;
  level: string;
}

interface Polyline {
  lon: number;
  lat: number;
}

interface District {
  province: Province;
  city: Province;
  district: Province;
}

interface Province {
  id: string;
  name: string;
  adcode: string;
  level: string;
}

interface Circle {
  radius: number;
  lon: number;
  lat: number;
}

export interface FenceManageDTO {
    fenceCreate(params: FenceManageCreateParamsModal): Observable<number>;
    fenceEdit(params: FenceManageEditParamsModal): Observable<number>;
    fenceList(params: {
      name: string;
      index: number;
      size: number;
    }): Observable<{ data: Array<FenceManageListReturnModal>; total: number }>
    fenceDelete(params: {id: string}): Observable<number>;
    fenceDistrict(params: {parentCode: string}): Observable<FenceManageDistrictReturnModal>;
}