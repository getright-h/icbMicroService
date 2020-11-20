/**
 * @export state变量定义和初始化
 * @class IDeviceImportState
 */
export class IDeviceImportState {
  confirmLoading = false;
  importType: number = null;
  searchForm = {};
  deviceList: Array<any> = [];
  submitLoading = false;
  fileList: any[] = [];
  checkResult: any = {};
}
/**
 * @export props变量定义和初始化
 * @class IDeviceImportProps
 */
export class IDeviceImportProps {
  data: any;
  visible: boolean;
  isMove?: boolean;
  close: () => void;
  getTableData?: () => void;
  getAlloactionDetail?: (id: string) => void;
}

interface ISearchForm {
  id?: string;
  allotId?: string;
  operation: 0;
  excelPath?: string;
  deviceList: [
    {
      materialId: string;
      typeId: string;
      typeName: string;
      code: string;
      sim: string;
    }
  ];
  rejectAuditRemark: string;
  returnRemark: string;
}
