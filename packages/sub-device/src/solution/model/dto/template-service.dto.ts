import { Observable } from 'rxjs';

/**
 * 真实开发中，请将示例代码移除
 */

export abstract class TemplateServiceDTO {
  // 你的抽象方法，具体在 Service 中实现
  abstract insertAllotFlowTemplate(params: InsertAllotFlowTemplateParam): Observable<IReturn>;
  abstract setAllotFlowTemplate(params: SetAllotFlowTemplateParam): Observable<IReturn>;
  abstract allotFlowTemplate(params: AllotFlowTemplateParam): Observable<IReturn>;
  abstract queryAllotFlowTemplatePagedList(params: QueryAllotFlowTemplatePagedListParam): Observable<IReturn>;
  abstract queryAllotFlowTemplateNodeListByTemplateId(
    params: QueryAllotFlowTemplateNodeListByTemplateIdParam
  ): Observable<IReturn>;
  abstract queryAllotFlowTemplateDetail(params: QueryAllotFlowTemplateDetailParam): Observable<IReturn>;
}
interface IVAllotTemplateInsertInput {
  flowId: string; // 节点流程Id ,
  attributeId: string; // 节点属性Id ,
  organizationId: string; // 机构Id ,
  organizationName: string; // 机构名称 ,
  organizationCode: string; // 机构名称 ,
  storeId: string; // 仓库Id ,
  storeName: string; // 仓库名称 ,
  storePositionId: string; // 仓位Id ,
  storePositionName: string; // 仓位名称 ,
  isMultiple: boolean; // 是否多选 ,
  sort: number; // 排序 ,
  isSelected: boolean; // 是否选中
}

interface IAllotTemplateDto {
  id?: string;
  name: string; // 流程名称 ,
  type: number; // 类型 = ['1', '2'],
  typeText: string; //  类型名称 ,
  flowList: IVAllotTemplateInsertInput; // 节点流程数组
}

export interface IReturn {
  data: any;
  status: boolean;
}
// 入参
export interface InsertAllotFlowTemplateParam extends SetAllotFlowTemplateParam {}

// 响应
export interface InsertAllotFlowTemplateResult {
  data: any;
  status: boolean;
}

interface IAllotContentDto {
  key?: number;
  typeId?: string;
  typeName?: string;
  number?: number;
}
// 入参
export interface SetAllotFlowTemplateParam {
  id?: string; // 调拨单Id ,
  name?: string; // 调拨单名称 ,
  allotTemplateId?: string; // 调拨模板Id ,
  attributeList?: Array<IVAllotTemplateInsertInput>; //  选择的节点列表 ,
  content?: Array<IAllotContentDto>; // 调拨内容 ,
  remark?: string; // 备注
}

// 响应
export interface SetAllotFlowTemplateResult {
  data: any;
  status: boolean;
}

// 入参
export interface AllotFlowTemplateParam {
  id: string;
}

// 响应
export interface AllotFlowTemplateResult {
  data: any;
  status: boolean;
}

interface PagedList {
  dataList: Array<IVAllotTemplatePagedList>;
  index: number;
  size: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface IVAllotTemplatePagedList {
  id: string; //
  name: string; // 流程名称 ,
  type: number; // 类型 = ['1', '2'],
  typeText: string; // 类型 ,
  organizationName: string; // 机构名称 ,
  state: number; // 状态 = ['0', '1', '-1']
  stateText: string; // 状态 ,
  createTime: string; // 创建时间 ,
  creatorName: string; // 创建人名称
}

// 入参
export interface QueryAllotFlowTemplatePagedListParam {
  name: string;
  organizationId: string;
  index: 0;
  size: 0;
  beginTime: 0;
  endTime: 0;
}

// 响应
export interface QueryAllotFlowTemplatePagedListResult extends PagedList {}

interface IVAllotTemplateNodeInfo {
  flowId: string; // 流程Id ,
  attributeId: string; // 流程属性Id ,
  name: string; // 节点名称 ,
  sort: number; // 节点顺序 ,
  isCheckBox: boolean; // 是否出现复选框
}
// 入参
export interface QueryAllotFlowTemplateNodeListByTemplateIdParam {
  id: string;
}

// 响应
export interface QueryAllotFlowTemplateNodeListByTemplateIdResult extends IVAllotTemplateNodeInfo {}

// 入参
export interface QueryAllotFlowTemplateDetailParam {
  id: string;
}

// 响应
export interface QueryAllotFlowTemplateDetailResult extends IAllotTemplateDto {}
