import { AlarmPackageContent } from '~/solution/model/dto/alarm-manage.dto';

/**
 * @export state变量定义和初始化
 * @class ITemplateListState
 */
export class ITemplateListState {
  templateList: AlarmPackageContent[] = [];
  confirmLoading = false;
  selectTempId: string;
  selectTempInfo: AlarmPackageContent[] = [];
  tempalteValue: AlarmPackageContent[] = [];
  isCurTempDefault: boolean;
}
export class ITemplateListProps {
  visible: boolean;
  info: Record<string, any>;
  close: () => void;
}
