import { IAction } from '~/solution/shared/interfaces/common.interface';
import { TYPES } from './add-template-types';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';
export interface IFormInfo {
  id: string;
  canDelete: boolean;
  controlKey: string;
  canEdit?: boolean;
  controlValue: string;
  type: FormType;
  isRequired: boolean;
  value: string;
  name: string;
}

export enum FormType {
  Input = 1,
  FlowNode = 100,
  AssignDevice = 101
}

export interface AddTemplateState {
  flowNodeSettingField: AllotNodeFlowInput[];
  formInfo: IFormInfo[];
  templateType: number;
  currentSelectItem: IFormInfo;
  templateName: string;
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
  personId: string;
  roleList: string[];
  userName: string;
}

export const addTemplateInitialState: AddTemplateState = {
  flowNodeSettingField: [],
  templateType: undefined,
  templateName: undefined,
  currentSelectItem: {
    id: '1603357241128',
    controlKey: '调拨单名称',
    controlValue: '',
    type: FormType.Input,
    isRequired: true,
    value: '',
    name: 'Input 输入框',
    canDelete: false
  },
  formInfo: [
    {
      id: '1603357241128',
      controlKey: '调拨单名称',
      controlValue: '',
      type: FormType.Input,
      isRequired: true,
      value: '',
      name: 'Input 输入框',
      canDelete: false
    },
    {
      id: '1603357241129',
      controlKey: '流程节点',
      controlValue: '',
      type: FormType.FlowNode,
      isRequired: true,
      canEdit: true,
      value: '',
      name: 'FlowNode 输入框',
      canDelete: false
    },
    {
      id: '16033572411210',
      controlKey: '调拨设备',
      controlValue: '',
      type: FormType.AssignDevice,
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

export function AddTemplateReducer(state: AddTemplateState, action: IAction<any>) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_FLOWNODE_SETTING_FIELD:
      return {
        ...state,
        flowNodeSettingField: payload
      };
    case TYPES.INIT_TEMPLATE_FORM:
      return {
        ...state,
        ...payload
      };
    case TYPES.SET_FORM_INFO:
      return {
        ...state,
        formInfo: payload
      };
    case TYPES.SET_CURRENT_SELECT_ITEM:
      return {
        ...state,
        currentSelectItem: payload
      };
    case TYPES.SET_APPROVER_INPUT:
      return {
        ...state,
        approverInput: payload
      };
    case TYPES.SET_TEMPLATE_NAME:
      return {
        ...state,
        ...payload
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
