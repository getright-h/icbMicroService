import { IFlowNodeState, IFlowNodeProps } from './flow-node.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllotNodeFlowInput, FlowList } from '~/solution/model/dto/allocation-template.dto';
import { message } from 'antd';

export function useFlowNodeStore(props: IFlowNodeProps) {
  const { state, setStateWrap } = useStateStore(new IFlowNodeState());
  const { flowNodeSettingField, postCurrentChooseInfo } = props;

  function getCurrentSelectInfo(field: FlowList, id: string, idItem: any, key: string) {
    field[`${key}Id`] = id;
    field[`${key}Name`] = idItem.info.name;
    field[`${key}Code`] = idItem.info.code;
    console.log(key);

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

    const flowNodeSettingFieldReturn = flowNodeSettingField.map((fieldItem: AllotNodeFlowInput) => {
      fieldItem.attributeList = fieldItem.attributeList.map((fieldChildItem: FlowList) => {
        if (fieldChildItem.flowId == field.flowId) {
          fieldChildItem = { ...fieldChildItem, ...field };
        }
        return fieldChildItem;
      });
      return fieldItem;
    });

    postCurrentChooseInfo(flowNodeSettingFieldReturn);
  }

  function onChangeCheckedInfo(field: FlowList, $event: boolean) {
    let messageText = '';
    let flowNodeSettingFieldReturn = JSON.parse(JSON.stringify(flowNodeSettingField)); // 深拷贝
    flowNodeSettingFieldReturn = flowNodeSettingFieldReturn.map((fieldItem: AllotNodeFlowInput) => {
      let total = 0;
      fieldItem.attributeList = fieldItem.attributeList.map((fieldChildItem: FlowList) => {
        if (fieldChildItem.flowId == field.flowId) {
          fieldChildItem.isSelected = $event;
        }

        fieldChildItem.isSelected && total++;
        return fieldChildItem;
      });

      if (total == 0) {
        messageText = '请保证每个节点都有一条数据';
      }
      return fieldItem;
    });
    console.log(11222);

    messageText ? message.info(messageText) : postCurrentChooseInfo(flowNodeSettingFieldReturn);
  }
  return { state, getCurrentSelectInfo, onChangeCheckedInfo };
}
