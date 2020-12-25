import { TYPES } from './add-template-types';
import { Dispatch } from 'react';
import { ApproverInput, IFormInfo } from './add-template-reducer';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';
export function setFormInfoAction(dispatch: Dispatch<any>, formInfo: IFormInfo[]) {
  return dispatch({
    type: TYPES.SET_FORM_INFO,
    payload: formInfo
  });
}

export function setCurrentSelectItemAction(dispatch: Dispatch<any>, currentSelectItem: IFormInfo) {
  return dispatch({
    type: TYPES.SET_CURRENT_SELECT_ITEM,
    payload: currentSelectItem
  });
}

export function initTemplateForm(dispatch: Dispatch<any>, payload: any) {
  return dispatch({
    type: TYPES.INIT_TEMPLATE_FORM,
    payload
  });
}

export function setApproverInputAction(dispatch: Dispatch<any>, approverInput: ApproverInput[]) {
  // 在每一层不能重复添加 某一个人员或者角色
  // 对已选角色去重操作
  const _approverInput = approverInput.map((item: any) => {
    const _cache = {};
    item.attributeList = item?.attributeList.reduce((now: any, next: any) => {
      _cache[next.personId] ? '' : (_cache[next.personId] = true && now.push(next));
      return now;
    }, []);
    return item;
  });

  return dispatch({
    type: TYPES.SET_APPROVER_INPUT,
    payload: _approverInput
  });
}

export function setTemplateNameAction(dispatch: Dispatch<any>, payload: any) {
  return dispatch({
    type: TYPES.SET_TEMPLATE_NAME,
    payload: payload
  });
}

export function setCurrentParamsAction(dispatch: Dispatch<any>, payload: any) {
  return dispatch({
    type: TYPES.SET_CURRENT_PARAMS,
    payload: payload
  });
}

export function setFlowNodeSettingFieldAction(dispatch: Dispatch<any>, flowNodeSettingField: FlowList[]) {
  return dispatch({
    type: TYPES.SET_FLOWNODE_SETTING_FIELD,
    payload: flowNodeSettingField
  });
}
