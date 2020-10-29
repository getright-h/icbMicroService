import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './add-template-types';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';
export interface IFormInfo {
  id: string;
  canDelete: boolean;
  title: string;
  canEdit?: boolean;
  controllerEnum: FormType;
  isRequired: boolean;
  value: string;
  name: string;
}

export enum FormType {
  Input = 'Input',
  FlowNode = 'FlowNode',
  AssignDevice = 'AssignDevice'
}

export interface AddTemplateState {
  flowNodeSettingField: FlowList[];
  formInfo: IFormInfo[];
  currentSelectItem: IFormInfo;
  approverInput: ApproverInput[];
}

export interface ApproverInput {
  id?: string;
  sort: number;
  isAllPass: boolean;
  attributeList: AttributeList[];
}

export interface AttributeList {
  id?: string;
  mode: number;
  userId: string;
  roleList: string[];
  userName: string;
}

export const addTemplateInitialState: AddTemplateState = {
  flowNodeSettingField: [],
  currentSelectItem: {
    id: '1603357241127_Input',
    title: '调拨单名称',
    controllerEnum: FormType.Input,
    isRequired: true,
    value: '',
    name: 'Input 输入框',
    canDelete: false
  },
  formInfo: [
    {
      id: '1603357241127_Input',
      title: '调拨单名称',
      controllerEnum: FormType.Input,
      isRequired: true,
      value: '',
      name: 'Input 输入框',
      canDelete: false
    },
    {
      id: '1603357241128_FlowNode',
      title: '流程节点',
      controllerEnum: FormType.FlowNode,
      isRequired: true,
      canEdit: true,
      value: '',
      name: 'FlowNode 输入框',
      canDelete: false
    },
    {
      id: '1603357241128_AssignDevice',
      title: '调拨设备',
      controllerEnum: FormType.AssignDevice,
      isRequired: true,
      canEdit: true,
      value: '',
      name: 'AssignDevice 输入框',
      canDelete: false
    }
  ],
  approverInput: [
    {
      sort: 1,
      isAllPass: true,
      attributeList: []
    }
  ]
};

export function AddTemplateReducer(state = addTemplateInitialState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_FLOWNODE_SETTING_FIELD:
      return {
        ...state,
        flowNodeSettingField: payload
      };
    case TYPES.SET_FORM_INFO:
      console.log();

      return {
        ...state,
        formInfo: payload
      };
    case TYPES.SET_CURRENT_SELECT_ITEM:
      return {
        ...state,
        currentSelectItem: payload
      };
    case TYPES.SET_CURRENT_PARAMS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
