import { IFlowNodeState, IFlowNodeProps } from './flow-node.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { AllotNodeFlowInput, FlowList } from '~/solution/model/dto/allocation-template.dto';

export function useFlowNodeStore(props: IFlowNodeProps) {
  const { state, setStateWrap } = useStateStore(new IFlowNodeState());
  const { flowNodeSettingField, postCurrentChooseInfo } = props;

  function getCurrentSelectInfo(field: FlowList, id: string, idItem: any, key: string) {
    field[`${key}Id`] = id;
    field[`${key}Name`] = idItem.info.name;
    field[`${key}Code`] = idItem.info.code;

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

    console.log('flowNodeSettingFieldReturn', flowNodeSettingFieldReturn);

    postCurrentChooseInfo(flowNodeSettingFieldReturn);
  }

  function onChangeCheckedInfo(field: FlowList, $event: boolean) {
    field.checked = $event;
    const flowNodeSettingFieldReturn = flowNodeSettingField.map((fieldItem: AllotNodeFlowInput) => {
      fieldItem.attributeList = fieldItem.attributeList.map((fieldChildItem: FlowList) => {
        if (fieldChildItem.flowId == field.flowId) {
          fieldChildItem = { ...fieldChildItem, ...field };
        }
        return fieldChildItem;
      });
      return fieldItem;
    });

    console.log('flowNodeSettingFieldReturn', flowNodeSettingFieldReturn);

    postCurrentChooseInfo(flowNodeSettingFieldReturn);
  }
  return { state, getCurrentSelectInfo, onChangeCheckedInfo };
}
