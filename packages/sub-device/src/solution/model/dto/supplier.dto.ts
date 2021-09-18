

/**
 * 真实开发中，请将示例代码移除
 */



export interface IReturn {
  data: any;
  status: boolean;
}


export interface VOrganizationByNameInput {
  typeId : string,
name : string,
organizationId : string,
index: number,
size: number,
beginTime: number,
endTime: number
}