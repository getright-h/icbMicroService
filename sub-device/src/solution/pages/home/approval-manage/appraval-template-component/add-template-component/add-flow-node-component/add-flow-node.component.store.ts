import { IAddFlowNodeProps, IAddFlowNodeState } from './add-flow-node.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { AllotNodeFlowInput, FlowList } from '~/solution/model/dto/allocation-template.dto';
import { setFlowNodeSettingFieldAction } from '../add-template-redux/add-template-action';
import { AddTemplateManageContext } from '../add-template.component';

export function useAddFlowNodeStore(props: IAddFlowNodeProps) {
  const { state } = useStateStore(new IAddFlowNodeState());
  const { reduxState, dispatch } = React.useContext(AddTemplateManageContext);
  let { flowNodeSettingField } = reduxState;
  const [form] = Form.useForm();
  // 添加流程节点
  function addFlowNode(field: AllotNodeFlowInput) {
    field.attributeList.push({
      childNodeId: createRandomId()
    });

    flowNodeSettingField = flowNodeSettingField.map((item: any) => {
      if (item.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        return field;
      }
      return item;
    });

    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingField);
  }

  function onChangeCustomInfo<T>(field: AllotNodeFlowInput, key: string, value: T) {
    field[key] = value;
    flowNodeSettingField = flowNodeSettingField.map((item: any) => {
      if (item.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        return field;
      }
      return item;
    });
    console.log(flowNodeSettingField);

    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingField);
  }

  function addFatherFlowNode() {
    flowNodeSettingField.push({
      flowNodeSettingFieldId: createRandomId(),
      isEdit: false,
      attributeList: [
        {
          childNodeId: createRandomId()
        }
      ]
    });
    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingField);
  }

  function removeFlowNode(field: AllotNodeFlowInput, index: number) {
    const flowNodeSettingFieldC: any[] = [];
    field.attributeList.splice(index, 1);

    flowNodeSettingField.forEach((item: any) => {
      if (item.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        if (field.attributeList.length) {
          flowNodeSettingFieldC.push(field);
        }
      } else {
        flowNodeSettingFieldC.push(item);
      }
    });
    console.log();

    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingFieldC);
  }

  function setCascaderInfo(field: FlowList, ids: string[], idItem: any) {
    const store = idItem[0];
    const storePositionId = idItem[1];
    field.warehouseCascaderArray = ids;
    field.storeId = store.value;
    field.storeName = store.label;
    field.storePositionId = storePositionId && storePositionId.value;
    field.storePositionName = storePositionId && storePositionId.label;

    flowNodeSettingField = flowNodeSettingField.map((fieldItem: FlowList) => {
      if (fieldItem.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        fieldItem = { ...fieldItem, ...field };
      }
      return fieldItem;
    });
    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingField);
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

    flowNodeSettingField = flowNodeSettingField.map((fieldItem: FlowList) => {
      if (fieldItem.flowNodeSettingFieldId == field.flowNodeSettingFieldId) {
        fieldItem = { ...fieldItem, ...field };
      }
      return fieldItem;
    });

    setFlowNodeSettingFieldAction(dispatch, flowNodeSettingField);
  }
  return {
    state,
    form,
    addFlowNode,
    setCascaderInfo,
    getCurrentSelectInfo,
    removeFlowNode,
    addFatherFlowNode,
    onChangeCustomInfo
  };
}
