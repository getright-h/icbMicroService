import { IFormSettingState } from './form-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ChangeEvent, Dispatch } from 'react';
import { FormType, IFormInfo, AddTemplateState } from '../add-template-redux/add-template-reducer';
import {
  setCurrentParamsAction,
  setFormInfoAction,
  setCurrentSelectItemAction,
  setTemplateNameAction
} from '../add-template-redux/add-template-action';

export function useFormSettingStore(dispatch: Dispatch<any>, reduxState: AddTemplateState) {
  const { state } = useStateStore(new IFormSettingState());
  const { currentSelectItem } = reduxState;
  function setFormInfo(formInfo: IFormInfo[]) {
    let selectItem;
    formInfo = formInfo.map(item => {
      console.log('item', item);

      if (Number(item.id) < 999999) {
        item.id = String(new Date().getTime());
        selectItem = item;
      }
      return item;
    });
    console.log(formInfo, selectItem ? selectItem : currentSelectItem);

    setCurrentParamsAction(dispatch, { formInfo, currentSelectItem: selectItem ? selectItem : currentSelectItem });
  }

  function onFormEditClick(form: IFormInfo) {
    if (form.type == FormType.AssignDevice) return;
    setCurrentSelectItemAction(dispatch, form);
  }

  function onChangeTemplateName(value: string | any, key = 'templateName') {
    setTemplateNameAction(dispatch, { [key]: value });
  }

  function deleteCurrentItem(id: string) {
    const formInfo = reduxState.formInfo.filter(item => {
      return item.id != id;
    });
    setFormInfoAction(dispatch, formInfo);
  }

  function onChangeCustomInfo<T>(form: IFormInfo, key: string, value: T) {
    form[key] = value;

    const formInfo = reduxState.formInfo.map(item => {
      if (item.id == form.id) {
        item[key] = value;
      }
      return item;
    });
    setCurrentParamsAction(dispatch, { formInfo, currentSelectItem: form });
  }
  return {
    state,
    setFormInfo,
    onChangeCustomInfo,
    onFormEditClick,
    onChangeTemplateName,
    deleteCurrentItem
  };
}
