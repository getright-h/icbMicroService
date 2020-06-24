import { UploadFile } from 'antd/lib/upload/interface';
import { match, RouteComponentProps } from 'react-router-dom';

/**
 * @export state变量定义和初始化
 * @class IAddOrganizationState
 */

export interface IAddOrganizationProps extends RouteComponentProps {
  match: match<{ id: string }>;
}
export class IAddOrganizationState {
  formInfo: OrganizationForm = {
    systemCode: ''
  };
  provinceList: Array<AreaInfo>;
  cityList: Array<AreaInfo>;
  areaList: Array<AreaInfo>;
  isEdit = false;
}
interface OrganizationForm {
  systemCode: string;
  parentName?: string;
  parentCode?: string;
  id?: string;
}

interface AreaInfo {
  cityCode: string;
  cityName: string;
  deep: number;
  parentCode: string;
}
