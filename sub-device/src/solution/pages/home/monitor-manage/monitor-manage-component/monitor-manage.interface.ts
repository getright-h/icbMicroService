/**
 * @export state变量定义和初始化
 * @class IMonitorManageState
 */
import { DataNode } from 'rc-tree/lib/interface';
export class IMonitorManageState {
  addGroupModalVisible = false;
  addCarModalVisible = false;
  transformModalVisible = false;
  currentData: any = {};
  searchForm: any = {
    groupId: '40105ebae7c7c7551b2308d87064ff23'
  };
  tableData: any[] = [];
  total = 0;
  isLoading = false;
  groupId = '';
  checkedKeys: string[] = [];
  confirmLoading = false;
  transformDisable = true;
  checkedObject: DataNode[] = [];
  expandedKeys: string[] = [];
  treeSelectedKeys: string[] = [];
  selectedRowKeys: string[] = [];
  currentMonitorGroup: any = {};
}
