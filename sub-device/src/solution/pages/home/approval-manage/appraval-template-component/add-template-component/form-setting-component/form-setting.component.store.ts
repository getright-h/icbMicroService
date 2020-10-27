import { IFormSettingState } from './form-setting.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ChangeEvent, Dispatch } from 'react';
import { FormType, IFormInfo, AddTemplateState } from '../add-template-redux/add-template-reducer';
import {
  setCurrentParamsAction,
  setFormInfoAction,
  setCurrentSelectItemAction
} from '../add-template-redux/add-template-action';

export function useFormSettingStore(dispatch: Dispatch<any>, reduxState: AddTemplateState) {
  const { state, setStateWrap } = useStateStore(new IFormSettingState());
  const { currentSelectItem } = reduxState;
  function setFormInfo(formInfo: IFormInfo[]) {
    let selectItem;
    formInfo = formInfo.map(item => {
      if (!item.id.includes(item.controllerEnum)) {
        item.id = new Date().getTime() + '_' + item.controllerEnum;
        selectItem = item;
      }
      return item;
    });
    setCurrentParamsAction(dispatch, { formInfo, currentSelectItem: selectItem ? selectItem : currentSelectItem });
  }

  function onFormEditClick(form: IFormInfo) {
    if (form.controllerEnum == FormType.AssignDevice) return;
    setCurrentSelectItemAction(dispatch, form);
  }

  function onChangetemplateName(value: ChangeEvent<HTMLInputElement>) {
    setStateWrap({
      templateName: value.target.value
    });
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
    console.log(key, value);

    console.log('formInfo', formInfo);

    setCurrentParamsAction(dispatch, { formInfo, currentSelectItem: form });
  }
  return {
    state,
    setFormInfo,
    onChangeCustomInfo,
    onFormEditClick,
    onChangetemplateName,
    deleteCurrentItem
  };
}
