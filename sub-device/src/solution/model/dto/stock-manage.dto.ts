import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class StockManageDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract queryStockDeviceList(params: QueryStockDeviceListParam): Observable<QueryStockDeviceListResult>;
  abstract queryStockDeviceDetail(id: string): Observable<QueryStockDeviceDetailResult>;
  abstract materialStockIn(params: MaterialStockInParam): Observable<boolean>;
  abstract materialStockUpdate(params: MaterialStockUpdateParam): Observable<boolean>;
  abstract deleteMaterial(id: string): Observable<boolean>;
  abstract lossMaterial(id: string): Observable<boolean>;
  abstract queryDeviceSelected(params: QueryDeviceSelectedParam): Observable<QueryDeviceSelectedResult>;
  abstract queryInOutRecordList(params: QueryInOutRecordListParam): Observable<QueryInOutRecordListResult>;
  abstract queryInOutRecordDetail(id: string): Observable<QueryInOutRecordDetailResult>;
  abstract queryPurchaseList(params: QueryPurchaseListParam): Observable<QueryPurchaseListResult>;
  abstract queryPurchaseDetail(id: string): Observable<QueryPurchaseDetailResult>;
  abstract insertPurchase(params: UpdatePurchaseParam): Observable<boolean>;
  abstract updatePurchase(params: UpdatePurchaseParam): Observable<boolean>;
  abstract deletePurchase(id: string): Observable<boolean>;
}

export interface QueryStockDeviceListParam {
  index: number;
  size: number;
  deviceValue?: string;
  typeId?: string;
  state?: number;
  purchaseId?: string;
  storePositionId?: string;
  duration?: number;
  isAlarm?: number;
  organizationId?: string;
  beginTime?: number;
  endTime?: number;
}

export interface QueryStockDeviceListResult {
  dataList: StockDeviceItem[];
  total: number;
}

interface StockDeviceItem {
  duration: number;
  materialId: string;
  code: string;
  sim: string;
  typeId: string;
  typeName: string;
  storePositionId: string;
  storePositionName: string;
  purchaseCode: string;
  createTime: string;
  stateText: string;
  isAlarmText: string;
}

export interface QueryStockDeviceDetailResult {
  materialId: string;
  code: string;
  sim: string;
  storeId: string;
  storeName: string;
  storePositionId: string;
  storePositionName: string;
  state: number;
  stateText: string;
  duration: number;
  purchaseCode: string;
  creatorName: string;
}

export interface MaterialStockInParam {
  typeId: string;
  typeName: string;
  deviceList: DeviceSimpleDto[];
  state: number;
  purchaseId: string;
  purchaseCode: string;
  storeId: string;
  storeName: string;
  storePositionId: string;
  storePositionName: string;
}

interface DeviceSimpleDto {
  code: string;
  sim: string;
}

export interface MaterialStockUpdateParam {
  materialId: string;
  typeId: string;
  code: string;
  sim: string;
  storeId: string;
  storePositionId: string;
  state: number;
  purchaseId: string;
  purchaseCode: string;
}

export interface QueryDeviceSelectedParam {
  code: string;
  storePositionId: string;
  index: number;
  size: number;
  beginTime: number;
  endTime: number;
}

export interface QueryDeviceSelectedResult {
  dataList: DeviceSimpleDto[];
}

export interface QueryInOutRecordListParam {
  storeName?: string;
  type?: number;
  index: number;
  size: number;
  beginTime?: number;
  endTime?: number;
}

export interface QueryInOutRecordListResult {
  pagedList: {
    dataList: InOutRecord[];
  };
  statistics: {
    inNumber: number;
    outNumber: number;
    totalNumber: number;
  };
  total: number;
}
interface InOutRecord {
  id: string;
  storeId: string;
  storeName: string;
  storePositionId: string;
  storePositionName: string;
  number: number;
  typeText: string;
  createTime: string;
  createTimeStamp: number;
  modifyUserId: string;
  modifyUserName: string;
}
export interface QueryInOutRecordDetailResult {
  id: string;
  inventoryId: string;
  storeId: string;
  storeName: string;
  storePositionId: string;
  storePositionName: string;
  deviceTypeList: DeviceTypeList[];
  contentList: ContentList[];
  typeText: string;
  createTime: string;
  createTimeStamp: number;
}

interface ContentList {
  materialId: string;
  typeId: string;
  typeName: string;
  code: string;
  sim: string;
}

interface DeviceTypeList {
  typeId: string;
  typeName: string;
  number: number;
}

export interface QueryPurchaseListParam {
  index: number;
  size: number;
  name?: string;
  organizationName?: string;
  beginTime?: number;
  endTime?: number;
}

export interface QueryPurchaseListResult {
  sumAmount: number;
  sumNumber: number;
  total: number;
  purchasePagedList: {
    dataList: PurchaseListItem[];
  };
}
interface PurchaseListItem {
  id: string;
  purchaseId: string;
  name: string;
  code: string;
  purchaseCode: string;
  totalNumber: number;
  totalAmount: number;
  createTime: string;
  creatorName: string;
  organizationName: string;
  contentList: ContentList[];
}

export interface QueryPurchaseDetailResult {
  id: string;
  name: string;
  code: string;
  sumAmount: number;
  sumNumber: number;
  deviceList: DeviceListItem[];
  purchaseTime: string;
  supplierName: string;
  image: string;
  imageList: string[];
  createTime: string;
  remark: string;
}

interface DeviceListItem {
  typeId: string;
  typeName: string;
  number: number;
  amount: number;
}

export interface UpdatePurchaseParam {
  id: string;
  name: string;
  deviceList: DeviceListItem[];
  totalAmount: number;
  purchaseTime: string;
  supplierId: string;
  image: string[];
  remark: string;
}
