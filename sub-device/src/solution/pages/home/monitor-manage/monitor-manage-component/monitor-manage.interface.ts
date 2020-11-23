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
    groupId: ''
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
  transformSelected: string[] = [];
  currentMonitorGroup: any = {};
}
