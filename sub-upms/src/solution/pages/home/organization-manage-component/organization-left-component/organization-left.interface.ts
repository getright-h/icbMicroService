import { OrganizationTypeResponse } from '~/solution/model/dto/organization-manage.dto';
import { DataNode } from 'rc-tree/lib/interface';
/**
import { Tree } from 'antd';
import { DataNode } from './organization-left.interface';
 * @export state变量定义和初始化
 * @class IOrganizationLeftState
 */
export class IOrganizationLeftState {
  treeData: NewDataNode[] = [];
}

export interface IOrganizationLeftProps {
  getSelectTreeNode: (key: string | number) => void;
}

export interface NewDataNode extends OrganizationTypeResponse, DataNode {}
