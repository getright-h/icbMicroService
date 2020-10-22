import { IAddTemplateTypeProps, IAddTemplateTypeState } from './add-template-type.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { getCheckedList } from '~/framework/util/common/treeFunction';
import { DataNode } from 'rc-tree/lib/interface';
import _ from 'lodash';

export function useAddTemplateTypeStore(props: IAddTemplateTypeProps) {
  const { state, setStateWrap } = useStateStore(new IAddTemplateTypeState());
  // 确定创建
  function handleOk() {
    setStateWrap({
      confirmLoading: true
    });
    // 添加模板类型
    addTemplateType();
  }

  function onCheck(treeData: DataNode[], checkedKeys: any = state.checkedKeys) {
    const checkedObject = getCheckedList(treeData, checkedKeys);

    setStateWrap({
      checkedKeys,
      checkedObject
    });
  }

  async function addTemplateType() {
    setStateWrap({
      confirmLoading: false
    });
    // 是否刷新左边栏
    props.closeAddTemplateTypeModal(!props.isEdit);
  }

  // 关闭当前的modal
  function handleCancel() {
    props.closeAddTemplateTypeModal();
  }

  function onExpand(expandedKeys: []) {
    setStateWrap({
      expandedKeys
    });
  }

  function onChangeHaveChooseShop(id: string) {
    document.getElementById(id).focus();
  }

  function removeHaveChecked(item: DataNode) {
    const checkedKeys = state.checkedKeys.filter(option => {
      return option !== item.key;
    });
    setStateWrap({
      checkedKeys
    });
  }

  return {
    state,
    handleOk,
    onChangeHaveChooseShop,
    handleCancel,
    onExpand,
    removeHaveChecked,
    onCheck
  };
}
