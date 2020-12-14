/**
 * @export state变量定义和初始化
 * @class IAddOrganizationState
 */
export class IAddOrganizationState {
  formInfo: OrganizationForm = {
    systemCode: ''
  };
  provinceList: Array<AreaInfo>;
  cityList: Array<AreaInfo>;
  areaList: Array<AreaInfo>;
  typeList: Array<{ id: string; name: string }>;
  fileList: Array<any>;
  confirmLoading = false;
}

export class IAddOrganizationProps {
  visible: boolean;
  close: (isSuccess?: boolean) => void;
  isEdit?: boolean;
  isDetail?: boolean;
  id?: string;
}
interface OrganizationForm {
  typeId?: string;
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
