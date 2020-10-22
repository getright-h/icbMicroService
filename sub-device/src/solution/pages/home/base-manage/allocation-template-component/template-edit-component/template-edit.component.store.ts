import { ITemplateEditState } from './template-edit.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { useRef } from 'react';
import { FlowList } from '~/solution/model/dto/allocation-template.dto';

export function useTemplateEditStore() {
  const { state, setStateWrap, getState } = useStateStore(new ITemplateEditState());
  const currentSort = useRef(0);
  const [form] = Form.useForm();
  // 添加流程节点
  function addFlowNode(sort = -1, add: (...item: any) => void, index?: number) {
    const flowNodeSettingField = state.flowNodeSettingField;
    if (sort == -1) {
      currentSort.current++;
      sort = currentSort.current;
    }
    if (index != undefined) {
      add(
        {
          sort,
          flowNodeSettingFieldId: createRandomId()
        },
        index
      );
    } else {
      add({
        sort,
        flowNodeSettingFieldId: createRandomId()
      });
    }

    setStateWrap({
      flowNodeSettingField
    });
  }

  function setCascaderInfo(field: FlowList, ids: string[], idItem: any) {
    console.log(ids, idItem);
    const store = idItem[0];
    const storePositionId = idItem[1];
    field.warehouseCascaderArray = ids;
    field.storeId = store.value;
    field.storeName = store.label;
    field.storePositionId = storePositionId && storePositionId.value;
    field.storePositionName = storePositionId && storePositionId.label;

    let flowNodeSettingField = getState().flowNodeSettingField;
    flowNodeSettingField = flowNodeSettingField.map(fieldItem => {
      if (fieldItem.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        fieldItem = { ...fieldItem, ...field };
      }
      return fieldItem;
    });
    setStateWrap({
      flowNodeSettingField
    });
  }

  function createRandomId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      '-' +
      new Date().getTime() +
      '-' +
      Math.random()
        .toString()
        .substr(2, 5)
    );
  }

  function getCurrentSelectInfo(field: FlowList, id: string, idItem: any) {
    field.organizationId = id;
    field.organizationName = idItem.info.name;
    field.organizationCode = idItem.info.code;

    let flowNodeSettingField = getState().flowNodeSettingField;
    flowNodeSettingField = flowNodeSettingField.map(fieldItem => {
      if (fieldItem.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        fieldItem = { ...fieldItem, ...field };
      }
      return fieldItem;
    });

    setStateWrap({
      flowNodeSettingField
    });
  }

  return { state, addFlowNode, form, getCurrentSelectInfo, setCascaderInfo };
}
