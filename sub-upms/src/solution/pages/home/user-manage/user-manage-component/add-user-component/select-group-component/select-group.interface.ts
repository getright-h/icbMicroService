import { OrganizationId } from '~/solution/model/dto/user-manage.dto';

/**
 * @export state变量定义和初始化
 * @class ISelectGroupState
 */
export class ISelectGroupState {
  searchDepartForm: SearchForm = {
    systemId: process.env.SYSTEM_ID,
    hierarchyType: 1,
    parentCode: ''
  };
  searchPositionForm: SearchForm = {
    systemId: process.env.SYSTEM_ID,
    hierarchyType: 2,
    parentCode: ''
  };
  relateRolesText = '无';
}
export class ISelectGroupProps {
  selectValues: OrganizationId;
  field: FieldData;
  index: number;
  add: () => void;
  remove: (index: number) => void;
  handleOrganSelect: (option: any, index: number, type: string) => void;
  sendRelateRoles: (relateRoles: string[], index: number) => void;
}

interface FieldData {
  name: number;
  key: number;
  fieldKey: number;
}
interface SearchForm {
  systemId: string;
  hierarchyType: number;
  parentCode: string;
}
