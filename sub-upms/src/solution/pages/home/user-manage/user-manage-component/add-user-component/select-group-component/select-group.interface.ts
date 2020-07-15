import { OrganizationId } from '~/solution/model/dto/user-manage.dto';
import { StorageUtil } from '~/framework/util/storage';

const SYSTEMID = StorageUtil.getLocalStorage('systemId');

/**
 * @export state变量定义和初始化
 * @class ISelectGroupState
 */
export class ISelectGroupState {
  searchDepartForm: SearchForm = {
    systemId: SYSTEMID,
    hierarchyType: 1,
    parentCode: ''
  };
  searchPositionForm: SearchForm = {
    systemId: SYSTEMID,
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
