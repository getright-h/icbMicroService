import { IFlowNodeState, IFlowNodeProps } from './flow-node.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllotNodeFlowInput, FlowList } from '~/solution/model/dto/allocation-template.dto';
import { message } from 'antd';
import { useRef, useEffect } from 'react';

export function useFlowNodeStore(props: IFlowNodeProps) {
  const { state, setStateWrap } = useStateStore(new IFlowNodeState());
  const { flowNodeSettingField } = props;
  const { postCurrentChooseInfo } = props;
  const flowNodeSettingFieldReturn = useRef(flowNodeSettingField);
  useEffect(() => {
    flowNodeSettingFieldReturn.current = JSON.parse(JSON.stringify(flowNodeSettingField));
  }, [flowNodeSettingField]);

  function getCurrentSelectInfo(field: FlowList, id: string, idItem: any, key: string) {
    field[`${key}Id`] = id;
    field[`${key}Name`] = idItem.info.name;
    field[`${key}Code`] = idItem.info.code;
    console.log(field);

    switch (key) {
      case 'organization':
        (field.storeId = undefined),
          (field.storeName = undefined),
          (field.storePositionId = undefined),
          (field.storePositionName = undefined);
        break;
      case 'store':
        (field.storePositionId = undefined), (field.storePositionName = undefined);
        break;
      default:
        break;
    }

    flowNodeSettingFieldReturn.current = flowNodeSettingFieldReturn.current.map((fieldItem: AllotNodeFlowInput) => {
      fieldItem.attributeList = fieldItem.attributeList.map((fieldChildItem: FlowList) => {
        if (fieldChildItem.id == field.id) {
          fieldChildItem = { ...fieldChildItem, ...field };
        }
        return fieldChildItem;
      });
      return fieldItem;
    });

    postCurrentChooseInfo(flowNodeSettingFieldReturn.current);
  }

  function onChangeCheckedInfo(field: FlowList, $event: boolean, fieldAttributeListId: string) {
    let messageText = '';
    flowNodeSettingFieldReturn.current = flowNodeSettingFieldReturn.current.map((fieldItem: AllotNodeFlowInput) => {
      fieldItem.attributeList = fieldItem.attributeList.map((fieldChildItem: FlowList, index: number) => {
        console.log('', index);

        if (fieldChildItem.id == field.id) {
          fieldChildItem.isSelected && (messageText = '请保证每个节点都有一条数据');
          fieldChildItem.isSelected = true;
        } else if (fieldAttributeListId == fieldItem.id) {
          fieldChildItem.isSelected = false;
        }

        return fieldChildItem;
      });
      console.log(fieldItem.attributeList);

      return fieldItem;
    });

    if (messageText) {
      flowNodeSettingFieldReturn.current = JSON.parse(JSON.stringify(flowNodeSettingField));
      message.info(messageText);
    } else {
      postCurrentChooseInfo(flowNodeSettingFieldReturn.current);
    }
  }
  return { state, getCurrentSelectInfo, onChangeCheckedInfo };
}
