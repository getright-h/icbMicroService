/**
 * @export state变量定义和初始化
 * @class ITransformMonitorState
 */
import { DataNode } from 'rc-tree/lib/interface';
export class ITransformMonitorState {
  submitLoading = false;
  expandedKeys: any[] = [];
  checkedKeys: any[] = [];
  checkedObject: DataNode[] = [];
}

export interface ITransformMonitorProps {
  close: Function;
  visible: boolean;
  data: any;
}
